
import {IResult} from "../shared/Result";
import {IGetPermissionsParam, IPermission} from "../models/PermissionModel";
import PermissionRepository from "../repositories/permissionRepository";

import {
    Permission, PermissionsRead, PermissionCreteUpdate, PermissionDelete
} from "../graphql/resolvers-types";


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
     * Get a permission list for Graphql
     */
    async getPermissions_graphql(input:PermissionsRead): Promise<Permission[]> {
        const params:IGetPermissionsParam = {
            name: input.name || "",
            description: input.description || "",
            name_s: input.name_s as string,
            description_s: input.description_s || "",
            fetchRows: input.fetchRows || "10",
            offsetRows: input.offsetRows || "0"
        };
        const result = await this.permRepo.getPermissions(params);
        if (result.success && result.data) return result.data;
        if (result.err && result.err.msg) throw new Error(result.err.msg);
        throw new Error("500|Internal server error");
    }

    /**
     * Create a permission_queries
     */
    async createPermission(p:IPermission): Promise<IResult<IPermission>> {
        return await this.permRepo.createPermission(p);
    }


    /**
     * Create a permission for Graphql
     */
    async createPermission_graphql(p:PermissionCreteUpdate): Promise<Permission> {
        const perm:IPermission = {
            name: p.name,
            description: p.description || ""
        };
        const result = await this.permRepo.createPermission(perm);
        if (result.success && result.data) return result.data;
        if (result.err && result.err.msg) throw new Error(result.err.msg);
        throw new Error("500|Internal server error");
    }


    /**
     * Delete a permission_queries
     */
    async deletePermission(pName:string): Promise<IResult<IPermission>> {
        return await this.permRepo.deletePermission(pName);
    }


    /**
     * Delete a permission for Graphql
     */
    async deletePermission_graphql(input:PermissionDelete): Promise<Permission> {
        const pName:string = input.name || "";
        const result = await this.permRepo.deletePermission(pName);
        if (result.success && result.data) return result.data;
        if (result.err && result.err.msg) throw new Error(result.err.msg);
        throw new Error("500|Internal server error");
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
