import {Resolvers} from "../resolvers-types";
import {InternalServerError, BadUserInput} from "../graphqlError";

import PermissionRepository from "../../repositories/permissionRepository";

const permRepo = new PermissionRepository();

const resolvers: Resolvers = {
    Query: {
        /** Get a permission by name */
        permission: async (_, {input}) => {
            const p = await permRepo.getPermission(input);
            if (!p) {
                throw BadUserInput(`The permission was not found`);
            }
            return p;
        },

        permissions: async (_, {input}) => {
            return await permRepo.getPermissions(input);
        },
    },

    Mutation: {
        /**
         * Create permission
         */
        permissionCreate: async (_, {input}, ctx) => {
            const pExists = await permRepo.getPermission(input.name);
            if (pExists) {
                throw BadUserInput(`A permission with this name already exists.`);
            }

            const permission = await permRepo.createPermission(input);
            if (!permission) {
                throw InternalServerError(`There was a problem while creating the permission`);
            }

            return permission;
        },

        /**
         * Delete permission
         */
        permissionDelete: async (_, {input}, ctx) => {
            const p = await permRepo.deletePermission(input);
            if (!p) {
                throw BadUserInput(`The permission was not found.`);
            }
            return p;
        },

        /**
         * Update permission
         */
        permissionUpdate: async (_, {input}, ctx) => {
            let p = await permRepo.getPermission(input.p_name);
            if (!p) throw BadUserInput(`The permission was not found.`);

            if (input.name && input.p_name !== input.name) {
                p = await permRepo.getPermission(input.name);
                if (p) throw BadUserInput(`A permission with this name already exists.`);
            }

            if (!input.name) input.name = input.p_name;
            p = await permRepo.updatePermission(input);
            if (!p) throw InternalServerError(`There was a problem saving your changes.`);

            return p;
        }
    }
};

export default resolvers;
