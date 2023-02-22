import {Resolvers} from "../resolvers-types";

import RoleRepository from "../../repositories/roleRepository";

const roleRepo = new RoleRepository();

const resolvers: Resolvers = {
    Query: {
        roles: async (_, {input}) => {
            return await (async () => [{name:"Role1",description:"Role 1"}])();
        },
    },

    Mutation: {
        roleCreate: async (_, {input}, ctx) => {
            return await (async () => input)();
        },
        roleDelete: async (_, {input}, ctx) => {
            return await (async () => input)();
        }
    }
};

export default resolvers;
