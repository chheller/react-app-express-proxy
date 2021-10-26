import { Server } from 'http';
import isNil from 'lodash/isNil';
import { close, initializeApp } from '../server/server';

export class TestApp {
  private static server: Server | undefined;

  constructor() {}

  static async startServer() {
    if (isNil(this.server))
      this.server = await (await initializeApp()).listen(8080);
    return this.server;
  }

  static async stopServer() {
    console.log('Stopping Server...');
    const teardownServerStart = process.hrtime();
    await close();
    return new Promise((resolve, reject) => {
      this.server!.close((err) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log('Closed Server');
        this.server = undefined;
        resolve('Closed Server');
        console.log(
          `Server down in ${process.hrtime(teardownServerStart)[1] / 1000000}ms`
        );
      });
    });
  }
}
