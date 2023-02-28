import {Express} from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import {ApolloServer} from "@apollo/server";
import {ApolloServerErrorCode} from "@apollo/server/errors";
import {expressMiddleware, ExpressContextFunctionArgument} from "@apollo/server/express4";
import {GraphQLFormattedError} from "graphql/error";

import typeDefs from "../graphql/schemas";
import resolvers from "../graphql/resolvers";
import {GraphqlContext, getGraphqlContext} from "../graphql/graphql.ctx";


/**
 * Error handler
 */
const formatError = (formattedError:GraphQLFormattedError, error:unknown): GraphQLFormattedError => {
    // if (formattedError.extensions?.code === ApolloServerErrorCode.INTERNAL_SERVER_ERROR) {
    //     return { message: 'Internal server error' };
    // }
    return formattedError;
}

/**
 * Create the Graphql server
 * @param app Express application
 */
const createGraphql = async (app: Express) => {
    const server = new ApolloServer<GraphqlContext>({typeDefs, resolvers,formatError});
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
