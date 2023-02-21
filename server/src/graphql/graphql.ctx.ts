
import {ExpressContextFunctionArgument} from "@apollo/server/express4";

export interface GraphqlContext {
    userId?: string,
    token?: string
}

export const getGraphqlContext = async (ctx: ExpressContextFunctionArgument) => {
    if (ctx.req.auth) {
        return {
            userId: ctx.req.auth.sub,
            token: ctx.req.headers.token,
        };
    }
    return {};
}
