"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const ioc_1 = require("../common/ioc");
const logger_1 = __importDefault(require("../common/logger"));
const sanitize_1 = require("../db/mongo/sanitize");
class BaseService {
    constructor() {
        this.logger = logger_1.default.child({ service: 'Base Service' });
    }
    findById(id) {
        this.logger.info('Finding entity by id', id);
        return this.repository.findOne(id);
    }
    find(unsanitizedQuery, options) {
        const sanitizedQuery = (0, sanitize_1.sanitizeSearchQuery)(unsanitizedQuery);
        this.logger.info(sanitizedQuery);
        return this.repository.find(sanitizedQuery, options);
    }
    create(entity) {
        return this.repository.create(entity);
    }
    delete(entityId) {
        return this.repository.delete({ id: entityId });
    }
}
exports.BaseService = BaseService;
(0, ioc_1.decorate)((0, ioc_1.injectable)(), BaseService);
//# sourceMappingURL=service.js.map