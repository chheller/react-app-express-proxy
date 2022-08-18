"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserInstrumentation {
    constructor(logger) {
        this.logger = logger;
    }
    trackUserQueried(userQuery) {
        this.logger.info('User queried', { query: userQuery });
    }
}
exports.default = UserInstrumentation;
//# sourceMappingURL=user.instrumentation.js.map