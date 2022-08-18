"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementedResponse = exports.ServerExceptionResponse = exports.NotFoundResponse = exports.CreatedResponse = exports.NoContentResponse = exports.ErrorResponse = exports.SuccessResponse = void 0;
class SuccessResponse {
    constructor(status = 200, payload) {
        this.status = status;
        this.payload = payload;
    }
}
exports.SuccessResponse = SuccessResponse;
class ErrorResponse {
    constructor(status = 500, payload) {
        this.status = status;
        this.payload = payload;
    }
}
exports.ErrorResponse = ErrorResponse;
class NoContentResponse extends SuccessResponse {
    constructor() {
        super(204, undefined);
    }
}
exports.NoContentResponse = NoContentResponse;
class CreatedResponse extends SuccessResponse {
    constructor(payload) {
        super(201, payload);
    }
}
exports.CreatedResponse = CreatedResponse;
class NotFoundResponse extends ErrorResponse {
    constructor(payload) {
        super(404, payload);
    }
}
exports.NotFoundResponse = NotFoundResponse;
class ServerExceptionResponse extends ErrorResponse {
    constructor(payload) {
        super(500, payload);
    }
}
exports.ServerExceptionResponse = ServerExceptionResponse;
class NotImplementedResponse extends ErrorResponse {
    constructor(payload) {
        super(501, payload);
    }
}
exports.NotImplementedResponse = NotImplementedResponse;
//# sourceMappingURL=response.js.map