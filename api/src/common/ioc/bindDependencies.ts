import { iocContainer } from '.';

// Method to bind IoC dependencies to functions. Dependencies should be a reference to the depency injected
export function bindDependencies<T>(func: Function, ...dependencies: any[]): T {
  let injections = dependencies.map((dependency) => {
    return iocContainer.get(dependency);
  });

  return func.bind(func, ...injections);
}
