import {db} from "../shared/Database";
import {queries} from "../queries";
import {dbDebug} from "../startup/debuggers";



/**
 * Role Repository
 */
export default class RoleRepository
{
    constructor() {}


    /**
     * Get a role_queries list
     */
    // async getRoles(params:GetRolesParam): Promise<IResult<IRole[]>> {
    //     let roles = [] as IRole[];
    //     const sr = await db.query(queries.roleList_read, params);
    //     roles = sr.getData<IRole[]>();
    //
    //     return new ResultOk<IRole[]>(roles);
    // }


    /**
     * Create a role_queries
     */
    // async createRole(r:IRole): Promise<IResult<IRole>> {
    //     let role: IRole|undefined;
    //
    //     let params:any = { name: r.name };
    //     const exists = await db.exists(queries.roleExists_read, params);
    //     if (exists) {
    //         // Return an error result without log in DB.
    //         return new ResultErrorBadRequest(
    //             `Role already exists.`, `roleRepository.createRole`, `0`
    //         )
    //     }
    //
    //     let sql = `${queries.role_create} ${queries.role_read}`;
    //     const sqlRes = await db.query(sql, r, {multiStatements:true});
    //     role = sqlRes.getData<IRole[]>()[0];
    //     // console.log(sqlRes);
    //
    //     return new ResultOk(role);
    // }


    /**
     * Delete a role_queries
     */
    // async deleteRole(rName:string): Promise<IResult<IRole>> {
    //     let role: IRole|undefined;
    //
    //     const params:any = { name: rName };
    //     const sql = `${queries.role_read} ${queries.role_delete}`;
    //     const r = await db.query(sql, params, {multiStatements:true});
    //     // console.log(r);
    //     if (r.resultSetHeader.affectedRows === 0) {
    //         return ResultErrorNotFound.instance(
    //             new Error(`Role not found.`), `roleRepository.deleteRole`);
    //     }
    //     role = r.getData<IRole[]>()[0];
    //
    //     return new ResultOk(role);
    // }


    /**
     * Get a role_queries
     */
    // async getRole(rName:string): Promise<IResult<IRole>> {
    //     let role: IRole|undefined;
    //
    //     const params:any = { name: rName };
    //     const sr = await db.query(queries.role_read, params);
    //     role = sr.getData<IRole[]>()[0];
    //     // console.log(sr);
    //     if (sr.data.length === 0) {
    //         return new ResultErrorNotFound(`Role not found.`, `roleRepository.getRole`);
    //     }
    //
    //     return new ResultOk(role);
    // }


    /**
     * Update a role_queries
     */
    // async updateRole(rName:string, r:IRole): Promise<IResult<IRole>> {
    //     let role: IRole|undefined;
    //
    //     // verify that the role_queries exists
    //     let sqlRes = await this.getRole(rName);
    //     if (!sqlRes.success || !sqlRes.data || sqlRes.data.name !== rName) {
    //         return new ResultErrorNotFound(`Role not found.`, `roleRepository.updateRole`);
    //     }
    //
    //     // verify the new name
    //     if (rName !== r.name) {
    //         sqlRes = await this.getRole(r.name);
    //         if (sqlRes.success && sqlRes.data && sqlRes.data.name === r.name) {
    //             return new ResultErrorBadRequest(`Role already exist.`, `roleRepository.updateRole`);
    //         }
    //     }
    //
    //     // update now
    //     let result: IResult<any>;
    //     const resultInternalError =
    //         new ResultErrorInternalServer(`There was a problem updating the role.`, `roleRepository.updateRole`);
    //     const conn = await db.Pool.getConnection();
    //     await conn.beginTransaction();
    //
    //     try {
    //         const params:any = { name: rName, newName: r.name, newDescription: r.description };
    //         const sr = await db.query(queries.role_update, params, {multiStatements:true, conn});
    //         role = sr.getData<IRole[]>()[0];
    //         // console.log(role_queries, sr.resultSetHeader);
    //
    //         if (typeof role !== `undefined`) {
    //             await conn.commit();
    //             conn.release();
    //             return new ResultOk(role);
    //
    //         } else {
    //             result = resultInternalError;
    //         }
    //     } catch (e) {
    //         result = resultInternalError
    //         // console.log(`Error catch. Error: ${e}`);
    //     }
    //
    //     await conn.rollback();
    //     conn.release();
    //     return result;
    // }


    /**
     * Get a role_queries with permissions
     */
    // async getRoleWithPermissions(rName:string): Promise<IResult<IRoleWithPermissions>> {
    //     let role = {} as IRoleWithPermissions;
    //
    //     const params:any = { name: rName };
    //     const sr = await db.query(queries.roleWithPermissions_read, params, {multiStatements:true});
    //     // console.log(sr.data);
    //     role.role = sr.getData<IRole[]>(0)[0];
    //     role.permissions = sr.getData<IPermission[]>(1);
    //     // console.log(role_queries);
    //     if (typeof role.role === `undefined`) {
    //         return new ResultErrorNotFound(`Role not found.`, `roleRepository.getRole`);
    //     }
    //
    //     return new ResultOk(role);
    // }
}
