import {Resolvers, Permission} from "./resolvers-types";
import {IGetPermissionsParam} from "../models/PermissionModel";

import PermissionService from "../services/permissionService";

const permService = new PermissionService();

const resolvers: Resolvers = {
    Query: {
        permissions: async (_, {input}) => {
            return await permService.getPermissions_graphql(input);
        },
    },

    Mutation: {
        permissionCreate: async (_, {input}, ctx) => {
            return await permService.createPermission_graphql(input);
        },
        permissionDelete: async (_, {input}, ctx) => {
            return await permService.deletePermission_graphql(input);
        }
    }
};

export default resolvers;
