import {Response} from 'express';
import {ReasonPhrases, StatusCodes} from "http-status-codes";

import {IErr} from "./Err";
import {IResult} from "./Result";

/**
 * Represent an HTTP custom response.
 * Client gets a response JSON like { success: true, msg: 'success', errors: [], data: null }
 * @export
 * @class HttpResponse
 */
export class HttpResponse {
    /**
     * Create an instance of HttpResponse.
     * @param res {Response} - Response object of the route handler.
     * @param code {number} - Status code of the response (2XX, 3XX, 4XX, 5XX).
     * @param success {boolean} - Determine if the request was successful.
     * @param msg {string} - Custom message to be sent to the client.
     * @param errors {array} - Errors that occurs.
     * @param data {*}- Data to be sent to the client.
     */
    constructor(res: Response,
                public code: number = StatusCodes.OK,
                public success: boolean = true,
                public msg: string = ReasonPhrases.OK,
                public errors: IErr[] = [],
                public data: any = null) {
        res.statusCode = code;
        res.send({
            success,
            msg,
            errors,
            data
        });
    }
}

/**
 * Generates an HTTP error response with the status based on the response type.
 * Client get a JSON like { success: false, msg: 'Error', errors: [{msg...}], data: null }
 * @export
 * @class HttpResponseError
 * @extends {HttpResponse}
 */
export class HttpResponseError extends HttpResponse {
    /**
     * Create an instance of HttpResponseError - 400.
     * @param res {Response} - Response object of the route handler.
     * @param result {any}- Result object containing the error info.
     */
    constructor(res: Response, result: IResult<any>) {
        let code:number;
        let msg:string;
        const errors = [] as IErr[];

        // Find out code and message
        switch (result.getErrorCode()) {
            case `400`: code = StatusCodes.BAD_REQUEST; msg = ReasonPhrases.BAD_REQUEST; break;
            case `401`: code = StatusCodes.UNAUTHORIZED; msg = ReasonPhrases.UNAUTHORIZED; break;
            case `403`: code = StatusCodes.FORBIDDEN; msg = ReasonPhrases.FORBIDDEN; break;
            case `404`: code = StatusCodes.NOT_FOUND; msg = ReasonPhrases.NOT_FOUND; break;
            default: code = StatusCodes.INTERNAL_SERVER_ERROR; msg = ReasonPhrases.INTERNAL_SERVER_ERROR; break;
        }

        // Add error
        if (result.err) errors.push(result.err);

        // Add some detail if data was the issue.
        if (result.success && !result.data && msg === ReasonPhrases.INTERNAL_SERVER_ERROR)
            msg = msg.concat(`. Data was invalid.`);

        super(res, code, false, msg, errors, null);
    }
}

/**
 * Represent an HTTP response with the status 200 - OK.
 * Client get a JSON like { success: true, msg: 'Success', errors: [], data: null }
 * @export
 * @class HttpResponseOk
 * @extends {HttpResponse}
 */
export class HttpResponseOk extends HttpResponse {
    /**
     * Create an instance of HttpResponseOk - 200.
     * @param res {Response} - Response object of the route handler.
     * @param data {*}- Data to be sent to the client.
     * @param msg {string} - Custom message to be sent to the client.
     */
    constructor(res: Response, data: any = null, msg: string = ReasonPhrases.OK) {
        super(res, StatusCodes.OK, true, msg, [], data);
    }
}

/**
 * Represent an HTTP response with the status 201 - CREATED.
 * Client get a JSON like { success: true, msg: 'Created', errors: [], data: null }
 * @export
 * @class HttpResponseCreated
 * @extends {HttpResponse}
 */
export class HttpResponseCreated extends HttpResponse {
    /**
     * Create an instance of HttpResponseCreated - 201.
     * @param res {Response} - Response object of the route handler.
     * @param data {*}- Data to be sent to the client.
     * @param msg {string} - Custom message to be sent to the client.
     */
    constructor(res: Response, data: any = null, msg: string = ReasonPhrases.CREATED) {
        super(res, StatusCodes.CREATED, true, msg, [], data);
    }
}

/**
 * Represent an HTTP response with the status 400 - BAD REQUEST.
 * <p>Client get a JSON like { success: false, msg: 'Bad request', errors: [], data: null }</p>
 * @export
 * @class HttpResponseBadRequest
 * @extends {HttpResponse}
 */
export class HttpResponseBadRequest extends HttpResponse {
    /**
     * Create an instance of HttpResponseBadRequest - 400.
     * @param res {Response} - Response object of the route handler.
     * @param errors {array}- Errors to be sent to the client.
     * @param msg {string} - Custom message to be sent to the client.
     */
    constructor(res: Response, errors: IErr[] = [], msg: string = ReasonPhrases.BAD_REQUEST) {
        super(res,StatusCodes.BAD_REQUEST, false, msg, errors, null);
    }
}

/**
 * Represent an HTTP response with the status 401 - UNAUTHORIZED.
 * <p>Client get a JSON like { success: false, msg: 'Unauthorized', errors: [], data: null }</p>
 * @export
 * @class HttpResponseUnauthorized
 * @extends {HttpResponse}
 */
export class HttpResponseUnauthorized  extends HttpResponse {
    /**
     * Create an instance of HttpResponseUnauthorized - 401.
     * @param res {Response} - Response object of the route handler.
     * @param errors {array}- Errors to be sent to the client.
     * @param msg {string} - Custom message to be sent to the client.
     */
    constructor(res: Response, errors: IErr[] = [], msg: string = ReasonPhrases.UNAUTHORIZED) {
        super(res,StatusCodes.UNAUTHORIZED, false, msg,  errors, null);
    }
}

/**
 * Represent an HTTP response with the status 403 - FORBIDDEN.
 * <p>Client get a JSON like { success: false, msg: 'Forbidden', errors: [], data: null }</p>
 * @export
 * @class HttpResponseForbidden
 * @extends {HttpResponse}
 */
export class HttpResponseForbidden  extends HttpResponse {
    /**
     * Create an instance of HttpResponseForbidden - 403.
     * @param res {Response} - Response object of the route handler.
     * @param errors {array}- Errors to be sent to the client.
     * @param msg {string} - Custom message to be sent to the client.
     */
    constructor(res: Response, errors: IErr[] = [], msg: string = ReasonPhrases.FORBIDDEN) {
        super(res,StatusCodes.FORBIDDEN, false, msg,  errors, null);
    }
}

/**
 * Represent an HTTP response with the status 404 - NOT FOUND.
 * <p>Client get a JSON like { success: false, msg: 'Unauthorized', errors: [], data: null }</p>
 * @export
 * @class HttpResponseNotFound
 * @extends {HttpResponse}
 */
export class HttpResponseNotFound  extends HttpResponse {
    /**
     * Create an instance of HttpResponseNotFound - 404.
     * @param res {Response} - Response object of the route handler.
     * @param errors {array}- Errors to be sent to the client.
     * @param msg {string} - Custom message to be sent to the client.
     */
    constructor(res: Response, errors: IErr[] = [], msg: string = ReasonPhrases.NOT_FOUND) {
        super(res,StatusCodes.NOT_FOUND, false, msg,  errors, null);
    }
}

/**
 * Represent an HTTP response with the status 500 - INTERNAL SERVER ERROR.
 * <p>Client get a JSON like { success: false, msg: 'Internal server error', errors: [], data: null }</p>
 * @export
 * @class HttpResponseInternalServerError
 * @extends {HttpResponse}
 */
export class HttpResponseInternalServerError  extends HttpResponse {
    /**
     * Create an instance of HttpResponseInternalServerError - 500.
     * @param res {Response} - Response object of the route handler.
     * @param errors {array}- Errors to be sent to the client.
     * @param msg {string} - Custom message to be sent to the client.
     */
    constructor(res: Response, errors: IErr[] = [], msg: string = ReasonPhrases.INTERNAL_SERVER_ERROR) {
        super(res,StatusCodes.INTERNAL_SERVER_ERROR, false, msg,  errors, null);
    }
}
