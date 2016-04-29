/*!
 * @author electricessence / https://github.com/electricessence/
 * Original: http://linqjs.codeplex.com/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Values = require("../System/Compare");
var Arrays = require("../System/Collections/Array/Compare");
var ArrayUtility = require("../System/Collections/Array/Utility");
var Enumerator_1 = require("../System/Collections/Enumeration/Enumerator");
var Types_1 = require("../System/Types");
var Integer_1 = require("../System/Integer");
var Functions_1 = require("../System/Functions");
var ArrayEnumerator_1 = require("../System/Collections/Enumeration/ArrayEnumerator");
var EnumeratorBase_1 = require("../System/Collections/Enumeration/EnumeratorBase");
var Dictionary_1 = require("../System/Collections/Dictionaries/Dictionary");
var Queue_1 = require("../System/Collections/Queue");
var dispose_1 = require("../System/Disposable/dispose");
var DisposableBase_1 = require("../System/Disposable/DisposableBase");
var UnsupportedEnumerableException_1 = require("../System/Collections/Enumeration/UnsupportedEnumerableException");
var ObjectDisposedException_1 = require("../System/Disposable/ObjectDisposedException");
var KeySortedContext_1 = require("../System/Collections/Sorting/KeySortedContext");
var ArgumentNullException_1 = require("../System/Exceptions/ArgumentNullException");
var ArgumentOutOfRangeException_1 = require("../System/Exceptions/ArgumentOutOfRangeException");
var INVALID_DEFAULT = {};
var VOID0 = void 0;

var LinqFunctions = function (_Functions_1$default) {
    _inherits(LinqFunctions, _Functions_1$default);

    function LinqFunctions() {
        _classCallCheck(this, LinqFunctions);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(LinqFunctions).apply(this, arguments));
    }

    _createClass(LinqFunctions, [{
        key: "Greater",
        value: function Greater(a, b) {
            return a > b ? a : b;
        }
    }, {
        key: "Lesser",
        value: function Lesser(a, b) {
            return a < b ? a : b;
        }
    }]);

    return LinqFunctions;
}(Functions_1.default);

var Functions = new LinqFunctions();
Object.freeze(Functions);
function getEmptyEnumerator() {
    return Enumerator_1.empty;
}

var InfiniteEnumerable = function (_DisposableBase_1$def) {
    _inherits(InfiniteEnumerable, _DisposableBase_1$def);

    function InfiniteEnumerable(_enumeratorFactory, finalizer) {
        _classCallCheck(this, InfiniteEnumerable);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(InfiniteEnumerable).call(this, finalizer));

        _this2._enumeratorFactory = _enumeratorFactory;
        _this2._isEndless = true;
        return _this2;
    }

    _createClass(InfiniteEnumerable, [{
        key: "getEnumerator",
        value: function getEnumerator() {
            this.throwIfDisposed();
            return this._enumeratorFactory();
        }
    }, {
        key: "_onDispose",
        value: function _onDispose() {
            _get(Object.getPrototypeOf(InfiniteEnumerable.prototype), "_onDispose", this).call(this);
            this._enumeratorFactory = null;
        }
    }, {
        key: "asEnumerable",
        value: function asEnumerable() {
            var _ = this;
            _.throwIfDisposed();
            return new InfiniteEnumerable(function () {
                return _.getEnumerator();
            });
        }
    }, {
        key: "_doAction",
        value: function _doAction(action, initializer) {
            var isEndless = arguments.length <= 2 || arguments[2] === undefined ? this.isEndless : arguments[2];

            var _ = this,
                disposed = !_.throwIfDisposed();
            return new Enumerable(function () {
                var enumerator;
                var index = 0;
                return new EnumeratorBase_1.default(function () {
                    throwIfDisposed(disposed);
                    if (initializer) initializer();
                    index = 0;
                    enumerator = _.getEnumerator();
                }, function (yielder) {
                    throwIfDisposed(disposed);
                    while (enumerator.moveNext()) {
                        var actionResult = action(enumerator.current, index++);
                        if (actionResult === false || actionResult === 0) return yielder.yieldBreak();
                        if (actionResult !== 2) return yielder.yieldReturn(enumerator.current);
                    }
                    return false;
                }, function () {
                    dispose_1.dispose(enumerator);
                }, isEndless);
            }, function () {
                disposed = true;
            }, isEndless);
        }
    }, {
        key: "doAction",
        value: function doAction(action, initializer) {
            var isEndless = arguments.length <= 2 || arguments[2] === undefined ? this.isEndless : arguments[2];

            return this._doAction(action, initializer, isEndless);
        }
    }, {
        key: "force",
        value: function force() {
            var defaultAction = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

            this.throwIfDisposed();
            this.doAction(function (element) {
                return defaultAction;
            });
        }
    }, {
        key: "_skip",
        value: function _skip(count) {
            var _ = this;
            _.throwIfDisposed();
            if (!isFinite(count)) return Enumerable.empty();
            Integer_1.default.assert(count, "count");
            return this._doAction(function (element, index) {
                return index < count ? 2 : 1;
            });
        }
    }, {
        key: "skip",
        value: function skip(count) {
            return count > 0 ? this._skip(count) : this;
        }
    }, {
        key: "skipWhile",
        value: function skipWhile(predicate) {
            this.throwIfDisposed();
            return this._doAction(function (element, index) {
                return predicate(element, index) ? 2 : 1;
            });
        }
    }, {
        key: "take",
        value: function take(count) {
            if (!(count > 0)) return Enumerable.empty();
            var _ = this;
            _.throwIfDisposed();
            if (!isFinite(count)) throw new ArgumentOutOfRangeException_1.default('count', count, 'Must be finite.');
            Integer_1.default.assert(count, "count");
            return _._doAction(function (element, index) {
                return index < count;
            }, null, false);
        }
    }, {
        key: "takeWhile",
        value: function takeWhile(predicate) {
            this.throwIfDisposed();
            if (!predicate) throw new ArgumentNullException_1.default('predicate');
            return this._doAction(function (element, index) {
                return predicate(element, index) ? 1 : 0;
            }, null, null);
        }
    }, {
        key: "takeUntil",
        value: function takeUntil(predicate, includeUntilValue) {
            this.throwIfDisposed();
            if (!predicate) throw new ArgumentNullException_1.default('predicate');
            if (!includeUntilValue) return this._doAction(function (element, index) {
                return predicate(element, index) ? 0 : 1;
            }, null, null);
            var found = false;
            return this._doAction(function (element, index) {
                if (found) return 0;
                found = predicate(element, index);
                return 1;
            }, function () {
                found = false;
            }, null);
        }
    }, {
        key: "elementAt",
        value: function elementAt(index) {
            var v = this.elementAtOrDefault(index, INVALID_DEFAULT);
            if (v === INVALID_DEFAULT) throw new Error("index is greater than or equal to the number of elements in source.");
            return v;
        }
    }, {
        key: "elementAtOrDefault",
        value: function elementAtOrDefault(index) {
            var defaultValue = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            var _ = this;
            _.throwIfDisposed();
            if (isNaN(index) || index < 0 || !isFinite(index)) throw new Error("'index' is invalid or out of bounds.");
            Integer_1.default.assert(index, "index");
            var n = index;
            return dispose_1.using(this.getEnumerator(), function (e) {
                var i = 0;
                while (e.moveNext()) {
                    if (i == n) return e.current;
                    i++;
                }
                return defaultValue;
            });
        }
    }, {
        key: "first",
        value: function first() {
            var v = this.firstOrDefault(INVALID_DEFAULT);
            if (v === INVALID_DEFAULT) throw new Error("first:The sequence is empty.");
            return v;
        }
    }, {
        key: "firstOrDefault",
        value: function firstOrDefault() {
            var defaultValue = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            var _ = this;
            _.throwIfDisposed();
            return dispose_1.using(this.getEnumerator(), function (e) {
                return e.moveNext() ? e.current : defaultValue;
            });
        }
    }, {
        key: "single",
        value: function single() {
            var _ = this;
            _.throwIfDisposed();
            return dispose_1.using(this.getEnumerator(), function (e) {
                if (e.moveNext()) {
                    var value = e.current;
                    if (!e.moveNext()) return value;
                    throw new Error("single:sequence contains more than one element.");
                }
                throw new Error("single:The sequence is empty.");
            });
        }
    }, {
        key: "singleOrDefault",
        value: function singleOrDefault() {
            var defaultValue = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            var _ = this;
            _.throwIfDisposed();
            return dispose_1.using(this.getEnumerator(), function (e) {
                if (e.moveNext()) {
                    var value = e.current;
                    if (!e.moveNext()) return value;
                }
                return defaultValue;
            });
        }
    }, {
        key: "any",
        value: function any() {
            var _ = this;
            _.throwIfDisposed();
            return dispose_1.using(this.getEnumerator(), function (e) {
                return e.moveNext();
            });
        }
    }, {
        key: "traverseBreadthFirst",
        value: function traverseBreadthFirst(func, resultSelector) {
            var _ = this,
                isEndless = _._isEndless || null;
            return new Enumerable(function () {
                var enumerator;
                var nestLevel = 0;
                var buffer, len;
                return new EnumeratorBase_1.default(function () {
                    nestLevel = 0;
                    buffer = [];
                    len = 0;
                    enumerator = _.getEnumerator();
                }, function (yielder) {
                    while (true) {
                        if (enumerator.moveNext()) {
                            buffer[len++] = enumerator.current;
                            return yielder.yieldReturn(resultSelector(enumerator.current, nestLevel));
                        }
                        if (!len) return yielder.yieldBreak();
                        var next = Enumerable.fromArray(buffer).selectMany(func);
                        if (!next.any()) {
                            return yielder.yieldBreak();
                        } else {
                            nestLevel++;
                            buffer = [];
                            len = 0;
                            enumerator.dispose();
                            enumerator = next.getEnumerator();
                        }
                    }
                }, function () {
                    dispose_1.dispose(enumerator);
                    buffer.length = 0;
                }, isEndless);
            }, null, isEndless);
        }
    }, {
        key: "traverseDepthFirst",
        value: function traverseDepthFirst(func, resultSelector) {
            var _ = this,
                isEndless = _._isEndless || null;
            return new Enumerable(function () {
                var enumeratorStack = [];
                var enumerator;
                var len;
                return new EnumeratorBase_1.default(function () {
                    enumerator = _.getEnumerator();
                    len = 0;
                }, function (yielder) {
                    while (true) {
                        if (enumerator.moveNext()) {
                            var value = resultSelector(enumerator.current, len);
                            enumeratorStack[len++] = enumerator;
                            enumerator = func(enumerator.current).getEnumerator();
                            return yielder.yieldReturn(value);
                        }
                        if (len == 0) return false;
                        enumerator.dispose();
                        enumerator = enumeratorStack[--len];
                        enumeratorStack.length = len;
                    }
                }, function () {
                    try {
                        dispose_1.dispose(enumerator);
                    } finally {
                        dispose_1.dispose.these(enumeratorStack);
                    }
                }, isEndless);
            }, null, isEndless);
        }
    }, {
        key: "flatten",
        value: function flatten() {
            var _ = this,
                isEndless = _._isEndless || null;
            return new Enumerable(function () {
                var enumerator;
                var middleEnumerator = null;
                return new EnumeratorBase_1.default(function () {
                    enumerator = _.getEnumerator();
                }, function (yielder) {
                    while (true) {
                        if (middleEnumerator != null) {
                            if (middleEnumerator.moveNext()) {
                                return yielder.yieldReturn(middleEnumerator.current);
                            } else {
                                middleEnumerator = null;
                            }
                        }
                        if (enumerator.moveNext()) {
                            var c = enumerator.current;
                            if (Array.isArray(c)) {
                                middleEnumerator.dispose();
                                middleEnumerator = Enumerable.fromArray(c).selectMany(Functions.Identity).flatten().getEnumerator();
                                continue;
                            } else {
                                return yielder.yieldReturn(enumerator.current);
                            }
                        }
                        return false;
                    }
                }, function () {
                    dispose_1.dispose(enumerator, middleEnumerator);
                }, isEndless);
            }, null, isEndless);
        }
    }, {
        key: "pairwise",
        value: function pairwise(selector) {
            var _ = this;
            return new Enumerable(function () {
                var enumerator;
                return new EnumeratorBase_1.default(function () {
                    enumerator = _.getEnumerator();
                    enumerator.moveNext();
                }, function (yielder) {
                    var prev = enumerator.current;
                    return enumerator.moveNext() && yielder.yieldReturn(selector(prev, enumerator.current));
                }, function () {
                    dispose_1.dispose(enumerator);
                }, _._isEndless);
            }, null, _._isEndless);
        }
    }, {
        key: "scan",
        value: function scan(func, seed) {
            var isUseSeed = seed !== VOID0;
            var _ = this;
            return new Enumerable(function () {
                var enumerator;
                var value;
                var isFirst;
                return new EnumeratorBase_1.default(function () {
                    enumerator = _.getEnumerator();
                    isFirst = true;
                }, function (yielder) {
                    if (isFirst) {
                        isFirst = false;
                        return isUseSeed ? yielder.yieldReturn(value = seed) : enumerator.moveNext() && yielder.yieldReturn(value = enumerator.current);
                    }
                    return enumerator.moveNext() ? yielder.yieldReturn(value = func(value, enumerator.current)) : false;
                }, function () {
                    dispose_1.dispose(enumerator);
                }, _._isEndless);
            }, null, _._isEndless);
        }
    }, {
        key: "_select",
        value: function _select(selector) {
            var _ = this,
                disposed = !_.throwIfDisposed();
            if (selector.length < 2) return new WhereSelectEnumerable(_, null, selector);
            return new Enumerable(function () {
                var enumerator;
                var index = 0;
                return new EnumeratorBase_1.default(function () {
                    throwIfDisposed(disposed);
                    index = 0;
                    enumerator = _.getEnumerator();
                }, function (yielder) {
                    throwIfDisposed(disposed);
                    return enumerator.moveNext() ? yielder.yieldReturn(selector(enumerator.current, index++)) : false;
                }, function () {
                    dispose_1.dispose(enumerator);
                }, _._isEndless);
            }, function () {
                disposed = true;
            }, _._isEndless);
        }
    }, {
        key: "select",
        value: function select(selector) {
            return this._select(selector);
        }
    }, {
        key: "_selectMany",
        value: function _selectMany(collectionSelector, resultSelector) {
            var _ = this,
                isEndless = _._isEndless || null;
            if (!resultSelector) resultSelector = function resultSelector(a, b) {
                return b;
            };
            return new Enumerable(function () {
                var enumerator;
                var middleEnumerator;
                var index = 0;
                return new EnumeratorBase_1.default(function () {
                    enumerator = _.getEnumerator();
                    middleEnumerator = undefined;
                    index = 0;
                }, function (yielder) {
                    if (middleEnumerator === VOID0 && !enumerator.moveNext()) return false;
                    do {
                        if (!middleEnumerator) {
                            var middleSeq = collectionSelector(enumerator.current, index++);
                            if (!middleSeq) continue;
                            middleEnumerator = Enumerator_1.from(middleSeq);
                        }
                        if (middleEnumerator.moveNext()) return yielder.yieldReturn(resultSelector(enumerator.current, middleEnumerator.current));
                        middleEnumerator.dispose();
                        middleEnumerator = null;
                    } while (enumerator.moveNext());
                    return false;
                }, function () {
                    dispose_1.dispose(enumerator, middleEnumerator);
                    enumerator = null;
                    middleEnumerator = null;
                }, isEndless);
            }, null, isEndless);
        }
    }, {
        key: "selectMany",
        value: function selectMany(collectionSelector, resultSelector) {
            return this._selectMany(collectionSelector, resultSelector);
        }
    }, {
        key: "_choose",
        value: function _choose() {
            var selector = arguments.length <= 0 || arguments[0] === undefined ? Functions.Identity : arguments[0];

            var _ = this,
                disposed = !_.throwIfDisposed();
            return new Enumerable(function () {
                var enumerator;
                var index = 0;
                return new EnumeratorBase_1.default(function () {
                    throwIfDisposed(disposed);
                    index = 0;
                    enumerator = _.getEnumerator();
                }, function (yielder) {
                    throwIfDisposed(disposed);
                    while (enumerator.moveNext()) {
                        var result = selector(enumerator.current, index++);
                        if (result !== null && result !== VOID0) return yielder.yieldReturn(result);
                    }
                    return false;
                }, function () {
                    dispose_1.dispose(enumerator);
                }, _._isEndless);
            }, function () {
                disposed = true;
            }, _._isEndless);
        }
    }, {
        key: "choose",
        value: function choose() {
            var selector = arguments.length <= 0 || arguments[0] === undefined ? Functions.Identity : arguments[0];

            return this._choose(selector);
        }
    }, {
        key: "_where",
        value: function _where(predicate) {
            var _ = this,
                disposed = !_.throwIfDisposed();
            if (predicate.length < 2) return new WhereEnumerable(_, predicate);
            return new Enumerable(function () {
                var enumerator;
                var index = 0;
                return new EnumeratorBase_1.default(function () {
                    throwIfDisposed(disposed);
                    index = 0;
                    enumerator = _.getEnumerator();
                }, function (yielder) {
                    throwIfDisposed(disposed);
                    while (enumerator.moveNext()) {
                        if (predicate(enumerator.current, index++)) return yielder.yieldReturn(enumerator.current);
                    }
                    return false;
                }, function () {
                    dispose_1.dispose(enumerator);
                }, _._isEndless);
            }, function () {
                disposed = true;
            }, _._isEndless);
        }
    }, {
        key: "where",
        value: function where(predicate) {
            return this._where(predicate);
        }
    }, {
        key: "ofType",
        value: function ofType(type) {
            var typeName;
            switch (type) {
                case Number:
                    typeName = Types_1.default.NUMBER;
                    break;
                case String:
                    typeName = Types_1.default.STRING;
                    break;
                case Boolean:
                    typeName = Types_1.default.BOOLEAN;
                    break;
                case Function:
                    typeName = Types_1.default.FUNCTION;
                    break;
                default:
                    return this.where(function (x) {
                        return x instanceof type;
                    });
            }
            return this.where(function (x) {
                return (typeof x === "undefined" ? "undefined" : _typeof(x)) === typeName;
            });
        }
    }, {
        key: "except",
        value: function except(second, compareSelector) {
            var _ = this,
                disposed = !_.throwIfDisposed();
            return new Enumerable(function () {
                var enumerator;
                var keys;
                return new EnumeratorBase_1.default(function () {
                    throwIfDisposed(disposed);
                    enumerator = _.getEnumerator();
                    keys = new Dictionary_1.default(compareSelector);
                    if (second) Enumerator_1.forEach(second, function (key) {
                        return keys.addByKeyValue(key, true);
                    });
                }, function (yielder) {
                    throwIfDisposed(disposed);
                    while (enumerator.moveNext()) {
                        var current = enumerator.current;
                        if (!keys.containsKey(current)) {
                            keys.addByKeyValue(current, true);
                            return yielder.yieldReturn(current);
                        }
                    }
                    return false;
                }, function () {
                    dispose_1.dispose(enumerator);
                    keys.clear();
                }, _._isEndless);
            }, function () {
                disposed = true;
            }, _._isEndless);
        }
    }, {
        key: "distinct",
        value: function distinct(compareSelector) {
            return this.except(null, compareSelector);
        }
    }, {
        key: "distinctUntilChanged",
        value: function distinctUntilChanged(compareSelector) {
            var _ = this,
                disposed = !_.throwIfDisposed();
            return new Enumerable(function () {
                var enumerator;
                var compareKey;
                var initial = true;
                return new EnumeratorBase_1.default(function () {
                    throwIfDisposed(disposed);
                    enumerator = _.getEnumerator();
                }, function (yielder) {
                    throwIfDisposed(disposed);
                    while (enumerator.moveNext()) {
                        var key = compareSelector(enumerator.current);
                        if (initial) {
                            initial = false;
                        } else if (compareKey === key) {
                            continue;
                        }
                        compareKey = key;
                        return yielder.yieldReturn(enumerator.current);
                    }
                    return false;
                }, function () {
                    dispose_1.dispose(enumerator);
                }, _._isEndless);
            }, function () {
                disposed = true;
            }, _._isEndless);
        }
    }, {
        key: "defaultIfEmpty",
        value: function defaultIfEmpty() {
            var defaultValue = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            var _ = this,
                disposed = !_.throwIfDisposed();
            return new Enumerable(function () {
                var enumerator;
                var isFirst;
                return new EnumeratorBase_1.default(function () {
                    isFirst = true;
                    throwIfDisposed(disposed);
                    enumerator = _.getEnumerator();
                }, function (yielder) {
                    throwIfDisposed(disposed);
                    if (enumerator.moveNext()) {
                        isFirst = false;
                        return yielder.yieldReturn(enumerator.current);
                    } else if (isFirst) {
                        isFirst = false;
                        return yielder.yieldReturn(defaultValue);
                    }
                    return false;
                }, function () {
                    dispose_1.dispose(enumerator);
                }, _._isEndless);
            }, null, _._isEndless);
        }
    }, {
        key: "zip",
        value: function zip(second, resultSelector) {
            var _ = this;
            return new Enumerable(function () {
                var firstEnumerator;
                var secondEnumerator;
                var index = 0;
                return new EnumeratorBase_1.default(function () {
                    index = 0;
                    firstEnumerator = _.getEnumerator();
                    secondEnumerator = Enumerator_1.from(second);
                }, function (yielder) {
                    return firstEnumerator.moveNext() && secondEnumerator.moveNext() && yielder.yieldReturn(resultSelector(firstEnumerator.current, secondEnumerator.current, index++));
                }, function () {
                    dispose_1.dispose(firstEnumerator, secondEnumerator);
                });
            });
        }
    }, {
        key: "zipMultiple",
        value: function zipMultiple(second, resultSelector) {
            var _ = this;
            _.throwIfDisposed();
            if (!second.length) return Enumerable.empty();
            return new Enumerable(function () {
                var secondTemp;
                var firstEnumerator;
                var secondEnumerator;
                var index = 0;
                return new EnumeratorBase_1.default(function () {
                    secondTemp = new Queue_1.default(second);
                    index = 0;
                    firstEnumerator = _.getEnumerator();
                    secondEnumerator = null;
                }, function (yielder) {
                    if (firstEnumerator.moveNext()) {
                        while (true) {
                            while (!secondEnumerator) {
                                if (secondTemp.count) {
                                    var next = secondTemp.dequeue();
                                    if (next) secondEnumerator = Enumerator_1.from(next);
                                } else return yielder.yieldBreak();
                            }
                            if (secondEnumerator.moveNext()) return yielder.yieldReturn(resultSelector(firstEnumerator.current, secondEnumerator.current, index++));
                            secondEnumerator.dispose();
                            secondEnumerator = null;
                        }
                    }
                    return yielder.yieldBreak();
                }, function () {
                    dispose_1.dispose(firstEnumerator, secondTemp);
                });
            });
        }
    }, {
        key: "join",
        value: function join(inner, outerKeySelector, innerKeySelector, resultSelector) {
            var compareSelector = arguments.length <= 4 || arguments[4] === undefined ? Functions.Identity : arguments[4];

            var _ = this;
            return new Enumerable(function () {
                var outerEnumerator;
                var lookup;
                var innerElements = null;
                var innerCount = 0;
                return new EnumeratorBase_1.default(function () {
                    outerEnumerator = _.getEnumerator();
                    lookup = Enumerable.from(inner).toLookup(innerKeySelector, Functions.Identity, compareSelector);
                }, function (yielder) {
                    while (true) {
                        if (innerElements != null) {
                            var innerElement = innerElements[innerCount++];
                            if (innerElement !== VOID0) return yielder.yieldReturn(resultSelector(outerEnumerator.current, innerElement));
                            innerElement = null;
                            innerCount = 0;
                        }
                        if (outerEnumerator.moveNext()) {
                            var key = outerKeySelector(outerEnumerator.current);
                            innerElements = lookup.get(key);
                        } else {
                            return yielder.yieldBreak();
                        }
                    }
                }, function () {
                    dispose_1.dispose(outerEnumerator);
                });
            });
        }
    }, {
        key: "groupJoin",
        value: function groupJoin(inner, outerKeySelector, innerKeySelector, resultSelector) {
            var compareSelector = arguments.length <= 4 || arguments[4] === undefined ? Functions.Identity : arguments[4];

            var _ = this;
            return new Enumerable(function () {
                var enumerator;
                var lookup = null;
                return new EnumeratorBase_1.default(function () {
                    enumerator = _.getEnumerator();
                    lookup = Enumerable.from(inner).toLookup(innerKeySelector, Functions.Identity, compareSelector);
                }, function (yielder) {
                    return enumerator.moveNext() && yielder.yieldReturn(resultSelector(enumerator.current, lookup.get(outerKeySelector(enumerator.current))));
                }, function () {
                    dispose_1.dispose(enumerator);
                });
            });
        }
    }, {
        key: "_concatWith",
        value: function _concatWith(other) {
            var _ = this,
                isEndless = _._isEndless || null;
            return new Enumerable(function () {
                var firstEnumerator;
                var secondEnumerator;
                return new EnumeratorBase_1.default(function () {
                    firstEnumerator = _.getEnumerator();
                }, function (yielder) {
                    if (firstEnumerator != null) {
                        if (firstEnumerator.moveNext()) return yielder.yieldReturn(firstEnumerator.current);
                        secondEnumerator = Enumerator_1.from(other);
                        firstEnumerator.dispose();
                        firstEnumerator = null;
                    }
                    if (secondEnumerator.moveNext()) return yielder.yieldReturn(secondEnumerator.current);
                    return false;
                }, function () {
                    dispose_1.dispose(firstEnumerator, secondEnumerator);
                }, isEndless);
            }, null, isEndless);
        }
    }, {
        key: "concatWith",
        value: function concatWith(other) {
            return other ? this._concatWith(other) : this;
        }
    }, {
        key: "_merge",
        value: function _merge(enumerables) {
            var _ = this;
            return new Enumerable(function () {
                var enumerator;
                var queue;
                return new EnumeratorBase_1.default(function () {
                    enumerator = _.getEnumerator();
                    queue = new Queue_1.default(enumerables);
                }, function (yielder) {
                    while (true) {
                        while (!enumerator && queue.count) {
                            enumerator = Enumerator_1.from(queue.dequeue());
                        }
                        if (enumerator && enumerator.moveNext()) return yielder.yieldReturn(enumerator.current);
                        if (enumerator) {
                            enumerator.dispose();
                            enumerator = null;
                            continue;
                        }
                        return yielder.yieldBreak();
                    }
                }, function () {
                    dispose_1.dispose(enumerator, queue);
                });
            });
        }
    }, {
        key: "merge",
        value: function merge(enumerables) {
            if (!enumerables || !enumerables.length) return this;
            if (enumerables.length == 1) return this.concatWith(enumerables[0]);
            return this._merge(enumerables);
        }
    }, {
        key: "concat",
        value: function concat() {
            var _ = this;

            for (var _len = arguments.length, enumerables = Array(_len), _key = 0; _key < _len; _key++) {
                enumerables[_key] = arguments[_key];
            }

            if (enumerables.length == 0) return _;
            if (enumerables.length == 1) return _.concatWith(enumerables[0]);
            return _.merge(enumerables);
        }
    }, {
        key: "union",
        value: function union(second) {
            var compareSelector = arguments.length <= 1 || arguments[1] === undefined ? Functions.Identity : arguments[1];

            var _ = this,
                isEndless = _._isEndless || null;
            return new Enumerable(function () {
                var firstEnumerator;
                var secondEnumerator;
                var keys;
                return new EnumeratorBase_1.default(function () {
                    firstEnumerator = _.getEnumerator();
                    keys = new Dictionary_1.default(compareSelector);
                }, function (yielder) {
                    var current;
                    if (secondEnumerator === VOID0) {
                        while (firstEnumerator.moveNext()) {
                            current = firstEnumerator.current;
                            if (!keys.containsKey(current)) {
                                keys.addByKeyValue(current, null);
                                return yielder.yieldReturn(current);
                            }
                        }
                        secondEnumerator = Enumerator_1.from(second);
                    }
                    while (secondEnumerator.moveNext()) {
                        current = secondEnumerator.current;
                        if (!keys.containsKey(current)) {
                            keys.addByKeyValue(current, null);
                            return yielder.yieldReturn(current);
                        }
                    }
                    return false;
                }, function () {
                    dispose_1.dispose(firstEnumerator, secondEnumerator);
                }, isEndless);
            }, null, isEndless);
        }
    }, {
        key: "insertAt",
        value: function insertAt(index, other) {
            if (isNaN(index) || index < 0 || !isFinite(index)) throw new Error("'index' is invalid or out of bounds.");
            Integer_1.default.assert(index, "index");
            var n = index;
            var _ = this,
                isEndless = _._isEndless || null;
            _.throwIfDisposed();
            return new Enumerable(function () {
                var firstEnumerator;
                var secondEnumerator;
                var count = 0;
                var isEnumerated = false;
                return new EnumeratorBase_1.default(function () {
                    count = 0;
                    firstEnumerator = _.getEnumerator();
                    secondEnumerator = Enumerator_1.from(other);
                    isEnumerated = false;
                }, function (yielder) {
                    if (count == n) {
                        isEnumerated = true;
                        if (secondEnumerator.moveNext()) return yielder.yieldReturn(secondEnumerator.current);
                    }
                    if (firstEnumerator.moveNext()) {
                        count++;
                        return yielder.yieldReturn(firstEnumerator.current);
                    }
                    return !isEnumerated && secondEnumerator.moveNext() && yielder.yieldReturn(secondEnumerator.current);
                }, function () {
                    dispose_1.dispose(firstEnumerator, secondEnumerator);
                }, isEndless);
            }, null, isEndless);
        }
    }, {
        key: "alternateMultiple",
        value: function alternateMultiple(sequence) {
            var _ = this;
            return new Enumerable(function () {
                var buffer, mode, enumerator, alternateEnumerator;
                return new EnumeratorBase_1.default(function () {
                    alternateEnumerator = new ArrayEnumerator_1.default(Enumerable.toArray(sequence));
                    enumerator = _.getEnumerator();
                    var hasAtLeastOne = enumerator.moveNext();
                    mode = hasAtLeastOne ? 1 : 0;
                    if (hasAtLeastOne) buffer = enumerator.current;
                }, function (yielder) {
                    switch (mode) {
                        case 0:
                            return yielder.yieldBreak();
                        case 2:
                            if (alternateEnumerator.moveNext()) return yielder.yieldReturn(alternateEnumerator.current);
                            alternateEnumerator.reset();
                            mode = 1;
                            break;
                    }
                    var latest = buffer;
                    var another = enumerator.moveNext();
                    mode = another ? 2 : 0;
                    if (another) buffer = enumerator.current;
                    return yielder.yieldReturn(latest);
                }, function () {
                    dispose_1.dispose(enumerator, alternateEnumerator);
                }, _._isEndless);
            }, null, _._isEndless);
        }
    }, {
        key: "alternateSingle",
        value: function alternateSingle(value) {
            return this.alternateMultiple(Enumerable.make(value));
        }
    }, {
        key: "alternate",
        value: function alternate() {
            for (var _len2 = arguments.length, sequence = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                sequence[_key2] = arguments[_key2];
            }

            return this.alternateMultiple(sequence);
        }
    }, {
        key: "isEndless",
        get: function get() {
            return this._isEndless;
        }
    }]);

    return InfiniteEnumerable;
}(DisposableBase_1.default);

exports.InfiniteEnumerable = InfiniteEnumerable;

var Enumerable = function (_InfiniteEnumerable) {
    _inherits(Enumerable, _InfiniteEnumerable);

    function Enumerable(enumeratorFactory, finalizer) {
        var isEndless = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

        _classCallCheck(this, Enumerable);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Enumerable).call(this, enumeratorFactory, finalizer));

        _this3._isEndless = isEndless;
        return _this3;
    }

    _createClass(Enumerable, [{
        key: "skip",
        value: function skip(count) {
            return count > 0 ? this._skip(count) : this;
        }
    }, {
        key: "forEach",
        value: function forEach(action) {
            var _ = this;
            _.throwIfDisposed();
            Enumerator_1.throwIfEndless(_.isEndless);
            var index = 0;
            dispose_1.using(_.getEnumerator(), function (e) {
                Enumerator_1.throwIfEndless(e.isEndless);
                while (_.throwIfDisposed() && e.moveNext()) {
                    if (action(e.current, index++) === false) break;
                }
            });
        }
    }, {
        key: "toArray",
        value: function toArray(predicate) {
            return predicate ? this.where(predicate).toArray() : this.copyTo([]);
        }
    }, {
        key: "copyTo",
        value: function copyTo(target) {
            var index = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            this.throwIfDisposed();
            if (!target) throw new ArgumentNullException_1.default("target");
            Integer_1.default.assert(index);
            if (index < 0) throw new ArgumentOutOfRangeException_1.default("index", index, "Must be zero or greater");
            Enumerator_1.forEach(this, function (x, i) {
                target[i + index] = x;
            });
            return target;
        }
    }, {
        key: "toLookup",
        value: function toLookup(keySelector) {
            var elementSelector = arguments.length <= 1 || arguments[1] === undefined ? Functions.Identity : arguments[1];
            var compareSelector = arguments.length <= 2 || arguments[2] === undefined ? Functions.Identity : arguments[2];

            var dict = new Dictionary_1.default(compareSelector);
            this.forEach(function (x) {
                var key = keySelector(x);
                var element = elementSelector(x);
                var array = dict.getValue(key);
                if (array !== VOID0) array.push(element);else dict.addByKeyValue(key, [element]);
            });
            return new Lookup(dict);
        }
    }, {
        key: "toMap",
        value: function toMap(keySelector, elementSelector) {
            var obj = {};
            this.forEach(function (x) {
                obj[keySelector(x)] = elementSelector(x);
            });
            return obj;
        }
    }, {
        key: "toDictionary",
        value: function toDictionary(keySelector, elementSelector) {
            var compareSelector = arguments.length <= 2 || arguments[2] === undefined ? Functions.Identity : arguments[2];

            var dict = new Dictionary_1.default(compareSelector);
            this.forEach(function (x) {
                return dict.addByKeyValue(keySelector(x), elementSelector(x));
            });
            return dict;
        }
    }, {
        key: "toJoinedString",
        value: function toJoinedString() {
            var separator = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
            var selector = arguments.length <= 1 || arguments[1] === undefined ? Functions.Identity : arguments[1];

            return this.select(selector).toArray().join(separator);
        }
    }, {
        key: "takeExceptLast",
        value: function takeExceptLast() {
            var count = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

            var _ = this;
            if (!(count > 0)) return _;
            if (!isFinite(count)) return Enumerable.empty();
            Integer_1.default.assert(count, "count");
            var c = count;
            return new Enumerable(function () {
                var enumerator;
                var q;
                return new EnumeratorBase_1.default(function () {
                    enumerator = _.getEnumerator();
                    q = new Queue_1.default();
                }, function (yielder) {
                    while (enumerator.moveNext()) {
                        q.enqueue(enumerator.current);
                        if (q.count > c) return yielder.yieldReturn(q.dequeue());
                    }
                    return false;
                }, function () {
                    dispose_1.dispose(enumerator, q);
                });
            });
        }
    }, {
        key: "skipToLast",
        value: function skipToLast(count) {
            if (!(count > 0)) return Enumerable.empty();
            var _ = this;
            if (!isFinite(count)) return _;
            Integer_1.default.assert(count, "count");
            return _.reverse().take(count).reverse();
        }
    }, {
        key: "where",
        value: function where(predicate) {
            return this._where(predicate);
        }
    }, {
        key: "select",
        value: function select(selector) {
            return this._select(selector);
        }
    }, {
        key: "selectMany",
        value: function selectMany(collectionSelector, resultSelector) {
            return this._selectMany(collectionSelector, resultSelector);
        }
    }, {
        key: "choose",
        value: function choose() {
            var selector = arguments.length <= 0 || arguments[0] === undefined ? Functions.Identity : arguments[0];

            return this._choose(selector);
        }
    }, {
        key: "reverse",
        value: function reverse() {
            var _ = this,
                disposed = !_.throwIfDisposed();
            Enumerator_1.throwIfEndless(_._isEndless);
            return new Enumerable(function () {
                var buffer;
                var index = 0;
                return new EnumeratorBase_1.default(function () {
                    throwIfDisposed(disposed);
                    buffer = _.toArray();
                    index = buffer.length;
                }, function (yielder) {
                    return index && yielder.yieldReturn(buffer[--index]);
                }, function () {
                    buffer.length = 0;
                });
            }, function () {
                disposed = true;
            });
        }
    }, {
        key: "shuffle",
        value: function shuffle() {
            var _ = this,
                disposed = !_.throwIfDisposed();
            Enumerator_1.throwIfEndless(_._isEndless);
            return new Enumerable(function () {
                var buffer;
                var capacity;
                var len;
                return new EnumeratorBase_1.default(function () {
                    throwIfDisposed(disposed);
                    buffer = _.toArray();
                    capacity = len = buffer.length;
                }, function (yielder) {
                    if (!len) return yielder.yieldBreak();
                    var selectedIndex = Integer_1.default.random(len);
                    var selectedValue = buffer[selectedIndex];
                    buffer[selectedIndex] = buffer[--len];
                    buffer[len] = null;
                    if (len % 32 == 0) buffer.length = len;
                    return yielder.yieldReturn(selectedValue);
                }, function () {
                    buffer.length = 0;
                });
            }, function () {
                disposed = true;
            });
        }
    }, {
        key: "count",
        value: function count(predicate) {
            var count = 0;
            this.forEach(predicate ? function (x, i) {
                if (predicate(x, i)) ++count;
            } : function () {
                ++count;
            });
            return count;
        }
    }, {
        key: "all",
        value: function all(predicate) {
            if (!predicate) throw new ArgumentNullException_1.default("predicate");
            var result = true;
            this.forEach(function (x) {
                if (!predicate(x)) {
                    result = false;
                    return false;
                }
            });
            return result;
        }
    }, {
        key: "every",
        value: function every(predicate) {
            return this.all(predicate);
        }
    }, {
        key: "any",
        value: function any(predicate) {
            if (!predicate) return _get(Object.getPrototypeOf(Enumerable.prototype), "any", this).call(this);
            var result = false;
            this.forEach(function (x) {
                result = predicate(x);
                return !result;
            });
            return result;
        }
    }, {
        key: "some",
        value: function some(predicate) {
            return this.any(predicate);
        }
    }, {
        key: "isEmpty",
        value: function isEmpty() {
            return !this.any();
        }
    }, {
        key: "contains",
        value: function contains(value, compareSelector) {
            return compareSelector ? this.any(function (v) {
                return compareSelector(v) === compareSelector(value);
            }) : this.any(function (v) {
                return v === value;
            });
        }
    }, {
        key: "indexOf",
        value: function indexOf(value, compareSelector) {
            var found = -1;
            this.forEach(compareSelector ? function (element, i) {
                if (Values.areEqual(compareSelector(element), compareSelector(value), true)) {
                    found = i;
                    return false;
                }
            } : function (element, i) {
                if (Values.areEqual(element, value, true)) {
                    found = i;
                    return false;
                }
            });
            return found;
        }
    }, {
        key: "lastIndexOf",
        value: function lastIndexOf(value, compareSelector) {
            var result = -1;
            this.forEach(compareSelector ? function (element, i) {
                if (Values.areEqual(compareSelector(element), compareSelector(value), true)) result = i;
            } : function (element, i) {
                if (Values.areEqual(element, value, true)) result = i;
            });
            return result;
        }
    }, {
        key: "concatWith",
        value: function concatWith(other) {
            return other ? this._concatWith(other) : this;
        }
    }, {
        key: "merge",
        value: function merge(enumerables) {
            if (!enumerables || !enumerables.length) return this;
            if (enumerables.length == 1) return this.concatWith(enumerables[0]);
            return this._merge(enumerables);
        }
    }, {
        key: "concat",
        value: function concat() {
            for (var _len3 = arguments.length, enumerables = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                enumerables[_key3] = arguments[_key3];
            }

            if (enumerables.length == 0) return this;
            if (enumerables.length == 1) return this.concatWith(enumerables[0]);
            return this.merge(enumerables);
        }
    }, {
        key: "intersect",
        value: function intersect(second, compareSelector) {
            var _ = this;
            return new Enumerable(function () {
                var enumerator;
                var keys;
                var outs;
                return new EnumeratorBase_1.default(function () {
                    enumerator = _.getEnumerator();
                    keys = new Dictionary_1.default(compareSelector);
                    outs = new Dictionary_1.default(compareSelector);
                    Enumerator_1.forEach(second, function (key) {
                        keys.addByKeyValue(key, true);
                    });
                }, function (yielder) {
                    while (enumerator.moveNext()) {
                        var current = enumerator.current;
                        if (!outs.containsKey(current) && keys.containsKey(current)) {
                            outs.addByKeyValue(current, true);
                            return yielder.yieldReturn(current);
                        }
                    }
                    return yielder.yieldBreak();
                }, function () {
                    dispose_1.dispose(enumerator, keys, outs);
                }, _._isEndless);
            }, null, _._isEndless);
        }
    }, {
        key: "sequenceEqual",
        value: function sequenceEqual(second) {
            var equalityComparer = arguments.length <= 1 || arguments[1] === undefined ? Values.areEqual : arguments[1];

            return dispose_1.using(this.getEnumerator(), function (e1) {
                return dispose_1.using(Enumerator_1.from(second), function (e2) {
                    Enumerator_1.throwIfEndless(e1.isEndless && e2.isEndless);
                    while (e1.moveNext()) {
                        if (!e2.moveNext() || !equalityComparer(e1.current, e2.current)) return false;
                    }
                    return !e2.moveNext();
                });
            });
        }
    }, {
        key: "orderBy",
        value: function orderBy() {
            var keySelector = arguments.length <= 0 || arguments[0] === undefined ? Functions.Identity : arguments[0];

            return new OrderedEnumerable(this, keySelector, 1);
        }
    }, {
        key: "orderUsing",
        value: function orderUsing(comparison) {
            return new OrderedEnumerable(this, null, 1, null, comparison);
        }
    }, {
        key: "orderUsingReversed",
        value: function orderUsingReversed(comparison) {
            return new OrderedEnumerable(this, null, -1, null, comparison);
        }
    }, {
        key: "orderByDescending",
        value: function orderByDescending() {
            var keySelector = arguments.length <= 0 || arguments[0] === undefined ? Functions.Identity : arguments[0];

            return new OrderedEnumerable(this, keySelector, -1);
        }
    }, {
        key: "groupBy",
        value: function groupBy(keySelector) {
            var _this4 = this;

            var elementSelector = arguments.length <= 1 || arguments[1] === undefined ? Functions.Identity : arguments[1];
            var compareSelector = arguments[2];

            if (!elementSelector) elementSelector = Functions.Identity;
            return new Enumerable(function () {
                return _this4.toLookup(keySelector, elementSelector, compareSelector).getEnumerator();
            });
        }
    }, {
        key: "partitionBy",
        value: function partitionBy(keySelector, elementSelector) {
            var resultSelector = arguments.length <= 2 || arguments[2] === undefined ? function (key, elements) {
                return new Grouping(key, elements);
            } : arguments[2];
            var compareSelector = arguments.length <= 3 || arguments[3] === undefined ? Functions.Identity : arguments[3];

            var _ = this;
            if (!elementSelector) elementSelector = Functions.Identity;
            return new Enumerable(function () {
                var enumerator;
                var key;
                var compareKey;
                var group;
                var len;
                return new EnumeratorBase_1.default(function () {
                    enumerator = _.getEnumerator();
                    if (enumerator.moveNext()) {
                        key = keySelector(enumerator.current);
                        compareKey = compareSelector(key);
                        group = [elementSelector(enumerator.current)];
                        len = 1;
                    } else group = null;
                }, function (yielder) {
                    if (!group) return yielder.yieldBreak();
                    var hasNext, c;
                    while (hasNext = enumerator.moveNext()) {
                        c = enumerator.current;
                        if (compareKey === compareSelector(keySelector(c))) group[len++] = elementSelector(c);else break;
                    }
                    var result = resultSelector(key, group);
                    if (hasNext) {
                        c = enumerator.current;
                        key = keySelector(c);
                        compareKey = compareSelector(key);
                        group = [elementSelector(c)];
                        len = 1;
                    } else {
                        group = null;
                    }
                    return yielder.yieldReturn(result);
                }, function () {
                    dispose_1.dispose(enumerator);
                    group = null;
                });
            });
        }
    }, {
        key: "buffer",
        value: function buffer(size) {
            if (size < 1 || !isFinite(size)) throw new Error("Invalid buffer size.");
            Integer_1.default.assert(size, "size");
            var _ = this,
                len;
            return new Enumerable(function () {
                var enumerator;
                return new EnumeratorBase_1.default(function () {
                    enumerator = _.getEnumerator();
                }, function (yielder) {
                    var array = ArrayUtility.initialize(size);
                    len = 0;
                    while (len < size && enumerator.moveNext()) {
                        array[len++] = enumerator.current;
                    }
                    array.length = len;
                    return len && yielder.yieldReturn(array);
                }, function () {
                    dispose_1.dispose(enumerator);
                }, _._isEndless);
            }, null, _._isEndless);
        }
    }, {
        key: "aggregate",
        value: function aggregate(func, seed) {
            return this.scan(func, seed).lastOrDefault();
        }
    }, {
        key: "average",
        value: function average() {
            var selector = arguments.length <= 0 || arguments[0] === undefined ? Types_1.default.numberOrNaN : arguments[0];

            var sum = 0;
            var sumInfinite = 0;
            var count = 0;
            this.forEach(function (x) {
                var value = selector(x);
                if (isNaN(value)) {
                    sum = NaN;
                    return false;
                }
                if (isFinite(value)) sum += value;else sumInfinite += value > 0 ? +1 : -1;
                ++count;
            });
            if (sumInfinite) return sumInfinite * Infinity;
            return isNaN(sum) || !count ? NaN : sum / count;
        }
    }, {
        key: "max",
        value: function max() {
            return this.aggregate(Functions.Greater);
        }
    }, {
        key: "min",
        value: function min() {
            return this.aggregate(Functions.Lesser);
        }
    }, {
        key: "maxBy",
        value: function maxBy() {
            var keySelector = arguments.length <= 0 || arguments[0] === undefined ? Functions.Identity : arguments[0];

            return this.aggregate(function (a, b) {
                return keySelector(a) > keySelector(b) ? a : b;
            });
        }
    }, {
        key: "minBy",
        value: function minBy() {
            var keySelector = arguments.length <= 0 || arguments[0] === undefined ? Functions.Identity : arguments[0];

            return this.aggregate(function (a, b) {
                return keySelector(a) < keySelector(b) ? a : b;
            });
        }
    }, {
        key: "sum",
        value: function sum() {
            var selector = arguments.length <= 0 || arguments[0] === undefined ? Types_1.default.numberOrNaN : arguments[0];

            var sum = 0;
            var sumInfinite = 0;
            this.forEach(function (x) {
                var value = selector(x);
                if (isNaN(value)) {
                    sum = NaN;
                    return false;
                }
                if (isFinite(value)) sum += value;else sumInfinite += value > 0 ? +1 : -1;
            });
            return isNaN(sum) ? NaN : sumInfinite ? sumInfinite * Infinity : sum;
        }
    }, {
        key: "product",
        value: function product() {
            var selector = arguments.length <= 0 || arguments[0] === undefined ? Types_1.default.numberOrNaN : arguments[0];

            var result = 1,
                exists = false;
            this.forEach(function (x) {
                exists = true;
                var value = selector(x);
                if (isNaN(value)) {
                    result = NaN;
                    return false;
                }
                if (value == 0) {
                    result = 0;
                    return false;
                }
                result *= value;
            });
            return exists && isNaN(result) ? NaN : result;
        }
    }, {
        key: "quotient",
        value: function quotient() {
            var selector = arguments.length <= 0 || arguments[0] === undefined ? Types_1.default.numberOrNaN : arguments[0];

            var count = 0;
            var result = NaN;
            this.forEach(function (x) {
                var value = selector(x);
                count++;
                if (count === 1) {
                    result = value;
                } else {
                    if (isNaN(value) || value === 0 || !isFinite(value)) {
                        result = NaN;
                        return false;
                    }
                    result /= value;
                }
            });
            if (count === 1) result = NaN;
            return result;
        }
    }, {
        key: "last",
        value: function last() {
            var _ = this;
            _.throwIfDisposed();
            var value = undefined;
            var found = false;
            _.forEach(function (x) {
                found = true;
                value = x;
            });
            if (!found) throw new Error("last:No element satisfies the condition.");
            return value;
        }
    }, {
        key: "lastOrDefault",
        value: function lastOrDefault() {
            var defaultValue = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            var _ = this;
            _.throwIfDisposed();
            var value = undefined;
            var found = false;
            _.forEach(function (x) {
                found = true;
                value = x;
            });
            return !found ? defaultValue : value;
        }
    }, {
        key: "share",
        value: function share() {
            var _ = this;
            _.throwIfDisposed();
            var sharedEnumerator;
            return new Enumerable(function () {
                return new EnumeratorBase_1.default(function () {
                    if (!sharedEnumerator) sharedEnumerator = _.getEnumerator();
                }, function (yielder) {
                    return sharedEnumerator.moveNext() && yielder.yieldReturn(sharedEnumerator.current);
                });
            }, function () {
                dispose_1.dispose(sharedEnumerator);
            });
        }
    }, {
        key: "memoize",
        value: function memoize() {
            var _ = this,
                disposed = !_.throwIfDisposed();
            var cache;
            var enumerator;
            return new Enumerable(function () {
                var index = 0;
                return new EnumeratorBase_1.default(function () {
                    throwIfDisposed(disposed);
                    if (!enumerator) enumerator = _.getEnumerator();
                    if (!cache) cache = [];
                    index = 0;
                }, function (yielder) {
                    throwIfDisposed(disposed);
                    var i = index++;
                    if (i >= cache.length) {
                        return enumerator.moveNext() ? yielder.yieldReturn(cache[i] = enumerator.current) : false;
                    }
                    return yielder.yieldReturn(cache[i]);
                });
            }, function () {
                disposed = true;
                if (cache) cache.length = 0;
                cache = null;
                dispose_1.dispose(enumerator);
                enumerator = null;
            });
        }
    }, {
        key: "catchError",
        value: function catchError(handler) {
            var _ = this,
                disposed = !_.throwIfDisposed();
            return new Enumerable(function () {
                var enumerator;
                return new EnumeratorBase_1.default(function () {
                    try {
                        throwIfDisposed(disposed);
                        enumerator = _.getEnumerator();
                    } catch (e) {}
                }, function (yielder) {
                    try {
                        throwIfDisposed(disposed);
                        if (enumerator.moveNext()) return yielder.yieldReturn(enumerator.current);
                    } catch (e) {
                        handler(e);
                    }
                    return false;
                }, function () {
                    dispose_1.dispose(enumerator);
                });
            });
        }
    }, {
        key: "finallyAction",
        value: function finallyAction(action) {
            var _ = this,
                disposed = !_.throwIfDisposed();
            return new Enumerable(function () {
                var enumerator;
                return new EnumeratorBase_1.default(function () {
                    throwIfDisposed(disposed);
                    enumerator = _.getEnumerator();
                }, function (yielder) {
                    throwIfDisposed(disposed);
                    return enumerator.moveNext() ? yielder.yieldReturn(enumerator.current) : false;
                }, function () {
                    try {
                        dispose_1.dispose(enumerator);
                    } finally {
                        action();
                    }
                });
            });
        }
    }], [{
        key: "fromArray",
        value: function fromArray(array) {
            return new ArrayEnumerable(array);
        }
    }, {
        key: "from",
        value: function from(source) {
            if (Types_1.default.isObject(source) || Types_1.default.isString(source)) {
                if (source instanceof Enumerable) return source;
                if (Array.isArray(source)) return new ArrayEnumerable(source);
                if (Enumerator_1.isEnumerable(source)) return new Enumerable(function () {
                    return source.getEnumerator();
                });
                if (Types_1.default.isArrayLike(source)) return new ArrayEnumerable(source);
            }
            throw new UnsupportedEnumerableException_1.default();
        }
    }, {
        key: "toArray",
        value: function toArray(source) {
            if (source instanceof FiniteEnumerable) return source.toArray();
            return Enumerator_1.toArray(source);
        }
    }, {
        key: "choice",
        value: function choice(values) {
            var len = values && values.length;
            if (!len || !isFinite(len)) throw new ArgumentOutOfRangeException_1.default('length', length);
            return new InfiniteEnumerable(function () {
                return new EnumeratorBase_1.default(null, function (yielder) {
                    return yielder.yieldReturn(Integer_1.default.random.select(values));
                }, true);
            });
        }
    }, {
        key: "chooseFrom",
        value: function chooseFrom() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            return Enumerable.choice(args);
        }
    }, {
        key: "cycle",
        value: function cycle(values) {
            var len = values && values.length;
            if (!len || !isFinite(len)) throw new ArgumentOutOfRangeException_1.default('length', length);
            return new InfiniteEnumerable(function () {
                var index = 0;
                return new EnumeratorBase_1.default(function () {
                    index = 0;
                }, function (yielder) {
                    if (index >= values.length) index = 0;
                    return yielder.yieldReturn(values[index++]);
                }, true);
            });
        }
    }, {
        key: "cycleThrough",
        value: function cycleThrough() {
            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
            }

            return Enumerable.cycle(args);
        }
    }, {
        key: "empty",
        value: function empty() {
            return new FiniteEnumerable(getEmptyEnumerator);
        }
    }, {
        key: "repeat",
        value: function repeat(element) {
            var count = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];

            if (!(count > 0)) return Enumerable.empty();
            return isFinite(count) && Integer_1.default.assert(count, "count") ? new FiniteEnumerable(function () {
                var c = count;
                var index = 0;
                return new EnumeratorBase_1.default(function () {
                    index = 0;
                }, function (yielder) {
                    return index++ < c && yielder.yieldReturn(element);
                }, null, false);
            }) : new Enumerable(function () {
                return new EnumeratorBase_1.default(null, function (yielder) {
                    return yielder.yieldReturn(element);
                }, true);
            });
        }
    }, {
        key: "repeatWithFinalize",
        value: function repeatWithFinalize(initializer, finalizer) {
            return new InfiniteEnumerable(function () {
                var element;
                return new EnumeratorBase_1.default(function () {
                    element = initializer();
                }, function (yielder) {
                    return yielder.yieldReturn(element);
                }, function () {
                    finalizer(element);
                }, true);
            });
        }
    }, {
        key: "make",
        value: function make(element) {
            return Enumerable.repeat(element, 1);
        }
    }, {
        key: "range",
        value: function range(start, count) {
            var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

            if (!isFinite(start)) throw new ArgumentOutOfRangeException_1.default("start", start, "Must be a finite number.");
            if (!(count > 0)) return Enumerable.empty();
            if (!step) throw new ArgumentOutOfRangeException_1.default("step", step, "Must be a valid value");
            if (!isFinite(step)) throw new ArgumentOutOfRangeException_1.default("step", step, "Must be a finite number.");
            Integer_1.default.assert(count, "count");
            return new FiniteEnumerable(function () {
                var value;
                var c = count;
                var index = 0;
                return new EnumeratorBase_1.default(function () {
                    index = 0;
                    value = start;
                }, function (yielder) {
                    var result = index++ < c && yielder.yieldReturn(value);
                    if (result && index < count) value += step;
                    return result;
                }, false);
            });
        }
    }, {
        key: "rangeDown",
        value: function rangeDown(start, count) {
            var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

            step = Math.abs(step) * -1;
            return Enumerable.range(start, count, step);
        }
    }, {
        key: "toInfinity",
        value: function toInfinity() {
            var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var step = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            if (!isFinite(start)) throw new ArgumentOutOfRangeException_1.default("start", start, "Must be a finite number.");
            if (!step) throw new ArgumentOutOfRangeException_1.default("step", step, "Must be a valid value");
            if (!isFinite(step)) throw new ArgumentOutOfRangeException_1.default("step", step, "Must be a finite number.");
            return new InfiniteEnumerable(function () {
                var value;
                return new EnumeratorBase_1.default(function () {
                    value = start;
                }, function (yielder) {
                    var current = value;
                    value += step;
                    return yielder.yieldReturn(current);
                }, true);
            });
        }
    }, {
        key: "toNegativeInfinity",
        value: function toNegativeInfinity() {
            var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var step = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            return Enumerable.toInfinity(start, -step);
        }
    }, {
        key: "rangeTo",
        value: function rangeTo(start, to) {
            var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

            if (isNaN(to) || !isFinite(to)) throw new ArgumentOutOfRangeException_1.default("to", to, "Must be a finite number.");
            if (step && !isFinite(step)) throw new ArgumentOutOfRangeException_1.default("step", step, "Must be a finite non-zero number.");
            step = Math.abs(step);
            return new FiniteEnumerable(function () {
                var value;
                return new EnumeratorBase_1.default(function () {
                    value = start;
                }, start < to ? function (yielder) {
                    var result = value <= to && yielder.yieldReturn(value);
                    if (result) value += step;
                    return result;
                } : function (yielder) {
                    var result = value >= to && yielder.yieldReturn(value);
                    if (result) value -= step;
                    return result;
                }, false);
            });
        }
    }, {
        key: "matches",
        value: function matches(input, pattern) {
            var flags = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];

            var type = typeof input === "undefined" ? "undefined" : _typeof(input);
            if (type != Types_1.default.STRING) throw new Error("Cannot exec RegExp matches of type '" + type + "'.");
            if (pattern instanceof RegExp) {
                flags += pattern.ignoreCase ? "i" : "";
                flags += pattern.multiline ? "m" : "";
                pattern = pattern.source;
            }
            if (flags.indexOf("g") === -1) flags += "g";
            return new FiniteEnumerable(function () {
                var regex;
                return new EnumeratorBase_1.default(function () {
                    regex = new RegExp(pattern, flags);
                }, function (yielder) {
                    var match = regex.exec(input);
                    return match !== null ? yielder.yieldReturn(match) : false;
                });
            });
        }
    }, {
        key: "generate",
        value: function generate(factory) {
            var count = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];

            if (isNaN(count) || count <= 0) return Enumerable.empty();
            return isFinite(count) && Integer_1.default.assert(count, "count") ? new FiniteEnumerable(function () {
                var c = count;
                var index = 0;
                return new EnumeratorBase_1.default(function () {
                    index = 0;
                }, function (yielder) {
                    var current = index++;
                    return current < c && yielder.yieldReturn(factory(current));
                }, false);
            }) : new InfiniteEnumerable(function () {
                var index = 0;
                return new EnumeratorBase_1.default(function () {
                    index = 0;
                }, function (yielder) {
                    return yielder.yieldReturn(factory(index++));
                }, true);
            });
        }
    }, {
        key: "unfold",
        value: function unfold(seed, valueFactory) {
            var skipSeed = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            return new InfiniteEnumerable(function () {
                var index = 0;
                var value;
                var isFirst;
                return new EnumeratorBase_1.default(function () {
                    index = 0;
                    value = seed;
                    isFirst = !skipSeed;
                }, function (yielder) {
                    var i = index++;
                    if (isFirst) isFirst = false;else value = valueFactory(value, i);
                    return yielder.yieldReturn(value);
                }, true);
            });
        }
    }, {
        key: "forEach",
        value: function forEach(enumerable, action) {
            Enumerator_1.forEach(enumerable, action);
        }
    }, {
        key: "map",
        value: function map(enumerable, selector) {
            return Enumerator_1.map(enumerable, selector);
        }
    }, {
        key: "max",
        value: function max(values) {
            return values.takeUntil(function (v) {
                return v == +Infinity;
            }, true).aggregate(Functions.Greater);
        }
    }, {
        key: "min",
        value: function min(values) {
            return values.takeUntil(function (v) {
                return v == -Infinity;
            }, true).aggregate(Functions.Lesser);
        }
    }]);

    return Enumerable;
}(InfiniteEnumerable);

exports.Enumerable = Enumerable;

var FiniteEnumerable = function (_Enumerable) {
    _inherits(FiniteEnumerable, _Enumerable);

    function FiniteEnumerable(enumeratorFactory, finalizer) {
        _classCallCheck(this, FiniteEnumerable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FiniteEnumerable).call(this, enumeratorFactory, finalizer, false));
    }

    return FiniteEnumerable;
}(Enumerable);

exports.FiniteEnumerable = FiniteEnumerable;

var ArrayEnumerable = function (_FiniteEnumerable) {
    _inherits(ArrayEnumerable, _FiniteEnumerable);

    function ArrayEnumerable(source) {
        _classCallCheck(this, ArrayEnumerable);

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(ArrayEnumerable).call(this, function () {
            _.throwIfDisposed();
            return new ArrayEnumerator_1.default(function () {
                _.throwIfDisposed("The underlying ArrayEnumerable was disposed.", "ArrayEnumerator");
                return _._source;
            });
        }));

        var _ = _this6;
        _._disposableObjectName = "ArrayEnumerable";
        _._source = source;
        return _this6;
    }

    _createClass(ArrayEnumerable, [{
        key: "_onDispose",
        value: function _onDispose() {
            _get(Object.getPrototypeOf(ArrayEnumerable.prototype), "_onDispose", this).call(this);
            this._source = null;
        }
    }, {
        key: "toArray",
        value: function toArray() {
            var _ = this;
            _.throwIfDisposed();
            return Enumerator_1.toArray(_._source);
        }
    }, {
        key: "asEnumerable",
        value: function asEnumerable() {
            return new ArrayEnumerable(this._source);
        }
    }, {
        key: "forEach",
        value: function forEach(action) {
            var _ = this;
            _.throwIfDisposed();
            Enumerator_1.forEach(_._source, action);
        }
    }, {
        key: "any",
        value: function any(predicate) {
            var _ = this;
            _.throwIfDisposed();
            var source = _._source,
                len = source ? source.length : 0;
            return len && (!predicate || _get(Object.getPrototypeOf(ArrayEnumerable.prototype), "any", this).call(this, predicate));
        }
    }, {
        key: "count",
        value: function count(predicate) {
            var _ = this;
            _.throwIfDisposed();
            var source = _._source,
                len = source ? source.length : 0;
            return len && (predicate ? _get(Object.getPrototypeOf(ArrayEnumerable.prototype), "count", this).call(this, predicate) : len);
        }
    }, {
        key: "elementAt",
        value: function elementAt(index) {
            var _ = this;
            _.throwIfDisposed();
            var source = _._source;
            return index < source.length && index >= 0 ? source[index] : _get(Object.getPrototypeOf(ArrayEnumerable.prototype), "elementAt", this).call(this, index);
        }
    }, {
        key: "elementAtOrDefault",
        value: function elementAtOrDefault(index) {
            var defaultValue = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            var _ = this;
            _.throwIfDisposed();
            var source = _._source;
            return index < source.length && index >= 0 ? source[index] : defaultValue;
        }
    }, {
        key: "last",
        value: function last() {
            var _ = this;
            _.throwIfDisposed();
            var source = _._source,
                len = source.length;
            return len ? source[len - 1] : _get(Object.getPrototypeOf(ArrayEnumerable.prototype), "last", this).call(this);
        }
    }, {
        key: "lastOrDefault",
        value: function lastOrDefault() {
            var defaultValue = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            var _ = this;
            _.throwIfDisposed();
            var source = _._source,
                len = source.length;
            return len ? source[len - 1] : defaultValue;
        }
    }, {
        key: "skip",
        value: function skip(count) {
            var _ = this;
            if (!(count > 0)) return _;
            return new Enumerable(function () {
                return new ArrayEnumerator_1.default(function () {
                    return _._source;
                }, count);
            });
        }
    }, {
        key: "takeExceptLast",
        value: function takeExceptLast() {
            var count = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

            var _ = this,
                len = _._source ? _._source.length : 0;
            return _.take(len - count);
        }
    }, {
        key: "skipToLast",
        value: function skipToLast(count) {
            if (!(count > 0)) return Enumerable.empty();
            var _ = this;
            if (!isFinite(count)) return _;
            var len = _._source ? _._source.length : 0;
            return _.skip(len - count);
        }
    }, {
        key: "reverse",
        value: function reverse() {
            var _ = this;
            return new Enumerable(function () {
                return new ArrayEnumerator_1.default(function () {
                    return _._source;
                }, _._source ? _._source.length - 1 : 0, -1);
            });
        }
    }, {
        key: "memoize",
        value: function memoize() {
            return this;
        }
    }, {
        key: "sequenceEqual",
        value: function sequenceEqual(second) {
            var equalityComparer = arguments.length <= 1 || arguments[1] === undefined ? Values.areEqual : arguments[1];

            if (Types_1.default.isArrayLike(second)) return Arrays.areEqual(this.source, second, true, equalityComparer);
            if (second instanceof ArrayEnumerable) return second.sequenceEqual(this.source, equalityComparer);
            return _get(Object.getPrototypeOf(ArrayEnumerable.prototype), "sequenceEqual", this).call(this, second, equalityComparer);
        }
    }, {
        key: "toJoinedString",
        value: function toJoinedString() {
            var separator = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
            var selector = arguments.length <= 1 || arguments[1] === undefined ? Functions.Identity : arguments[1];

            var s = this._source;
            return !selector && Array.isArray(s) ? s.join(separator) : _get(Object.getPrototypeOf(ArrayEnumerable.prototype), "toJoinedString", this).call(this, separator, selector);
        }
    }, {
        key: "source",
        get: function get() {
            return this._source;
        }
    }]);

    return ArrayEnumerable;
}(FiniteEnumerable);

var Grouping = function (_ArrayEnumerable) {
    _inherits(Grouping, _ArrayEnumerable);

    function Grouping(_groupKey, elements) {
        _classCallCheck(this, Grouping);

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(Grouping).call(this, elements));

        _this7._groupKey = _groupKey;
        return _this7;
    }

    _createClass(Grouping, [{
        key: "key",
        get: function get() {
            return this._groupKey;
        }
    }]);

    return Grouping;
}(ArrayEnumerable);

var Lookup = function () {
    function Lookup(_dictionary) {
        _classCallCheck(this, Lookup);

        this._dictionary = _dictionary;
    }

    _createClass(Lookup, [{
        key: "get",
        value: function get(key) {
            return this._dictionary.getValue(key);
        }
    }, {
        key: "contains",
        value: function contains(key) {
            return this._dictionary.containsKey(key);
        }
    }, {
        key: "getEnumerator",
        value: function getEnumerator() {
            var _ = this;
            var enumerator;
            return new EnumeratorBase_1.default(function () {
                enumerator = _._dictionary.getEnumerator();
            }, function (yielder) {
                if (!enumerator.moveNext()) return false;
                var current = enumerator.current;
                return yielder.yieldReturn(new Grouping(current.key, current.value));
            }, function () {
                dispose_1.dispose(enumerator);
            });
        }
    }, {
        key: "count",
        get: function get() {
            return this._dictionary.count;
        }
    }]);

    return Lookup;
}();

var WhereEnumerable = function (_Enumerable2) {
    _inherits(WhereEnumerable, _Enumerable2);

    function WhereEnumerable(prevSource, prevPredicate) {
        _classCallCheck(this, WhereEnumerable);

        var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(WhereEnumerable).call(this, null, null, prevSource && prevSource.isEndless));

        _this8.prevSource = prevSource;
        _this8.prevPredicate = prevPredicate;
        return _this8;
    }

    _createClass(WhereEnumerable, [{
        key: "where",
        value: function where(predicate) {
            if (predicate.length > 1) return _get(Object.getPrototypeOf(WhereEnumerable.prototype), "where", this).call(this, predicate);
            var prevPredicate = this.prevPredicate;
            var composedPredicate = function composedPredicate(x) {
                return prevPredicate(x) && predicate(x);
            };
            return new WhereEnumerable(this.prevSource, composedPredicate);
        }
    }, {
        key: "select",
        value: function select(selector) {
            if (selector.length > 1) return _get(Object.getPrototypeOf(WhereEnumerable.prototype), "select", this).call(this, selector);
            return new WhereSelectEnumerable(this.prevSource, this.prevPredicate, selector);
        }
    }, {
        key: "getEnumerator",
        value: function getEnumerator() {
            var _ = this;
            var predicate = _.prevPredicate;
            var source = _.prevSource;
            var enumerator;
            return new EnumeratorBase_1.default(function () {
                enumerator = source.getEnumerator();
            }, function (yielder) {
                while (enumerator.moveNext()) {
                    if (predicate(enumerator.current)) return yielder.yieldReturn(enumerator.current);
                }
                return false;
            }, function () {
                dispose_1.dispose(enumerator);
            }, _._isEndless);
        }
    }, {
        key: "_onDispose",
        value: function _onDispose() {
            _get(Object.getPrototypeOf(WhereEnumerable.prototype), "_onDispose", this).call(this);
            this.prevPredicate = null;
            this.prevSource = null;
        }
    }]);

    return WhereEnumerable;
}(Enumerable);

var WhereSelectEnumerable = function (_Enumerable3) {
    _inherits(WhereSelectEnumerable, _Enumerable3);

    function WhereSelectEnumerable(prevSource, prevPredicate, prevSelector) {
        _classCallCheck(this, WhereSelectEnumerable);

        var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(WhereSelectEnumerable).call(this, null, null, prevSource && prevSource.isEndless));

        _this9.prevSource = prevSource;
        _this9.prevPredicate = prevPredicate;
        _this9.prevSelector = prevSelector;
        return _this9;
    }

    _createClass(WhereSelectEnumerable, [{
        key: "where",
        value: function where(predicate) {
            if (predicate.length > 1) return _get(Object.getPrototypeOf(WhereSelectEnumerable.prototype), "where", this).call(this, predicate);
            return new WhereEnumerable(this, predicate);
        }
    }, {
        key: "select",
        value: function select(selector) {
            if (selector.length > 1) return _get(Object.getPrototypeOf(WhereSelectEnumerable.prototype), "select", this).call(this, selector);
            var _ = this;
            var prevSelector = _.prevSelector;
            var composedSelector = function composedSelector(x) {
                return selector(prevSelector(x));
            };
            return new WhereSelectEnumerable(_.prevSource, _.prevPredicate, composedSelector);
        }
    }, {
        key: "getEnumerator",
        value: function getEnumerator() {
            var _ = this,
                predicate = _.prevPredicate,
                source = _.prevSource,
                selector = _.prevSelector,
                enumerator;
            return new EnumeratorBase_1.default(function () {
                enumerator = source.getEnumerator();
            }, function (yielder) {
                while (enumerator.moveNext()) {
                    var c = enumerator.current;
                    if (predicate == null || predicate(c)) {
                        return yielder.yieldReturn(selector(c));
                    }
                }
                return false;
            }, function () {
                dispose_1.dispose(enumerator);
            }, _._isEndless);
        }
    }, {
        key: "_onDispose",
        value: function _onDispose() {
            var _ = this;
            _get(Object.getPrototypeOf(WhereSelectEnumerable.prototype), "_onDispose", this).call(this);
            _.prevPredicate = null;
            _.prevSource = null;
            _.prevSelector = null;
        }
    }]);

    return WhereSelectEnumerable;
}(Enumerable);

var OrderedEnumerable = function (_FiniteEnumerable2) {
    _inherits(OrderedEnumerable, _FiniteEnumerable2);

    function OrderedEnumerable(source, keySelector, order, parent) {
        var comparer = arguments.length <= 4 || arguments[4] === undefined ? Values.compare : arguments[4];

        _classCallCheck(this, OrderedEnumerable);

        var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(OrderedEnumerable).call(this, null));

        _this10.source = source;
        _this10.keySelector = keySelector;
        _this10.order = order;
        _this10.parent = parent;
        _this10.comparer = comparer;
        Enumerator_1.throwIfEndless(source && source.isEndless);
        return _this10;
    }

    _createClass(OrderedEnumerable, [{
        key: "createOrderedEnumerable",
        value: function createOrderedEnumerable(keySelector, order) {
            return new OrderedEnumerable(this.source, keySelector, order, this);
        }
    }, {
        key: "thenBy",
        value: function thenBy(keySelector) {
            return this.createOrderedEnumerable(keySelector, 1);
        }
    }, {
        key: "thenUsing",
        value: function thenUsing(comparison) {
            return new OrderedEnumerable(this.source, null, 1, this, comparison);
        }
    }, {
        key: "thenByDescending",
        value: function thenByDescending(keySelector) {
            return this.createOrderedEnumerable(keySelector, -1);
        }
    }, {
        key: "thenUsingReversed",
        value: function thenUsingReversed(comparison) {
            return new OrderedEnumerable(this.source, null, -1, this, comparison);
        }
    }, {
        key: "getEnumerator",
        value: function getEnumerator() {
            var _ = this;
            var buffer;
            var indexes;
            var index = 0;
            return new EnumeratorBase_1.default(function () {
                index = 0;
                buffer = Enumerable.toArray(_.source);
                indexes = createSortContext(_).generateSortedIndexes(buffer);
            }, function (yielder) {
                return index < indexes.length ? yielder.yieldReturn(buffer[indexes[index++]]) : false;
            }, function () {
                if (buffer) buffer.length = 0;
                buffer = null;
                if (indexes) indexes.length = 0;
                indexes = null;
            }, false);
        }
    }, {
        key: "_onDispose",
        value: function _onDispose() {
            _get(Object.getPrototypeOf(OrderedEnumerable.prototype), "_onDispose", this).call(this);
            this.source = null;
            this.keySelector = null;
            this.order = null;
            this.parent = null;
        }
    }]);

    return OrderedEnumerable;
}(FiniteEnumerable);

function createSortContext(orderedEnumerable) {
    var currentContext = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    var context = new KeySortedContext_1.default(currentContext, orderedEnumerable.keySelector, orderedEnumerable.order, orderedEnumerable.comparer);
    if (orderedEnumerable.parent) return createSortContext(orderedEnumerable.parent, context);
    return context;
}
function throwIfDisposed(disposed) {
    var className = arguments.length <= 1 || arguments[1] === undefined ? "Enumerable" : arguments[1];

    if (disposed) throw new ObjectDisposedException_1.default(className);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Enumerable;
//# sourceMappingURL=Linq.js.map
