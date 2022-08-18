"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./common/logger"));
const server_1 = require("./server/server");
const logger = logger_1.default.child({ service: 'App' });
(async () => {
    try {
        const [app] = await (0, server_1.initializeApp)();
        await app.listen(8080);
    }
    catch (error) {
        logger.error('Error initializing application', { error });
        process.exit(1);
    }
})();
//# sourceMappingURL=index.js.map