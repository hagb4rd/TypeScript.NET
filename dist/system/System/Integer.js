/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
System.register(["./Exceptions/ArgumentException", "./Exceptions/ArgumentOutOfRangeException"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function Integer(n) {
        return Math.floor(n);
    }
    exports_1("Integer", Integer);
    var ArgumentException_1, ArgumentOutOfRangeException_1;
    return {
        setters: [
            function (ArgumentException_1_1) {
                ArgumentException_1 = ArgumentException_1_1;
            },
            function (ArgumentOutOfRangeException_1_1) {
                ArgumentOutOfRangeException_1 = ArgumentOutOfRangeException_1_1;
            }
        ],
        execute: function () {/*!
             * @author electricessence / https://github.com/electricessence/
             * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
             */
            (function (Integer) {
                Integer.MAX_32_BIT = 2147483647;
                Integer.MAX_VALUE = 9007199254740991;
                var NUMBER = "number";
                /**
                 * Converts any number to its 32bit counterpart.
                 * Throws if conversion is not possible.
                 * @param n
                 * @returns {number}
                 */
                function as32Bit(n) {
                    var result = n | 0;
                    if (isNaN(n))
                        throw "'n' is not a number.";
                    if (n !== -1 && result === -1)
                        throw "'n' is too large to be a 32 bit integer.";
                    return result;
                }
                Integer.as32Bit = as32Bit;
                /**
                 * Returns true if the value is an integer.
                 * @param n
                 * @returns {boolean}
                 */
                function is(n) {
                    return typeof n === NUMBER && isFinite(n) && n === Math.floor(n);
                }
                Integer.is = is;
                /**
                 * Returns true if the value is within a 32 bit range.
                 * @param n
                 * @returns {boolean}
                 */
                function is32Bit(n) {
                    return n === (n | 0);
                }
                Integer.is32Bit = is32Bit;
                /**
                 * Throws if not an integer.
                 * @param n
                 * @param argumentName
                 * @returns {boolean}
                 */
                function assert(n, argumentName) {
                    var i = is(n);
                    if (!i)
                        throw new ArgumentException_1.ArgumentException(argumentName || 'n', "Must be a integer.");
                    return i;
                }
                Integer.assert = assert;
                /**
                 * Throws if less than zero.
                 * @param n
                 * @param argumentName
                 * @returns {boolean}
                 */
                function assertZeroOrGreater(n, argumentName) {
                    var i = assert(n, argumentName) && n >= 0;
                    if (!i)
                        throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException(argumentName || 'n', n, "Must be a valid integer greater than or equal to zero.");
                    return i;
                }
                Integer.assertZeroOrGreater = assertZeroOrGreater;
                /**
                 * Throws if not greater than zero.
                 * @param n
                 * @param argumentName
                 * @returns {boolean}
                 */
                function assertPositive(n, argumentName) {
                    var i = assert(n, argumentName) && n > 0;
                    if (!i)
                        throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException(argumentName || 'n', n, "Must be greater than zero.");
                    return i;
                }
                Integer.assertPositive = assertPositive;
            })(Integer || (Integer = {}));
            exports_1("Integer", Integer);
            exports_1("default", Integer);
        }
    };
});
//# sourceMappingURL=Integer.js.map