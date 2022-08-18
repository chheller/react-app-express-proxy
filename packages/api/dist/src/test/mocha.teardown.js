"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mochaGlobalTeardown = void 0;
async function mochaGlobalTeardown() {
    try {
        await this.close();
        await this.mongod.stop({ doCleanup: true, force: true });
    }
    catch (err) {
        console.error(err);
    }
}
exports.mochaGlobalTeardown = mochaGlobalTeardown;
//# sourceMappingURL=mocha.teardown.js.map