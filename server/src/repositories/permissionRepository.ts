import {
    Permission,
    PermissionsRead,
    PermissionCreate,
    PermissionDelete,
    PermissionUpdate
} from "../graphql/resolvers-types";
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
            new SqlParam(`offsetRows`, params.offsetRows, `in`),
            new SqlParam(`fetchRows`,params.fetchRows, `in`),
            new SqlParam(`name`, params.name, `in`),
            new SqlParam(`name_s`, params.name_s, `in`),
            new SqlParam(`description_s`, params.description_s, `in`)
        ];
        const r1 = await db.call("sp_permission_readlist",params_1);
        // console.log("Procedure: ", r1.getData<Permission>());
        const metadata = r1.getData(0);
        const dataRow = r1.getData<Permission[]>(1);

        // console.log(dataRow, metadata);
        return dataRow;
    }


    /**
     * Create a permission
     */
    async createPermission(p:PermissionCreate): Promise<Permission|undefined> {
        let permission: Permission|undefined;

        const params = [
            new SqlParam(`name`, p.name, `in`),
            new SqlParam(`description`, p.description, `in`)
        ];
        const r = await db.call("sp_permission_create", params);
        // console.log("Procedure: ", r.getData<Permission>(0));
        const dataRow = r.getData<Permission[]>(0);
        permission = dataRow[0];

        return permission;
    }


    /**
     * Delete a permission
     */
    async deletePermission(input:PermissionDelete): Promise<Permission|undefined> {
        let permission: Permission|undefined;

        const params = [
            new SqlParam(`name`, input.name, `in`),
        ];
        const r = await db.call("sp_permission_delete", params);
        // console.log("Procedure: ", r.getData<Permission>(0));
        const dataRow = r.getData<Permission[]>(0);
        permission = dataRow[0];

        return permission;
    }


    /**
     * Get a permission
     */
    async getPermission(pName:string): Promise<Permission|undefined> {
        let permission: Permission|undefined;

        const params = [
            new SqlParam(`name`, pName, `in`),
        ];
        const r = await db.call("sp_permission_read", params);
        // console.log("Procedure: ", r.getData<Permission[]>(0));
        const dataRow = r.getData<Permission[]>(0);
        permission = dataRow[0];

        return permission;
    }

    /**
     * Update a permission_queries
     */
    async updatePermission(input:PermissionUpdate): Promise<Permission> {
        let permission: Permission|undefined;

        const params = [
            new SqlParam(`p_name`, input.p_name, `in`),
            new SqlParam(`name`, input.name, `in`),
            new SqlParam(`description`, input.description, `in`),
        ];
        const r = await db.call("sp_permission_update", params);
        // console.log("Procedure: ", r.getData<Permission[]>(0));
        const dataRow = r.getData<Permission[]>(0);
        permission = dataRow[0];

        return permission;
    }
}
