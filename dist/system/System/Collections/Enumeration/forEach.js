System.register(['../../Disposable/Utility', '../../Collections/Enumeration/Enumerator'], function(exports_1) {
    "use strict";
    var Utility_1, Enumerator;
    function forEach(enumerable, action) {
        if (enumerable) {
            Utility_1.using(Enumerator.from(enumerable), function (e) {
                Enumerator.forEach(e, action);
            });
        }
    }
    exports_1("default", forEach);
    return {
        setters:[
            function (Utility_1_1) {
                Utility_1 = Utility_1_1;
            },
            function (Enumerator_1) {
                Enumerator = Enumerator_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=forEach.js.map