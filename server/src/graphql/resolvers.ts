import {Resolvers} from "./resolvers-types";

import PermissionRepository from "../repositories/permissionRepository";

const permRepo = new PermissionRepository();

const resolvers: Resolvers = {
    Query: {
        permissions: async (_, {input}) => {
            return await permRepo.getPermissions(input);
        },
    },

    Mutation: {
        permissionCreate: async (_, {input}, ctx) => {
            return await permRepo.createPermission(input);
        },
        permissionDelete: async (_, {input}, ctx) => {
            return await permRepo.deletePermission(input);
        }
    }
};

export default resolvers;
