!function(e,r){if("object"==typeof module&&"object"==typeof module.exports){var n=r(require,exports);void 0!==n&&(module.exports=n)}else"function"==typeof define&&define.amd&&define(e,r)}(["require","exports","../../Promises/Promise","../../Types","../Worker","../deferImmediate","../../Environment","../../Disposable/ObjectPool","../../../extends"],function(e,r){"use strict";function n(e,r){r||(r={});for(var n=0,t=Object.keys(e);n<t.length;n++){var o=t[n];void 0===r[o]&&(r[o]=e[o])}return r}function t(e,r,n,t){r&&(e.onmessage=r),n&&(e.onerror=n),t!==d&&e.postMessage(t)}var o,i=e("../../Promises/Promise"),s=e("../../Types"),u=e("../Worker"),a=e("../deferImmediate"),c=e("../../Environment"),l=e("../../Disposable/ObjectPool"),f=e("../../../extends"),p=f["default"],h=16,d=void 0,y=typeof self!==s.Type.UNDEFINED?self.URL?self.URL:self.webkitURL:null,v=!(!c.isNodeJS&&!self.Worker),m={evalPath:c.isNodeJS?__dirname+"/eval.js":d,maxConcurrency:c.isNodeJS?e("os").cpus().length:navigator.hardwareConcurrency||4,allowSynchronous:!0,env:{},envNamespace:"env"},w=function(e){function r(r,n){return e.call(this,function(e,o){t(r,function(r){e(r.data)},function(e){o(e)},n)},!0)||this}return p(r,e),r}(i.Promise);!function(e){function r(e){var r=i[e];return r||(i[e]=r=new l.ObjectPool(8),r.autoClearTimeout=3e3),r}function n(e){if(e){e.onerror=null,e.onmessage=null;var n=e.__key;n?r(n).add(e):a.deferImmediate(function(){return e.terminate()})}return null}function t(e){return r(e).tryTake()}function o(e,r){var n=new u["default"](r);return n.__key=e,n.dispose=function(){n.onmessage=null,n.onerror=null,n.dispose=null,n.terminate()},n}var i={};e.recycle=n,e.tryGet=t,e.getNew=o}(o||(o={}));var g=function(){function e(e){this.options=n(m,e),this._requiredScripts=[],this._requiredFunctions=[],this.ensureClampedMaxConcurrency()}return e.maxConcurrency=function(r){return new e({maxConcurrency:r})},e.prototype._getWorkerSource=function(e,r){var n=this._requiredScripts,t=this._requiredFunctions,o="";!c.isNodeJS&&n.length&&(o+='importScripts("'+n.join('","')+'");\r\n');for(var i=0,s=t;i<s.length;i++){var u=s[i],a=u.name,l=u.fn,f=l.toString();o+=a?"var "+a+" = "+f+";":f}r=JSON.stringify(r||{});var p=this.options.envNamespace;return o+(c.isNodeJS?'process.on("message", function(e) {global.'+p+" = "+r+";process.send(JSON.stringify(("+e.toString()+")(JSON.parse(e).data)))})":"self.onmessage = function(e) {var global = {}; global."+p+" = "+r+"';self.postMessage(("+e.toString()+")(e.data))}")},e.prototype.require=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return this.requireThese(e)},e.prototype.requireThese=function(e){for(var r=0,n=e;r<n.length;r++){var t=n[r];switch(typeof t){case s.Type.STRING:this._requiredScripts.push(t);break;case s.Type.FUNCTION:this._requiredFunctions.push({fn:t});break;case s.Type.OBJECT:this._requiredFunctions.push(t);break;default:throw new TypeError("Invalid type.")}}return this},e.prototype._spawnWorker=function(e,r){var n=this._getWorkerSource(e,r);if(u["default"]===d)return d;var t=o.tryGet(n);if(t)return t;var i=this._requiredScripts,s=this.options.evalPath;if(!s){if(c.isNodeJS)throw new Error("Can't use NodeJD without eval.js!");if(i.length)throw new Error("Can't use required scripts without eval.js!");if(!y)throw new Error("Can't create a blob URL in this browser!")}if(c.isNodeJS||i.length||!y)t=o.getNew(n,s),t.postMessage(n);else if(y){var a=new Blob([n],{type:"text/javascript"}),l=y.createObjectURL(a);t=o.getNew(n,l)}return t},e.prototype.startNew=function(e,r,t){var s=this,u=s._spawnWorker(r,n(s.options.env,t||{}));if(u)return new w(u,e).finallyThis(function(){return o.recycle(u)});if(s.options.allowSynchronous)return new i.Promise(function(n,t){try{n(r(e))}catch(o){t(o)}});throw new Error("Workers do not exist and synchronous operation not allowed!")},e.prototype.pipe=function(e,r,n){var t;if(e&&e.length)for(var s,u=e.length,a=r.toString(),c=this.ensureClampedMaxConcurrency(),l=0,f=function(c){var f=p._spawnWorker(a,n);if(!f){if(!p.options.allowSynchronous)throw new Error("Workers do not exist and synchronous operation not allowed!");return{value:i.Promise.map(e,r)}}t||(t=e.map(function(e){return new i.Promise}));var h=function(){if(s&&(f=o.recycle(f)),f)if(l<u){var r=l++,n=t[r],i=new w(f,e[r]);i.thenSynchronous(function(e){n.resolve(e),h()},function(e){s||(s=e,n.reject(e),f=o.recycle(f))}).finallyThis(function(){return i.dispose()})}else f=o.recycle(f)};h()},p=this,h=0;!s&&l<Math.min(u,c);h++){var d=f(h);if("object"==typeof d)return d.value}return new i.PromiseCollection(t)},e.prototype.ensureClampedMaxConcurrency=function(){var e=this.options.maxConcurrency;return e>h&&(this.options.maxConcurrency=e=h,console.warn("More than "+h+" workers can reach worker limits and cause unexpected results.  maxConcurrency reduced to "+h+".")),e||0===e?e:h},e.prototype.map=function(e,r,n){var t=this;return e&&e.length?(e=e.slice(),new i.ArrayPromise(function(s,u){var a=[],c=e.length;a.length=c;for(var l,f=r.toString(),p=t.ensureClampedMaxConcurrency(),h=0,d=0,y=function(p){var y=t._spawnWorker(f,n);if(!y){if(!t.options.allowSynchronous)throw new Error("Workers do not exist and synchronous operation not allowed!");return s(i.Promise.map(e,r).all()),{value:void 0}}var v=function(){if(l&&(y=o.recycle(y)),y)if(h<c){var r=h++,n=new w(y,e[r]);n.thenSynchronous(function(e){a[r]=e,v()},function(e){l||(l=e,u(e),y=o.recycle(y))}).thenThis(function(){if(d++,d>c)throw Error("Resolved count exceeds data length.");d===c&&s(a)}).finallyThis(function(){return n.dispose()})}else y=o.recycle(y)};v()},v=0;!l&&h<Math.min(c,p);v++){var m=y(v);if("object"==typeof m)return m.value}})):i.ArrayPromise.fulfilled(e&&[])},Object.defineProperty(e,"isSupported",{get:function(){return v},enumerable:!0,configurable:!0}),e.options=function(r){return new e(r)},e.require=function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return(new e).requireThese(r)},e.requireThese=function(r){return(new e).requireThese(r)},e.startNew=function(r,n,t){return(new e).startNew(r,n,t)},e.map=function(r,n,t){return(new e).map(r,n,t)},e}();r.Parallel=g,Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=g});
//# sourceMappingURL=Parallel.js.map