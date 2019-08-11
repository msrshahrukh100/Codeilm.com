"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useDebounce = function (fn, ms, args) {
    if (ms === void 0) { ms = 0; }
    if (args === void 0) { args = []; }
    react_1.useEffect(function () {
        var handle = setTimeout(fn.bind(null, args), ms);
        return function () {
            // if args change then clear timeout
            clearTimeout(handle);
        };
    }, args);
};
exports.default = useDebounce;
