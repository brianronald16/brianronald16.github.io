/*!
 * ScrollMagic v2.0.5 (2015-04-29)
 * The javascript library for magical scroll interactions.
 * (c) 2015 Jan Paepke (@janpaepke)
 * Project Website: http://scrollmagic.io
 * 
 * @version 2.0.5
 * @license Dual licensed under MIT license and GPL.
 * @author Jan Paepke - e-mail@janpaepke.de
 *
 * @file ScrollMagic main library.
 */
!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.ScrollMagic=t()}(this,function(){"use strict";var e=function(){o.log(2,"(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use 'new ScrollMagic.Controller()' to create a new controller instance. Use 'new ScrollMagic.Scene()' to instance a scene.")};e.version="2.0.5",window.addEventListener("mousewheel",function(){});var t="data-scrollmagic-pin-spacer";e.Controller=function(r){var i="ScrollMagic.Controller",l="FORWARD",s="REVERSE",a="PAUSED",c=n.defaults,u=this,f=o.extend({},c,r),d=[],g=!1,p=0,h=a,v=!0,m=0,w=!0,y,S,E=function(){for(var t in f)c.hasOwnProperty(t)||(P(2,'WARNING: Unknown option "'+t+'"'),delete f[t]);if(f.container=o.get.elements(f.container)[0],!f.container)throw P(1,"ERROR creating object "+i+": No valid scroll container supplied"),i+" init failed.";v=f.container===window||f.container===document.body||!document.body.contains(f.container),v&&(f.container=window),m=T(),f.container.addEventListener("resize",O),f.container.addEventListener("scroll",O),f.refreshInterval=parseInt(f.refreshInterval)||c.refreshInterval,b(),P(3,"added new "+i+" controller (v"+e.version+")")},b=function(){f.refreshInterval>0&&(S=window.setTimeout(z,f.refreshInterval))},R=function(){return f.vertical?o.get.scrollTop(f.container):o.get.scrollLeft(f.container)},T=function(){return f.vertical?o.get.height(f.container):o.get.width(f.container)},C=this._setScrollPos=function(e){f.vertical?v?window.scrollTo(o.get.scrollLeft(),e):f.container.scrollTop=e:v?window.scrollTo(e,o.get.scrollTop()):f.container.scrollLeft=e},x=function(){if(w&&g){var e=o.type.Array(g)?g:d.slice(0);g=!1;var t=p;p=u.scrollPos();var n=p-t;0!==n&&(h=n>0?l:s),h===s&&e.reverse(),e.forEach(function(t,n){P(3,"updating Scene "+(n+1)+"/"+e.length+" ("+d.length+" total)"),t.update(!0)}),0===e.length&&f.loglevel>=3&&P(3,"updating 0 Scenes (nothing added to controller)")}},F=function(){y=o.rAF(x)},O=function(e){P(3,"event fired causing an update:",e.type),"resize"==e.type&&(m=T(),h=a),g!==!0&&(g=!0,F())},z=function(){if(!v&&m!=T()){var e;try{e=new Event("resize",{bubbles:!1,cancelable:!1})}catch(t){e=document.createEvent("Event"),e.initEvent("resize",!1,!1)}f.container.dispatchEvent(e)}d.forEach(function(e,t){e.refresh()}),b()},P=this._log=function(e,t){f.loglevel>=e&&(Array.prototype.splice.call(arguments,1,0,"("+i+") ->"),o.log.apply(window,arguments))};this._options=f;var A=function(e){if(e.length<=1)return e;var t=e.slice(0);return t.sort(function(e,t){return e.scrollOffset()>t.scrollOffset()?1:-1}),t};return this.addScene=function(t){if(o.type.Array(t))t.forEach(function(e,t){u.addScene(e)});else if(t instanceof e.Scene){if(t.controller()!==u)t.addTo(u);else if(d.indexOf(t)<0){d.push(t),d=A(d),t.on("shift.controller_sort",function(){d=A(d)});for(var n in f.globalSceneOptions)t[n]&&t[n].call(t,f.globalSceneOptions[n]);P(3,"adding Scene (now "+d.length+" total)")}}else P(1,"ERROR: invalid argument supplied for '.addScene()'");return u},this.removeScene=function(e){if(o.type.Array(e))e.forEach(function(e,t){u.removeScene(e)});else{var t=d.indexOf(e);t>-1&&(e.off("shift.controller_sort"),d.splice(t,1),P(3,"removing Scene (now "+d.length+" left)"),e.remove())}return u},this.updateScene=function(t,n){return o.type.Array(t)?t.forEach(function(e,t){u.updateScene(e,n)}):n?t.update(!0):g!==!0&&t instanceof e.Scene&&(g=g||[],g.indexOf(t)==-1&&g.push(t),g=A(g),F()),u},this.update=function(e){return O({type:"resize"}),e&&x(),u},this.scrollTo=function(n,r){if(o.type.Number(n))C.call(f.container,n,r);else if(n instanceof e.Scene)n.controller()===u?u.scrollTo(n.scrollOffset(),r):P(2,"scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.",n);else if(o.type.Function(n))C=n;else{var i=o.get.elements(n)[0];if(i){for(;i.parentNode.hasAttribute(t);)i=i.parentNode;var l=f.vertical?"top":"left",s=o.get.offset(f.container),a=o.get.offset(i);v||(s[l]-=u.scrollPos()),u.scrollTo(a[l]-s[l],r)}else P(2,"scrollTo(): The supplied argument is invalid. Scroll cancelled.",n)}return u},this.scrollPos=function(e){return arguments.length?(o.type.Function(e)?R=e:P(2,"Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'."),u):R.call(u)},this.info=function(e){var t={size:m,vertical:f.vertical,scrollPos:p,scrollDirection:h,container:f.container,isDocument:v};return arguments.length?void 0!==t[e]?t[e]:void P(1,'ERROR: option "'+e+'" is not available'):t},this.loglevel=function(e){return arguments.length?(f.loglevel!=e&&(f.loglevel=e),u):f.loglevel},this.enabled=function(e){return arguments.length?(w!=e&&(w=!!e,u.updateScene(d,!0)),u):w},this.destroy=function(e){window.clearTimeout(S);for(var t=d.length;t--;)d[t].destroy(e);return f.container.removeEventListener("resize",O),f.container.removeEventListener("scroll",O),o.cAF(y),P(3,"destroyed "+i+" (reset: "+(e?"true":"false")+")"),null},E(),u};var n={defaults:{container:window,vertical:!0,globalSceneOptions:{},loglevel:2,refreshInterval:100}};e.Controller.addOption=function(e,t){n.defaults[e]=t},e.Controller.extend=function(t){var n=this;e.Controller=function(){return n.apply(this,arguments),this.$super=o.extend({},this),t.apply(this,arguments)||this},o.extend(e.Controller,n),e.Controller.prototype=n.prototype,e.Controller.prototype.constructor=e.Controller},e.Scene=function(n){var i="ScrollMagic.Scene",l="BEFORE",s="DURING",a="AFTER",c=r.defaults,u=this,f=o.extend({},c,n),d=l,g=0,p={start:0,end:0},h=0,v=!0,m,w,y=function(){for(var e in f)c.hasOwnProperty(e)||(E(2,'WARNING: Unknown option "'+e+'"'),delete f[e]);for(var t in c)z(t);F()},S={};this.on=function(e,t){return o.type.Function(t)?(e=e.trim().split(" "),e.forEach(function(e){var n=e.split("."),r=n[0],o=n[1];"*"!=r&&(S[r]||(S[r]=[]),S[r].push({namespace:o||"",callback:t}))})):E(1,"ERROR when calling '.on()': Supplied callback for '"+e+"' is not a valid function!"),u},this.off=function(e,t){return e?(e=e.trim().split(" "),e.forEach(function(e,n){var r=e.split("."),o=r[0],i=r[1]||"",l="*"===o?Object.keys(S):[o];l.forEach(function(e){for(var n=S[e]||[],r=n.length;r--;){var o=n[r];!o||i!==o.namespace&&"*"!==i||t&&t!=o.callback||n.splice(r,1)}n.length||delete S[e]})}),u):(E(1,"ERROR: Invalid event name supplied."),u)},this.trigger=function(t,n){if(t){var r=t.trim().split("."),o=r[0],i=r[1],l=S[o];E(3,"event fired:",o,n?"->":"",n||""),l&&l.forEach(function(t,r){i&&i!==t.namespace||t.callback.call(u,new e.Event(o,t.namespace,u,n))})}else E(1,"ERROR: Invalid event name supplied.");return u},u.on("change.internal",function(e){"loglevel"!==e.what&&"tweenChanges"!==e.what&&("triggerElement"===e.what?T():"reverse"===e.what&&u.update())}).on("shift.internal",function(e){b(),u.update()});var E=this._log=function(e,t){f.loglevel>=e&&(Array.prototype.splice.call(arguments,1,0,"("+i+") ->"),o.log.apply(window,arguments))};this.addTo=function(t){return t instanceof e.Controller?w!=t&&(w&&w.removeScene(u),w=t,F(),R(!0),T(!0),b(),w.info("container").addEventListener("resize",C),t.addScene(u),u.trigger("add",{controller:w}),E(3,"added "+i+" to controller"),u.update()):E(1,"ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller"),u},this.enabled=function(e){return arguments.length?(v!=e&&(v=!!e,u.update(!0)),u):v},this.remove=function(){if(w){w.info("container").removeEventListener("resize",C);var e=w;w=void 0,e.removeScene(u),u.trigger("remove"),E(3,"removed "+i+" from controller")}return u},this.destroy=function(e){return u.trigger("destroy",{reset:e}),u.remove(),u.off("*.*"),E(3,"destroyed "+i+" (reset: "+(e?"true":"false")+")"),null},this.update=function(e){if(w)if(e)if(w.enabled()&&v){var t=w.info("scrollPos"),n;n=f.duration>0?(t-p.start)/(p.end-p.start):t>=p.start?1:0,u.trigger("update",{startPos:p.start,endPos:p.end,scrollPos:t}),u.progress(n)}else P&&d===s&&L(!0);else w.updateScene(u,!1);return u},this.refresh=function(){return R(),T(),u},this.progress=function(e){if(arguments.length){var t=!1,n=d,r=w?w.info("scrollDirection"):"PAUSED",o=f.reverse||e>=g;if(0===f.duration?(t=g!=e,g=e<1&&o?0:1,d=0===g?l:s):e<0&&d!==l&&o?(g=0,d=l,t=!0):e>=0&&e<1&&o?(g=e,d=s,t=!0):e>=1&&d!==a?(g=1,d=a,t=!0):d!==s||o||L(),t){var i={progress:g,state:d,scrollDirection:r},c=d!=n,p=function(e){u.trigger(e,i)};c&&n!==s&&(p("enter"),p(n===l?"start":"end")),p("progress"),c&&d!==s&&(p(d===l?"start":"end"),p("leave"))}return u}return g};var b=function(){p={start:h+f.offset},w&&f.triggerElement&&(p.start-=w.info("size")*f.triggerHook),p.end=p.start+f.duration},R=function(e){if(m){var t="duration";O(t,m.call(u))&&!e&&(u.trigger("change",{what:t,newval:f[t]}),u.trigger("shift",{reason:t}))}},T=function(e){var n=0,r=f.triggerElement;if(w&&r){for(var i=w.info(),l=o.get.offset(i.container),s=i.vertical?"top":"left";r.parentNode.hasAttribute(t);)r=r.parentNode;var a=o.get.offset(r);i.isDocument||(l[s]-=w.scrollPos()),n=a[s]-l[s]}var c=n!=h;h=n,c&&!e&&u.trigger("shift",{reason:"triggerElementPosition"})},C=function(e){f.triggerHook>0&&u.trigger("shift",{reason:"containerResize"})},x=o.extend(r.validate,{duration:function(e){if(o.type.String(e)&&e.match(/^(\.|\d)*\d+%$/)){var t=parseFloat(e)/100;e=function(){return w?w.info("size")*t:0}}if(o.type.Function(e)){m=e;try{e=parseFloat(m())}catch(t){e=-1}}if(e=parseFloat(e),!o.type.Number(e)||e<0)throw m?(m=void 0,['Invalid return value of supplied function for option "duration":',e]):['Invalid value for option "duration":',e];return e}}),F=function(e){e=arguments.length?[e]:Object.keys(x),e.forEach(function(e,t){var n;if(x[e])try{n=x[e](f[e])}catch(t){n=c[e];var r=o.type.String(t)?[t]:t;o.type.Array(r)?(r[0]="ERROR: "+r[0],r.unshift(1),E.apply(this,r)):E(1,"ERROR: Problem executing validation callback for option '"+e+"':",t.message)}finally{f[e]=n}})},O=function(e,t){var n=!1,r=f[e];return f[e]!=t&&(f[e]=t,F(e),n=r!=f[e]),n},z=function(e){u[e]||(u[e]=function(t){return arguments.length?("duration"===e&&(m=void 0),O(e,t)&&(u.trigger("change",{what:e,newval:f[e]}),r.shifts.indexOf(e)>-1&&u.trigger("shift",{reason:e})),u):f[e]})};this.controller=function(){return w},this.state=function(){return d},this.scrollOffset=function(){return p.start},this.triggerPosition=function(){var e=f.offset;return w&&(e+=f.triggerElement?h:w.info("size")*u.triggerHook()),e};var P,A;u.on("shift.internal",function(e){var t="duration"===e.reason;(d===a&&t||d===s&&0===f.duration)&&L(),t&&I()}).on("progress.internal",function(e){L()}).on("add.internal",function(e){I()}).on("destroy.internal",function(e){u.removePin(e.reset)});var L=function(e){if(P&&w){var t=w.info(),n=A.spacer.firstChild;if(e||d!==s){var r={position:A.inFlow?"relative":"absolute",top:0,left:0},i=o.css(n,"position")!=r.position;A.pushFollowers?f.duration>0&&(d===a&&0===parseFloat(o.css(A.spacer,"padding-top"))?i=!0:d===l&&0===parseFloat(o.css(A.spacer,"padding-bottom"))&&(i=!0)):r[t.vertical?"top":"left"]=f.duration*g,o.css(n,r),i&&I()}else{"fixed"!=o.css(n,"position")&&(o.css(n,{position:"fixed"}),I());var c=o.get.offset(A.spacer,!0),u=f.reverse||0===f.duration?t.scrollPos-p.start:Math.round(g*f.duration*10)/10;c[t.vertical?"top":"left"]+=u,o.css(A.spacer.firstChild,{top:c.top,left:c.left})}}},I=function(){if(P&&w&&A.inFlow){var e=d===a,t=d===l,n=d===s,r=w.info("vertical"),i=A.spacer.firstChild,c=o.isMarginCollapseType(o.css(A.spacer,"display")),u={};A.relSize.width||A.relSize.autoFullWidth?n?o.css(P,{width:o.get.width(A.spacer)}):o.css(P,{width:"100%"}):(u["min-width"]=o.get.width(r?P:i,!0,!0),u.width=n?u["min-width"]:"auto"),A.relSize.height?n?o.css(P,{height:o.get.height(A.spacer)-(A.pushFollowers?f.duration:0)}):o.css(P,{height:"100%"}):(u["min-height"]=o.get.height(r?i:P,!0,!c),u.height=n?u["min-height"]:"auto"),A.pushFollowers&&(u["padding"+(r?"Top":"Left")]=f.duration*g,u["padding"+(r?"Bottom":"Right")]=f.duration*(1-g)),o.css(A.spacer,u)}},N=function(){w&&P&&d===s&&!w.info("isDocument")&&L()},_=function(){w&&P&&d===s&&((A.relSize.width||A.relSize.autoFullWidth)&&o.get.width(window)!=o.get.width(A.spacer.parentNode)||A.relSize.height&&o.get.height(window)!=o.get.height(A.spacer.parentNode))&&I()},M=function(e){w&&P&&d===s&&!w.info("isDocument")&&(e.preventDefault(),w._setScrollPos(w.info("scrollPos")-((e.wheelDelta||e[w.info("vertical")?"wheelDeltaY":"wheelDeltaX"])/3||30*-e.detail)))};this.setPin=function(e,n){var r={pushFollowers:!0,spacerClass:"scrollmagic-pin-spacer"};if(n=o.extend({},r,n),e=o.get.elements(e)[0],!e)return E(1,"ERROR calling method 'setPin()': Invalid pin element supplied."),u;if("fixed"===o.css(e,"position"))return E(1,"ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'."),u;if(P){if(P===e)return u;u.removePin()}P=e;var i=P.parentNode.style.display,l=["top","left","bottom","right","margin","marginLeft","marginRight","marginTop","marginBottom"];P.parentNode.style.display="none";var s="absolute"!=o.css(P,"position"),a=o.css(P,l.concat(["display"])),c=o.css(P,["width","height"]);P.parentNode.style.display=i,!s&&n.pushFollowers&&(E(2,"WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled."),n.pushFollowers=!1),window.setTimeout(function(){P&&0===f.duration&&n.pushFollowers&&E(2,"WARNING: pushFollowers =",!0,"has no effect, when scene duration is 0.")},0);var d=P.parentNode.insertBefore(document.createElement("div"),P),g=o.extend(a,{position:s?"relative":"absolute",boxSizing:"content-box",mozBoxSizing:"content-box",webkitBoxSizing:"content-box"});if(s||o.extend(g,o.css(P,["width","height"])),o.css(d,g),d.setAttribute(t,""),o.addClass(d,n.spacerClass),A={spacer:d,relSize:{width:"%"===c.width.slice(-1),height:"%"===c.height.slice(-1),autoFullWidth:"auto"===c.width&&s&&o.isMarginCollapseType(a.display)},pushFollowers:n.pushFollowers,inFlow:s},!P.___origStyle){P.___origStyle={};var p=P.style,h=l.concat(["width","height","position","boxSizing","mozBoxSizing","webkitBoxSizing"]);h.forEach(function(e){P.___origStyle[e]=p[e]||""})}return A.relSize.width&&o.css(d,{width:c.width}),A.relSize.height&&o.css(d,{height:c.height}),d.appendChild(P),o.css(P,{position:s?"relative":"absolute",margin:"auto",top:"auto",left:"auto",bottom:"auto",right:"auto"}),(A.relSize.width||A.relSize.autoFullWidth)&&o.css(P,{boxSizing:"border-box",mozBoxSizing:"border-box",webkitBoxSizing:"border-box"}),window.addEventListener("scroll",N),window.addEventListener("resize",N),window.addEventListener("resize",_),P.addEventListener("mousewheel",M),P.addEventListener("DOMMouseScroll",M),E(3,"added pin"),L(),u},this.removePin=function(e){if(P){if(d===s&&L(!0),e||!w){var n=A.spacer.firstChild;if(n.hasAttribute(t)){var r=A.spacer.style,i=["margin","marginLeft","marginRight","marginTop","marginBottom"];margins={},i.forEach(function(e){margins[e]=r[e]||""}),o.css(n,margins)}A.spacer.parentNode.insertBefore(n,A.spacer),A.spacer.parentNode.removeChild(A.spacer),P.parentNode.hasAttribute(t)||(o.css(P,P.___origStyle),delete P.___origStyle)}window.removeEventListener("scroll",N),window.removeEventListener("resize",N),window.removeEventListener("resize",_),P.removeEventListener("mousewheel",M),P.removeEventListener("DOMMouseScroll",M),P=void 0,E(3,"removed pin (reset: "+(e?"true":"false")+")")}return u};var k,D=[];return u.on("destroy.internal",function(e){u.removeClassToggle(e.reset)}),this.setClassToggle=function(e,t){var n=o.get.elements(e);return 0!==n.length&&o.type.String(t)?(D.length>0&&u.removeClassToggle(),k=t,D=n,u.on("enter.internal_class leave.internal_class",function(e){var t="enter"===e.type?o.addClass:o.removeClass;D.forEach(function(e,n){t(e,k)})}),u):(E(1,"ERROR calling method 'setClassToggle()': Invalid "+(0===n.length?"element":"classes")+" supplied."),u)},this.removeClassToggle=function(e){return e&&D.forEach(function(e,t){o.removeClass(e,k)}),u.off("start.internal_class end.internal_class"),k=void 0,D=[],u},y(),u};var r={defaults:{duration:0,offset:0,triggerElement:void 0,triggerHook:.5,reverse:!0,loglevel:2},validate:{offset:function(e){if(e=parseFloat(e),!o.type.Number(e))throw['Invalid value for option "offset":',e];return e},triggerElement:function(e){if(e=e||void 0){var t=o.get.elements(e)[0];if(!t)throw['Element defined in option "triggerElement" was not found:',e];e=t}return e},triggerHook:function(e){var t={onCenter:.5,onEnter:1,onLeave:0};if(o.type.Number(e))e=Math.max(0,Math.min(parseFloat(e),1));else{if(!(e in t))throw['Invalid value for option "triggerHook": ',e];e=t[e]}return e},reverse:function(e){return!!e},loglevel:function(e){if(e=parseInt(e),!o.type.Number(e)||e<0||e>3)throw['Invalid value for option "loglevel":',e];return e}},shifts:["duration","offset","triggerHook"]};e.Scene.addOption=function(t,n,o,i){t in r.defaults?e._util.log(1,"[static] ScrollMagic.Scene -> Cannot add Scene option '"+t+"', because it already exists."):(r.defaults[t]=n,r.validate[t]=o,i&&r.shifts.push(t))},e.Scene.extend=function(t){var n=this;e.Scene=function(){return n.apply(this,arguments),this.$super=o.extend({},this),t.apply(this,arguments)||this},o.extend(e.Scene,n),e.Scene.prototype=n.prototype,e.Scene.prototype.constructor=e.Scene},e.Event=function(e,t,n,r){r=r||{};for(var o in r)this[o]=r[o];return this.type=e,this.target=this.currentTarget=n,this.namespace=t||"",this.timeStamp=this.timestamp=Date.now(),this};var o=e._util=function(e){var t={},n,r=function(e){return parseFloat(e)||0},o=function(t){return t.currentStyle?t.currentStyle:e.getComputedStyle(t)},i=function(t,n,i,l){if(n=n===document?e:n,n===e)l=!1;else if(!p.DomElement(n))return 0;t=t.charAt(0).toUpperCase()+t.substr(1).toLowerCase();var s=(i?n["offset"+t]||n["outer"+t]:n["client"+t]||n["inner"+t])||0;if(i&&l){var a=o(n);s+="Height"===t?r(a.marginTop)+r(a.marginBottom):r(a.marginLeft)+r(a.marginRight)}return s},l=function(e){return e.replace(/^[^a-z]+([a-z])/g,"$1").replace(/-([a-z])/g,function(e){return e[1].toUpperCase()})};t.extend=function(e){for(e=e||{},n=1;n<arguments.length;n++)if(arguments[n])for(var t in arguments[n])arguments[n].hasOwnProperty(t)&&(e[t]=arguments[n][t]);return e},t.isMarginCollapseType=function(e){return["block","flex","list-item","table","-webkit-box"].indexOf(e)>-1};var s=0,a=["ms","moz","webkit","o"],c=e.requestAnimationFrame,u=e.cancelAnimationFrame;for(n=0;!c&&n<a.length;++n)c=e[a[n]+"RequestAnimationFrame"],u=e[a[n]+"CancelAnimationFrame"]||e[a[n]+"CancelRequestAnimationFrame"];c||(c=function(t){var n=(new Date).getTime(),r=Math.max(0,16-(n-s)),o=e.setTimeout(function(){t(n+r)},r);return s=n+r,o}),u||(u=function(t){e.clearTimeout(t)}),t.rAF=c.bind(e),t.cAF=u.bind(e);var f=["error","warn","log"],d=e.console||{};for(d.log=d.log||function(){},n=0;n<f.length;n++){var g=f[n];d[g]||(d[g]=d.log)}t.log=function(e){(e>f.length||e<=0)&&(e=f.length);var t=new Date,n=("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)+":"+("0"+t.getSeconds()).slice(-2)+":"+("00"+t.getMilliseconds()).slice(-3),r=f[e-1],o=Array.prototype.splice.call(arguments,1),i=Function.prototype.bind.call(d[r],d);o.unshift(n),i.apply(d,o)};var p=t.type=function(e){return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/,"$1").toLowerCase()};p.String=function(e){return"string"===p(e)},p.Function=function(e){return"function"===p(e)},p.Array=function(e){return Array.isArray(e)},p.Number=function(e){return!p.Array(e)&&e-parseFloat(e)+1>=0},p.DomElement=function(e){return"object"==typeof HTMLElement?e instanceof HTMLElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName};var h=t.get={};return h.elements=function(t){var n=[];if(p.String(t))try{t=document.querySelectorAll(t)}catch(e){return n}if("nodelist"===p(t)||p.Array(t))for(var r=0,o=n.length=t.length;r<o;r++){var i=t[r];n[r]=p.DomElement(i)?i:h.elements(i)}else(p.DomElement(t)||t===document||t===e)&&(n=[t]);return n},h.scrollTop=function(t){return t&&"number"==typeof t.scrollTop?t.scrollTop:e.pageYOffset||0},h.scrollLeft=function(t){return t&&"number"==typeof t.scrollLeft?t.scrollLeft:e.pageXOffset||0},h.width=function(e,t,n){return i("width",e,t,n)},h.height=function(e,t,n){return i("height",e,t,n)},h.offset=function(e,t){var n={top:0,left:0};if(e&&e.getBoundingClientRect){var r=e.getBoundingClientRect();n.top=r.top,n.left=r.left,t||(n.top+=h.scrollTop(),n.left+=h.scrollLeft())}return n},t.addClass=function(e,t){t&&(e.classList?e.classList.add(t):e.className+=" "+t)},t.removeClass=function(e,t){t&&(e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," "))},t.css=function(e,t){if(p.String(t))return o(e)[l(t)];if(p.Array(t)){var n={},r=o(e);return t.forEach(function(e,t){n[e]=r[l(e)]}),n}for(var i in t){var s=t[i];s==parseFloat(s)&&(s+="px"),e.style[l(i)]=s}},t}(window||{});return e.Scene.prototype.addIndicators=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"),this},e.Scene.prototype.removeIndicators=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"),this},e.Scene.prototype.setTween=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"),this},e.Scene.prototype.removeTween=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"),this},e.Scene.prototype.setVelocity=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"),this},e.Scene.prototype.removeVelocity=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"),this},e});