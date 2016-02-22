var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)};!function(t){if("object"==typeof module&&"object"==typeof module.exports){var e=t(require,exports);void 0!==e&&(module.exports=e)}else"function"==typeof define&&define.amd&&define(["require","exports","../System/Compare","../System/Collections/Array/Compare","../System/Collections/Array/Utility","../System/Collections/Enumeration/Enumerator","../System/Types","../System/Integer","../System/Functions","../System/Collections/Enumeration/ArrayEnumerator","../System/Collections/Enumeration/EnumeratorBase","../System/Collections/Dictionaries/Dictionary","../System/Collections/Queue","../System/Disposable/Utility","../System/Disposable/DisposableBase","../System/Exception","../System/Disposable/ObjectDisposedException","../System/Collections/Sorting/KeySortedContext"],t)}(function(t,e){"use strict";function n(t,e){void 0===e&&(e=null);var r=new g["default"](e,t.keySelector,t.order,t.comparer);return t.parent?n(t.parent,r):r}function r(t,e){if(void 0===e&&(e="Enumerable"),t)throw new w["default"](e)}var o=t("../System/Compare"),u=t("../System/Collections/Array/Compare"),i=t("../System/Collections/Array/Utility"),a=t("../System/Collections/Enumeration/Enumerator"),f=t("../System/Types"),c=t("../System/Integer"),s=t("../System/Functions"),l=t("../System/Collections/Enumeration/ArrayEnumerator"),p=t("../System/Collections/Enumeration/EnumeratorBase"),d=t("../System/Collections/Dictionaries/Dictionary"),y=t("../System/Collections/Queue"),h=t("../System/Disposable/Utility"),v=t("../System/Disposable/DisposableBase"),m=t("../System/Exception"),w=t("../System/Disposable/ObjectDisposedException"),g=t("../System/Collections/Sorting/KeySortedContext"),E=void 0,N=function(t){function e(){t.apply(this,arguments)}return __extends(e,t),e.prototype.Greater=function(t,e){return t>e?t:e},e.prototype.Lesser=function(t,e){return e>t?t:e},e}(s["default"]),x=new N;Object.freeze(x);var D=function(t){function e(){t.call(this,"Unsupported enumerable.")}return __extends(e,t),e}(m["default"]),I=function(t){function e(e,n){t.call(this,n),this._enumeratorFactory=e}return __extends(e,t),e.fromArray=function(t){return new R(t)},e.from=function(t){if(f["default"].isObject(t)){if(t instanceof e)return t;if(Array.isArray(t))return new R(t);if(a.isEnumerable(t))return new e(function(){return t.getEnumerator()});if(f["default"].isArrayLike(t))return new R(t)}throw new D},e.toArray=function(t){if(f["default"].isObject(t)){if(Array.isArray(t))return t.slice();if(f["default"].isArrayLike(t)&&(t=new R(t)),t instanceof e)return t.toArray();if(a.isEnumerable(t)){var n=[];return a.forEach(t.getEnumerator(),function(t,e){n[e]=t}),n}}throw new D},e.prototype.getEnumerator=function(){return this.throwIfDisposed(),this._enumeratorFactory()},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._enumeratorFactory=null},e.choice=function(t){return new e(function(){return new p["default"](null,function(e){return e.yieldReturn(t[c["default"].random(t.length)])})})},e.cycle=function(t){return new e(function(){var e=0;return new p["default"](function(){e=0},function(n){return e>=t.length&&(e=0),n.yieldReturn(t[e++])})})},e.empty=function(){return new e(function(){return new p["default"](null,x.False)})},e.repeat=function(t,n){return void 0===n&&(n=1/0),isNaN(n)||0>=n?e.empty():new e(isFinite(n)&&c["default"].assert(n,"count")?function(){var e=n,r=0;return new p["default"](function(){r=0},function(n){return r++<e&&n.yieldReturn(t)})}:function(){return new p["default"](null,function(e){return e.yieldReturn(t)})})},e.repeatWithFinalize=function(t,n){return new e(function(){var e;return new p["default"](function(){e=t()},function(t){return t.yieldReturn(e)},function(){n(e)})})},e.make=function(t){return e.repeat(t,1)},e.range=function(t,n,r){if(void 0===t&&(t=0),void 0===n&&(n=1/0),void 0===r&&(r=1),!isFinite(t))throw new Error("Must have a valid 'start' value.");if(isNaN(n)||0>=n)return e.empty();if(!isFinite(r))throw new Error("Must have a valid 'step' value.");return new e(isFinite(n)&&c["default"].assert(n,"count")?function(){var e,o=n,u=0;return new p["default"](function(){u=0,e=t},function(t){var i=u++<o&&t.yieldReturn(e);return i&&n>u&&(e+=r),i})}:function(){var e;return new p["default"](function(){e=t},function(t){var n=e;return e+=r,t.yieldReturn(n)})})},e.rangeDown=function(t,n,r){return void 0===t&&(t=0),void 0===n&&(n=1/0),void 0===r&&(r=1),r=-1*Math.abs(r),e.range(t,n,r)},e.toInfinity=function(t,n){return void 0===t&&(t=0),void 0===n&&(n=1),e.range(t,1/0,n)},e.toNegativeInfinity=function(t,n){return void 0===t&&(t=0),void 0===n&&(n=1),e.rangeDown(t,1/0,n)},e.rangeTo=function(t,n,r){if(void 0===t&&(t=0),void 0===n&&(n=1/0),void 0===r&&(r=1),!isFinite(t))throw new Error("Must have a valid 'start' value.");if(isNaN(n))throw new Error("Must have a valid 'to' value.");if(!isFinite(r))throw new Error("Must have a valid 'step' value.");return r=Math.abs(r),isFinite(n)?new e(function(){var e;return n>t?new p["default"](function(){e=t},function(t){var o=n>=e&&t.yieldReturn(e);return o&&(e+=r),o}):new p["default"](function(){e=t},function(t){var o=e>=n&&t.yieldReturn(e);return o&&(e-=r),o})}):e.range(t,1/0,n>t?+r:-r)},e.matches=function(t,n,r){void 0===r&&(r="");var o=typeof t;if(o!=f["default"].STRING)throw new Error("Cannot exec RegExp matches of type '"+o+"'.");return n instanceof RegExp&&(r+=n.ignoreCase?"i":"",r+=n.multiline?"m":"",n=n.source),-1===r.indexOf("g")&&(r+="g"),new e(function(){var e;return new p["default"](function(){e=new RegExp(n,r)},function(n){var r=e.exec(t);return null!==r?n.yieldReturn(r):!1})})},e.generate=function(t,n){return void 0===n&&(n=1/0),isNaN(n)||0>=n?e.empty():new e(isFinite(n)&&c["default"].assert(n,"count")?function(){var e=n,r=0;return new p["default"](function(){r=0},function(n){var o=r++;return e>o&&n.yieldReturn(t(o))})}:function(){var e=0;return new p["default"](function(){e=0},function(n){return n.yieldReturn(t(e++))})})},e.unfold=function(t,n,r){return void 0===r&&(r=!1),new e(function(){var e,o,u=0;return new p["default"](function(){u=0,e=t,o=!r},function(t){var r=u++;return o?o=!1:e=n(e,r),t.yieldReturn(e)})})},e.defer=function(t){return new e(function(){var e;return new p["default"](function(){e=t().getEnumerator()},function(t){return e.moveNext()&&t.yieldReturn(e.current)},function(){h.dispose(e)})})},e.forEach=function(t,e){t&&h.using(a.from(t),function(t){a.forEach(t,e)})},e.map=function(t,e){return t&&h.using(a.from(t),function(t){var n=[];return a.forEach(t,function(t,r){n[r]=e(t)}),n})},e.max=function(t){return t.takeUntil(function(t){return t==+(1/0)},!0).aggregate(x.Greater)},e.min=function(t){return t.takeUntil(function(t){return t==-(1/0)},!0).aggregate(x.Lesser)},e.prototype.forEach=function(t){var e=this;e.throwIfDisposed();var n=0;h.using(e.getEnumerator(),function(r){for(;e.throwIfDisposed()&&r.moveNext()&&t(r.current,n++)!==!1;);})},e.prototype.toArray=function(t){var e=[];return t?this.where(t).toArray():(this.forEach(function(t,n){e[n]=t}),e)},e.prototype.asEnumerable=function(){var t=this;return new e(function(){return t.getEnumerator()})},e.prototype.toLookup=function(t,e,n){void 0===e&&(e=x.Identity),void 0===n&&(n=x.Identity);var r=new d["default"](n);return this.forEach(function(n){var o=t(n),u=e(n),i=r.getValue(o);i!==E?i.push(u):r.addByKeyValue(o,[u])}),new S(r)},e.prototype.toMap=function(t,e){var n={};return this.forEach(function(r){n[t(r)]=e(r)}),n},e.prototype.toDictionary=function(t,e,n){void 0===n&&(n=x.Identity);var r=new d["default"](n);return this.forEach(function(n){return r.addByKeyValue(t(n),e(n))}),r},e.prototype.toJoinedString=function(t,e){return void 0===t&&(t=""),void 0===e&&(e=x.Identity),this.select(e).toArray().join(t)},e.prototype.doAction=function(t){var n=this,o=!n.throwIfDisposed();return new e(function(){var e,u=0;return new p["default"](function(){r(o),u=0,e=n.getEnumerator()},function(n){for(r(o);e.moveNext();){var i=t(e.current,u++);if(i===!1||0===i)return n.yieldBreak();if(2!==i)return n.yieldReturn(e.current)}return!1},function(){h.dispose(e)})},function(){o=!0})},e.prototype.force=function(t){void 0===t&&(t=0),this.throwIfDisposed(),this.doAction(function(e){return t})},e.prototype.skip=function(t){var n=this;if(n.throwIfDisposed(),!t||isNaN(t)||0>t)return n;if(!isFinite(t))return e.empty();c["default"].assert(t,"count");var r=t;return this.doAction(function(t,e){return r>e?2:1})},e.prototype.skipWhile=function(t){this.throwIfDisposed();var e=!0;return this.doAction(function(n,r){return e&&(e=t(n,r)),e?2:1})},e.prototype.take=function(t){if(!t||isNaN(t)||0>t)return e.empty();var n=this;if(n.throwIfDisposed(),!isFinite(t))return n;c["default"].assert(t,"count");var r=t;return n.doAction(function(t,e){return r>e})},e.prototype.takeWhile=function(t){return this.throwIfDisposed(),this.doAction(function(e,n){return t(e,n)?1:0})},e.prototype.takeUntil=function(t,e){if(this.throwIfDisposed(),!e)return this.doAction(function(e,n){return t(e,n)?0:1});var n=!1;return this.doAction(function(e,r){return n?0:(n=t(e,r),1)})},e.prototype.takeExceptLast=function(t){void 0===t&&(t=1);var n=this;if(!t||isNaN(t)||0>=t)return n;if(!isFinite(t))return e.empty();c["default"].assert(t,"count");var r=t;return new e(function(){var t,e;return new p["default"](function(){t=n.getEnumerator(),e=new y["default"]},function(n){for(;t.moveNext();)if(e.enqueue(t.current),e.count>r)return n.yieldReturn(e.dequeue());return!1},function(){h.dispose(t,e)})})},e.prototype.takeFromLast=function(t){if(!t||isNaN(t)||0>=t)return e.empty();var n=this;return isFinite(t)?(c["default"].assert(t,"count"),n.reverse().take(t)):n.reverse()},e.prototype.traverseBreadthFirst=function(t,n){var r=this;return new e(function(){var o,u,i,a=0;return new p["default"](function(){a=0,u=[],i=0,o=r.getEnumerator()},function(r){for(;;){if(o.moveNext())return u[i++]=o.current,r.yieldReturn(n(o.current,a));if(!i)return r.yieldBreak();var f=e.fromArray(u).selectMany(t);if(!f.any())return r.yieldBreak();a++,u=[],i=0,o.dispose(),o=f.getEnumerator()}},function(){h.dispose(o),u.length=0})})},e.prototype.traverseDepthFirst=function(t,n){var r=this;return new e(function(){var e,o,u=[];return new p["default"](function(){e=r.getEnumerator(),o=0},function(r){for(;;){if(e.moveNext()){var i=n(e.current,o);return u[o++]=e,e=t(e.current).getEnumerator(),r.yieldReturn(i)}if(0==o)return!1;e.dispose(),e=u[--o],u.length=o}},function(){try{h.dispose(e)}finally{h.disposeThese(u)}})})},e.prototype.flatten=function(){var t=this;return new e(function(){var n,r=null;return new p["default"](function(){n=t.getEnumerator()},function(t){for(;;){if(null!=r){if(r.moveNext())return t.yieldReturn(r.current);r=null}if(n.moveNext()){var o=n.current;if(Array.isArray(o)){r.dispose(),r=e.fromArray(o).selectMany(x.Identity).flatten().getEnumerator();continue}return t.yieldReturn(n.current)}return!1}},function(){h.dispose(n,r)})})},e.prototype.pairwise=function(t){var n=this;return new e(function(){var e;return new p["default"](function(){e=n.getEnumerator(),e.moveNext()},function(n){var r=e.current;return e.moveNext()&&n.yieldReturn(t(r,e.current))},function(){h.dispose(e)})})},e.prototype.scan=function(t,n){var r=n!==E,o=this;return new e(function(){var e,u,i;return new p["default"](function(){e=o.getEnumerator(),i=!0},function(o){return i?(i=!1,r?o.yieldReturn(u=n):e.moveNext()&&o.yieldReturn(u=e.current)):e.moveNext()?o.yieldReturn(u=t(u,e.current)):!1},function(){h.dispose(e)})})},e.prototype.select=function(t){var n=this,o=!n.throwIfDisposed();return t.length<2?new A(n,null,t):new e(function(){var e,u=0;return new p["default"](function(){r(o),u=0,e=n.getEnumerator()},function(n){return r(o),e.moveNext()?n.yieldReturn(t(e.current,u++)):!1},function(){h.dispose(e)})},function(){o=!0})},e.prototype.selectMany=function(t,n){var r=this;return n||(n=function(t,e){return e}),new e(function(){var e,o,u=0;return new p["default"](function(){e=r.getEnumerator(),o=void 0,u=0},function(r){if(o===E&&!e.moveNext())return!1;do{if(!o){var i=t(e.current,u++);if(!i)continue;o=a.from(i)}if(o.moveNext())return r.yieldReturn(n(e.current,o.current));o.dispose(),o=null}while(e.moveNext());return!1},function(){h.dispose(e,o),e=null,o=null})})},e.prototype.choose=function(t){var n=this,o=!n.throwIfDisposed();return new e(function(){var e,u=0;return new p["default"](function(){r(o),u=0,e=n.getEnumerator()},function(n){for(r(o);e.moveNext();){var i=t(e.current,u++);if(null!==i&&i!==E)return n.yieldReturn(i)}return!1},function(){h.dispose(e)})},function(){o=!0})},e.prototype.where=function(t){var n=this,o=!n.throwIfDisposed();return t.length<2?new b(n,t):new e(function(){var e,u=0;return new p["default"](function(){r(o),u=0,e=n.getEnumerator()},function(n){for(r(o);e.moveNext();)if(t(e.current,u++))return n.yieldReturn(e.current);return!1},function(){h.dispose(e)})},function(){o=!0})},e.prototype.ofType=function(t){var e;switch(t){case Number:e=f["default"].NUMBER;break;case String:e=f["default"].STRING;break;case Boolean:e=f["default"].BOOLEAN;break;case Function:e=f["default"].FUNCTION;break;default:return this.where(function(e){return e instanceof t})}return this.where(function(t){return typeof t===e})},e.prototype.except=function(t,n){var o=this,u=!o.throwIfDisposed();return new e(function(){var i,a;return new p["default"](function(){r(u),i=o.getEnumerator(),a=new d["default"](n),t&&e.forEach(t,function(t){return a.addByKeyValue(t,!0)})},function(t){for(r(u);i.moveNext();){var e=i.current;if(!a.containsKey(e))return a.addByKeyValue(e,!0),t.yieldReturn(e)}return!1},function(){h.dispose(i),a.clear()})},function(){u=!0})},e.prototype.distinct=function(t){return this.except(null,t)},e.prototype.distinctUntilChanged=function(t){var n=this,o=!n.throwIfDisposed();return new e(function(){var e,u,i=!0;return new p["default"](function(){r(o),e=n.getEnumerator()},function(n){for(r(o);e.moveNext();){var a=t(e.current);if(i)i=!1;else if(u===a)continue;return u=a,n.yieldReturn(e.current)}return!1},function(){h.dispose(e)})},function(){o=!0})},e.prototype.reverse=function(){var t=this,n=!t.throwIfDisposed();return new e(function(){var e,o=0;return new p["default"](function(){r(n),e=t.toArray(),o=e.length},function(t){return o>0&&t.yieldReturn(e[--o])},function(){e.length=0})},function(){n=!0})},e.prototype.shuffle=function(){var t=this,n=!t.throwIfDisposed();return new e(function(){var e,o,u;return new p["default"](function(){r(n),e=t.toArray(),o=u=e.length},function(t){if(!u)return t.yieldBreak();var n=c["default"].random(u),r=e[n];return e[n]=e[--u],e[u]=null,u%32==0&&(e.length=u),t.yieldReturn(r)},function(){e.length=0})},function(){n=!0})},e.prototype.count=function(t){var e=this;e.throwIfDisposed();var n=0;return t?e.forEach(function(e,r){t(e,r)&&++n}):e.forEach(function(){++n}),n},e.prototype.all=function(t){var e=!0;return this.forEach(function(n){return t(n)?void 0:(e=!1,!1)}),e},e.prototype.every=function(t){return this.all(t)},e.prototype.any=function(t){var e=!1;return t?this.forEach(function(n){return e=t(n),!e}):this.forEach(function(){return e=!0,!1}),e},e.prototype.some=function(t){return this.any(t)},e.prototype.isEmpty=function(){return!this.any()},e.prototype.contains=function(t,e){return e?this.any(function(n){return e(n)===e(t)}):this.any(function(e){return e===t})},e.prototype.indexOf=function(t,e){var n=-1;return e?this.forEach(function(r,u){return o.areEqual(e(r),e(t),!0)?(n=u,!1):void 0}):this.forEach(function(e,r){return o.areEqual(e,t,!0)?(n=r,!1):void 0}),n},e.prototype.lastIndexOf=function(t,e){var n=-1;return e?this.forEach(function(r,u){o.areEqual(e(r),e(t),!0)&&(n=u)}):this.forEach(function(e,r){o.areEqual(e,t,!0)&&(n=r)}),n},e.prototype.defaultIfEmpty=function(t){void 0===t&&(t=null);var n=this,o=!n.throwIfDisposed();return new e(function(){var e,u;return new p["default"](function(){u=!0,r(o),e=n.getEnumerator()},function(n){return r(o),e.moveNext()?(u=!1,n.yieldReturn(e.current)):u?(u=!1,n.yieldReturn(t)):!1},function(){h.dispose(e)})})},e.prototype.zip=function(t,n){var r=this;return new e(function(){var e,o,u=0;return new p["default"](function(){u=0,e=r.getEnumerator(),o=a.from(t)},function(t){return e.moveNext()&&o.moveNext()&&t.yieldReturn(n(e.current,o.current,u++))},function(){h.dispose(e,o)})})},e.prototype.zipMultiple=function(t,n){var r=this;return t.length?new e(function(){var e,o,u,i=0;return new p["default"](function(){e=new y["default"](t),i=0,o=r.getEnumerator(),u=null},function(t){if(o.moveNext())for(;;){for(;!u;){if(!e.count)return t.yieldBreak();var r=e.dequeue();r&&(u=a.from(r))}if(u.moveNext())return t.yieldReturn(n(o.current,u.current,i++));u.dispose(),u=null}return t.yieldBreak()},function(){h.dispose(o,e)})}):e.empty()},e.prototype.join=function(t,n,r,o,u){void 0===u&&(u=x.Identity);var i=this;return new e(function(){var a,f,c=null,s=0;return new p["default"](function(){a=i.getEnumerator(),f=e.from(t).toLookup(r,x.Identity,u)},function(t){for(;;){if(null!=c){var e=c[s++];if(e!==E)return t.yieldReturn(o(a.current,e));e=null,s=0}if(!a.moveNext())return t.yieldBreak();var r=n(a.current);c=f.get(r)}},function(){h.dispose(a)})})},e.prototype.groupJoin=function(t,n,r,o,u){void 0===u&&(u=x.Identity);var i=this;return new e(function(){var a,f=null;return new p["default"](function(){a=i.getEnumerator(),f=e.from(t).toLookup(r,x.Identity,u)},function(t){return a.moveNext()&&t.yieldReturn(o(a.current,f.get(n(a.current))))},function(){h.dispose(a)})})},e.prototype.concatWith=function(t){var n=this;return new e(function(){var e,r;return new p["default"](function(){e=n.getEnumerator()},function(n){if(null!=e){if(e.moveNext())return n.yieldReturn(e.current);r=a.from(t),e.dispose(),e=null}return r.moveNext()?n.yieldReturn(r.current):!1},function(){h.dispose(e,r)})})},e.prototype.merge=function(t){var n=this;return t.length?1==t.length?n.concatWith(t[0]):new e(function(){var e,r;return new p["default"](function(){e=n.getEnumerator(),r=new y["default"](t)},function(t){for(;;){for(;!e&&r.count;)e=a.from(r.dequeue());if(e&&e.moveNext())return t.yieldReturn(e.current);{if(!e)return t.yieldBreak();e.dispose(),e=null}}},function(){h.dispose(e,r)})}):n},e.prototype.concat=function(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];var n=this;return 0==t.length?n:1==t.length?n.concatWith(t[0]):n.merge(t)},e.prototype.insertAt=function(t,n){if(isNaN(t)||0>t||!isFinite(t))throw new Error("'index' is invalid or out of bounds.");c["default"].assert(t,"index");var r=t,o=this;return o.throwIfDisposed(),new e(function(){var t,e,u=0,i=!1;return new p["default"](function(){u=0,t=o.getEnumerator(),e=a.from(n),i=!1},function(n){return u==r&&(i=!0,e.moveNext())?n.yieldReturn(e.current):t.moveNext()?(u++,n.yieldReturn(t.current)):!i&&e.moveNext()&&n.yieldReturn(e.current)},function(){h.dispose(t,e)})})},e.prototype.alternateMultiple=function(t){var n=this;return new e(function(){var r,o,u,i;return new p["default"](function(){i=new l["default"](e.toArray(t)),u=n.getEnumerator();var a=u.moveNext();o=a?1:0,a&&(r=u.current)},function(t){switch(o){case 0:return t.yieldBreak();case 2:if(i.moveNext())return t.yieldReturn(i.current);i.reset(),o=1}var e=r,n=u.moveNext();return o=n?2:0,n&&(r=u.current),t.yieldReturn(e)},function(){h.dispose(u,i)})})},e.prototype.alternateSingle=function(t){return this.alternateMultiple(e.make(t))},e.prototype.alternate=function(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];return this.alternateMultiple(t)},e.prototype.intersect=function(t,n){var r=this;return new e(function(){var o,u,i;return new p["default"](function(){o=r.getEnumerator(),u=new d["default"](n),i=new d["default"](n),e.from(t).forEach(function(t){u.addByKeyValue(t,!0)})},function(t){for(;o.moveNext();){var e=o.current;if(!i.containsKey(e)&&u.containsKey(e))return i.addByKeyValue(e,!0),t.yieldReturn(e)}return t.yieldBreak()},function(){h.dispose(o)})})},e.prototype.sequenceEqual=function(t,n){return void 0===n&&(n=o.areEqual),h.using(this.getEnumerator(),function(r){return h.using(e.from(t).getEnumerator(),function(t){for(;r.moveNext();)if(!t.moveNext()||!n(r.current,t.current))return!1;return!t.moveNext()})})},e.prototype.union=function(t,n){void 0===n&&(n=x.Identity);var r=this;return new e(function(){var o,u,i;return new p["default"](function(){o=r.getEnumerator(),i=new d["default"](n)},function(n){var r;if(u===E){for(;o.moveNext();)if(r=o.current,!i.containsKey(r))return i.addByKeyValue(r,null),n.yieldReturn(r);u=e.from(t).getEnumerator()}for(;u.moveNext();)if(r=u.current,!i.containsKey(r))return i.addByKeyValue(r,null),n.yieldReturn(r);return!1},function(){h.dispose(o,u)})})},e.prototype.orderBy=function(t){return void 0===t&&(t=x.Identity),new k(this,t,1)},e.prototype.orderUsing=function(t){return new k(this,null,1,null,t)},e.prototype.orderUsingReversed=function(t){return new k(this,null,-1,null,t)},e.prototype.orderByDescending=function(t){return void 0===t&&(t=x.Identity),new k(this,t,-1)},e.prototype.groupBy=function(t,n,r){var o=this;return n||(n=x.Identity),new e(function(){return o.toLookup(t,n,r).getEnumerator()})},e.prototype.partitionBy=function(t,n,r,o){void 0===r&&(r=function(t,e){return new _(t,e)}),void 0===o&&(o=x.Identity);var u=this;return n||(n=x.Identity),new e(function(){var e,i,a,f,c;return new p["default"](function(){e=u.getEnumerator(),e.moveNext()?(i=t(e.current),a=o(i),f=[n(e.current)],c=1):f=null},function(u){if(!f)return u.yieldBreak();for(var s,l;(s=e.moveNext())&&(l=e.current,a===o(t(l)));)f[c++]=n(l);var p=r(i,f);return s?(l=e.current,i=t(l),a=o(i),f=[n(l)],c=1):f=null,u.yieldReturn(p)},function(){h.dispose(e),f=null})})},e.prototype.buffer=function(t){if(1>t||!isFinite(t))throw new Error("Invalid buffer size.");c["default"].assert(t,"size");var n,r=this;return new e(function(){var e;return new p["default"](function(){e=r.getEnumerator()},function(r){var o=i.initialize(t);for(n=0;t>n&&e.moveNext;)o[n++]=e.current;return o.length=n,n&&r.yieldReturn(o)},function(){h.dispose(e)})})},e.prototype.aggregate=function(t,e){return this.scan(t,e).lastOrDefault()},e.prototype.average=function(t){void 0===t&&(t=f["default"].numberOrNaN);var e=0,n=0,r=0;return this.forEach(function(o){var u=t(o);return isNaN(u)?(e=NaN,!1):(isFinite(u)?e+=u:n+=u>0?1:-1,void++r)}),n?n*(1/0):isNaN(e)||!r?NaN:e/r},e.prototype.max=function(){return this.aggregate(x.Greater)},e.prototype.min=function(){return this.aggregate(x.Lesser)},e.prototype.maxBy=function(t){return void 0===t&&(t=x.Identity),this.aggregate(function(e,n){return t(e)>t(n)?e:n})},e.prototype.minBy=function(t){return void 0===t&&(t=x.Identity),this.aggregate(function(e,n){return t(e)<t(n)?e:n})},e.prototype.sum=function(t){void 0===t&&(t=f["default"].numberOrNaN);var e=0,n=0;return this.forEach(function(r){var o=t(r);return isNaN(o)?(e=NaN,!1):void(isFinite(o)?e+=o:n+=o>0?1:-1)}),isNaN(e)?NaN:n?n*(1/0):e},e.prototype.product=function(t){void 0===t&&(t=f["default"].numberOrNaN);var e=1,n=!1;return this.forEach(function(r){n=!0;var o=t(r);return isNaN(o)?(e=NaN,!1):0==o?(e=0,!1):void(e*=o)}),n&&isNaN(e)?NaN:e},e.prototype.elementAt=function(t){if(isNaN(t)||0>t||!isFinite(t))throw new Error("'index' is invalid or out of bounds.");c["default"].assert(t,"index");var e=t,n=this;n.throwIfDisposed();var r=void 0,o=!1;if(n.forEach(function(t,n){return n==e?(r=t,o=!0,!1):void 0}),!o)throw new Error("index is less than 0 or greater than or equal to the number of elements in source.");return r},e.prototype.elementAtOrDefault=function(t,e){if(void 0===e&&(e=null),isNaN(t)||0>t||!isFinite(t))throw new Error("'index' is invalid or out of bounds.");c["default"].assert(t,"index");var n=t,r=this;r.throwIfDisposed();var o=void 0,u=!1;return r.forEach(function(t,e){return e==n?(o=t,u=!0,!1):void 0}),u?o:e},e.prototype.first=function(){var t=this;t.throwIfDisposed();var e=void 0,n=!1;if(t.forEach(function(t){return e=t,n=!0,!1}),!n)throw new Error("first:No element satisfies the condition.");return e},e.prototype.firstOrDefault=function(t){void 0===t&&(t=null);var e=this;e.throwIfDisposed();var n=void 0,r=!1;return e.forEach(function(t){return n=t,r=!0,!1}),r?n:t},e.prototype.last=function(){var t=this;t.throwIfDisposed();var e=void 0,n=!1;if(t.forEach(function(t){n=!0,e=t}),!n)throw new Error("last:No element satisfies the condition.");return e},e.prototype.lastOrDefault=function(t){void 0===t&&(t=null);var e=this;e.throwIfDisposed();var n=void 0,r=!1;return e.forEach(function(t){r=!0,n=t}),r?n:t},e.prototype.single=function(){var t=this;t.throwIfDisposed();var e=void 0,n=!1;if(t.forEach(function(t){if(n)throw new Error("single:sequence contains more than one element.");n=!0,e=t}),!n)throw new Error("single:No element satisfies the condition.");return e},e.prototype.singleOrDefault=function(t){void 0===t&&(t=null);var e=this;e.throwIfDisposed();var n=void 0,r=!1;return e.forEach(function(t){if(r)throw new Error("single:sequence contains more than one element.");r=!0,n=t}),r?n:t},e.prototype.share=function(){var t=this;t.throwIfDisposed();var n;return new e(function(){return new p["default"](function(){n||(n=t.getEnumerator())},function(t){return n.moveNext()&&t.yieldReturn(n.current)})},function(){h.dispose(n)})},e.prototype.memoize=function(){var t,n,o=this,u=!o.throwIfDisposed();return new e(function(){var e=0;return new p["default"](function(){r(u),n||(n=o.getEnumerator()),t||(t=[]),e=0},function(o){r(u);var i=e++;return i>=t.length?n.moveNext()?o.yieldReturn(t[i]=n.current):!1:o.yieldReturn(t[i])})},function(){u=!0,t&&(t.length=0),t=null,h.dispose(n),n=null})},e.prototype.catchError=function(t){var n=this,o=!n.throwIfDisposed();return new e(function(){var e;return new p["default"](function(){try{r(o),e=n.getEnumerator()}catch(t){}},function(n){try{if(r(o),e.moveNext())return n.yieldReturn(e.current)}catch(u){t(u)}return!1},function(){h.dispose(e)})})},e.prototype.finallyAction=function(t){var n=this,o=!n.throwIfDisposed();return new e(function(){var e;return new p["default"](function(){r(o),e=n.getEnumerator()},function(t){return r(o),e.moveNext()?t.yieldReturn(e.current):!1},function(){try{h.dispose(e)}finally{t()}})})},e}(v["default"]);e.Enumerable=I;var R=function(t){function e(e){t.call(this,function(){return n.throwIfDisposed(),new l["default"](function(){return n.throwIfDisposed("The underlying ArrayEnumerable was disposed.","ArrayEnumerator"),n._source})});var n=this;n._disposableObjectName="ArrayEnumerable",n._source=e}return __extends(e,t),e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._source=null},Object.defineProperty(e.prototype,"source",{get:function(){return this._source},enumerable:!0,configurable:!0}),e.prototype.toArray=function(){var t=this.source;if(!t)return[];if(Array.isArray(t))return t.slice();for(var e=t.length,n=i.initialize(e),r=0;e>r;++r)n[r]=t[r];return n},e.prototype.asEnumerable=function(){return new e(this._source)},e.prototype.forEach=function(t){var e=this;e.throwIfDisposed();var n=e._source;if(n)for(var r=0;r<n.length&&t(n[r],r)!==!1;++r);},e.prototype.any=function(e){var n=this;n.throwIfDisposed();var r=n._source,o=r?r.length:0;return o&&(!e||t.prototype.any.call(this,e))},e.prototype.count=function(e){var n=this;n.throwIfDisposed();var r=n._source,o=r?r.length:0;return o&&(e?t.prototype.count.call(this,e):o)},e.prototype.elementAt=function(e){var n=this;n.throwIfDisposed();var r=n._source;return e<r.length&&e>=0?r[e]:t.prototype.elementAt.call(this,e)},e.prototype.elementAtOrDefault=function(t,e){void 0===e&&(e=null);var n=this;n.throwIfDisposed();var r=n._source;return t<r.length&&t>=0?r[t]:e},e.prototype.first=function(){var e=this;e.throwIfDisposed();var n=e._source;return n&&n.length?n[0]:t.prototype.first.call(this)},e.prototype.firstOrDefault=function(t){void 0===t&&(t=null);var e=this;e.throwIfDisposed();var n=e._source;return n&&n.length?n[0]:t},e.prototype.last=function(){var e=this;e.throwIfDisposed();var n=e._source,r=n.length;return r?n[r-1]:t.prototype.last.call(this)},e.prototype.lastOrDefault=function(t){void 0===t&&(t=null);var e=this;e.throwIfDisposed();var n=e._source,r=n.length;return r?n[r-1]:t},e.prototype.skip=function(t){var e=this;return!t||0>t?e.asEnumerable():new I(function(){return new l["default"](function(){return e._source},t)})},e.prototype.takeExceptLast=function(t){void 0===t&&(t=1);var e=this,n=e._source?e._source.length:0;return e.take(n-t)},e.prototype.takeFromLast=function(t){if(!t||0>t)return I.empty();var e=this,n=e._source?e._source.length:0;return e.skip(n-t)},e.prototype.reverse=function(){var t=this;return new I(function(){return new l["default"](function(){return t._source},t._source?t._source.length-1:0,-1)})},e.prototype.memoize=function(){return new e(this._source)},e.prototype.sequenceEqual=function(n,r){return void 0===r&&(r=o.areEqual),Array.isArray(n)?u.areEqual(this.source,n,!0,r):n instanceof e?n.sequenceEqual(this.source,r):t.prototype.sequenceEqual.call(this,n,r)},e.prototype.toJoinedString=function(e,n){void 0===e&&(e=""),void 0===n&&(n=x.Identity);var r=this._source;return!n&&Array.isArray(r)?r.join(e):t.prototype.toJoinedString.call(this,e,n)},e}(I),_=function(t){function e(e,n){t.call(this,n),this._groupKey=e}return __extends(e,t),Object.defineProperty(e.prototype,"key",{get:function(){return this._groupKey},enumerable:!0,configurable:!0}),e}(R),S=function(){function t(t){this._dictionary=t}return Object.defineProperty(t.prototype,"count",{get:function(){return this._dictionary.count},enumerable:!0,configurable:!0}),t.prototype.get=function(t){return this._dictionary.getValue(t)},t.prototype.contains=function(t){return this._dictionary.containsKey(t)},t.prototype.getEnumerator=function(){var t,e=this;return new p["default"](function(){t=e._dictionary.getEnumerator()},function(e){if(!t.moveNext())return!1;var n=t.current;return e.yieldReturn(new _(n.key,n.value))},function(){h.dispose(t)})},t}(),b=function(t){function e(e,n){t.call(this,null),this.prevSource=e,this.prevPredicate=n}return __extends(e,t),e.prototype.where=function(n){if(n.length>1)return t.prototype.where.call(this,n);var r=this.prevPredicate,o=function(t){return r(t)&&n(t)};return new e(this.prevSource,o)},e.prototype.select=function(e){return e.length>1?t.prototype.select.call(this,e):new A(this.prevSource,this.prevPredicate,e)},e.prototype.getEnumerator=function(){var t,e=this.prevPredicate,n=this.prevSource;return new p["default"](function(){t=n.getEnumerator()},function(n){for(;t.moveNext();)if(e(t.current))return n.yieldReturn(t.current);return!1},function(){h.dispose(t)})},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this.prevPredicate=null,this.prevSource=null},e}(I),A=function(t){function e(e,n,r){t.call(this,null),this.prevSource=e,this.prevPredicate=n,this.prevSelector=r}return __extends(e,t),e.prototype.where=function(e){return e.length>1?t.prototype.where.call(this,e):new b(this,e)},e.prototype.select=function(n){if(n.length>1)return t.prototype.select.call(this,n);var r=this,o=r.prevSelector,u=function(t){return n(o(t))};return new e(r.prevSource,r.prevPredicate,u)},e.prototype.getEnumerator=function(){var t,e=this,n=e.prevPredicate,r=e.prevSource,o=e.prevSelector;return new p["default"](function(){t=r.getEnumerator()},function(e){for(;t.moveNext();){var r=t.current;if(null==n||n(r))return e.yieldReturn(o(r))}return!1},function(){h.dispose(t)})},e.prototype._onDispose=function(){var e=this;t.prototype._onDispose.call(this),e.prevPredicate=null,e.prevSource=null,e.prevSelector=null},e}(I),k=function(t){function e(e,n,r,u,i){void 0===i&&(i=o.compare),t.call(this,null),this.source=e,this.keySelector=n,this.order=r,this.parent=u,this.comparer=i}return __extends(e,t),e.prototype.createOrderedEnumerable=function(t,n){return new e(this.source,t,n,this)},e.prototype.thenBy=function(t){
return this.createOrderedEnumerable(t,1)},e.prototype.thenUsing=function(t){return new e(this.source,null,1,this,t)},e.prototype.thenByDescending=function(t){return this.createOrderedEnumerable(t,-1)},e.prototype.thenUsingReversed=function(t){return new e(this.source,null,-1,this,t)},e.prototype.getEnumerator=function(){var t,e,r=this,o=0;return new p["default"](function(){o=0,t=I.toArray(r.source),e=n(r).generateSortedIndexes(t)},function(n){return o<e.length?n.yieldReturn(t[e[o++]]):!1},function(){t&&(t.length=0),t=null,e&&(e.length=0),e=null})},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this.source=null,this.keySelector=null,this.order=null,this.parent=null},e}(I);Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=I});
//# sourceMappingURL=Linq.js.map
