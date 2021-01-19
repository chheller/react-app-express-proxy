import { mongod } from './mongod';

export default async function () {
  mongod.stop();
}
