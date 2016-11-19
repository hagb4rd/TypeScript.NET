define(["require","exports","../System/Compare","../System/Collections/Array/Compare","../System/Collections/Array/Utility","../System/Collections/Array/Utility","../System/Collections/Enumeration/Enumerator","../System/Collections/Enumeration/Enumerator","../System/Collections/Enumeration/EmptyEnumerator","../System/Types","../System/Integer","../System/Functions","../System/Collections/Enumeration/ArrayEnumerator","../System/Collections/Enumeration/EnumeratorBase","../System/Collections/Dictionaries/Dictionary","../System/Collections/Queue","../System/Disposable/dispose","../System/Disposable/DisposableBase","../System/Collections/Enumeration/UnsupportedEnumerableException","../System/Disposable/ObjectDisposedException","../System/Collections/Sorting/KeySortedContext","../System/Exceptions/ArgumentNullException","../System/Exceptions/ArgumentOutOfRangeException","../System/Collections/Enumeration/IndexEnumerator","../System/Collections/Enumeration/IteratorEnumerator","../extends"],function(t,e,n,r,o,i,u,s,a,c,f,p,l,y,h,d,m,v,w,E,g,I,N,x,D,b){"use strict";function A(){return 0}function B(){return 1}function O(t){return null!==t&&t!==T}function R(){return a.EmptyEnumerator}function _(t,e){if(e){if(!e.moveNext())return m.dispose(e),null;t.enqueue(e)}return e}function k(t,e){void 0===e&&(e=null);var n=new g.KeySortedContext(e,t.keySelector,t.order,t.comparer);return t.parent?k(t.parent,n):n}function S(t){if(t)throw new E.ObjectDisposedException("Enumerable");return!0}var F=b["default"],q={},T=void 0,M=null,C=function(t){function e(){return t.apply(this,arguments)||this}return F(e,t),e.prototype.Greater=function(t,e){return t>e?t:e},e.prototype.Lesser=function(t,e){return t<e?t:e},e}(p.Functions),j=Object.freeze(new C),K=function(t){function e(e,n){var r=t.call(this,n)||this;return r._enumeratorFactory=e,r._isEndless=!0,r._disposableObjectName="InfiniteEnumerable",r}return F(e,t),Object.defineProperty(e.prototype,"isEndless",{get:function(){return this._isEndless},enumerable:!0,configurable:!0}),e.prototype.getEnumerator=function(){return this.throwIfDisposed(),this._enumeratorFactory()},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._enumeratorFactory=null},e.prototype.asEnumerable=function(){var t=this;return t.throwIfDisposed(),new e(function(){return t.getEnumerator()})},e.prototype.doAction=function(t,e,n,r){void 0===n&&(n=this.isEndless);var o=this;o.throwIfDisposed();var i=n||void 0;if(!t)throw new I.ArgumentNullException("action");return new L(function(){var n,u=0;return new y.EnumeratorBase(function(){S(!t),e&&e(),u=0,n=o.getEnumerator()},function(e){for(S(!t);n.moveNext();){var o=n.current,i=t(o,u++);if(i===!1||0===i)return e.yieldBreak();if(2!==i)return e.yieldReturn(o)}return r&&r(u),!1},function(){m.dispose(n)},i)},function(){t=M},i)},e.prototype.force=function(){this.throwIfDisposed(),this.doAction(A).getEnumerator().moveNext()},e.prototype.skip=function(t){var n=this;return n.throwIfDisposed(),isFinite(t)?(f.Integer.assert(t,"count"),this.where(function(e,n){return n>=t})):new e(R)},e.prototype.take=function(t){if(!(t>0))return L.empty();var e=this;if(e.throwIfDisposed(),!isFinite(t))throw new N.ArgumentOutOfRangeException("count",t,"Must be finite.");return f.Integer.assert(t,"count"),e.doAction(function(e,n){return n<t},null,!1)},e.prototype.elementAt=function(t){var e=this.elementAtOrDefault(t,q);if(e===q)throw new N.ArgumentOutOfRangeException("index",t,"is greater than or equal to the number of elements in source");return e},e.prototype.elementAtOrDefault=function(t,e){var n=this;n.throwIfDisposed(),f.Integer.assertZeroOrGreater(t,"index");var r=t;return m.using(this.getEnumerator(),function(t){for(var n=0;t.moveNext();){if(n==r)return t.current;n++}return e})},e.prototype.first=function(){var t=this.firstOrDefault(q);if(t===q)throw new Error("first:The sequence is empty.");return t},e.prototype.firstOrDefault=function(t){var e=this;return e.throwIfDisposed(),m.using(this.getEnumerator(),function(e){return e.moveNext()?e.current:t})},e.prototype.single=function(){var t=this;return t.throwIfDisposed(),m.using(this.getEnumerator(),function(t){if(t.moveNext()){var e=t.current;if(!t.moveNext())return e;throw new Error("single:sequence contains more than one element.")}throw new Error("single:The sequence is empty.")})},e.prototype.singleOrDefault=function(t){var e=this;return e.throwIfDisposed(),m.using(this.getEnumerator(),function(e){if(e.moveNext()){var n=e.current;if(!e.moveNext())return n}return t})},e.prototype.any=function(){var t=this;return t.throwIfDisposed(),m.using(this.getEnumerator(),function(t){return t.moveNext()})},e.prototype.isEmpty=function(){return!this.any()},e.prototype.traverseDepthFirst=function(t,e){void 0===e&&(e=j.Identity);var n=this,r=!n.throwIfDisposed(),o=n._isEndless;return new L(function(){var i,u,s=[];return new y.EnumeratorBase(function(){S(r),i=n.getEnumerator(),u=0},function(n){for(S(r);;){if(i.moveNext()){var o=e(i.current,u);s[u++]=i;var f=t(i.current),p=!c.Type.isString(f)&&L.fromAny(f);return i=p?p.getEnumerator():a.EmptyEnumerator,n.yieldReturn(o)}if(0==u)return!1;i.dispose(),i=s[--u],s.length=u}},function(){try{m.dispose(i)}finally{m.dispose.these(s)}},o)},function(){r=!0},o)},e.prototype.flatten=function(){return this.selectMany(function(t){var e=!c.Type.isString(t)&&L.fromAny(t);return e?e.flatten():[t]})},e.prototype.pairwise=function(t){var e=this;if(e.throwIfDisposed(),!t)throw new I.ArgumentNullException("selector");var n;return this.select(function(e,r){var o=r?t(n,e,r):M;return n=e,o}).skip(1)},e.prototype.scan=function(t,e){var n=this;if(n.throwIfDisposed(),!t)throw new I.ArgumentNullException("func");return e===T?this.select(function(n,r){return e=r?t(e,n,r):n}):this.select(function(n,r){return e=t(e,n,r)})},e.prototype.select=function(t){return this._filterSelected(t)},e.prototype._selectMany=function(t,e){var n=this;if(n.throwIfDisposed(),!t)throw new I.ArgumentNullException("collectionSelector");var r=n._isEndless;return e||(e=function(t,e){return e}),new L(function(){var o,i,s=0;return new y.EnumeratorBase(function(){S(!t),o=n.getEnumerator(),i=T,s=0},function(n){if(S(!t),i===T&&!o.moveNext())return!1;do{if(!i){var r=t(o.current,s++);if(!r)continue;i=u.from(r)}if(i.moveNext())return n.yieldReturn(e(o.current,i.current));i.dispose(),i=null}while(o.moveNext());return!1},function(){m.dispose(o,i),o=M,i=null},r)},function(){t=M},r)},e.prototype.selectMany=function(t,e){return this._selectMany(t,e)},e.prototype._filterSelected=function(t,e){void 0===t&&(t=j.Identity);var n=this,r=!n.throwIfDisposed();if(!t)throw new I.ArgumentNullException("selector");return new L(function(){var o,i=0;return new y.EnumeratorBase(function(){S(!t),i=0,o=n.getEnumerator()},function(n){for(S(r);o.moveNext();){var u=i++,s=t(o.current,u);if(!e||e(s,u++))return n.yieldReturn(s)}return!1},function(){m.dispose(o)},n._isEndless)},function(){r=!1},n._isEndless)},e.prototype.choose=function(t){return void 0===t&&(t=j.Identity),this._filterSelected(t,O)},e.prototype.where=function(t){return this._filterSelected(j.Identity,t)},e.prototype.nonNull=function(){return this.where(function(t){return null!=t&&t!=T})},e.prototype.ofType=function(t){var e;switch(t){case Number:e=c.Type.NUMBER;break;case String:e=c.Type.STRING;break;case Boolean:e=c.Type.BOOLEAN;break;case Function:e=c.Type.FUNCTION;break;default:return this.where(function(e){return e instanceof t})}return this.where(function(t){return O(t)&&typeof t===e})},e.prototype.except=function(t,e){var n=this,r=!n.throwIfDisposed(),o=n._isEndless;return new L(function(){var i,s;return new y.EnumeratorBase(function(){S(r),i=n.getEnumerator(),s=new h.Dictionary(e),t&&u.forEach(t,function(t){s.addByKeyValue(t,!0)})},function(t){for(S(r);i.moveNext();){var e=i.current;if(!s.containsKey(e))return s.addByKeyValue(e,!0),t.yieldReturn(e)}return!1},function(){m.dispose(i),s.clear()},o)},function(){r=!0},o)},e.prototype.distinct=function(t){return this.except(M,t)},e.prototype.distinctUntilChanged=function(t){void 0===t&&(t=j.Identity);var e=this,r=!e.throwIfDisposed(),o=e._isEndless;return new L(function(){var i,u,s=!0;return new y.EnumeratorBase(function(){S(r),i=e.getEnumerator()},function(e){for(S(r);i.moveNext();){var o=t(i.current);if(s)s=!1;else if(n.areEqual(u,o))continue;return u=o,e.yieldReturn(i.current)}return!1},function(){m.dispose(i)},o)},function(){r=!0},o)},e.prototype.defaultIfEmpty=function(t){var e=this,n=!e.throwIfDisposed(),r=e._isEndless;return new L(function(){var o,i;return new y.EnumeratorBase(function(){i=!0,S(n),o=e.getEnumerator()},function(e){return S(n),o.moveNext()?(i=!1,e.yieldReturn(o.current)):!!i&&(i=!1,e.yieldReturn(t))},function(){m.dispose(o)},r)},null,r)},e.prototype.zip=function(t,e){var n=this;return n.throwIfDisposed(),new L(function(){var r,o,i=0;return new y.EnumeratorBase(function(){i=0,r=n.getEnumerator(),o=u.from(t)},function(t){return r.moveNext()&&o.moveNext()&&t.yieldReturn(e(r.current,o.current,i++))},function(){m.dispose(r,o)})})},e.prototype.zipMultiple=function(t,e){var n=this;return n.throwIfDisposed(),t.length?new L(function(){var r,o,i,s=0;return new y.EnumeratorBase(function(){r=new d.Queue(t),s=0,o=n.getEnumerator(),i=M},function(t){if(o.moveNext())for(;;){for(;!i;){if(!r.count)return t.yieldBreak();var n=r.dequeue();n&&(i=u.from(n))}if(i.moveNext())return t.yieldReturn(e(o.current,i.current,s++));i.dispose(),i=M}return t.yieldBreak()},function(){m.dispose(o,r)})}):L.empty()},e.prototype.join=function(t,e,n,r,o){void 0===o&&(o=j.Identity);var i=this;return new L(function(){var u,s,a,c=0;return new y.EnumeratorBase(function(){u=i.getEnumerator(),s=L.from(t).toLookup(n,j.Identity,o)},function(t){for(;;){if(a){var n=a[c++];if(n!==T)return t.yieldReturn(r(u.current,n));a=null,c=0}if(!u.moveNext())return t.yieldBreak();var o=e(u.current);a=s.get(o)}},function(){m.dispose(u),a=null,u=M,s=M})})},e.prototype.groupJoin=function(t,e,n,r,o){void 0===o&&(o=j.Identity);var i=this;return new L(function(){var u,s;return new y.EnumeratorBase(function(){u=i.getEnumerator(),s=L.from(t).toLookup(n,j.Identity,o)},function(t){return u.moveNext()&&t.yieldReturn(r(u.current,s.get(e(u.current))))},function(){m.dispose(u),u=M,s=M})})},e.prototype.merge=function(t){var e=this,n=e._isEndless;return t&&0!=t.length?new L(function(){var r,o;return new y.EnumeratorBase(function(){r=e.getEnumerator(),o=new d.Queue(t)},function(t){for(;;){for(;!r&&o.tryDequeue(function(t){r=u.from(t)}););if(r&&r.moveNext())return t.yieldReturn(r.current);{if(!r)return t.yieldBreak();r.dispose(),r=M}}},function(){m.dispose(r,o)},n)},null,n):e},e.prototype.concat=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return this.merge(t)},e.prototype.union=function(t,e){void 0===e&&(e=j.Identity);var n=this,r=n._isEndless;return new L(function(){var o,i,s;return new y.EnumeratorBase(function(){o=n.getEnumerator(),s=new h.Dictionary(e)},function(e){var n;if(i===T){for(;o.moveNext();)if(n=o.current,!s.containsKey(n))return s.addByKeyValue(n,null),e.yieldReturn(n);i=u.from(t)}for(;i.moveNext();)if(n=i.current,!s.containsKey(n))return s.addByKeyValue(n,null),e.yieldReturn(n);return!1},function(){m.dispose(o,i)},r)},null,r)},e.prototype.insertAt=function(t,e){f.Integer.assertZeroOrGreater(t,"index");var n=t,r=this;r.throwIfDisposed();var o=r._isEndless;return new L(function(){var t,i,s=0,a=!1;return new y.EnumeratorBase(function(){s=0,t=r.getEnumerator(),i=u.from(e),a=!1},function(e){return s==n&&(a=!0,i.moveNext())?e.yieldReturn(i.current):t.moveNext()?(s++,e.yieldReturn(t.current)):!a&&i.moveNext()&&e.yieldReturn(i.current)},function(){m.dispose(t,i)},o)},null,o)},e.prototype.alternateMultiple=function(t){var e=this,n=e._isEndless;return new L(function(){var r,o,i,u;return new y.EnumeratorBase(function(){u=new l.ArrayEnumerator(L.toArray(t)),i=e.getEnumerator();var n=i.moveNext();o=n?1:0,n&&(r=i.current)},function(t){switch(o){case 0:return t.yieldBreak();case 2:if(u.moveNext())return t.yieldReturn(u.current);u.reset(),o=1}var e=r,n=i.moveNext();return o=n?2:0,n&&(r=i.current),t.yieldReturn(e)},function(){m.dispose(i,u)},n)},null,n)},e.prototype.alternateSingle=function(t){return this.alternateMultiple(L.make(t))},e.prototype.alternate=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return this.alternateMultiple(t)},e.prototype.catchError=function(t){var e=this,n=!e.throwIfDisposed();return new L(function(){var r;return new y.EnumeratorBase(function(){try{S(n),r=e.getEnumerator()}catch(t){}},function(e){try{if(S(n),r.moveNext())return e.yieldReturn(r.current)}catch(o){t(o)}return!1},function(){m.dispose(r)})})},e.prototype.finallyAction=function(t){var e=this,n=!e.throwIfDisposed();return new L(function(){var r;return new y.EnumeratorBase(function(){S(n),r=e.getEnumerator()},function(t){return S(n),!!r.moveNext()&&t.yieldReturn(r.current)},function(){try{m.dispose(r)}finally{t()}})})},e.prototype.buffer=function(t){if(t<1||!isFinite(t))throw new Error("Invalid buffer size.");f.Integer.assert(t,"size");var e,n=this,r=n._isEndless;return new L(function(){var i;return new y.EnumeratorBase(function(){i=n.getEnumerator()},function(n){var r=o.initialize(t);for(e=0;e<t&&i.moveNext();)r[e++]=i.current;return r.length=e,!!e&&n.yieldReturn(r)},function(){m.dispose(i)},r)},null,r)},e.prototype.share=function(){var t=this;t.throwIfDisposed();var e;return new L(function(){return e||(e=t.getEnumerator())},function(){m.dispose(e)},t._isEndless)},e}(v.DisposableBase);e.InfiniteEnumerable=K;var L=function(t){function e(e,n,r){var o=t.call(this,e,n)||this;return o._isEndless=r,o._disposableObjectName="Enumerable",o}return F(e,t),e.prototype.asEnumerable=function(){var t=this;return t.throwIfDisposed(),new e(function(){return t.getEnumerator()})},e.prototype.skip=function(e){return t.prototype.skip.call(this,e)},e.prototype.skipWhile=function(t){return this.throwIfDisposed(),this.doAction(function(e,n){return t(e,n)?2:1})},e.prototype.takeWhile=function(t){if(this.throwIfDisposed(),!t)throw new I.ArgumentNullException("predicate");return this.doAction(function(e,n){return t(e,n)?1:0},null,null)},e.prototype.takeUntil=function(t,e){if(this.throwIfDisposed(),!t)throw new I.ArgumentNullException("predicate");if(!e)return this.doAction(function(e,n){return t(e,n)?0:1},null,null);var n=!1;return this.doAction(function(e,r){return n?0:(n=t(e,r),1)},function(){n=!1},null)},e.prototype.traverseBreadthFirst=function(t,n){void 0===n&&(n=j.Identity);var r=this,o=!r.throwIfDisposed(),i=r._isEndless;return new e(function(){var u,s,a,c=0;return new y.EnumeratorBase(function(){S(o),u=r.getEnumerator(),c=0,s=[],a=0},function(r){for(S(o);;){if(u.moveNext())return s[a++]=u.current,r.yieldReturn(n(u.current,c));if(!a)return r.yieldBreak();var i=e.from(s).selectMany(t);if(!i.any())return r.yieldBreak();c++,s=[],a=0,u.dispose(),u=i.getEnumerator()}},function(){m.dispose(u),s.length=0},i)},function(){o=!0},i)},e.prototype.forEach=function(t,e){void 0===e&&(e=1/0);var n=this;if(n.throwIfDisposed(),!t)throw new I.ArgumentNullException("action");return s.throwIfEndless(n.isEndless),e>0?m.using(n.getEnumerator(),function(r){s.throwIfEndless(!isFinite(e)&&r.isEndless);for(var o=0;e>o&&n.throwIfDisposed()&&r.moveNext()&&t(r.current,o++)!==!1;);return o}):0},e.prototype.toArray=function(t){return t?this.where(t).toArray():this.copyTo([])},e.prototype.copyTo=function(t,e,n){if(void 0===e&&(e=0),void 0===n&&(n=1/0),this.throwIfDisposed(),!t)throw new I.ArgumentNullException("target");return f.Integer.assertZeroOrGreater(e),u.forEach(this,function(n,r){t[r+e]=n},n),t},e.prototype.toLookup=function(t,e,n){void 0===e&&(e=j.Identity),void 0===n&&(n=j.Identity);var r=new h.Dictionary(n);return this.forEach(function(n,o){var i=t(n,o),u=e(n,o),s=r.getValue(i);s!==T?s.push(u):r.addByKeyValue(i,[u])}),new V(r)},e.prototype.toMap=function(t,e){var n={};return this.forEach(function(r,o){n[t(r,o)]=e(r,o)}),n},e.prototype.toDictionary=function(t,e,n){void 0===n&&(n=j.Identity);var r=new h.Dictionary(n);return this.forEach(function(n,o){return r.addByKeyValue(t(n,o),e(n,o))}),r},e.prototype.toJoinedString=function(t,e){return void 0===t&&(t=""),void 0===e&&(e=j.Identity),this.select(e).toArray().join(t)},e.prototype.takeExceptLast=function(t){void 0===t&&(t=1);var n=this;if(!(t>0))return n;if(!isFinite(t))return e.empty();f.Integer.assert(t,"count");var r=t;return new e(function(){var t,e;return new y.EnumeratorBase(function(){t=n.getEnumerator(),e=new d.Queue},function(n){for(;t.moveNext();)if(e.enqueue(t.current),e.count>r)return n.yieldReturn(e.dequeue());return!1},function(){m.dispose(t,e)})})},e.prototype.skipToLast=function(t){if(!(t>0))return e.empty();var n=this;return isFinite(t)?(f.Integer.assert(t,"count"),n.reverse().take(t).reverse()):n},e.prototype.select=function(e){return t.prototype.select.call(this,e)},e.prototype.selectMany=function(t,e){return this._selectMany(t,e)},e.prototype.choose=function(t){return void 0===t&&(t=j.Identity),this._filterSelected(t,O)},e.prototype.reverse=function(){var t=this,n=!t.throwIfDisposed();return s.throwIfEndless(t._isEndless),new e(function(){var e,r=0;return new y.EnumeratorBase(function(){S(n),t.throwIfDisposed(),e=t.toArray(),r=e.length},function(t){return!!r&&t.yieldReturn(e[--r])},function(){e.length=0})},function(){n=!0})},e.prototype.shuffle=function(){var t=this,n=!t.throwIfDisposed();return s.throwIfEndless(t._isEndless),new e(function(){var e,r,o;return new y.EnumeratorBase(function(){S(n),e=t.toArray(),r=o=e.length},function(t){if(!o)return t.yieldBreak();var n=f.Integer.random(o),r=e[n];return e[n]=e[--o],e[o]=M,o%32==0&&(e.length=o),t.yieldReturn(r)},function(){e.length=0})},function(){n=!0})},e.prototype.count=function(t){var e=0;return this.forEach(t?function(n,r){t(n,r)&&++e}:function(){++e}),e},e.prototype.all=function(t){if(!t)throw new I.ArgumentNullException("predicate");var e=!0;return this.forEach(function(n,r){if(!t(n,r))return e=!1,!1}),e},e.prototype.every=function(t){return this.all(t)},e.prototype.any=function(e){if(!e)return t.prototype.any.call(this);var n=!1;return this.forEach(function(t,r){return n=e(t,r),!n}),n},e.prototype.some=function(t){return this.any(t)},e.prototype.contains=function(t,e){if(e){var r=e(t);return this.any(function(t){return n.areEqual(e(t),r)})}return this.any(function(e){return n.areEqual(e,t)})},e.prototype.indexOf=function(t,e){var r=-1;return this.forEach(e?function(o,i){if(n.areEqual(e(o,i),e(t,i),!0))return r=i,!1}:function(e,o){if(n.areEqual(e,t,!0))return r=o,!1}),r},e.prototype.lastIndexOf=function(t,e){var r=-1;return this.forEach(e?function(o,i){n.areEqual(e(o,i),e(t,i),!0)&&(r=i)}:function(e,o){n.areEqual(e,t,!0)&&(r=o)}),r},e.prototype.intersect=function(t,n){var r=this;if(r.throwIfDisposed(),!t)throw new I.ArgumentNullException("second");var o=r.isEndless;return new e(function(){var e,i,s;return new y.EnumeratorBase(function(){S(!t),e=r.getEnumerator(),i=new h.Dictionary(n),s=new h.Dictionary(n),u.forEach(t,function(t){i.addByKeyValue(t,!0)})},function(t){for(;e.moveNext();){var n=e.current;if(!s.containsKey(n)&&i.containsKey(n))return s.addByKeyValue(n,!0),t.yieldReturn(n)}return t.yieldBreak()},function(){m.dispose(e,i,s)},o)},function(){t=M},o)},e.prototype.sequenceEqual=function(t,e){return void 0===e&&(e=n.areEqual),this.throwIfDisposed(),m.using(this.getEnumerator(),function(n){return m.using(u.from(t),function(t){for(s.throwIfEndless(n.isEndless&&t.isEndless);n.moveNext();)if(!t.moveNext()||!e(n.current,t.current))return!1;return!t.moveNext()})})},e.prototype.ofType=function(e){return this.throwIfDisposed(),t.prototype.ofType.call(this,e)},e.prototype.orderBy=function(t){return void 0===t&&(t=j.Identity),this.throwIfDisposed(),new P(this,t,1)},e.prototype.orderUsing=function(t){return this.throwIfDisposed(),new P(this,null,1,null,t)},e.prototype.orderUsingReversed=function(t){return this.throwIfDisposed(),new P(this,null,(-1),null,t)},e.prototype.orderByDescending=function(t){return void 0===t&&(t=j.Identity),this.throwIfDisposed(),new P(this,t,(-1))},e.prototype.buffer=function(e){return t.prototype.buffer.call(this,e)},e.prototype.groupBy=function(t,n,r){var o=this;return n||(n=j.Identity),new e(function(){return o.toLookup(t,n,r).getEnumerator()})},e.prototype.partitionBy=function(t,r,o,i){void 0===o&&(o=function(t,e){return new G(t,e)}),void 0===i&&(i=j.Identity);var u=this;return r||(r=j.Identity),new e(function(){var e,s,a,c,f;return new y.EnumeratorBase(function(){if(S(!r),e=u.getEnumerator(),e.moveNext()){var n=e.current;s=t(n),a=i(s),c=[r(n)],f=1}else c=null},function(u){if(S(!r),!c)return u.yieldBreak();for(var p,l;(p=e.moveNext())&&(l=e.current,n.areEqual(a,i(t(l))));)c[f++]=r(l);var y=o(s,c);return p?(l=e.current,s=t(l),a=i(s),c=[r(l)],f=1):c=null,u.yieldReturn(y)},function(){m.dispose(e),c=null})},function(){r=M})},e.prototype.flatten=function(){return t.prototype.flatten.call(this)},e.prototype.pairwise=function(e){return t.prototype.pairwise.call(this,e)},e.prototype.aggregate=function(t,e){return this.forEach(function(n,r){e=r?t(e,n,r):n}),e},e.prototype.average=function(t){void 0===t&&(t=c.Type.numberOrNaN);var e=0,n=this.sum(function(n,r){return e++,t(n,r)});return isNaN(n)||!e?NaN:n/e},e.prototype.max=function(){return this.aggregate(j.Greater)},e.prototype.min=function(){return this.aggregate(j.Lesser)},e.prototype.maxBy=function(t){return void 0===t&&(t=j.Identity),this.aggregate(function(e,n){return t(e)>t(n)?e:n})},e.prototype.minBy=function(t){return void 0===t&&(t=j.Identity),this.aggregate(function(e,n){return t(e)<t(n)?e:n})},e.prototype.sum=function(t){void 0===t&&(t=c.Type.numberOrNaN);var e=0,n=0;return this.forEach(function(r,o){var i=t(r,o);return isNaN(i)?(e=NaN,!1):void(isFinite(i)?e+=i:n+=i>0?1:-1)}),isNaN(e)?NaN:n?n*(1/0):e},e.prototype.product=function(t){void 0===t&&(t=c.Type.numberOrNaN);var e=1,n=!1;return this.forEach(function(r,o){n=!0;var i=t(r,o);return isNaN(i)?(e=NaN,!1):0==i?(e=0,!1):void(e*=i)}),n&&isNaN(e)?NaN:e},e.prototype.quotient=function(t){void 0===t&&(t=c.Type.numberOrNaN);var e=0,n=NaN;return this.forEach(function(r,o){var i=t(r,o);if(e++,1===e)n=i;else{if(isNaN(i)||0===i||!isFinite(i))return n=NaN,!1;n/=i}}),1===e&&(n=NaN),n},e.prototype.last=function(){var t=this;t.throwIfDisposed();var e=T,n=!1;if(t.forEach(function(t){n=!0,e=t}),!n)throw new Error("last:No element satisfies the condition.");return e},e.prototype.lastOrDefault=function(t){var e=this;e.throwIfDisposed();var n=T,r=!1;return e.forEach(function(t){r=!0,n=t}),r?n:t},e.prototype.memoize=function(){var t,n,r=this,o=!r.throwIfDisposed();return new e(function(){var e=0;return new y.EnumeratorBase(function(){S(o),n||(n=r.getEnumerator()),t||(t=[]),e=0},function(r){S(o);var i=e++;return i>=t.length?!!n.moveNext()&&r.yieldReturn(t[i]=n.current):r.yieldReturn(t[i])})},function(){o=!0,t&&(t.length=0),t=M,m.dispose(n),n=M})},e.prototype.throwWhenEmpty=function(){return this.doAction(B,null,this.isEndless,function(t){if(!t)throw"Collection is empty."})},e}(K);e.Enumerable=L;var U=function(t){function e(e,n){var r=t.call(this,e,n,!1)||this;return r._disposableObjectName="FiniteEnumerable",r}return F(e,t),e}(L);e.FiniteEnumerable=U;var z=function(t){function e(e){var n=t.call(this,function(){return r.throwIfDisposed(),new l.ArrayEnumerator(function(){return r.throwIfDisposed("The underlying ArrayEnumerable was disposed.","ArrayEnumerator"),r._source})})||this,r=n;return r._disposableObjectName="ArrayEnumerable",r._source=e,n}return F(e,t),e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._source=M},Object.defineProperty(e.prototype,"source",{get:function(){return this._source},enumerable:!0,configurable:!0}),e.prototype.toArray=function(){var t=this;return t.throwIfDisposed(),u.toArray(t._source)},e.prototype.asEnumerable=function(){var t=this;return t.throwIfDisposed(),new e(this._source)},e.prototype.forEach=function(t,e){void 0===e&&(e=1/0);var n=this;return n.throwIfDisposed(),u.forEach(n._source,t,e)},e.prototype.any=function(e){var n=this;n.throwIfDisposed();var r=n._source,o=r.length;return!!o&&(!e||t.prototype.any.call(this,e))},e.prototype.count=function(e){var n=this;n.throwIfDisposed();var r=n._source,o=r.length;return o&&(e?t.prototype.count.call(this,e):o)},e.prototype.elementAtOrDefault=function(t,e){var n=this;n.throwIfDisposed(),f.Integer.assertZeroOrGreater(t,"index");var r=n._source;return t<r.length?r[t]:e},e.prototype.last=function(){var e=this;e.throwIfDisposed();var n=e._source,r=n.length;return r?n[r-1]:t.prototype.last.call(this)},e.prototype.lastOrDefault=function(t){var e=this;e.throwIfDisposed();var n=e._source,r=n.length;return r?n[r-1]:t},e.prototype.skip=function(t){var e=this;return e.throwIfDisposed(),t>0?new L(function(){return new l.ArrayEnumerator(function(){return e._source},t)}):e},e.prototype.takeExceptLast=function(t){void 0===t&&(t=1);var e=this;return e.throwIfDisposed(),e.take(e._source.length-t)},e.prototype.skipToLast=function(t){var e=this;if(e.throwIfDisposed(),!(t>0))return L.empty();if(!isFinite(t))return e;var n=e._source?e._source.length:0;return e.skip(n-t)},e.prototype.reverse=function(){var t=this,e=!t.throwIfDisposed();return new L(function(){return t.throwIfDisposed(),new x.IndexEnumerator(function(){var n=t._source;return S(e||!n),{source:n,pointer:n.length-1,length:n.length,step:-1}})},function(){e=!0})},e.prototype.memoize=function(){return this.asEnumerable()},e.prototype.sequenceEqual=function(o,i){return void 0===i&&(i=n.areEqual),c.Type.isArrayLike(o)?r.areEqual(this.source,o,!0,i):o instanceof e?o.sequenceEqual(this.source,i):t.prototype.sequenceEqual.call(this,o,i)},e.prototype.toJoinedString=function(e,n){void 0===e&&(e=""),void 0===n&&(n=j.Identity);var r=this._source;return!n&&Array.isArray(r)?r.join(e):t.prototype.toJoinedString.call(this,e,n)},e}(U),G=function(t){function e(e,n){var r=t.call(this,n)||this;return r._groupKey=e,r._disposableObjectName="Grouping",r}return F(e,t),Object.defineProperty(e.prototype,"key",{get:function(){return this._groupKey},enumerable:!0,configurable:!0}),e}(z),V=function(){function t(t){this._dictionary=t}return Object.defineProperty(t.prototype,"count",{get:function(){return this._dictionary.count},enumerable:!0,configurable:!0}),t.prototype.get=function(t){return this._dictionary.getValue(t)||null},t.prototype.contains=function(t){return this._dictionary.containsKey(t)},t.prototype.getEnumerator=function(){var t,e=this;return new y.EnumeratorBase(function(){t=e._dictionary.getEnumerator()},function(e){if(!t.moveNext())return!1;var n=t.current;return e.yieldReturn(new G(n.key,n.value))},function(){m.dispose(t),t=M})},t}(),P=function(t){function e(e,r,o,i,u){void 0===u&&(u=n.compare);var a=t.call(this,M)||this;return a.source=e,a.keySelector=r,a.order=o,a.parent=i,a.comparer=u,s.throwIfEndless(e&&e.isEndless),a._disposableObjectName="OrderedEnumerable",a}return F(e,t),e.prototype.createOrderedEnumerable=function(t,n){return this.throwIfDisposed(),new e(this.source,t,n,this)},e.prototype.thenBy=function(t){return this.createOrderedEnumerable(t,1)},e.prototype.thenUsing=function(t){return new e(this.source,null,1,this,t)},e.prototype.thenByDescending=function(t){return this.createOrderedEnumerable(t,-1)},e.prototype.thenUsingReversed=function(t){return new e(this.source,null,(-1),this,t)},e.prototype.getEnumerator=function(){var t=this;t.throwIfDisposed();var e,n,r=0;return new y.EnumeratorBase(function(){t.throwIfDisposed(),r=0,e=L.toArray(t.source),n=k(t).generateSortedIndexes(e)},function(o){return t.throwIfDisposed(),r<n.length&&o.yieldReturn(e[n[r++]])},function(){e&&(e.length=0),e=M,n&&(n.length=0),n=M},(!1))},e.prototype._onDispose=function(){var e=this;t.prototype._onDispose.call(this),e.source=M,e.keySelector=M,e.order=M,e.parent=M},e}(U);!function(t){function e(t){var e=n(t);if(!e)throw new w.UnsupportedEnumerableException;return e}function n(e,r){if(c.Type.isObject(e)||c.Type.isString(e)){if(e instanceof t)return e;if(c.Type.isArrayLike(e))return new z(e);if(s.isEnumerable(e))return new t(function(){return e.getEnumerator()},null,e.isEndless);if(s.isEnumerator(e))return new t(function(){return e},null,e.isEndless);if(s.isIterator(e))return n(new D.IteratorEnumerator(e))}return r}function r(e){return t.fromAny(e)||t.empty()}function o(e){return e instanceof t?e.toArray():u.toArray(e)}function a(t){return new K(function(){return new y.EnumeratorBase(null,function(e){return S(!t),e.yieldReturn(f.Integer.random.select(t))},(!0))},function(){t.length=0,t=M})}function p(t){var e=t&&t.length;if(!e||!isFinite(e))throw new N.ArgumentOutOfRangeException("length",length);return a(i.copy(t))}function l(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(!t.length)throw new N.ArgumentOutOfRangeException("length",length);return a(t)}function h(t){return new K(function(){var e=0;return new y.EnumeratorBase(function(){e=0},function(n){return S(!t),e>=t.length&&(e=0),n.yieldReturn(t[e++])},(!0))},function(){t.length=0,t=M})}function v(t){var e=t&&t.length;if(!e||!isFinite(e))throw new N.ArgumentOutOfRangeException("length",length);return h(i.copy(t))}function E(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(!t.length)throw new N.ArgumentOutOfRangeException("length",length);return h(t)}function g(){return new U(R)}function x(e,n){return void 0===n&&(n=1/0),n>0?isFinite(n)&&f.Integer.assert(n,"count")?new U(function(){var t=n,r=0;return new y.EnumeratorBase(function(){r=0},function(n){return r++<t&&n.yieldReturn(e)},null,(!1))}):new t(function(){return new y.EnumeratorBase(null,function(t){return t.yieldReturn(e)},(!0))}):t.empty()}function b(t,e){if(!t)throw new I.ArgumentNullException("initializer");return new K(function(){var n;return new y.EnumeratorBase(function(){t&&(n=t())},function(e){return t?e.yieldReturn(n):e.yieldBreak()},function(){n=M,e&&e(n)},(!0))},function(){t=M,e=T})}function A(t){return x(t,1)}function B(t,e,n){if(void 0===n&&(n=1),!isFinite(t))throw new N.ArgumentOutOfRangeException("start",t,"Must be a finite number.");if(!(e>0))return g();if(!n)throw new N.ArgumentOutOfRangeException("step",n,"Must be a valid value");if(!isFinite(n))throw new N.ArgumentOutOfRangeException("step",n,"Must be a finite number.");return f.Integer.assert(e,"count"),new U(function(){var r,o=e,i=0;return new y.EnumeratorBase(function(){i=0,r=t},function(t){var u=i++<o&&t.yieldReturn(r);return u&&i<e&&(r+=n),u},(!1))})}function O(t,e,n){return void 0===n&&(n=1),n=Math.abs(n)*-1,B(t,e,n)}function k(t,e){if(void 0===t&&(t=0),void 0===e&&(e=1),!isFinite(t))throw new N.ArgumentOutOfRangeException("start",t,"Must be a finite number.");if(!e)throw new N.ArgumentOutOfRangeException("step",e,"Must be a valid value");if(!isFinite(e))throw new N.ArgumentOutOfRangeException("step",e,"Must be a finite number.");return new K(function(){var n;return new y.EnumeratorBase(function(){n=t},function(t){var r=n;return n+=e,t.yieldReturn(r)},(!0))})}function F(t,e){return void 0===t&&(t=0),void 0===e&&(e=1),k(t,-e)}function q(t,e,n){if(void 0===n&&(n=1),isNaN(e)||!isFinite(e))throw new N.ArgumentOutOfRangeException("to",e,"Must be a finite number.");if(n&&!isFinite(n))throw new N.ArgumentOutOfRangeException("step",n,"Must be a finite non-zero number.");return n=Math.abs(n),new U(function(){var r;return new y.EnumeratorBase(function(){r=t},t<e?function(t){var o=r<=e&&t.yieldReturn(r);return o&&(r+=n),o}:function(t){var o=r>=e&&t.yieldReturn(r);return o&&(r-=n),o},(!1))})}function C(t,e,n){if(void 0===n&&(n=""),null===t||t===T)throw new I.ArgumentNullException("input");var r=typeof t;if(r!=c.Type.STRING)throw new Error("Cannot exec RegExp matches of type '"+r+"'.");return e instanceof RegExp&&(n+=e.ignoreCase?"i":"",n+=e.multiline?"m":"",e=e.source),n.indexOf("g")===-1&&(n+="g"),new U(function(){var r;return new y.EnumeratorBase(function(){r=new RegExp(e,n)},function(e){
var n=r.exec(t);return null!==n&&e.yieldReturn(n)})})}function L(e,n){if(void 0===n&&(n=1/0),!e)throw new I.ArgumentNullException("factory");return isNaN(n)||n<=0?t.empty():isFinite(n)&&f.Integer.assert(n,"count")?new U(function(){var t=n,r=0;return new y.EnumeratorBase(function(){r=0},function(n){S(!e);var o=r++;return o<t&&n.yieldReturn(e(o))},(!1))},function(){e=M}):new K(function(){var t=0;return new y.EnumeratorBase(function(){t=0},function(n){return S(!e),n.yieldReturn(e(t++))},(!0))},function(){e=M})}function G(t,e,n){if(void 0===n&&(n=!1),!e)throw new I.ArgumentNullException("factory");return new K(function(){var r,o,i=0;return new y.EnumeratorBase(function(){i=0,r=t,o=!n},function(t){S(!e);var n=i++;return o?o=!1:r=e(r,n),t.yieldReturn(r)},(!0))},function(){e=M})}function V(t,e,n){return void 0===n&&(n=1/0),u.forEach(t,e,n)}function P(t,e){return u.map(t,e)}function Q(t){var e=t.takeUntil(function(t){return t==+(1/0)},!0).aggregate(j.Greater);return e===T?NaN:e}function J(t){var e=t.takeUntil(function(t){return t==-(1/0)},!0).aggregate(j.Lesser);return e===T?NaN:e}function W(e){if(!e)throw new I.ArgumentNullException("enumerables");var n=!1;return new t(function(){var t,r,o;return new y.EnumeratorBase(function(){S(n),o=0,t=new d.Queue,r=u.from(e)},function(e){S(n);var o=null;if(r){for(;!o&&r.moveNext();){var i=r.current;o=_(t,i?u.from(i):M)}o||(r=null)}for(;!o&&t.tryDequeue(function(e){o=_(t,u.from(e))}););return o?e.yieldReturn(o.current):e.yieldBreak()},function(){m.dispose.these(t.dump()),m.dispose(r,t),r=null,t=M})},function(){n=!0})}t.from=e,t.fromAny=n,t.fromOrEmpty=r,t.toArray=o,t._choice=a,t.choice=p,t.chooseFrom=l,t.cycle=v,t.cycleThrough=E,t.empty=g,t.repeat=x,t.repeatWithFinalize=b,t.make=A,t.range=B,t.rangeDown=O,t.toInfinity=k,t.toNegativeInfinity=F,t.rangeTo=q,t.matches=C,t.generate=L,t.unfold=G,t.forEach=V,t.map=P,t.max=Q,t.min=J,t.weave=W}(L=e.Enumerable||(e.Enumerable={})),e.Enumerable=L,Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=L});
//# sourceMappingURL=Linq.js.map