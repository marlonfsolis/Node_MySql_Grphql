import {db, SqlParam} from "../shared/Database";
import {LogLevel} from "../shared/enums";
import {queries} from "../queries";
import {Permission} from "../graphql/resolvers-types";


/**
 * Log Error
 * @param errLog {Error} Error object
 */
export async function logErrorObject(errLog: any)
{
    const result = await db.query(queries.error_create, errLog);
    // console.log(result);
    errLog.errorLogId = result.resultSetHeader.insertId;

    return errLog;
}

/**
 * Log Error
 * @param level {LogLevel} Type of log.
 * @param message {string} Error message.
 * @param detail {string} Any other detail to be logged.
 * @param stack {string} The error stack trace.
 * @return {number} The error log id.
 */
export async function logError(level:LogLevel, message:string, detail:string, stack:string)
{
    const params = [
        new SqlParam(`level`, level, `in`),
        new SqlParam(`message`, message, `in`),
        new SqlParam(`detail`, detail, `in`),
        new SqlParam(`stack_trace`, stack, `in`),
        new SqlParam(`error_date`, new Date(), `in`),
    ];
    const r = await db.call("sp_error_log_create", params);
    // console.log("Procedure: ", r.getData<object>(0));
    const dataRow = r.getData<[{error_log_id:number}]>(0);
    return dataRow[0].error_log_id;
}
