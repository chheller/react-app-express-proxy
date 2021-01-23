import { Server } from 'http';
import isNil from 'lodash/isNil';
import { initializeApp, stopApp } from '../src/server/server';

export class TestApp {
  private static server: Server | undefined;

  constructor() {}

  static async startServer() {
    if (isNil(this.server))
      this.server = await (await initializeApp()).listen(8080);
    return this.server;
  }

  static async stopServer() {
    await stopApp();
    return new Promise((resolve, reject) => {
      this.server!.close((err) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log('Closed Server');
        this.server = undefined;
        resolve('Closed Server');
      });
    });
  }
}
