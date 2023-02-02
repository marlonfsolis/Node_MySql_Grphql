import path from "path";
import fs from "fs";

export const sql = (query:string) => fs.readFileSync(query, {encoding:"utf8"});

export const queries = {
    permissionList_read: sql(path.resolve(__dirname, "permission_queries/permissionList_read.sql")),
    permission_read: sql(path.resolve(__dirname, "permission_queries/permission_read.sql")),
    permissionExists_read: sql(path.resolve(__dirname, "permission_queries/permissionExists_read.sql")),
    permission_create: sql(path.resolve(__dirname, "permission_queries/permission_create.sql")),
    permission_delete: sql(path.resolve(__dirname, "permission_queries/permission_delete.sql")),
    permission_update: sql(path.resolve(__dirname, "permission_queries/permission_update.sql")),

    roleList_read: sql(path.resolve(__dirname, "role_queries/roleList_read.sql")),
    roleExists_read: sql(path.resolve(__dirname, "role_queries/roleExists_read.sql")),
    role_create: sql(path.resolve(__dirname, "role_queries/role_create.sql")),
    role_read: sql(path.resolve(__dirname, "role_queries/role_read.sql")),
    role_delete: sql(path.resolve(__dirname, "role_queries/role_delete.sql")),
    role_update: sql(path.resolve(__dirname, "role_queries/role_update.sql")),

    roleWithPermissions_read: sql(path.resolve(__dirname, "role_queries/roleWithPermissions_read.sql")),

    error_create: sql(path.resolve(__dirname, "error_queries/error_create.sql"))
}
