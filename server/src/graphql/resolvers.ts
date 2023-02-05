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

    // Mutation: {
    //     permissionCreate: (_, input, ctx) => {
    //         //return null;
    //     }
    // }
};

export default resolvers;
