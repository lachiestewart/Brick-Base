type HttpResponseType = {
    code: number
    message: (...args: string[]) => string
}

type ResponseName = 'OK' | 'CREATED' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'UNSUPPORTED_MEDIA_TYPE' | 'IM_A_TEAPOT' | 'INTERNAL_SERVER_ERROR' | 'NOT_IMPLEMENTED'

export const HttpResponse: { [key in ResponseName]: HttpResponseType } = {
    OK: {
        code: 200,
        message: () => 'OK'
    },
    CREATED: {
        code: 201,
        message: (resource: string) => `Created ${resource} successfully`
    },
    BAD_REQUEST: {
        code: 400,
        message: (error: string) => `Bad Request: ${error}`
    },
    UNAUTHORIZED: {
        code: 401,
        message: () => 'Unauthorized'
    },
    FORBIDDEN: {
        code: 403,
        message: () => 'Forbidden'
    },
    NOT_FOUND: {
        code: 404,
        message: () => 'Not Found'
    },
    UNSUPPORTED_MEDIA_TYPE: {
        code: 415,
        message: () => 'Unsupported Media Type'
    },
    IM_A_TEAPOT: {
        code: 418,
        message: () => "I'm a teapot"
    },
    INTERNAL_SERVER_ERROR: {
        code: 500,
        message: () => 'Internal Server Error'
    },
    NOT_IMPLEMENTED: {
        code: 501,
        message: () => 'Not Implemented'
    }
}