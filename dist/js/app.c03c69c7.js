!function(e){function t(t){for(var r,o,i=t[0],c=t[1],u=t[2],p=0,f=[];p<i.length;p++)o=i[p],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&f.push(s[o][0]),s[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(l&&l(t);f.length;)f.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,i=1;i<n.length;i++){var c=n[i];0!==s[c]&&(r=!1)}r&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},s={app:0},a=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var i=window.webpackJsonp=window.webpackJsonp||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=c;a.push([0,"chunk-vendors"]),n()}({0:function(e,t,n){e.exports=n("56d7")},"1a42":function(e,t){e.exports={API_URL:"https://mighty-savannah-90439.herokuapp.com",API_URL_WEBSOCKET:"wss://mighty-savannah-90439.herokuapp.com"}},"243d":function(e,t,n){},3298:function(e,t,n){"use strict";n("243d")},"56d7":function(e,t,n){"use strict";n.r(t),n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),s=(n("8e6e"),n("ac6a"),n("456d"),n("75fc")),a=(n("96cf"),n("3b8d")),o=n("bd86"),i=n("3ce5"),c=(n("c561"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"auth"},[n("div",{staticClass:"auth__header-wrapper header-container"},[n("div",{staticClass:"header-title"},[n("p",{staticClass:"auth__header-text header-title-text"},[e._v("Auth")]),n("div",{staticClass:"auth__tabs"},[n("button",{staticClass:"auth__tab",class:{active:"login"===e.activeTab},on:{click:function(t){e.activeTab="login"}}},[e._v(" Login ")]),n("button",{staticClass:"auth__tab",class:{active:"register"===e.activeTab},on:{click:function(t){e.activeTab="register"}}},[e._v(" Register ")])])])]),"login"===e.activeTab?n("div",[n("h2",[e._v("Login")]),n("form",{staticClass:"auth__form",on:{submit:function(t){return t.preventDefault(),e.submitLogin(t)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"input auth__input",attrs:{type:"email",name:"email",placeholder:"Email"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),n("span",{staticClass:"input-animation"}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"input auth__input",attrs:{type:"password",name:"password",placeholder:"Password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),n("span",{staticClass:"input-animation"}),e.error?n("p",{staticClass:"auth__error"},[e._v(e._s(e.error))]):e._e(),n("button",{staticClass:"auth__btn-submit btn-submit",attrs:{type:"submit"}},[e._v("Submit")])])]):e._e(),"register"===e.activeTab?n("div",[n("h2",[e._v("Register")]),n("form",{staticClass:"auth__form",on:{submit:function(t){return t.preventDefault(),e.submitRegister(t)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"input auth__input",attrs:{type:"email",name:"email",placeholder:"Email"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),n("span",{staticClass:"input-animation"}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"input auth__input",attrs:{type:"password",name:"password",placeholder:"Password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),n("span",{staticClass:"input-animation"}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.passwordConfirm,expression:"passwordConfirm"}],staticClass:"input auth__input",attrs:{type:"password",name:"confirm_password",placeholder:"Confirm password"},domProps:{value:e.passwordConfirm},on:{input:function(t){t.target.composing||(e.passwordConfirm=t.target.value)}}}),n("span",{staticClass:"input-animation"}),e.error?n("p",{staticClass:"auth__error"},[e._v(e._s(e.error))]):e._e(),n("button",{staticClass:"auth__btn-submit btn-submit",attrs:{type:"submit"}},[e._v("Submit")])])]):e._e(),e._m(0)])}),u=n("2f62"),l=n("bc3a"),p=n.n(l).a.create(),f=n("1a42");p.defaults.baseURL=f.API_URL,p.defaults.withCredentials=!0;var d=p,m=function(e){h!==e&&(h=e,window.localStorage.setItem("token",e)),p.defaults.headers.common={Authorization:"bearer ".concat(e)}},h=window.localStorage.getItem("token");function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}h&&m(h);var v={name:"auth",data:function(){return{email:"",password:"",passwordConfirm:"",activeTab:"login",error:""}},computed:b({},Object(u.c)(["isAuth"])),watch:{activeTab:function(){this.error=""}},created:function(){this.checkAuth()},methods:b(b({},Object(u.d)(["setUser"])),{},{checkAuth:function(){var e=Object(a.a)(regeneratorRuntime.mark((function e(){var t,n,r,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.post("/check");case 3:t=e.sent,e.next=9;break;case 6:return e.prev=6,e.t0=e.catch(0),e.abrupt("return",console.log(e.t0));case 9:if(n=t.data||{},r=n.success,s=n.user,n.errorMessage,!r||!s.token){e.next=13;break}return m(s.token),e.abrupt("return",this.setUser(s));case 13:case"end":return e.stop()}}),e,this,[[0,6]])})));return function(){return e.apply(this,arguments)}}(),submitLogin:function(){var e=Object(a.a)(regeneratorRuntime.mark((function e(){var t,n,r,s,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.error="",e.prev=1,e.next=4,d.post("/login",{email:this.email,password:this.password});case 4:t=e.sent,n=t.data||{},r=n.success,s=n.user,a=n.errorMessage,r&&s.token?(m(s.token),this.setUser(s)):a&&(this.error=a),e.next=12;break;case 9:return e.prev=9,e.t0=e.catch(1),e.abrupt("return",console.log(e.t0));case 12:case"end":return e.stop()}}),e,this,[[1,9]])})));return function(){return e.apply(this,arguments)}}(),submitRegister:function(){var e=Object(a.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.error="",e.prev=1,e.next=4,d.post("/register",{email:this.email,password:this.password});case 4:(t=e.sent).data&&t.data.success?this.setUser(t.data.user):t.data&&t.data.errorMessage&&(this.error=t.data.errorMessage),e.next=11;break;case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",console.log(e.t0));case 11:case"end":return e.stop()}}),e,this,[[1,8]])})));return function(){return e.apply(this,arguments)}}()})},w=(n("3298"),n("2877")),k=Object(w.a)(v,c,[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"auth__bg"},[n("span",{staticClass:"auth__bg-left"},[e._v("⊕")]),n("span",{staticClass:"auth__bg-right"},[e._v("⊕")])])}],!1,null,null,null).exports;n("7f7f"),n("4f7f"),n("5df3"),n("1c4c"),n("20d6"),r.default.use(u.a);var _=n("1ba4"),y=n.n(_),O=n("1a42"),C={callbackList:{},connect:function(){var e=this;return new Promise(function(){var t=Object(a.a)(regeneratorRuntime.mark((function t(n,r){var s;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,s=h,t.t0=e.socket,t.t0){t.next=7;break}return t.next=6,y()(O.API_URL_WEBSOCKET).withApiToken(s).connect();case 6:t.t0=t.sent;case 7:e.socket=t.t0,e.socket.on("close",(function(){console.log("close"),e.runCallback("close")})),e.socket.on("open",Object(a.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("connected"),e.runCallback("open"),t.next=4,e.subscribe();case 4:n();case 5:case"end":return t.stop()}}),t)})))),e.socket.on("error",(function(){e.runCallback("error"),r(),console.log("disconnected")})),window.socket=e,t.next=17;break;case 14:t.prev=14,t.t1=t.catch(0),console.log(t.t1);case 17:case"end":return t.stop()}}),t,null,[[0,14]])})));return function(e,n){return t.apply(this,arguments)}}())},close:function(){this.socket&&this.socket.close(),this.subscription&&this.subscription.close(),this.socket=void 0,this.subscription=void 0},subscribe:function(){var e=Object(a.a)(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(a.a)(regeneratorRuntime.mark((function e(n,r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.socket){e.next=2;break}throw new Error("Websocket not connected. Subscription not available.");case 2:if(e.prev=2,e.t0=t.subscription,e.t0){e.next=8;break}return e.next=7,t.socket.subscribe("chat");case 7:e.t0=e.sent;case 8:t.subscription=e.t0,e.next=14;break;case 11:e.prev=11,e.t1=e.catch(2),console.log(e.t1);case 14:t.subscription.on("ready",(function(){console.log("ready"),n()})),t.subscription.on("error",(function(e){console.log("error",e),r()}));case 16:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),on:function(e,t){this.socket&&this.setCallback(e,t)},off:function(e){this.socket&&this.setCallback(e)},runCallback:function(e){console.log("run",e),this.callbackList[e]&&this.callbackList[e].call()},setCallback:function(e,t){t?(this.callbackList[e]=t,"open"===e&&this.socket&&this.runCallback("open")):delete this.callbackList[e]}};function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var R={name:"app",components:{Chat:i.Chat,Auth:k},data:function(){return{isConnected:!1,visible:!0,placeholder:"send your message",colors:{header:{bg:"#086CA2",text:"#fff"},message:{myself:{bg:"#fff",text:"#555"},others:{bg:"#dfefff",text:"#555"},messagesDisplay:{bg:"#f7f3f3"}},submitIcon:"#086CA2",submitImageIcon:"#086CA2"},borderStyle:{topLeft:"10px",topRight:"10px",bottomLeft:"10px",bottomRight:"10px"},submitIconSize:24,submitImageIconSize:24,closeButtonIconSize:"20px",asyncMode:!0,toLoad:[{content:"Hey, John Doe! How are you today?",participantId:2,timestamp:{year:2016,month:3,day:5,hour:10,minute:10,second:3,millisecond:123},uploaded:!0,viewed:!0},{content:"Hey, Adam! I'm feeling really fine this evening.",participantId:3,timestamp:{year:2016,month:1,day:5,hour:19,minute:10,second:3,millisecond:123},uploaded:!0,viewed:!0}],scrollBottom:{messageSent:!0,messageReceived:!1},profilePictureConfig:{others:!1,myself:!1,styles:{width:"30px",height:"30px",borderRadius:"50%"}},timestampConfig:{format:"HH:mm",relative:!1},linkOptions:{myself:{className:"myLinkClass",events:{click:function(e){console.log("Link clicked!")},mouseover:function(e){console.log("Link hovered!")}},format:function(e,t){return"url"===t&&e.length>50&&(e=e.slice(0,50)+"…"),e}},others:{className:"othersLinkClass",events:{click:function(e){e.preventDefault(),console.log("Link clicked!")},mouseover:function(e){console.log("Link hovered!")}},format:function(e,t){return"url"===t&&e.length>50&&(e=e.slice(0,50)+"…"),e}}}}},computed:j(j(j({},Object(u.e)(["user"])),Object(u.c)(["isAuth","messages","participants"])),{},{chatTitle:function(){return"Chat of the doom"}}),watch:{isAuth:function(){var e=Object(a.a)(regeneratorRuntime.mark((function e(t){var n,r=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=7;break}return e.next=3,this.fetchMessages();case 3:return e.next=5,C.connect();case 5:this.addSocketListeners(),this.messages.length&&(n=this.messages.filter((function(e){return e.participantId!==r.user.id&&!e.viewed})).map((function(e){return e.id})),this.sendMarkMessageAsViewed(n));case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},beforeCreate:function(){this.$store=new u.a.Store({state:{user:!1,messagesRaw:[],participantsRaw:[]},mutations:{setUser:function(e,t){e.user=t},addMessage:function(e,t){console.log("addMessage",t),e.messagesRaw.push(t)},setAsViewed:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];console.log("messageIdList",t),Array.isArray(t)?t.forEach((function(t){var n=e.messagesRaw.findIndex((function(e){return e.id===t})),r=e.messagesRaw[n];-1!==n&&(r.viewed=!0,e.messagesRaw.splice(n,1,r))})):console.log("messageIdList is not ARRAY!!!",t)},setMessageList:function(e,t){e.messagesRaw=Object(s.a)(t)},setParticipant:function(e,t){var n=Object(s.a)(e.participantsRaw);n.push(t),e.participantsRaw=Array.from(new Set(n))},setParticipantList:function(e,t){e.participantsRaw=Object(s.a)(t)}},getters:{isAuth:function(e){return Boolean(e.user&&e.user.id)},participants:function(e){var t=e.user&&e.user.name;return e.participantsRaw.filter((function(e){return e.name!==t}))},messages:function(e){return Object(s.a)(e.messagesRaw).map((function(e){return e.timestamp=e.created_at,e.participantId=e.user_id||e.participantId,delete e.user_id,e}))}},actions:{fetchMessages:function(){var e=Object(a.a)(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.state,n=t.commit,e.prev=1,e.next=4,d.post("/list");case 4:r=e.sent,e.next=10;break;case 7:return e.prev=7,e.t0=e.catch(1),e.abrupt("return",console.log(e.t0));case 10:r.data&&r.data.messages&&(n("setMessageList",r.data.messages),n("setParticipantList",r.data.participants));case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}()}})},beforeDestroy:function(){C.close()},methods:j(j(j({},Object(u.b)(["fetchMessages"])),Object(u.d)(["setUser","addMessage","setAsViewed","setParticipant","setParticipantList"])),{},{sendMarkMessageAsViewed:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];C.subscription.emit("viewed",e)},addSocketListeners:function(){var e=this;C.on("close",(function(){e.isConnected=!1,console.log("close")})),C.on("open",(function(){e.isConnected=!0,console.log("open")})),C.subscription.on("message",(function(t){e.addMessage(t),t.viewed||t.participantId===e.user.id||e.sendMarkMessageAsViewed([t.id])})),C.subscription.on("viewed",(function(t){e.setAsViewed(t)}))},onType:function(e){},loadMoreMessages:function(e){var t=this;setTimeout((function(){var n;e(t.toLoad),(n=t.messages).unshift.apply(n,Object(s.a)(t.toLoad)),t.toLoad=[]}),1e3)},onMessageSubmit:function(e){this.sendMessage(e)},sendMessage:function(){var e=Object(a.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:C.subscription.emit("message",t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),onClose:function(){this.logout(),C.close()},logout:function(){var e=Object(a.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.post("/logout");case 3:t=e.sent,e.next=9;break;case 6:return e.prev=6,e.t0=e.catch(0),e.abrupt("return",console.log(e.t0));case 9:if(!t.data||!t.data.success){e.next=11;break}return e.abrupt("return",this.setUser({}));case 11:case"end":return e.stop()}}),e,this,[[0,6]])})));return function(){return e.apply(this,arguments)}}(),onImageSelected:function(e){e.file;var t=e.message;setTimeout((function(e){t.uploaded=!0,t.src=e.src}),3e3,{src:"https://pbs.twimg.com/profile_images/875996174305472512/upM71pVR.jpg"})},onImageClicked:function(e){console.log("Image clicked",e.src)}})},P=(n("5c0b"),Object(w.a)(R,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app"},[n("div",{staticClass:"app__status"},[e.isConnected?n("p",[e._v("Online "),n("span",{staticClass:"app__status-mark app__status-mark--online"},[e._v("●")])]):n("p",[e._v("Offline "),n("span",{staticClass:"app__status-mark app__status-mark--offline"},[e._v("●")])])]),n("div",{staticClass:"content"},[e.isAuth?e._e():n("div",{staticClass:"chat-container"},[n("auth")],1),e.isAuth?n("div",{staticClass:"chat-container"},[n("Chat",{attrs:{participants:e.participants,myself:e.user,messages:e.messages,"chat-title":e.chatTitle,placeholder:e.placeholder,colors:e.colors,"border-style":e.borderStyle,"close-button-icon-size":e.closeButtonIconSize,"submit-icon-size":e.submitIconSize,"submit-image-icon-size":e.submitImageIconSize,"async-mode":e.asyncMode,"scroll-bottom":e.scrollBottom,"display-header":!0,"send-images":!1,"profile-picture-config":e.profilePictureConfig,"timestamp-config":e.timestampConfig,"link-options":e.linkOptions,"accept-image-types":".png, .jpeg","hide-close-button":!1},on:{onImageClicked:e.onImageClicked,onImageSelected:e.onImageSelected,onMessageSubmit:e.onMessageSubmit,onType:e.onType,onClose:function(t){return e.onClose()}}})],1):e._e()])])}),[],!1,null,null,null)).exports;r.default.config.productionTip=!1,new r.default({render:function(e){return e(P)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("e332")},e332:function(e,t,n){}});