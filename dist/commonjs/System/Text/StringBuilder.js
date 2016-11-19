"use strict";
var Types_1 = require("../Types");
var VOID0 = void 0;
var StringBuilder = (function () {
    function StringBuilder() {
        var initial = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            initial[_i] = arguments[_i];
        }
        var _ = this;
        _._latest = null;
        _._partArray = [];
        _.appendThese(initial);
    }
    StringBuilder.prototype.appendSingle = function (item) {
        if (item !== null && item !== VOID0) {
            var _ = this;
            _._latest = null;
            switch (typeof item) {
                case Types_1.Type.OBJECT:
                case Types_1.Type.FUNCTION:
                    item = item.toString();
                    break;
            }
            _._partArray.push(item);
        }
    };
    StringBuilder.prototype.appendThese = function (items) {
        var _ = this;
        items.forEach(function (s) { return _.appendSingle(s); });
        return _;
    };
    StringBuilder.prototype.append = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        this.appendThese(items);
        return this;
    };
    StringBuilder.prototype.appendLine = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        this.appendLines(items);
        return this;
    };
    StringBuilder.prototype.appendLines = function (items) {
        var _ = this;
        items.forEach(function (i) {
            if (i !== null && i !== VOID0) {
                _.appendSingle(i);
                _._partArray.push("\r\n");
            }
        });
        return _;
    };
    Object.defineProperty(StringBuilder.prototype, "isEmpty", {
        get: function () {
            return this._partArray.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    StringBuilder.prototype.toString = function () {
        var latest = this._latest;
        if (!latest === null)
            this._latest = latest = this._partArray.join();
        return latest;
    };
    StringBuilder.prototype.join = function (delimiter) {
        return this._partArray.join(delimiter);
    };
    StringBuilder.prototype.clear = function () {
        this._partArray.length = 0;
        this._latest = null;
    };
    StringBuilder.prototype.dispose = function () {
        this.clear();
    };
    return StringBuilder;
}());
exports.StringBuilder = StringBuilder;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StringBuilder;
//# sourceMappingURL=StringBuilder.js.map