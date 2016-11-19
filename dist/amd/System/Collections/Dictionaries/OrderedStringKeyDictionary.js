define(["require","exports","../Array/Utility","./StringKeyDictionary","../../Exceptions/ArgumentOutOfRangeException","../../../extends"],function(e,t,r,n,o,i){"use strict";var u=i["default"],a=void 0,s=function(e){function t(){var t=e.call(this)||this;return t._order=[],t}return u(t,e),t.prototype.indexOfKey=function(e){var t=this._order;return t.length?t.indexOf(e,0):-1},t.prototype.getValueByIndex=function(e){var t=this._order;return e<t.length?this.getValue(t[e]):a},t.prototype.setValue=function(t,n,o){var i=this,u=i.indexOfKey(t)!=-1;return u||n===a&&!o?u&&n===a&&!o&&r.remove(i._order,t):i._order.push(t),e.prototype.setValue.call(this,t,n)},t.prototype.setByIndex=function(e,t){var r=this,n=r._order;if(e<0)throw new o.ArgumentOutOfRangeException("index",e,"Is less than zero.");if(e>=n.length)throw new o.ArgumentOutOfRangeException("index",e,"Is greater than the count.");return r.setValue(n[e],t)},t.prototype.importValues=function(e){var t=this;return t.handleUpdate(function(){for(var r=!1,n=0;n<e.length;n++)t.setByIndex(n,e[n])&&(r=!0);return r})},t.prototype.setValues=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this.importValues(e)},t.prototype.removeByIndex=function(e){return this.setByIndex(e,a)},t.prototype.getKeys=function(){var e=this,t=e._order;return t.length&&t.filter(function(t){return e.containsKey(t)})||[]},t}(n.StringKeyDictionary);t.OrderedStringKeyDictionary=s,Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=s});
//# sourceMappingURL=OrderedStringKeyDictionary.js.map