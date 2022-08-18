"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usingAsync = exports.using = void 0;
function using(disposable, func) {
    try {
        func(disposable);
    }
    finally {
        isDisposableFunction(disposable) ? disposable() : disposable.dispose();
    }
}
exports.using = using;
async function usingAsync(disposable, func) {
    try {
        await func(disposable);
    }
    finally {
        isDisposableFunction(disposable) ? disposable() : disposable.dispose();
    }
}
exports.usingAsync = usingAsync;
function isDisposableFunction(disposable) {
    return disposable instanceof Function;
}
//# sourceMappingURL=using.js.map