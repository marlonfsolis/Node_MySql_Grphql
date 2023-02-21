import mysql, {Pool, Connection, ResultSetHeader} from "mysql2/promise";

import {Configuration as config} from '../utils/configuration';
import {dbDebug} from '../startup/debuggers';

/**
 * INTERFACE to model a statistic object returned as output from stored procedures
 * with metadata information about the results of the call.
 */
export interface IOutputResult {
    success: boolean,
    msg: string,
    errorLogId: number,
    recordCount: number
}

/** INTERFACE to model the result of a stored procedure call.  */
export interface ISqlResult {
    data:any[];
    fields: any[];
    outParams:any;
    resultSetHeader:ResultSetHeader;
    getOutputVal<T>(name:string):T;
    getOutputJsonVal<T>(name:string):T;
    getData<T>(idx?:number):T;
}

/** CLASS to model a stored procedure parameter. */
export class SqlParam {
    constructor(
        public name:string,
        public value:any,
        public dir:"in"|"out"
    ) {
        this.name = name;
        this.value = value;
        this.dir = dir;
    }
}

/** CLASS to model the result of a stored procedure call. */
export class SqlResult implements ISqlResult {
    public data: any[];
    public fields: any[];
    public outParams: any;
    public resultSetHeader: ResultSetHeader;

    constructor(fields:any[], outParams:object) {
        this.data = [];
        this.fields = fields;
        this.outParams = outParams;
        this.resultSetHeader = {} as ResultSetHeader;
    }

    /**
     * Get the value of the giving parameter.
     * @param name Parameter name.
     */
    getOutputVal<T>(name: string): T {
        // dbDebug(this.outParams);
        if (!name.startsWith(`@`)) name = `@${name}`;
        return this.outParams[name] as T;
    }

    /**
     * Get the value parsed of the giving output parameter.
     * @param name Parameter name.
     */
    getOutputJsonVal<T>(name: string): T {
        // dbDebug(this.outParams);
        if (!name.startsWith(`@`)) name = `@${name}`;
        return JSON.parse(this.outParams[name]) as T;
    }

    /**
     * Get the data at giving position.
     * Field data can hold multiple results from multiple query statements.
     * @param idx
     */
    getData<T>(idx:number=-1): T {
        // console.log(this.data);
        if (idx === -1) {
            return (this.data as unknown) as T;
        }
        return this.data[idx] as T;
    }

}


export interface IDataBase {
    get Pool(): mysql.Pool;
    get Conn(): Promise<mysql.Connection>;
    getNewConnPool(): mysql.Pool;
    getDbConnection(): Promise<mysql.Connection>;
    getNewConnPool(): mysql.Pool;
    call(proc:string, params?:SqlParam[], conn?:Pool|Connection):Promise<ISqlResult>;
    query(sql:string, params?: { [key:string]:any }, options?:IQueryOptions): Promise<ISqlResult>;
    exists(sql:string, params?: { [key:string]:any }, conn?:Pool|Connection): Promise<boolean>;
}

export interface IQueryOptions {
    multiStatements?:boolean,
    conn?: Pool|Connection
}

/**
 * Database class that facilitate the work with database driver
 */
class DataBase implements IDataBase
{
    private static _instance: IDataBase;
    private readonly connConfig: mysql.ConnectionOptions;
    private readonly poolConfig: mysql.PoolOptions;
    private readonly pool: mysql.Pool;

    private constructor()
    {
        const basicConnConfig = {
            user: config.db.username,
            password: config.db.password,
            database: config.db.name,
            host: config.db.host,
            namedPlaceholders:true,
            multipleStatements:true
        };

        this.connConfig = { ...basicConnConfig };

        this.poolConfig = {
            ...basicConnConfig,
            connectionLimit: 10,
        };

        this.pool = this.getNewConnPool();
    }

    public static get Instance() {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    public get Pool() {
        return this.pool;
    }

    public get Conn() {
        return this.getDbConnection();
    }

    /** Create a new connection pool */
    public getNewConnPool() {
        return mysql.createPool(this.poolConfig);
    }

    /** Create a new connection */
    public async getDbConnection() {
        try {
            const connection = await mysql.createConnection(this.connConfig);
            await connection.connect();
            return connection;
        } catch (err) {
            const errMsg = "Error creating connection.";
            dbDebug(errMsg, err);
            throw Error(errMsg);
        }
    }

    /** Get the object containing the output parameters from a procedure call. */
    private getOutputs(rowData:any) {
        return rowData[0];
    }

    /**
     * Call a stored procedure and return an object of type SqlResult.
     * @param proc {string} - Procedure name.
     * @param params {Array<SqlParam>} - Array of parameters.
     * @param conn {Pool|Connection} - Connection to be used. If not passed the current connection pool will be used.
     * @return SqlResult Result object like {data,outputParams,fields}
     * @example db.call(`usp_Person_Read`, [new SqlParam(`id`,1,`in`)]);
     * @example db.call(`usp_Person_Read`, [new SqlParam(`id`,1,`in`),new SqlParam(`errorMsg`,`out`)]);
     * */
    async call(proc:string, params?:SqlParam[], conn?:Pool|Connection):Promise<ISqlResult> {
        if (!conn) conn = this.Pool;

        // call proc(?,?,??);
        // call proc(1,2,@OUT)
        let sql = `CALL ${proc}(`;

        // create input parameters
        const inPH = [] as string[];
        const inV = [] as any[];
        const outPH = [] as string[];
        const outV = [] as string[];
        if (params && params.length > 0) {
            // very first param
            addParam(params[0]);
            // rest of params
            for (let i = 1; i < params.length; i++) {
                addParam(params[i]);
            }
        }
        sql = sql.concat(inPH.concat(outV).join());
        sql = sql.concat(");");
        // console.log(sql);

        // execute proc
        const [rows,fields] = await conn.execute(sql, inV.concat(outV));

        // Go and get the output parameters
        let outResults: any|null = null;
        if (outPH.length > 0) {
            let outSql = `SELECT ${outV.join()};`;
            const [outRows] = await conn.execute(outSql);
            outResults = this.getOutputs(outRows);
        }

        return this.createSqlResult(rows, fields, outResults);



        // helper function to add parameters
        function addParam(p:SqlParam) {
            if (p.dir === `in`) {
                inPH.push(`?`);
                inV.push(p.value);
            } else {
                outPH.push(`??`);
                outV.push(`@${p.name}`);
            }
        }
    }

    /**
     * Execute a Sql query.
     * @param sql Query to send to the server
     * @param params Parameters for the Sql query on Key:Value pair form
     * @param options Additional options for the query
     * @example db.query(`SELECT * FROM Person WHERE id=:id`, {id:1}, {multiStatements:false});
     */
    public async query(sql:string, params?: { [key:string]:any }, options?:IQueryOptions): Promise<ISqlResult> {
       if (params) {
           for (const k of Object.keys(params)) {
               if (params[k] === undefined) params[k] = null;
           }
       }

        if (!options) options = {
            multiStatements:false,
            conn: this.Pool
        }
        if (!options.conn) options.conn = this.Pool;
        const conn = options!.conn;

        try {
            // execute the query
            let rows:any, fields:any;
            if (options.multiStatements) {
                [rows,fields] = await conn.query(sql, params);
            } else {
                [rows,fields] = await conn.execute(sql, params);
            }
            // console.log(rows);
            // console.log(sql);

            // return the sql result
            return this.createSqlResult(rows, fields, {});
        } catch (e:any) {
            // check if multiStatements is false, and we have possible multiple queries
            const arrStatements = sql.match(/;/gi);
            // console.log(arrStatements);
            // console.log(arrStatements?.length);
            if (arrStatements && arrStatements.length > 1 && options.multiStatements === false) {
                throw Error(`The sql have possible multi statements and multiStatements option is false. Inner: ${e.message}`);
            }
            throw e;
        }
    }


    /**
     * Execute a Sql query and return if exists at least one row.
     * @param sql Query to send to the server
     * @param params Parameters for the Sql query on Key:Value pair form
     * @param conn Connection to be used. By default, uses the internal connection pool
     */
    public async exists(sql:string, params?: { [key:string]:any }, conn?:Pool|Connection): Promise<boolean> {
        if (!conn) conn = this.Pool;

        // execute the query
        const [rows] = await conn.execute(sql, params);
        // console.log(rows);

        // return the sql result
        return (rows as Array<any>).length > 0;
    }


    /**
     * Creates the SqlResult instance from a Sql call result.
     * If more than one [insert, update or delete] is sent,
     * only the ResultSetHeader for the last one will be returned.
     * @param rows
     * @param fields
     * @param outputParams
     * @private
     */
    private createSqlResult(rows:any, fields:any, outputParams:any) {
        const callRes:ISqlResult = new SqlResult(fields, outputParams);

        // If result is iterable. We can have array of objects, or multiple results.
        // If result is not iterable. It is a ResultSetHeader (insert, update or delete).
        if (typeof rows[Symbol.iterator] === "function") {
            // If the first item is not iterable, and it is not the ResultSetHeader
            // then the rows is an array of db rows.
            if (rows.length === 0 ||
                (typeof rows[0][Symbol.iterator] !== "function"
                && !isResultSetHeader(rows[0]))
            ) {
                callRes.data = rows;
                return callRes;
            }

            // Otherwise we have multiple result sets and/or the ResultSetHeader
            const data:any[] = [];
            for (const r of rows) {
                if (typeof r[Symbol.iterator] === "function") {
                    data.push(r);
                } else {
                    callRes.resultSetHeader = r as ResultSetHeader;
                }
            }
            callRes.data = data;
        } else {
            callRes.resultSetHeader = (rows as unknown) as ResultSetHeader;
        }
        return callRes;


        /**
         * Check if the object is of type ResultSetHeader
         * @param obj
         */
        function isResultSetHeader(obj:any) {
            const objKeys = Object.keys(obj);
            return !!(objKeys.includes("fieldCount")
                && objKeys.includes("affectedRows")
                && objKeys.includes("insertId")
                && objKeys.includes("info")
                && objKeys.includes("serverStatus")
                && objKeys.includes("warningStatus"));
        }
    }
}

export const db = DataBase.Instance;
export const pool = db.Pool;
