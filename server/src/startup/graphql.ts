import {Express} from 'express';
import { readFile } from 'fs/promises';
import bodyParser from 'body-parser';
import cors from "cors";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware, ExpressContextFunctionArgument} from "@apollo/server/express4";

import resolvers from "../graphql/resolvers";


const createGraphql = async (app: Express) => {
    const typeDefs = await readFile("./src/graphql/schema.graphql", "utf-8");
    const server = new ApolloServer<GraphqlContext>({typeDefs, resolvers});
    await server.start();

    app.use(
        "/graphql",
        cors<cors.CorsRequest>(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: getGraphqlContext
        }),
    );
}

interface GraphqlContext {
    userId?: string,
    token?: string
}

const getGraphqlContext = async (ctx: ExpressContextFunctionArgument) => {
    if (ctx.req.auth) {
        return {
            userId: ctx.req.auth.sub,
            token: ctx.req.headers.token,
        };
    }
    return {};
}


export default createGraphql;
