"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestApp = void 0;
const server_1 = require("../server/server");
class TestApp {
    constructor() { }
    static async startServer() {
        if (this.server != null) {
            const [app, close] = await (0, server_1.initializeApp)();
            this.close = close;
            this.server = await app.listen(8080);
        }
        return this.server;
    }
    static async stopServer() {
        await this.close();
        return new Promise((resolve, reject) => {
            this.server.close((err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                this.server = undefined;
                resolve('Closed Server');
            });
        });
    }
}
exports.TestApp = TestApp;
//# sourceMappingURL=server.js.map