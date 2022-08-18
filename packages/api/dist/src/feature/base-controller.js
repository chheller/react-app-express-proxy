"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const logger_1 = __importDefault(require("../common/logger"));
class BaseController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.logger = logger_1.default.child({
            name: this.constructor.name,
        });
    }
}
exports.default = BaseController;
//# sourceMappingURL=base-controller.js.map