"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoPersistence = exports.Repository = void 0;
const logger_1 = __importDefault(require("../common/logger"));
class Repository {
    constructor() {
        this.logger = logger_1.default.child({
            name: this.constructor.name,
        });
    }
}
exports.Repository = Repository;
class MongoPersistence {
}
exports.MongoPersistence = MongoPersistence;
//# sourceMappingURL=Repository.js.map