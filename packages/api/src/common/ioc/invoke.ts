import { Container } from 'inversify';
import { iocContainer } from '.';

/**
 * Mutates the container object passed to this method and attaches a map property to it. Used with the invoke function
 * @param container - Container to attach map property to
 */
export const mapContainer = (container: Container) => {
  const map: Record<string, any> = {};

  (<any>container)._bindingDictionary._map.forEach(
    (value: any, key: Function | symbol) => {
      map[typeof key === 'symbol' ? Symbol.keyFor(key)! : key.name] = key;
    }
  );

  (<any>container).map = map;
};

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;
// Absolute hack of a function to parse function argument names
// from https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
function getParamNames(func: Function) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  const result =
    fnStr
      .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
      .match(ARGUMENT_NAMES) ?? [];
  return result;
}
// Hack to "automatically" inject functions with IoC depencies. Provided the paramName matches a depency in the container
export function invoke<T>(fn: Function): T {
  const paramNames: string[] = getParamNames(fn);
  return fn.apply(
    null,
    paramNames.map((paramName: string) =>
      iocContainer.get((<any>iocContainer).map[paramName])
    )
  ) as T;
}
