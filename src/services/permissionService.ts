
import {IResult} from "../shared/Result";
import {IGetPermissionsParam, IPermission} from "../models/PermissionModel";
import PermissionRepository from "../repositories/permissionRepository";

export default class PermissionService
{
    private readonly permRepo:PermissionRepository;

    constructor() {
        this.permRepo = new PermissionRepository();
    }

    /**
     * Get a permission_queries list
     */
    async getPermissions(params:IGetPermissionsParam): Promise<IResult<IPermission[]>> {
        return await this.permRepo.getPermissions(params);
    }


    /**
     * Create a permission_queries
     */
    async createPermission(p:IPermission): Promise<IResult<IPermission>> {
        return await this.permRepo.createPermission(p);
    }


    /**
     * Delete a permission_queries
     */
    async deletePermission(pName:string): Promise<IResult<IPermission>> {
        return await this.permRepo.deletePermission(pName);
    }

    /**
     * Get a permission_queries
     */
    async getPermission(pName:string): Promise<IResult<IPermission>> {
        return await this.permRepo.getPermission(pName);
    }

    /**
     * Update a permission_queries
     */
    async updatePermission(pName:string, p:IPermission): Promise<IResult<IPermission>> {
        return await this.permRepo.updatePermission(pName, p);
    }
}
