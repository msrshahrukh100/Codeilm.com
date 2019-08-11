"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useObservable = function (observable$, initialValue) {
    var _a = react_1.useState(initialValue), value = _a[0], update = _a[1];
    react_1.useEffect(function () {
        var s = observable$.subscribe(update);
        return function () { return s.unsubscribe(); };
    }, [observable$]);
    return value;
};
exports.default = useObservable;
