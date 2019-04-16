!function(t){function e(s){if(i[s])return i[s].exports;var o=i[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var o in t)e.d(s,o,function(e){return t[e]}.bind(null,o));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(){},function(t,e,i){"use strict";var s=Math.floor,o=Math.max,a=Math.ceil,n=Math.abs,h=Math.PI,r=Math.round,l=Math.min,c=Math.sin,d=Math.pow;i.r(e);const p={copyObj:function(t){if(!t||"object"!=typeof t)return t;var e=t instanceof Array?[]:Object.create(Object.getPrototypeOf(t)),i=Object.getOwnPropertyNames(t);for(let o=0,a=i.length;o<a;++o){var s=i[o];Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(t,s))}return e},objMerge:function(t,e,i=!0){function s(t){if(!t)return!1;let e=Object.getPrototypeOf(t).constructor;return!(e!==Array&&e!==Object)&&e}let o=Array.prototype.slice.call(arguments,1);if(1>o.length)return t;i="boolean"!=typeof o[o.length-1]||o.pop();for(let e,a=0;a<o.length;a++)(e=o[a])&&s(e)===s(t)&&Object.keys(e).forEach(o=>{let a=s(e[o]);a?(i||p.isDef(t[o]))&&a===Object&&(t[o]=p.objMerge(t[o]||{},e[o],i)):(i||p.isDef(t[o]))&&(t[o]=e[o])});return t},arrDelta:function(t,e){if(!t)return e.slice();let i=e.length,s=Array(i);for(let o=0;o<i;o++)s[o]=p.isDef(t[o])?e[o]-t[o]:0;return s},objDelta:function(t,e,i){let s={};i=i||Object.keys(e);for(let o,a=0;a<i.length;a++)"number"==typeof e[o=i[a]]?s[o]=p.isDef(t[o])?e[o]-t[o]:0:e[o]&&Object.getPrototypeOf(e[o]).constructor===Array&&(s[o]=p.arrDelta(t[o],e[o]));return s},arrSum:function(t,e=[],i=1){if(!t)return e.slice();let s=[],o=e.length;for(let a=0;a<o;a++)s[a]=(t[a]||0)+e[a]*i;return s},objSum:function(t={},e={},i=1){let s={};return Object.keys(e).forEach(o=>{s[o]="number"==typeof e[o]?(t[o]||0)+e[o]*i:e[o]&&Object.getPrototypeOf(e[o]).constructor===Array?p.arrSum(t[o],e[o],i):t[o]}),s},isDef:function(t){return void 0!==t},animate:function(t){let e,i=Array.prototype.slice.call(arguments,1),s=performance.now(),o=!1,a={pow2:function(t){return d(t,2)},pow5:function(t){return d(t,5)},circ:function(t){return 1-c(Math.acos(t))},linear:function(t){return t}},n={stop(){o=!0}};return t.timing&&(e=a[t.timing]),e||(e=function(){let t=a.pow2;return function(e){return 1-t(1-e)}}()),requestAnimationFrame(function a(n){let h=l(1,(n-s)/t.duration),r=e(h);t.exec(r),1>h&&!o?requestAnimationFrame(a):t.callback&&t.callback.apply(t.context,i)}),n},getEventXY:function(t,e){let i=e.getBoundingClientRect(),s=t.targetTouches?t.targetTouches[0]:t;return s||console.log("e",t),{x:s.pageX-i.left,y:s.clientY-i.top}},throttle:function(t,e=200,i=null){let s=Array.prototype.slice.call(arguments,2);return t.throttle&&clearTimeout(t.throttle),new Promise(i=>{t.throttle=setTimeout(()=>{t.throttle=null;let e=t.call(...s);i(e)},e)})}};var m=p,u={default:{visibleArea:"20%",areaStartPositionAtLast:!0,Graph:{style:{width:"100%",height:"80%",top:"10%",left:"0"},offset:{top:10,left:15,right:15,bottom:100},background:"transparent",elementsTypes:{Line:{elementType:"Line",width:5,fillColor:"#fff",zindex:0,offset:{left:20,right:20}},Area:{elementType:"Area",width:5,fillColor:"#fff",zindex:0,offset:{left:20,right:20}},Bar:{elementType:"Bar",width:5,fillColor:"#fff",zindex:0,offset:{left:20,right:20}},Pie:{elementType:"Pie",fillColor:"#fff",zindex:0}},elements:{Grid:{elementType:"Grid",vertical:0,horizontal:5,width:2,color:"#f2f4f5",activeColor:"#dfe6eb",zindex:-1,offset:{left:20,right:20}},ScaleY:{elementType:"ScaleY",labelsAmount:5,color:"#96a2aa",fontsize:16,fontname:"Arial",baseline:"bottom",zindex:1,offset:{left:20,right:20}},ScaleX:{elementType:"ScaleX",color:"#96a2aa",fontsize:16,fontname:"Arial",baseline:"top",align:"center",zindex:1,offset:{bottom:80,left:60,right:160}}}},Map:{style:{width:"92%",height:"10%",top:"90%",left:"4%",background:"transparent"},offset:{top:0,left:0,right:0,bottom:0},elementsTypes:{Line:{elementType:"Line",width:3,join:"round",color:"tomato"},Area:{elementType:"Area",width:3,join:"round",color:"tomato"},Bar:{elementType:"Bar",width:3,join:"round",color:"tomato"},Pie:{elementType:"Pie",fillColor:"#fff",zindex:0}}},Scroll:{type:"html",style:{width:"92%",height:"10%",top:"90%",left:"4%",background:"transparent"},template:'\n            <div class="chart-scroll">\n                <div class="chart-scroll-bar"></div>\n                <div class="chart-scroll-bar chart-scroll-bar-right"></div>\n                <div class="chart-scroll-carret"></div>\n            </div>'},Legend:{type:"html",style:{width:"92%",marginLeft:"4%",position:"relative"},outside:!0,itemTemplate:'\n            <div class="chart-legend-item" style="--active-color: %COLOR%;">\n                <i class="icon"></i>\n                <span class="text">%TEXT%</span>\n            </div>\n            ',attrs:{class:"chart-legend"}},Header:{style:{width:"94%",height:"10%",top:"0",left:"20px"},type:"html",template:'\n            <div class="chart-header">\n                <div class="chart-header-title">title</div>\n                <div class="chart-header-state">Zoom Out</div>\n                <div class="chart-header-descript">descript</div>\n            </div>'},Tooltip:{style:{top:"1%"},type:"html",template:'\n            <div class="chart-tooltip">\n                <h3 class="chart-tooltip-title">%TITLE%</h3>\n                %ITEMS%\n            </div>',itemTemplate:'\n            <div class="chart-tooltip-item" style="--active-color: %COLOR%;">\n                <p class="chart-tooltip-item-name">%NAME%</p>\n                <p class="chart-tooltip-item-value">%VALUE%</p>\n            </div>\n            '}}};class f{constructor({component:t,canvas:e,ctx:i,options:s}){this.options=s,this.canvas=e,this.ctx=i,this.hidden=!1,this.name=t.name+": "+this.constructor.name,this.setSizes()}getOffsets(){let t=this.$componentOptions.offset||{},e=this.options.offset||{},i=i=>(t[i]||0)+(e[i]||0);return{top:i("top"),bottom:i("bottom"),left:i("left"),right:i("right")}}updateOptions(t){this.options=m.objMerge(this.options,t,!0)}setSizes(){this.width=parseInt(+this.canvas.getAttribute("width")),this.height=parseInt(+this.canvas.getAttribute("height")),this.pixelRatio=parseInt(+this.canvas.getAttribute("ratio"))}ani(t,e,i,s){Date.now(),this._aniStop=m.animate({duration:i||200,timing:"linear",exec:i=>{this.data=m.objSum(t,e,i),this.data.reverse=!0},callback:()=>{this._aniStop=!1,s&&s()},context:this})}setData(t){if(this._aniStop&&this._aniStop(),this.data){let e=m.objMerge({},t,this.data),i=m.objDelta(this.data,t);return e.values=t.resize?t.values:t.values.length>this.data.values.length?t.reverse?[...t.values.splice(0,this.data.values.length),...this.data.values]:[...this.data.values,...t.values.splice(this.data.values.length)]:this.data.values.slice(0,t.values.length),this.ani(e,i,200),200}this.data=t}hide(){this.hidden=!0}show(){this.hidden=!1}checkSelection(t){let e=r((this.offsetX+t)/this.pointWidth)-1,i=this.$data.labels[e],s=[];return this.$data.datasets.forEach(t=>{s.push({index:t.index,hidden:t.hidden,name:t.name,color:t.options.color,value:t.values[e]})}),{title:i,content:s,activePoint:e}}calcSizes(){let t=this.getOffsets(),e=this.$state,i=this.width-t.left-t.right;if(this.$componentState.fixedSize)return this.offsetX=0,void(this.pointWidth=i/e.length);let s=i/(e.end-e.start);this.offsetX=s*e.start,this.pointWidth=s/e.length}posX(t){return this.offsets.left+t*this.pointWidth-this.offsetX}calculatePosY(t,e){let i=t=>g-(t-h)*b+v,s=t=>g-g*t+v,o=this.getOffsets(),a=this.$state,n=this.$componentState,h=n.min,r=n.max,l=n.fixedSize,c=this.$data.sumValues,d=this.dataset.values,p=this.dataset.values0,m=this.dataset.values1,u=a.from,f=a.to;l?(u=0,f=a.length-1):(u-=4,f+=4);let v=o.top,g=this.height-v-o.bottom,b=g/(r-h)||1,y=[],$=[];for(let o=u;o<=f;o++)e&&t?(y.push({n:o,v:s(p[o]/c[o])}),$.push({n:o,v:s(m[o]/c[o])})):t?(y.push({n:o,v:i(p[o])}),$.push({n:o,v:i(m[o])})):y.push({n:o,v:i(d[o])});this.pointsY0=y,this.pointsY1=$}}const v={Line:class extends f{constructor(t){super(t)}checkSelection(t){this.offsets=this.getOffsets(),this.calcSizes();let e=r((this.offsetX+t)/this.pointWidth)-1,i=this.$data.labels[e],s=[];return this.$data.datasets.forEach(t=>{s.push({index:t.index,hidden:t.hidden,name:t.name,color:t.options.color,value:t.values[e]})}),{title:i,content:s,activePoint:e}}draw(){if(!this.dataset||this.dataset.hidden)return;this.calculatePosY(),this.offsets=this.getOffsets(),this.calcSizes();let t,e,i=this.$state,s=this.$componentState,o=this.ctx,a=this.options,n=this.pointsY0;this.$data.labels;o.globalAlpha=s.opacity,o.beginPath(),o.lineWidth=a.width,o.strokeStyle=a.color,o.lineJoin="bevel",o.lineCap="butt",t=n[0].v,e=this.posX(n[0].n),o.moveTo(e,t);for(let i,s=1;s<n.length;s++)i=n[s],e=this.posX(i.n),t=i.v,o.lineTo(e,t);o.stroke();let r=this.$state.activeData;if(r){let s=i.from,n=r.activePoint+4,l=this.pointsY0[n-s];t=l.v,e=this.posX(l.n),o.beginPath(),o.arc(e,t,10,0,2*h,!1),o.fillStyle=a.fillColor,o.fill(),o.stroke()}}},Grid:class extends f{constructor(t){super(t)}draw(){let t=t=>l-t*d*m+n,e=t=>t*p+h,i=this.getOffsets(),s=this.ctx,o=this.$componentState,a=this.options,n=i.top,h=i.left,l=this.height-n-i.bottom,c=this.width-h-i.right,d=l/a.horizontal,p=c/(a.vertical-1),m=this.scaleYRate||1;s.beginPath(),s.lineWidth=a.width,s.strokeStyle=a.color,s.globalAlpha=o.opacity;for(let e=0,i=a.horizontal;e<i;e++)s.moveTo(h,t(e)),s.lineTo(h+c,t(e));for(let t=0,i=a.vertical;t<i;t++)s.moveTo(e(t),n),s.lineTo(e(t),n+l);if(this.activeX){let t=this.data.labels.length,e=c/t,i=e*r(t*this.activeX)+e/2;s.strokeStyle=a.activeColor,s.moveTo(i,n),s.lineTo(i,n+l)}s.stroke()}},ScaleY:class extends f{constructor(t){super(t)}draw(){let t=t=>{let e=n(t);return 1e9<e?(t/1e9).toFixed(2)+"B":1e6<e?(t/1e6).toFixed(2)+"M":1e3<e?(t/1e3).toFixed(1)+"K":t},e=t=>p-t*(p/c)+i.top,i=this.getOffsets(),s=this.ctx,o=this.options,a=this.$componentState,h=this.$componentState.max,l=this.$componentState.min,c=5,d=(this.scaleYRate,i.top),p=this.height-d-i.bottom,m=i.left;s.globalAlpha=a.opacity,s.textAlign="left",s.font=o.fontsize*this.pixelRatio+"px "+o.fontname,s.fillStyle=o.color,s.textBaseline="top";let u=r(h);s.fillText(t(u),m,e(c)),s.textBaseline=o.baseline;for(let i,o=1;5>=o;o++)i=r(h-(h-l)/c*o),isNaN(i)||s.fillText(t(i),m,e(c-o))}},ScaleX:class extends f{constructor(t){super(t)}draw(){this.calcSizes();let t=t=>t*this.pointWidth+n-this.offsetX,e=t=>{let e=i[t];return e?l.labelsFormat?l.labelsFormat(e,c.zoom):e:""},i=this.$data.labels,s=this.getOffsets(),n=s.left,h=this.height-s.bottom,r=this.ctx,l=this.options,c=this.$state,d=this.$componentState,p=c.from,m=c.to,u=a((m-p)/5+1);u=o(1,u),r.font=l.fontsize*this.pixelRatio+"px "+l.fontname,r.textBaseline=l.baseline,r.fillStyle=l.color,r.globalAlpha=d.opacity;let f=[];for(var v=0;v<=5;v++)f.push(p+v*u);r.textAlign="center",f.forEach(i=>{let s=t(i),o=e(i);r.fillText(o,s,h)})}},Area:class extends f{constructor(t){super(t)}draw(){if(!this.dataset||this.dataset.hidden)return;this.calculatePosY(this.$data.stacked,this.$data.percentage),this.offsets=this.getOffsets(),this.calcSizes();let t,e,i=this.options,s=this.$componentState,o=this.ctx,a=this.pointsY0,n=this.pointsY1;o.lineWidth=i.width,o.lineJoin=i.join,o.strokeStyle=i.color,o.fillStyle=i.color,o.globalAlpha=s.opacity;let h=a[0].v,r=this.posX(a[0].n);o.beginPath(),o.moveTo(r,h);for(let i,s=0;s<a.length;s++)i=a[s],e=this.posX(i.n),t=i.v,o.lineTo(e,t);for(let i,s=n.length-1;0<=s;s--)i=n[s],e=this.posX(i.n),t=i.v,o.lineTo(e,t);o.closePath(),o.fill(),o.stroke();let l=this.$state,c=this.$state.activeData;if(c){let t=l.from,i=c.activePoint+4,s=this.pointsY0[i-t];e=this.posX(s.n),o.lineWidth=1,o.strokeStyle="#ffffff3c",o.beginPath(),o.moveTo(e,this.offsets.top),o.lineTo(e,this.height-this.offsets.bottom),o.stroke()}}},Bar:class extends f{constructor(t){super(t)}checkSelection(t){let e,i=r((this.offsetX+t)/this.pointWidth)-1,s=this.$data.labels[i];return s&&(e=[],this.$data.datasets.forEach(t=>{e.push({index:t.index,hidden:t.hidden,name:t.name,color:t.options.color,value:t.values[i]})})),{title:s,content:e,activePoint:i}}draw(){if(!this.dataset||this.dataset.hidden)return;this.calculatePosY(!0,this.$data.percentage),this.offsets=this.getOffsets(),this.calcSizes();let t,e=this.$state,i=(e.from,e.to,this.$componentState),s=this.ctx,o=this.pointsY0,a=this.pointsY1,n=(e.length,!!e.activeData&&e.activeData.activePoint),h=this.options.color;s.beginPath(),s.lineWidth=1,s.strokeStyle=h,s.fillStyle=h,s.globalAlpha=i.opacity;for(let e=0;e<o.length;e++){let i=o[e],h=a[e];t=this.posX(i.n);let r=h&&h.v?h.v-i.v:i.v;!1!==n&&i.n!==n&&(s.globalAlpha=.5),s.fillRect(t,i.v,this.pointWidth,r),s.strokeRect(t,i.v,this.pointWidth,r),!1!==n&&i.n!==n&&(s.globalAlpha=1)}s.stroke()}},Pie:class extends f{constructor(t){super(t)}calculateRads(){let t=this.$state,e=this.$componentState,i=(e.min,e.max,this.$data.sumValues),s=(this.dataset.values,this.dataset.values0),o=this.dataset.values1,a=t.from,n=t.to,r=0,l=0,c=0;for(let t=a;t<=n;t++)r+=i[t],l+=s[t],c+=o[t];let d=5*h/180;this.val=c-l,this.rad0=l/r*2*h+d,this.rad1=c/r*2*h+d}checkSelection(t,e){t=this.centerX-t,e=this.centerY-e;let i=Math.sqrt(d(n(t),2)+d(n(e),2))<this.radius;if(this.active=!1,i){let i=Math.atan2(e,t)+h;this.active=i>=this.rad0&&i<=this.rad1}}draw(){var t=Math.cos;if(!this.dataset||this.dataset.hidden)return;this.calculateRads(this.$data.stacked,this.$data.percentage);let e=(this.rad1-this.rad0)/2/h*100,i=this.getOffsets(),s=(this.width-i.left-i.right)/2,o=(this.height-i.top-i.bottom)/2,a=r(.8*l(o,s)),d=a*(.02*n(10-2*r(this.rad1-this.rad0))),p=.7*a,m=(this.rad1+this.rad0)/2;this.radius=a,this.centerY=o,this.centerX=s;let u=s+d*t(m),f=o+d*c(m),v=this.ctx,g=this.options;if(v.fillStyle=g.color,v.strokeStyle="#fff",v.beginPath(),this.active&&100>e?(v.moveTo(u,f),v.arc(u,f,a,this.rad0,this.rad1),v.lineWidth=10,v.stroke()):(v.moveTo(s,o),v.arc(s,o,a,this.rad0,this.rad1)),v.fill(),v.closePath(),4<e){let i=s,a=o;100>e&&(p+=this.active?d:0,i+=(p-=p*e/250)*t(m),a+=p*c(m));let n=r(32+32*e/100);v.font="bold "+n+"px arial",v.textBaseline="middle",v.textAlign="center",v.fillStyle="#fff",e=r(e)+"%",v.fillText(e,i,a)}}}};class g{constructor(t,e){this._chart=t,this.name=this.constructor.name,this.$state=t.$state,this.$methods=t.$methods,this.$componentOptions=e,this.container=t.container,this.elements=[],this.pixelRatio=1,this.eventsList=["Mouseup","Touchend","Mousemove","Touchmove","Mousedown","Touchstart","Click"];let i=this.$componentOptions.outside?this.container.parentNode:this.container;"html"===e.type?this.div=i.appendChild(document.createElement("DIV")):(this.canvas=i.appendChild(document.createElement("CANVAS")),this.pixelRatio=this.getPixelRatio(this.canvas),this.ctx=this.canvas.getContext("2d")),this.component=this.canvas||this.div,this.component.classList.add("yetchart-"+this.constructor.name),this.$componentOptions.attrs&&Object.keys(this.$componentOptions.attrs).forEach(t=>{this.component.setAttribute(t,this.$componentOptions.attrs[t])}),this.$componentOptions.style&&(this.component.style.position="absolute",Object.keys(this.$componentOptions.style).forEach(t=>{this.component.style[t]=this.$componentOptions.style[t]})),this.$componentState={opacity:1},this.setSizes(),this.registerEvents()}setAreaPosition(t,e){t=o(l(1,t),0),this.$methods.setAreaPosition(t,e)}setAreaSize(t,e){t=o(l(1,t),0),this.$methods.setAreaSize(t,e)}updateOptions(t={}){this.$componentOptions=m.objMerge({},this.$componentOptions,t,!0),this.elements.forEach(t=>{let e=m.objMerge({},this.$componentOptions.elementsTypes[t.type],this.$componentOptions.elements[t.type]);t.updateOptions(e)}),this.render(!0)}setSizes(){let t=this.component.offsetHeight*this.pixelRatio,e=this.component.offsetWidth*this.pixelRatio;this.width=e,this.height=t,this.$state.pixelRatio=this.pixelRatio,this.$state.width=this.container.offsetWidth,this.$state.height=this.container.offsetWidth,this.canvas&&(this.canvas.setAttribute("width",parseInt(e)),this.canvas.setAttribute("height",parseInt(t)),this.canvas.setAttribute("ratio",parseInt(this.pixelRatio))),this.callElements(["setSizes"])}setActivePoint(t,e){return t?void(this._activeX===t||(this._activeX=t,this.elements.forEach(i=>{if(i.dataset&&i.checkSelection){let s=i.checkSelection(t*this.width,e*this.height);this.$methods.setActivePoint(t,e,s)}}))):void this.$methods.setActivePoint(t,e,!1)}cleanup(){if(this.$data.stackedValues=[],this.canvas){var t=this.ctx;t.save(),t.setTransform(1,0,0,1,0,0),t.clearRect(0,0,this.width,this.height*this.pixelRatio),t.restore()}}render(){this.cleanup(),this.callElements(["draw"])}createDataElement(t){let e=t.options,i=this._chart.forceDataElements||e.elementType,s=this.$componentOptions.elementsTypes||{};if(s[i]&&v[i]){let o=s[i],a=m.objMerge({},o,e,!0);a.zindex=(a.zindex||0)+t.index/100,this.addElement(i,a).dataset=t}}createDataElements(t){for(let e=0;e<t.length;e++)t[e].index=e,this.createDataElement(t[e])}createElements(){let t=this.$componentOptions.elementsTypes||{},e=this.$componentOptions.elements;Object.keys(e||{}).forEach(i=>{if(e[i]){let s=e[i],o=s.elementType||i;if(v[o]){let e=t[s.name||i],a=m.objMerge({},e,s,!0);this.addElement(o,a).data=this.data}}}),this.elements.sort((t,e)=>t.options.zindex>=e.options.zindex?1:-1)}addElement(t,e){"Map"===this.name&&"Pie"===t&&(t="Area");let i=new v[t]({canvas:this.canvas,ctx:this.ctx,component:this,options:e});return i.type=t,i.$data=this.$data,i.$state=this.$state,i.$componentOptions=this.$componentOptions,i.$componentState=this.$componentState,i.$componentName=this.constructor.name,this.elements.push(i),i}callElements(t){this.elements.forEach(e=>{t.forEach(t=>e[t]&&e[t]())})}getPixelRatio(t){let e=t.getContext("2d");return(window.devicePixelRatio||1)/(e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1)}dataCompression(t,e,i="pulling"){let s=[],a=t.length/e;if(e>=t.length)return t;for(let n,h=0;h<e;h++)if(n=l(r(h*a),t.length-1),"pulling"===i)s.push(t[n]);else{let e=0,c=l(r((h+1)*a),t.length-1);if("averaging"===i){for(let i=n;i<=c;i++)e+=+(t[i]||0);s.push(e/o(1,c-n))}else if("maximizing"===i){for(let i=n;i<=c;i++)e=o(+(t[i]||0),e);s.push(e)}}return s}getMinMax(t=!1){let e,i=this.$data.labels.length-1,s=this.$state,a=(this.$componentState,1/0),n=-1/0,h=s.from,r=s.to,c=this.$componentOptions.scaleYStartsFromZero;if(t?(h=0,r=i):(h=o(h-2,0),r=l(r+2,i)),this.$data.datasets.forEach(t=>{if(!t.hidden){let i=t.values.slice(h,r);i=this.dataCompression(i,this.width,"maximizing"),e=Object.assign({},this.calcMinMax(i)),a=l(e.min,a),n=o(e.max,n)}}),this.$data.stacked){let t=this.$data.sumValues.slice(h,r);n=o(this.calcMinMax(t).max,n)}return{max:n=c?1.2*n:n,min:a=c?0:a}}calcMinMax(t){if(!t)return!1;let e=1/0,i=-1/0;for(let s=t.length-1;0<=s;s--)e=l(e,+t[s]),i=o(i,+t[s]);return{min:e,max:i}}uniAni(t,{duration:e,exec:i,callback:s,timing:o}={},a){let n=Object.keys(t).join("");this._aniHandles=this._aniHandles||{};let h,r=this._aniHandles[n]=this._aniHandles[n]||{};if(r.params&&function(t,e){let i=Object.keys(t);for(let s=0;s<i.length;s++)if(t[i[s]]!==e[i[s]])return!1;return!0}(r.params,t))return;r.params=Object.assign({},t),r.stop&&r.stop(),(h=a?m.objMerge({},t,a):m.objMerge({},t,this.$state,this.$componentState)).max===-1/0&&t.max&&(h.max=3*t.max,h.min=t.min),this.render();let l=m.objDelta(h,t);r=m.animate({duration:e||200,timing:o||"linear",exec:t=>{let e=m.objSum(h,l,t);a&&m.objMerge(a,e,!1),m.objMerge(this.$componentState,e,!1),m.objMerge(this.$state,e,!1),i?i.call(this):this.render(!0)},callback:()=>{s&&s.call(this),r=!1,this.render(!0)},context:this})}event(t,e){if(!t.path){let e=t.target;for(t.path=[e];e=e.parentNode;)t.path.push(e)}let i="on"+e;if(!!["Mousedown","Touchstart"].includes(e)&&t.path&&!t.path.includes(this.component))return this[i](t,!1,!1);if(["Mouseup","Touchend"].includes(e))return this[i](t,!0,!0);let{x:s,y:o}=m.getEventXY(t,this.component),a=this.$state;s/=a.width,o/=a.height,this[i]&&this[i](t,s,o)}registerEvents(){let t=this;this.eventsList.forEach(e=>{this["on"+e]&&document.addEventListener(e.toLowerCase(),i=>{t.event(i,e)},!1)})}removeEvents(){let t=this;this.eventsList.forEach(e=>{this["on"+e]&&document.removeEventListener(e.toLowerCase(),i=>{t.event(i,e)},!1)})}destroy(){let t=this.component;this.removeEvents();let e=this.$state,i=(e.start,e.end,e.start,this.$componentOptions.destroyAni),s=()=>{t.parentNode.removeChild(t)};if(!i)return s();let o=i.type||"fade",a=i.duration||+i||500;"fade"===o&&this.uniAni({opacity:0},{duration:a,callback:s})}onSetData(){this.$data=this._chart.$data,this.createDataElements(this.$data.datasets),this.prepareData(),this.createElements(),this.render(!0)}onScreenResize(){this.setSizes(),this.render(!0)}}const b={Graph:class extends g{constructor(t,e){super(t,e),this.data={datasets:[]}}render(t){(t||this.elementsAnimate)&&(this.cleanup(),this.elements.forEach(t=>{t.draw()}),!t&&requestAnimationFrame(this.render.bind(this))),this.component.style.opacity=this.$componentOptions.opacity}renderingStop(){this.elementsAnimate=!1}prepareData(){let t=this.$data,e=t.labels,i=(t.datasets,this.$state),s=this.$componentState,{min:o,max:a}=this.getMinMax();s.max=a,s.min=o,i.startLabel=e[i.from],i.endLabel=e[i.to]}onUpdatePosition(){this.prepareData(),super.render()}onToggleDataset(){this.uniAni(this.getMinMax())}onSetActivePoint(){super.render()}onSetData(){this.$componentOptions.opacity=0,super.onSetData(),this.uniAni({opacity:1},{duration:500,timing:"pow2"},this.$componentOptions)}onMouseup(){this.mousePress=!1}onMousedown(t,e,i){this.mousePress=!0,this.setActivePoint(e,i)}onMousemove(t,e,i){this.mousePress&&(!t.path||t.path.includes(this.component))&&this.setActivePoint(e,i)}onTouchend(t){this.onMouseup(t)}onTouchmove(t,e,i){this.onMousemove(t,e,i)}onTouchstart(t,e,i){this.onMousedown(t,e,i)}onZoomIn(){this.uniAni({start:.4,end:.5},{exec:this.$methods.updateAreaSize})}},Map:class extends g{constructor(t,e){super(t,e),this.data={datasets:[]},this.$componentState={}}prepareData(){this.$data.labels;let t=this.$state,e=this.$componentState,{min:i,max:s}=this.getMinMax(!0);t.max=s,t.min=i,e.max=s,e.min=i,e.start=0,e.end=1,e.fixedSize=!0,this.$data.stackedValues=[]}onToggleDataset(){this.prepareData(),this.render()}},Scroll:class extends g{constructor(t,e){super(t,e),this.component.innerHTML=e.template,this.bars=this.component.getElementsByClassName("chart-scroll-bar"),this.carret=this.component.querySelector(".chart-scroll-carret"),this.scroll=this.component.querySelector(".chart-scroll")}_scrollMoveAni(t){let e=(this.start+this.end)/2/100;this._scrollAnimation&&this._scrollAnimation.stop(),this._scrollAnimation=m.animate({duration:200,exec:i=>{this.setAreaPosition(e+(t-e)*i)}})}render(){let t=parseInt(getComputedStyle(this.carret)["border-left-width"]);this.carret.style.width=this.end-this.start+"%",this.carret.style.left="calc("+this.start+"% - "+t+"px)",this.bars[0].style.width=this.start+"%",this.bars[1].style.width=100-this.end+"%"}prepareData(){let t=this.$state;this.start=100*t.start,this.end=100*t.end}onSetData(){this.prepareData(),this.render()}onUpdatePosition(){this.prepareData(),this.render()}onMousedown(t,e){if(t.path.includes(this.component)){this.drag=this.drag||"click",this.clickX=e;let t=.05,i=this.$state,s=(i.end-i.start)*t*2;i.start-t<=e&&i.end+t>=e&&(this.drag=i.start+s>=e?"start":i.end-s<=e?"end":"shift",this.deltaX=e-(i.end+i.start)/2)}}onMouseup(t){"click"===this.drag&&t.path.includes(this.component)&&this._scrollMoveAni(this.clickX),this.drag=!1,this.clickX=!1}onMousemove(t,e){this.drag&&("click"===this.drag?this.clickX=e:"shift"===this.drag?(this.clickX=e,this.setAreaPosition(e-this.deltaX)):["start","end"].includes(this.drag)&&this.setAreaSize(e,this.drag))}onTouchend(t){this.onMouseup(t)}onTouchmove(t,e,i){this.onMousemove(t,e,i)}onTouchstart(t,e,i){this.onMousedown(t,e,i)}},Tooltip:class extends g{constructor(t,e){super(t,e)}createDOM(){let t=this.$componentOptions,e="";this.$data.datasets.forEach(i=>{e+=t.itemTemplate.replace("%COLOR%",i.options.color)}),this.component.innerHTML=t.template.replace("%ITEMS%",e),this.title=this.component.querySelector(".chart-tooltip-title"),this.items=this.component.querySelectorAll(".chart-tooltip-item"),this.items=[].slice.call(this.items).map(t=>({item:t,name:t.querySelector(".chart-tooltip-item-name"),value:t.querySelector(".chart-tooltip-item-value")}))}render(){let t=this.$state,e=t.activeData,i=this.$componentOptions;if(!e||!e.title)return void this.div.classList.remove("active");this.div.classList.add("active"),this.title.innerText=(e=>i.titleFormat?i.titleFormat(e,t.zoom):e)(e.title);let s=this.div.offsetWidth/t.width,a=this.div.offsetHeight/t.height,n=t.activeX-s/2;n=o(.02,n),n=l(.98-s,n),a>t.activeY-.05&&(n=.5<t.activeX?t.activeX-s-.05:t.activeX+.05),this.div.style.left=100*n+"%";for(let t,i=0;i<e.content.length;i++)t=e.content[i],this.items[i].item.style.display=t.hidden?"none":"",this.items[i].name.innerText=t.name,this.items[i].value.innerText=t.value}onSetData(){this.$data=this._chart.$data,this.createDOM()}onSetActivePoint(){this.render()}onZoomIn(){}onMousedown(t){t.path.includes(this.div)&&(this.$methods.zoomIn(),this.setActivePoint(0,0))}onTouchstart(t,e,i){this.onMousedown(t,e,i),this.setActivePoint(0,0)}},Header:class extends g{constructor(t,e){super(t,e),this.component.innerHTML=e.template,this.descript=this.component.querySelector(".chart-header-descript"),this.state=this.component.querySelector(".chart-header-state"),this.title=this.component.querySelector(".chart-header-title"),this.title.innerText=this.$componentOptions.title}render(){let t=this.$state,e=this.$componentOptions,i=i=>e.labelsFormat?e.labelsFormat(i,t.zoom):i;this.descript.innerText=i(t.startLabel)+" - "+i(t.endLabel)}onSetData(){this.render()}onUpdatePosition(){this.render()}onClick(t){this.$state.zoom&&t.path.includes(this.component)&&this.$methods.zoomOut()}},Legend:class extends g{constructor(t,e){super(t,e)}render(){this.div.style.opacity=this.$componentState.opacity}onSetData(){if(this.$data=this._chart.$data,this.template="",!this.$data.datasets||2>this.$data.datasets.length)return;this.$data.datasets.forEach(t=>{this.template+=this.$componentOptions.itemTemplate.replace("%TEXT%",t.name).replace(/%COLOR%/g,t.options.color)}),this.component.innerHTML=this.template;let t=this.component.children;for(let e=0;e<t.length;e++)t[e].addEventListener("click",()=>{t[e].classList.toggle("hidden"),this.$methods.toggleDataset(e)})}}};if(void 0!==window.$Chart)throw"window.$Chart already taken";window.$Chart=class{constructor(t,e){const i=u[e]||u.default;this._options=m.objMerge({},i,t,!0),this.$state={start:.9,end:1},this.$methods={setAreaPosition:this.setAreaPosition.bind(this),setAreaSize:this.setAreaSize.bind(this),setActivePoint:this.setActivePoint.bind(this),updateAreaSize:this.updateAreaSize.bind(this),toggleDataset:this.toggleDataset.bind(this),zoomOut:this.zoomOutFn.bind(this),zoomIn:this.zoomInFn.bind(this)},this.setContainer(t&&t.element),window.addEventListener("resize",()=>{this.onScreenResize()})}set data(t){this.$data=t;let e=this.$state;e.length=t.labels.length,e.from=a(e.start*(e.length-1)),e.to=s(e.end*(e.length-1)),this.update()}set options(t){this._options=m.objMerge(this._options,t,!0),this.components.forEach(e=>{t[e.name]&&e.updateOptions(this._options[e.name])})}update(){this.callComponents(["destroy"]),this.createComponents(),this.calcVisibleDatasetsAmount(),this.calcSumDatasetsValues(),this.callComponents(["onSetData"])}createComponents(){this.components=[],Object.keys(this._options).forEach(this.createComponent.bind(this))}createComponent(t){if(b[t]){let e=this._options[t],i=this._options[e.inheritOptions]||{};delete i.elements,delete i.attrs,e=m.objMerge({},i,e),this.components.push(new b[t](this,e))}}callComponents(t){(this.components||[]).forEach(e=>{t.forEach(t=>e[t]&&e[t]())})}setContainer(t){if(t&&"string"==typeof t&&(t=document.querySelector(t)),t||(t=(t=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop()).parentNode),!t||!t.tagName)throw"Chart container not found";this.container=t,this.container.style.position="relative"}getComponentOptions(t){return m.objMerge({},this._options[t])}setAreaPosition(t){let e=this.$state,i=e.end-e.start,s=l(o(t-i/2,0),1-i);e.start=+s.toFixed(3),e.end=+(s+i).toFixed(3),e.shift=!0,this.updateAreaSize()}setAreaSize(t,e){let i=this.$state;"start"===e?i.start=+l(o(t,0),i.end-.01).toFixed(3):i.end=+o(l(t,1),i.start+.01).toFixed(3),i.shift=!1,i.reverse="start"===e,this.updateAreaSize()}updateAreaSize(){let t=this.$state,e=a(t.start*(t.length-1)),i=s(t.end*(t.length-1));(t.from!==e||t.to!==i)&&(t.from=e,t.to=i,this.callComponents(["onUpdatePosition"]))}setActivePoint(t,e,i){let s=this.$state;s.activeData&&s.activeData.title===i.title||(s.activeX=t,s.activeY=e,s.activeData=i,s.currentTS=i&&i.title||s.currentTS,this.callComponents(["onSetActivePoint"]))}toggleDataset(t){let e=this.$data.datasets;e[t].hidden=!e[t].hidden,this.calcVisibleDatasetsAmount(),this.$data.stacked&&this.calcSumDatasetsValues(),this.callComponents(["onToggleDataset"])}calcVisibleDatasetsAmount(){let t=0;this.$data.datasets.forEach(e=>{t+=e.hidden?0:1}),this.$state.visiblesDatasets=t}calcSumDatasetsValues(){let t,e=this.$data.datasets,i=[];for(let s=0;s<e.length;s++)if(!e[s].hidden){e[s].values0=[],e[s].values1=[];for(let o=0;o<e[s].values.length;o++)i[o]=(i[o]||0)+e[s].values[o],e[s].values0[o]=t?t.values1[o]:0,e[s].values1[o]=e[s].values[o]+e[s].values0[o];t=e[s]}this.$data.sumValues=i,this.$data.stackedValues=[]}zoomInFn(){this.container.parentNode.classList.add("zoom"),this._options.zoomIn&&this._options.zoomIn(this)}zoomOutFn(){this.container.parentNode.classList.remove("zoom"),this._options.zoomOut&&this._options.zoomOut(this)}onScreenResize(){this.callComponents(["onScreenResize"])}},i(0)}]);