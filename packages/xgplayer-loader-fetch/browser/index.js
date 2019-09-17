window.FetchLoader=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,i=n(2),s=(r=i)&&r.__esModule?r:{default:r};const o=0,a=1,u=2;window.Context=s.default,t.default=class{constructor(e){this.configs=Object.assign({},e),this.url=null,this.status=0,this.errir=null,this.buffer=this.configs.buffer,this.readtype=this.configs.readtype||o,this._reader=null}static get type(){return"loader"}load(e,t){let n=this;this.url=e;let r=this.getParams(t);self.fetch(this.url,r).then(e=>(n.status=e.status,n.loading=!0,n._onFetchResponse.call(n,e)))}_onFetchResponse(e){let t=this,n=this._context.getInstance(this.buffer);if(!0===e.ok)switch(this.readtype){case u:e.json().then(e=>{n?(n.push(e),t.emit(t.tag,"LOADER_COMPLETE",n)):t.emit(t.tag,"LOADER_COMPLETE",e)});break;case a:e.text().then(e=>{n?(n.push(e),t.emit(t.tag,"LOADER_COMPLETE",n)):t.emit(t.tag,"LOADER_COMPLETE",e)});break;case o:default:return this._onReader.call(this,e.body.getReader())}}_onReader(e){let t=this._context.getInstance(this.buffer);if(t||this._reader.cancel(),this._reader=e,!1===this.loading)return;let n=this;this._reader&&this._reader.read().then(function(r){return r.done?(n.loading=!1,n.status=0,void n.emit(n.tag,"LOADER_COMPLETE",t)):(t.push(r.value),n.emit(n.tag,"LOADER_DATALOADED",t),n._onReader(e))}).catch(function(e){console.log(e)})}getParams(e){let t=Object.assign({},e),n=new self.Headers,r={method:"GET",headers:n,mode:"cors",cache:"default"};if("object"==typeof this.configs.headers){let e=this.configs.headers;for(let t in e)e.hasOwnProperty(t)&&n.append(t,e[t])}return!1===t.cors&&(r.mode="same-origin"),t.withCredentials&&(r.credentials="include"),r}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,i=n(3),s=(r=i)&&r.__esModule?r:{default:r};const o=n(4),a={flv:s.default};t.default=class{constructor(e){this._emitter=new o.EventEmitter,this._instanceMap={},this._clsMap={},this._inited=!1,this.allEvents=a[e]||[]}getInstance(e){if(this._instanceMap[e])return this._instanceMap[e];throw new Error(`${e}实例尚未初始化`)}initInstance(e,...t){if(this._clsMap[e]){const n=new this._clsMap[e](...t);return this._instanceMap[e]=n,n}throw new Error(`${e}未在context中注册`)}init(e){if(!this._inited)for(let t in this._clsMap)this._clsMap.hasOwnProperty(t)&&this.initInstance(t,e)}registry(e,t){const n=this._emitter,r=this._isMessageNameValid.bind(this),i=this;this._clsMap[e]=class extends t{constructor(...t){super(...t),this.listeners={},this.tag=e,this._context=i}on(e,t){return r(e),this.listeners[e]?this.listeners[e].push(t):this.listeners[e]=[t],n.on(e,t)}once(e,t){return r(e),n.once(e,t)}emit(e,t,...i){return r(t),n.emit(t,...i)}off(e,t){return r(e),n.off(e,t)}destroy(){Object.keys(this.listeners).forEach(e=>{this.listeners[e].forEach(t=>{n.off(e,t)})}),delete i._instanceMap[e],super.destroy()}}}destroyInstances(){Object.keys(this._instanceMap).forEach(e=>{this._instanceMap[e].destroy&&this._instanceMap[e].destroy()})}destroy(){this._emitter=null,this.allEvents=null,this._clsMap=null,this.destroyInstances()}_isMessageNameValid(e){if(!this.allEvents[e])throw new Error(`unregistered message name: ${e}`)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=t.LOADER_EVENTS={LOADER_DATALOADED:"loader_dataloaded",LOADER_COMPLETE:"loader_complete",LOADER_ERROR:"loader_error"},i=t.DEMUX_EVENTS={DEMUX_COMPLETE:"demux_complete",DEMUX_ERROR:"demux_error",METADATA_PARSED:"metadata_complete",VIDEO_METADATA_CHANGE:"video_metadata_change",AUDIO_METADATA_CHANGE:"audio_metadata_change",MEDIA_INFO:"media_info"},s=t.REMUX_EVENTS={MEDIA_SEGMENT:"media_segment",INIT_SEGMENT:"init_segment"};t.default=Object.assign({},r,i,s)},function(e,t,n){"use strict";var r,i="object"==typeof Reflect?Reflect:null,s=i&&"function"==typeof i.apply?i.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};r=i&&"function"==typeof i.ownKeys?i.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var o=Number.isNaN||function(e){return e!=e};function a(){a.init.call(this)}e.exports=a,a.EventEmitter=a,a.prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var u=10;function c(e){return void 0===e._maxListeners?a.defaultMaxListeners:e._maxListeners}function l(e,t,n,r){var i,s,o,a;if("function"!=typeof n)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof n);if(void 0===(s=e._events)?(s=e._events=Object.create(null),e._eventsCount=0):(void 0!==s.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),s=e._events),o=s[t]),void 0===o)o=s[t]=n,++e._eventsCount;else if("function"==typeof o?o=s[t]=r?[n,o]:[o,n]:r?o.unshift(n):o.push(n),(i=c(e))>0&&o.length>i&&!o.warned){o.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+o.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=o.length,a=u,console&&console.warn&&console.warn(a)}return e}function f(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);this.fired||(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,s(this.listener,this.target,e))}function h(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},i=f.bind(r);return i.listener=n,r.wrapFn=i,i}function p(e,t,n){var r=e._events;if(void 0===r)return[];var i=r[t];return void 0===i?[]:"function"==typeof i?n?[i.listener||i]:[i]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(i):v(i,i.length)}function d(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function v(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return u},set:function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");u=e}}),a.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},a.prototype.getMaxListeners=function(){return c(this)},a.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,i=this._events;if(void 0!==i)r=r&&void 0===i.error;else if(!r)return!1;if(r){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var a=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw a.context=o,a}var u=i[e];if(void 0===u)return!1;if("function"==typeof u)s(u,this,t);else{var c=u.length,l=v(u,c);for(n=0;n<c;++n)s(l[n],this,t)}return!0},a.prototype.addListener=function(e,t){return l(this,e,t,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(e,t){return l(this,e,t,!0)},a.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.on(e,h(this,e,t)),this},a.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.prependListener(e,h(this,e,t)),this},a.prototype.removeListener=function(e,t){var n,r,i,s,o;if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);if(void 0===(r=this._events))return this;if(void 0===(n=r[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(i=-1,s=n.length-1;s>=0;s--)if(n[s]===t||n[s].listener===t){o=n[s].listener,i=s;break}if(i<0)return this;0===i?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,i),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,o||t)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(e){var t,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var i,s=Object.keys(n);for(r=0;r<s.length;++r)"removeListener"!==(i=s[r])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},a.prototype.listeners=function(e){return p(this,e,!0)},a.prototype.rawListeners=function(e){return p(this,e,!1)},a.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):d.call(e,t)},a.prototype.listenerCount=d,a.prototype.eventNames=function(){return this._eventsCount>0?r(this._events):[]}}]);