export type IDisposable =
  | {
      dispose: () => void;
    }
  | (() => void);

export function using<T>(
  disposable: T & IDisposable,
  func: (disposable: T & IDisposable) => void
): void {
  try {
    func(disposable);
  } finally {
    isDisposableFunction(disposable) ? disposable() : disposable.dispose();
  }
}

export async function usingAsync<T>(
  disposable: T & IDisposable,
  func: (disposable: T & IDisposable) => Promise<void>
): Promise<void> {
  try {
    await func(disposable);
  } finally {
    isDisposableFunction(disposable) ? disposable() : disposable.dispose();
  }
}

function isDisposableFunction(
  disposable: IDisposable
): disposable is () => void {
  return disposable instanceof Function;
}
