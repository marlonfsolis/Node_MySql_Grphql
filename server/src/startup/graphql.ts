import {Express} from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import {
    ApolloServer,
    ApolloServerPlugin, GraphQLRequestContext,
    GraphQLRequestContextDidEncounterErrors,
    GraphQLRequestListener
} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import {GraphQLFormattedError} from "graphql/error";

import typeDefs from "../graphql/schemas";
import resolvers from "../graphql/resolvers";
import {getGraphqlContext, GraphqlContext} from "../graphql/graphql.ctx";
import {logError} from "../repositories/errorRepository";
import {LogLevel} from "../shared/enums";


/**
 * Error handler
 */
const formatError = (formattedError:GraphQLFormattedError, error:unknown): GraphQLFormattedError => {
    // if (formattedError.extensions?.code === ApolloServerErrorCode.INTERNAL_SERVER_ERROR) {
    //     return { message: 'Internal server error' };
    // }
    // console.log(`formatError`);
    return formattedError;
}

const requestDidStart = {
    async requestDidStart(requestContext: GraphQLRequestContext<GraphqlContext>): Promise<GraphQLRequestListener<GraphqlContext> | void> {
        return {
            async didEncounterErrors(requestContext: GraphQLRequestContextDidEncounterErrors<GraphqlContext>): Promise<void> {
                const error = requestContext.errors[0];
                const errorLogId = await logError(LogLevel.ERROR, error.message,
                    ``,
                    error.stack || ``);
                error.message += ` - Error No.: ${errorLogId}`;
                // console.log(`didEncounterErrors`);
            }
        };
    }
} as ApolloServerPlugin;


/**
 * Create the Graphql server
 * @param app Express application
 */
const createGraphql = async (app: Express) => {
    const server = new ApolloServer<GraphqlContext>({
        typeDefs,
        resolvers,
        formatError,
        plugins: [
            requestDidStart,
        ],

    });
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
