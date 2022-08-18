"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const logger_1 = __importDefault(require("../common/logger"));
const logger = logger_1.default.child({ service: 'ValidateErrorMiddleware' });
function default_1(err, req, res, next) {
    if (err instanceof tsoa_1.ValidateError) {
        logger.warn(err.message, {
            fields: err.fields,
        });
        return res.status(err.status).json({
            message: 'Validation Failed',
            details: err?.fields,
        });
    }
    next(err);
}
exports.default = default_1;
//# sourceMappingURL=400.mw.js.map