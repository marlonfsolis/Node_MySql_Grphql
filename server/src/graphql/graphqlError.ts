import {GraphQLError, } from "graphql/error";
import {ApolloServerErrorCode} from "@apollo/server/errors";

export const BadRequest = (message:string = ApolloServerErrorCode.BAD_REQUEST) => {
    return new GraphQLError(message, {extensions:{code:ApolloServerErrorCode.BAD_REQUEST}})
}

export const InternalServerError = (message:string = ApolloServerErrorCode.INTERNAL_SERVER_ERROR) => {
    return new GraphQLError(message, {extensions:{code:ApolloServerErrorCode.INTERNAL_SERVER_ERROR}});
}

export const BadUserInput = (message:string = ApolloServerErrorCode.BAD_USER_INPUT) => {
    return new GraphQLError(message, {extensions:{code:ApolloServerErrorCode.BAD_USER_INPUT}});
}
