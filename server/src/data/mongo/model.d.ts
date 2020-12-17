export type Constructor<T = {}> = new (...args: any[]) => T;

// This is stupid hack because Mongo types won't allow you to specify a type if it doesn't have an id
export interface OptId {
    _id?: any;
}
