import {Express} from 'express';
import path from "path";
import { readFile } from 'fs/promises';
import bodyParser from 'body-parser';
import cors from "cors";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware, ExpressContextFunctionArgument} from "@apollo/server/express4";

import typeDefs from "../graphql/schemas";
import resolvers from "../graphql/resolvers";
import {GraphqlContext, getGraphqlContext} from "../graphql/graphql.ctx";


const createGraphql = async (app: Express) => {
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

export default createGraphql;
