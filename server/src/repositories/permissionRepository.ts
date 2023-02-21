import {Permission, PermissionsRead, PermissionCreateUpdate, PermissionDelete} from "../graphql/resolvers-types";
import {db, SqlParam, IOutputResult} from "../shared/Database";
import {queries} from "../queries";


export default class PermissionRepository
{
    constructor() {}

    /**
     * Get a permission list
     */
    async getPermissions(params:PermissionsRead): Promise<Permission[]> {

        /* Testing new DataBaseSingleton proc call */
        const params_1 = [
            new SqlParam(`offsetRows`,0, `in`),
            new SqlParam(`fetchRows`,0, `in`),
            new SqlParam(`filterJson`,null, `in`),
            new SqlParam(`searchJson`,null, `in`),
            new SqlParam(`result`,``, `out`)
        ];
        const r1 = await db.call("sp_permissions_readlist",params_1);
        console.log("Procedure: ", r1.getData<Permission>());
        const dataRow = r1.getData<Permission[]>(0);
        const outputVal = r1.getOutputJsonVal<IOutputResult>("@result");
        console.log(dataRow, outputVal);
        return dataRow;


        /* Testing file queries */
        // const params2 = {
        //     name:params.name,
        //     description:params.description,
        //     name_s:params.name_s,
        //     description_s:params.description_s,
        //     fetchRows: params.fetchRows || `10`,
        //     offsetRows: params.offsetRows || `0`
        // };
        // const r2 = await db.query(queries.permissionList_read, params2);
        // return r2.getData<Permission[]>();
    }


    /**
     * Create a permission
     */
    async createPermission(p:PermissionCreateUpdate): Promise<Permission> {
        let permission: Permission|undefined;

        let params:any = { name: p.name };
        const exists = await db.exists(queries.permissionExists_read, params);
        if (exists) {
            // Return an error result and log in DB.
            throw new Error(`Permission already exists.`);
        }

        let sql = `${queries.permission_create} ${queries.permission_read}`;
        const perRes = await db.query(sql, p, {multiStatements:true});
        permission = perRes.getData<Permission[]>(0)[0];
        // console.log(permission_queries);

        return permission;
    }


    /**
     * Delete a permission
     */
    async deletePermission(input:PermissionDelete): Promise<Permission> {
        let permission: Permission|undefined;

        const params:any = { name: input.name };
        const sql = `${queries.permission_read} ${queries.permission_delete}`;
        const r = await db.query(sql, params, {multiStatements:true});
        // console.log(r);
        if (r.resultSetHeader.affectedRows === 0) {
            throw new Error(`Permission not found.`);
        }
        permission = r.getData<Permission[]>(0)[0];
        return permission;
    }


    /**
     * Get a permission
     */
    async getPermission(pName:string): Promise<Permission> {
        let permission: Permission|undefined;

        const params:any = { name: pName };
        const sql = `${queries.permission_read}`;
        const r = await db.query(sql, params, {multiStatements:false});
        // console.log(r);
        permission = r.getData<Permission[]>()[0];
        if (typeof permission === `undefined`) {
            throw new Error(`Permission not found.`);
        }

        return permission;
    }

    /**
     * Update a permission_queries
     */
    async updatePermission(pName:string, p:Permission): Promise<Permission> {
        let permission: Permission|undefined;

        // verify the new name
        if (pName !== p.name) {
            const r = await this.getPermission(p.name);
            if (r && r.name === p.name) {
                throw new Error(`Permission already exist.`);
            }
        }

        const params = {name:pName, newName:p.name, newDescription:p.description};
        const sql = `${queries.permission_update}`;
        let sr = await db.query(sql, params, {multiStatements:true});
        permission = sr.getData<Permission[]>(0)[0];

        // verify that was found/updated
        if (sr.resultSetHeader.affectedRows === 0) {
            throw new Error(`Permission not found.`);
        }

        return permission;
    }
}
