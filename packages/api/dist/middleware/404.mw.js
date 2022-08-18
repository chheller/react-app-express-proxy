"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../common/logger"));
const logger = logger_1.default.child({ service: '404Middleware' });
function default_1(req, res) {
    logger.info('Route not found', { url: req.originalUrl });
    return res.status(404).send(`${req.originalUrl} not found`);
}
exports.default = default_1;
//# sourceMappingURL=404.mw.js.map