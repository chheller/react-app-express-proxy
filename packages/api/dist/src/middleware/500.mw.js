"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../common/logger"));
const logger = logger_1.default.child({ service: '500ErrorMiddleware' });
function default_1(err, _req, res, _next) {
    if (err instanceof Error) {
        logger.error(err);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=500.mw.js.map