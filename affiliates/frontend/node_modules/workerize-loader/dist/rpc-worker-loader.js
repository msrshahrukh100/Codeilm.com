function workerSetup() {
    addEventListener('message', function (e) {
        var ref = e.data;
        var type = ref.type;
        var method = ref.method;
        var id = ref.id;
        var params = ref.params;
        var f, p;
        if (type === 'RPC' && method) {
            if (f = __webpack_exports__[method]) {
                p = Promise.resolve().then(function () { return f.apply(__webpack_exports__, params); });
            } else {
                p = Promise.reject('No such method');
            }
            p.then(function (result) {
                postMessage({
                    type: 'RPC',
                    id: id,
                    result: result
                });
            }).catch(function (e) {
                var error = {
                    message: e
                };
                if (e.stack) {
                    error.message = e.message;
                    error.stack = e.stack;
                    error.name = e.name;
                }
                postMessage({
                    type: 'RPC',
                    id: id,
                    error: error
                });
            });
        }
    });
    postMessage({
        type: 'RPC',
        method: 'ready'
    });
}

var workerScript = '\n' + Function.prototype.toString.call(workerSetup).replace(/(^.*\{|\}.*$|\n\s*)/g, '');
function rpcWorkerLoader(content) {
    return content + workerScript;
}

module.exports = rpcWorkerLoader;
//# sourceMappingURL=rpc-worker-loader.js.map
