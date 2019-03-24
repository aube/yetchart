!function(t){var e={};function i(s){if(e[s])return e[s].exports;var a=e[s]={i:s,l:!1,exports:{}};return t[s].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(s,a,function(e){return t[e]}.bind(null,a));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e){},function(t,e,i){"use strict";i.r(e);const s={objMerge:function(t,e,i=!0){let a=Array.prototype.slice.call(arguments,1);if(a.length<1)return t;function n(t){if(!t)return!1;let e=Object.getPrototypeOf(t).constructor;return(e===Array||e===Object)&&e}i="boolean"!=typeof a[a.length-1]||a.pop();for(let e=0;e<a.length;e++){let o=a[e];o&&(n(o)===n(t)&&Object.keys(o).forEach(e=>{let a=n(o[e]);a?(i||s.isDef(t[e]))&&a===Object&&(t[e]=s.objMerge(t[e]||{},o[e],i)):(i||s.isDef(t[e]))&&(t[e]=o[e])}))}return t},percent2value:function(t,e=1){return"number"==typeof t?t<=1?e*t:t:t.indexOf("%")?parseInt(t)/100*e:parseFloat(t)},isDef:function(t){return void 0!==t},sumObj:function(t={},e={}){return Object.keys(e).forEach(i=>{t[i]=(t[i]||0)+e[i]}),t},animate:function(t){let e,i=Array.prototype.slice.call(arguments,1),s=performance.now(),a=s,n=!1,o={pow2:function(t){return Math.pow(t,2)},pow5:function(t){return Math.pow(t,5)},circ:function(t){return 1-Math.sin(Math.acos(t))},linear:function(t){return t}},h=function(){n=!0};return t.timing&&(e=o[t.timing]),e||(e=function(){let t=o.pow2;return function(e){return 1-t(1-e)}}()),requestAnimationFrame(function o(r){let l=Math.min(1,(r-s)/t.duration),d=e(l),c=performance.now();h.fps=Math.round(1e3/(c-a)),a=c,h.fps<20&&(d=l=1),t.exec(d),l<1&&!n?requestAnimationFrame(o):t.callback&&t.callback.apply(t.context,i)}),h},getEventXY:function(t,e){let i,s=e.getBoundingClientRect();return t.pageX&&t.pageY?i=t:t.targetTouches&&1===t.targetTouches.length&&(i=t.targetTouches[0]),{x:i.pageX-s.left,y:i.clientY-s.top}},throttle:function(t,e=200,i=null){let s=Array.prototype.slice.call(arguments,2);return t.throttle&&clearTimeout(t.throttle),new Promise((i,a)=>{t.throttle=setTimeout(()=>{t.throttle=null;let e=t.call(...s);i(e)},e)})}};var a=s,n={default:{visibleArea:"20%",areaStartPositionAtLast:!0,Graph:{width:"100%",height:"90%",top:"0",left:"0",padding:{top:10,left:0,right:0,bottom:100},background:"transparent",elementsTypes:{Line:{elementType:"Line",width:5,join:"round",fillColor:"#fff",zindex:0}},elements:{Grid:{elementType:"Grid",vertical:0,horizontal:5,width:2,color:"#f2f4f5",activeColor:"#dfe6eb",zindex:-1},ScaleY:{elementType:"ScaleY",labelsAmount:5,color:"#96a2aa",shadowColor:"#fff",shadowBlur:15,fontsize:16,fontname:"Arial",baseline:"bottom",zindex:1},ScaleX:{elementType:"ScaleX",color:"#96a2aa",shadowColor:"#fff",shadowBlur:15,fontsize:16,fontname:"Arial",baseline:"top",align:"center",zindex:1,margin:{top:20}},Tooltip:{elementType:"Tooltip",background:"#fff",color:"#222",shadowColor:"#e3e3e3",shadowBlur:15,fontsizeValue:14,fontsizeName:10,fontsizeTitle:12,fontname:"Arial",zindex:2}}},Map:{width:"100%",height:"10%",top:"90%",left:"0",background:"transparent",elementsTypes:{Line:{elementType:"Line",width:3,join:"round",color:"tomato"}}},Scroll:{type:"html",inheritOptions:"Map",template:'\n            <div class="chart-scroll">\n                <div class="chart-scroll-bar"></div>\n                <div class="chart-scroll-carret"></div>\n                <div class="chart-scroll-bar"></div>\n            </div>'},Legend:{type:"html",outside:!0,itemTemplate:'\n            <div class="chart-legend-item">\n                <i class="icon" style="background-color: %COLOR%"></i>\n                <span>%TEXT%</span>\n            </div>\n            ',attrs:{class:"chart-legend"}}}};class o{constructor(t,e){this.options=e,this.canvas=t}updateOptions(t){this.options=a.objMerge(this.options,t,!0)}init(){let t=this.options.padding||{};this.top=t.top||0,this.bottom=t.bottom||0,this.left=t.left||0,this.right=t.right||0,this.width=parseInt(+this.canvas.getAttribute("width")),this.height=parseInt(+this.canvas.getAttribute("height")),this.pixelRatio=parseInt(+this.canvas.getAttribute("ratio")),this.width-=this.left+this.right,this.height-=this.top+this.bottom}}const h={Line:class extends o{constructor(t,e){super(t,e)}draw(){if(!this.dataset||this.dataset.hidden)return;this.init();let t,e,i=t=>{let e=this.height+this.top-(+t-this.min)*c/d;return Math.min(e,this.height)},s=t=>this.drawReverse?(t=h-t,this.width-t*l+l/2+this.left):t*l+l/2+this.left,a=a=>{t=i(o[a]),e=s(a),p.lineTo(e,t)},n=this.options,o=this.dataset.data,h=o.length||3,r=this.pointWidthRate||1,l=this.width/h*r,d=this.scaleYRate||1,c=this.height/Math.abs(this.max-this.min)||1,p=this.canvas.getContext("2d");l=Math.round(1e3*l)/1e3,r=Math.round(1e3*r)/1e3,p.translate(.5,.5),p.beginPath(),p.lineWidth=n.width,p.lineJoin=n.join,p.strokeStyle=n.color,p.shadowColor=n.shadowColor||"",p.shadowBlur=n.shadowBlur||0;let m=this.drawReverse?h-1:0;if(t=i(o[m]),e=s(m),p.moveTo(e,t),this.drawReverse)for(--m;m>=0;a(m--));else for(++m;m<h;a(m++));if(p.stroke(),this.activeX){let a=Math.round(h*this.activeX),r=10;t=i(o[a]),e=s(a),p.beginPath(),p.arc(e,t,r,0,2*Math.PI,!1),p.fillStyle=n.fillColor,p.fill(),p.stroke()}p.translate(-.5,-.5)}},Grid:class extends o{constructor(t,e){super(t,e)}draw(){this.init();let t=t=>this.height-t*s*n+this.top,e=t=>t*a+this.left,i=this.canvas.getContext("2d"),s=this.height/this.options.horizontal,a=this.width/(this.options.vertical-1),n=this.scaleYRate||1;i.beginPath(),i.lineWidth=this.options.width,i.strokeStyle=this.options.color,i.shadowColor=this.options.shadowColor||"",i.shadowBlur=this.options.shadowBlur||0;for(let e=0,s=this.options.horizontal;e<s;e++)i.moveTo(this.left,t(e)),i.lineTo(this.left+this.width,t(e));for(let t=0,s=this.options.vertical;t<s;t++)i.moveTo(e(t),this.top),i.lineTo(e(t),this.top+this.height);if(this.activeX){let t=this.data.labels.length,e=Math.round(t*this.activeX),s=this.width/t,a=s*e+s/2;i.strokeStyle=this.options.activeColor,i.moveTo(a,this.top),i.lineTo(a,this.top+this.height)}i.stroke()}},ScaleY:class extends o{constructor(t,e){super(t,e)}draw(){if(!this.data)return;this.init();let t=t=>this.height-t*n+this.top,e=this.options,i=this.canvas.getContext("2d"),s=e.labelsAmount,a=this.scaleYRate||1,n=this.height/s*a,o=(this.max-this.min)/s,h=this.left;i.beginPath(),i.textAlign="left",i.textBaseline=e.baseline,i.font=e.fontsize*this.pixelRatio+"px "+e.fontname,i.fillStyle=e.color,i.shadowColor=e.shadowColor||"",i.shadowBlur=e.shadowBlur||0;for(let e=1,a=s;e<=a;e++){let a=Math.round(this.max-o*e);i.fillText(isNaN(a)?"":a,h,t(s-e))}i.stroke()}},ScaleX:class extends o{constructor(t,e){super(t,e)}draw(){if(!this.data)return;this.init();let t=t=>t*a+this.left,e=t=>{let e=n[t];return i.labelsFormat?i.labelsFormat(e):e},i=this.options,s=this.canvas.getContext("2d");s.beginPath(),s.font=i.fontsize*this.pixelRatio+"px "+i.fontname;let a=1.5*s.measureText("33 qwe.").width,n=this.data.labels,o=this.top+this.height+i.margin.top,h=n.length,r=Math.min(h,Math.floor(this.width/a)),l=Math.floor(h/r);a=this.width/r,s.textBaseline=i.baseline,s.fillStyle=i.color,s.shadowColor=i.shadowColor||"",s.shadowBlur=i.shadowBlur||0,s.textAlign="left",s.fillText(e(0),t(0),o),s.textAlign="right",s.fillText(e(h-1),this.width,o),s.textAlign=i.align;for(let i=1;i<r;i++){let a=t(i),n=e(i*l);s.fillText(n,a,o)}s.stroke()}},Tooltip:class extends o{constructor(t,e){super(t,e)}draw(){if(!this.activeData||!this.activeData.title)return;let t=t=>{let e=0;for(;t-- >=0;)e+=c[t]||0;return e},e=e=>{let i=e%c.length,s=this.left+M;return s+=t(i),s+=h*i+h},i=t=>1.5*(g+v)*t,s=t=>{let e=Math.floor(t/c.length),s=this.top+i(e);return s+=h*e,s+=_,s+=u+4*h},a=t=>n[t]*o+"pt "+n.fontname;this.init();let n=this.options,o=this.pixelRatio,h=20,r=this.width*this.activeX,l=(this.height,this.activeY,this.activeData.content),d=this.activeData.title,c=Array(Math.ceil(Math.sqrt(l.length))),p=Math.ceil(l.length/c.length),m=this.canvas.getContext("2d");c.fill(0),m.beginPath(),d=n.titleFormat?n.titleFormat(d):d,m.font="bold "+a("fontsizeValue");let u=n.fontsizeTitle*o,f=m.measureText(d).width;m.font="bold "+a("fontsizeValue");let g=n.fontsizeValue*o;m.font=a("fontsizeName");let v=n.fontsizeName*o;for(var x=0;x<l.length;x+=c.length)for(var b=0;b<c.length;b++){let t=l[x+b].value,e=l[x+b].name;m.font=a("fontsizeValue"),c[b]=Math.max(c[b],m.measureText(t).width),m.font=a("fontsizeName"),c[b]=Math.max(c[b],m.measureText(e).width),c[b]=+c[b].toFixed(2)}m.textBaseline="middle",m.textAlign="left";let w=Math.max(f+2*h,t(c.length)+h*(1+c.length)),y=i(p)+h*(1+p)+u+2*h,M=r;M=(M=Math.min(M,r-1.2*w))<0?r+.2*w:M;let _=2*h;for(m.strokeStyle=n.background,m.lineJoin="round",m.lineWidth=15,m.strokeRect(M,_,w,y),m.shadowColor=n.shadowColor||"",m.shadowBlur=n.shadowBlur||0,m.fillStyle=n.background,m.fillRect(M,_,w,y),m.fillStyle=n.color,m.font="bold "+a("fontsizeTitle"),m.fillText(d,M+h,_+2*h),x=0;x<l.length;x++){let t=e(x),i=s(x);m.fillStyle=l[x].color,m.shadowColor="",m.shadowBlur=0,m.font="bold "+a("fontsizeValue"),m.fillText(l[x].value,t,i),m.font=a("fontsizeName"),m.fillText(l[x].name,t,i+g+h/2)}m.stroke()}}};class r{constructor(t,e){this._chart=t,this._options=e;let i=e.inheritOptions,s={};i&&delete(s=t.getComponentOptions(i)).elements,this.options=a.objMerge({},s,e,!0),this.container=t.container,this.elements=[],this.data={datasets:[]},this.type=this.options.type||"canvas",this.createComponent(),this.resize()}getCurrentState(){return this._chart.getCurrentState()}setAreaPosition(t,e){a.throttle(this._chart.setAreaPosition,10,this._chart,t,e)}setAreaSize(t,e){a.throttle(this._chart.setAreaSize,10,this._chart,t,e)}setData(t){this._data=t,this.prepareData(),this.createElements(),this.render()}updateOptions(t={}){this.options=a.objMerge({},this._options,t,!0),this.elements.forEach(t=>{let e=a.objMerge({},this.options.elementsTypes[t.type],this.options.elements[t.type]);t.updateOptions(e)}),this.render()}createComponent(){let t="canvas"===this.type?"CANVAS":"DIV",e=this.options.outside?this.container.parentNode:this.container;this.component=e.appendChild(document.createElement(t)),this.pixelRatio="canvas"===this.type?this.getPixelRatio(this.component):1,this.component.style.background=this.options.background,this.options.attrs&&Object.keys(this.options.attrs).forEach(t=>{this.component.setAttribute(t,this.options.attrs[t])}),this.options.style&&Object.keys(this.options.style).forEach(t=>{this.component.style[t]=this.options.style[t]})}resize(){if(this.containerHeight===this.container.offsetHeight&&this.containerWidth===this.container.offsetWidth)return!1;this.containerHeight=this.container.offsetHeight,this.containerWidth=this.container.offsetWidth,this.top=a.percent2value(this.options.top,this.containerHeight),this.left=a.percent2value(this.options.left,this.containerWidth),this.height=a.percent2value(this.options.height,this.containerHeight),this.width=a.percent2value(this.options.width,this.containerWidth),this.component.setAttribute("width",parseInt(this.width*this.pixelRatio)),this.component.setAttribute("height",parseInt(this.height*this.pixelRatio)),this.component.setAttribute("ratio",parseInt(this.pixelRatio)),this.component.style.position="absolute",this.component.style.width=parseInt(this.width)+"px",this.component.style.height=parseInt(this.height)+"px",this.component.style.top=parseInt(this.top)+"px",this.component.style.left=parseInt(this.left)+"px"}cleanup(){if("canvas"===this.type){var t=this.component.getContext("2d");t.save(),t.setTransform(1,0,0,1,0,0),t.clearRect(0,0,this.width*this.pixelRatio,this.height*this.pixelRatio),t.restore()}}render(){this.cleanup(),this.elements.forEach(t=>{t.draw()})}createElements(){this.elements=[];let t=this.options.elementsTypes||{},e=this.options.elements;Object.keys(e||{}).forEach(i=>{let s=e[i],n=s.elementType||i;if(h[n]){let e=t[s.name||i],o=a.objMerge({},e,s);o.padding=a.sumObj(o.padding,this.options.padding),this._addElement(n,o)}}),this.data.datasets&&this.data.datasets.forEach(e=>{if(t[e.options.elementType]){let i=t[e.options.elementType],s=i.elementType;if(h[s]){let t=a.objMerge({},i,e.options);t.padding=a.sumObj(t.padding,this.options.padding),this._addElement(s,t).dataset=e}}}),this.elements.sort((t,e)=>t.options.zindex>=e.options.zindex?1:-1)}_addElement(t,e,i){let s=new h[t](this.component,e);return s.type=t,s.data=i||this.data,this.elements.push(s),s}getPixelRatio(t){let e=t.getContext("2d");return(window.devicePixelRatio||1)/(e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1)}dataCompression(t,e,i="pulling"){let s=[],a=t.length/e;if(e>=t.length)return t.slice();for(let n=0,o=e;n<o;n++){let e=Math.min(Math.round(n*a),t.length-1);if("pulling"===i)s.push(t[e]);else{let o=0,h=Math.min(Math.round((n+1)*a),t.length-1);if("averaging"===i){for(let i=e;i<=h;i++)o+=+(t[i]||0);s.push(o/Math.max(1,h-e))}else if("maximizing"===i){for(let i=e;i<=h;i++)o=Math.max(+(t[i]||0),o);s.push(o)}}}return s}normalizeMinMax(t=5){function e(t){let e=0;if((t=Math.abs(t))<1)for(;10*t*++e<1;);else e=1-t.toFixed(0).length;return Math.pow(10,e)}this.data.max>2*this.data.min?this.data.min=0:this.data.min=function(t){let i=e(t);return Math.floor(t*i)/i}(this.data.min),this.data.max*=1.05;let i=(this.data.max-this.data.min)/t;i=function(t){let i=e(t);return Math.ceil(t*i)/i}(i),this.data.max=this.data.min+i*t}getMinMax(t){if(!t)return!1;let e=1/0,i=-1/0;for(let s=t.length-1;s>=0;s--)e=Math.min(e,+t[s]),i=Math.max(i,+t[s]);return{min:e,max:i}}}const l={Graph:class extends r{constructor(t,e){super(t,e),this.name="Graph",this.data={datasets:[]};let i=(t,e)=>({x:(t=a.getEventXY(t,this.component)).x/this.width,y:t.y/this.height});this.component.addEventListener("mousemove",t=>{t=i(t),a.throttle(this.setActivePoint,10,this,t.x,t.y)}),this.component.addEventListener("touchmove",t=>{t=i(t),this.setActivePoint(t.x,t.y,!0)}),this.component.addEventListener("touchend",t=>{this.setActivePoint(0,0)}),this.component.addEventListener("mouseleave",t=>{this.setActivePoint(0,0)})}renderAniY(t,e){let i=this.data.scaleYRate;this._aniYStop&&this._aniYStop(),this._aniYStop=a.animate({duration:t||200,exec:t=>{this.data.scaleYRate=1+i*(1-t),a.throttle(this.render,10,this)},callback:()=>{this._aniYStop=!1},context:this})}renderAniX(t,e){let i=this.data.pointWidthRate-1;this._aniXStop&&this._aniXStop(),this._aniXStop=a.animate({duration:t||200,exec:t=>{this.data.pointWidthRate=1-i*(1-t),a.throttle(this.render,10,this)},callback:()=>{this._aniXStop=!1},context:this})}render(){this.cleanup(),this.elements.forEach(t=>{t.scaleYRate=this.data.scaleYRate,t.pointWidthRate=this.data.pointWidthRate,t.min=this.data.min,t.max=this.data.max,t.drawReverse=this.drawReverse,t.activeY=this.activeY,t.activeX=this.activeX,t.activeData=this.activeData,t.draw()})}prepareData(){let t,e,i,s=this.getCurrentState(),a=1/0,n=-1/0;this.drawReverse=s.drawReverse,i=Math.round((s.end-s.start)*this._data.labels.length),this.drawReverse?(t=Math.floor(s.end*this._data.labels.length),e=Math.max(0,t-i)):(e=Math.ceil(s.start*this._data.labels.length),t=e+i),this._data.datasets.forEach(i=>{let s=this.data.datasets.find(t=>t.options.name===i.options.name);s||(s={options:Object.assign({},i.options),data:[]},this.data.datasets.push(s)),s.hidden=i.hidden,s.hidden||(s.data=i.data.slice(e,t),s.data=this.dataCompression(s.data,this.width*this.pixelRatio),Object.assign(s,this.getMinMax(s.data)),a=Math.min(s.min,a),n=Math.max(s.max,n))});let o=this.data.max-this.data.min||0;this.data.max=n,this.data.min=a,this.normalizeMinMax(this.options.elements.labelsAmount),o&&(this.data.max-this.data.min)/o!=1&&(this.data.scaleYRate=(this.data.scaleYRate||1)*(this.data.max-this.data.min)/o||0),this.data.pointWidthRate=this.data.labels&&this.data.labels.length/(t-e)||1,this.data.labels=this._data.labels.slice(e,t)}setActivePoint(t,e,i){this.activeX!==t&&(this.activeX=t,this.activeY=e,this.prepareActiveData(t),a.throttle(this._chart.setActivePoint,10,this._chart,t,e,this.activeData))}prepareActiveData(t){if(!t)return void(this.activeData=!1);let e,i=[],s=Math.round(this.data.labels.length*t);e=this.data.labels[s],this.data.datasets.forEach(t=>{t.hidden||i.push({name:t.options.name,color:t.options.color,value:t.data[s]})}),this.activeData={title:e,content:i}}onUpdatePosition(){this.prepareData(),this.data.pointWidthRate,this._aniXStop||this.renderAniX(),1!=this.data.scaleYRate&&(this._aniYStop||this.renderAniY())}onToggleDataset(){this.prepareData(),this.renderAniY()}onSetActivePoint(){let t=this.getCurrentState();this.activeX=t.activeX,this.activeY=t.activeY,this.render()}},Map:class extends r{constructor(t,e){super(t,e),this.name="Map",this.data={datasets:[]}}render(){this.cleanup(),this.elements.forEach(t=>{t.min=this.data.min,t.max=this.data.max,t.draw()})}prepareData(){let t=1/0,e=-1/0;this._data.datasets.forEach(i=>{let s=this.data.datasets.find(t=>t.options.name===i.options.name);s||(s={options:Object.assign({},i.options),data:[]},this.data.datasets.push(s)),s.hidden=i.hidden,s.hidden||(s.data=this.dataCompression(i.data,this.width*this.pixelRatio),Object.assign(s,this.getMinMax(s.data)),t=.2*Math.min(s.min,t),e=1.2*Math.max(s.max,e))}),Object.assign(this.data,{min:t,max:e})}onToggleDataset(){this.prepareData(),this.render()}},Scroll:class extends r{constructor(t,e){super(t,e),this.name="Scroll",this.component.innerHTML=e.template,this.bars=this.component.getElementsByClassName("chart-scroll-bar"),this.carret=this.component.querySelector(".chart-scroll-carret"),this.scroll=this.component.querySelector(".chart-scroll");let i=(t,e)=>({x:(t=a.getEventXY(t,this.component)).x/this.width,y:t.y/this.height});this.scroll.addEventListener("mouseup",t=>{t=i(t),this.mouseup(t.x,t.y)}),this.scroll.addEventListener("touchend",t=>{this.mouseup()}),this.scroll.addEventListener("mousemove",t=>{t=i(t),this.mousemove(t.x,t.y)}),this.scroll.addEventListener("touchmove",t=>{t=i(t),this.mousemove(t.x,t.y)}),this.scroll.addEventListener("mousedown",t=>{t=i(t),this.mousedown(t.x,t.y,.05)}),this.scroll.addEventListener("touchstart",t=>{t=i(t),this.mousedown(t.x,t.y,.05)}),this.scroll.addEventListener("mouseleave",t=>{this.drag=!1})}_scrollMoveAni(t){let e=(this.start+this.end)/200,i=t-e;this._aniStop&&this._aniStop(),this._aniStop=a.animate({duration:200,exec:t=>{this.setAreaPosition(e+i*t)}})}render(){this.bars[0].style.width=this.start+"%",this.bars[1].style.width=100-this.end+"%",this.carret.style.width=this.end-this.start+"%",this.scroll.style.opacity=.7}prepareData(){let t=this.getCurrentState();this.start=100*t.start,this.end=100*t.end}onUpdatePosition(){this.prepareData(),this.render()}mousedown(t,e,i){this.startX=t;let s=this.getCurrentState(),a=(s.end-s.start)*i*2;s.start-i<=t&&s.end+i>=t&&(s.start+a>=t?this.drag="start":s.end-a<=t?this.drag="end":this.drag="shift",this.deltaX=t-(s.end+s.start)/2)}mouseup(t,e){this.startX=null,!this.drag&&t&&this._scrollMoveAni(t),this.drag=!1}mouseleave(t,e){this.drag=!1}mousemove(t,e){this.drag&&this.drag&&(this._aniStop&&this._aniStop(),"shift"===this.drag?this.setAreaPosition(t-this.deltaX):this.setAreaSize(t,this.drag),this.prevX=t)}},Legend:class extends r{constructor(t,e){super(t,e),this.name="Legend"}resize(){}render(){this.component.innerHTML=this.template;let t=this.component.children;for(let e=0;e<t.length;e++)t[e].addEventListener("click",i=>{t[e].classList.toggle("hidden"),this._chart.toggleDataset(e)})}prepareData(){this.template="",this._data.datasets.forEach(t=>{let e=t.options;this.template+=this.options.itemTemplate.replace("%TEXT%",e.title||e.name).replace("%COLOR%",e.color)})}}};if(void 0!==window.$Chart)throw"window.$Chart already taken";window.$Chart=class{constructor(t,e){this.components=[];const i=n[e]||n.default;this._options=a.objMerge({},i,t,!0),this.setContainer(t&&t.element),this.createComponents(),this.callComponents(["resize"]);let s=a.percent2value(this._options.visibleArea||"10%");this._start=t.areaStartPositionAtLast?1-s:0,this._end=t.areaStartPositionAtLast?1:s,window.addEventListener("resize",()=>{this.onScreenResize()})}set data(t){this.baseData=t,this.components.forEach(t=>{t.setData(this.baseData)})}set options(t){this._options=a.objMerge(this._options,t,!0),this.components.forEach(e=>{t[e.name]&&e.updateOptions(this._options[e.name])})}createComponents(){Object.keys(this._options).forEach(t=>{l[t]&&this.components.push(new l[t](this,this._options[t]))})}callComponents(t){this.components.forEach(e=>{t.forEach(t=>e[t]&&e[t]())})}setContainer(t){if(t&&"string"==typeof t&&(t=document.querySelector(t)),t||(t=(t=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop()).parentNode),!t||!t.tagName)throw"Chart container not found";this.container=t,this.container.style.position="relative"}getComponentOptions(t){return a.objMerge({},this._options[t])}getCurrentState(){return{start:this._start,end:this._end,drawReverse:this.drawReverse,activeX:this.activeX,activeY:this.activeY,activeData:this.activeData}}setAreaPosition(t){let e=this._end-this._start;(t>1||t<0)&&(t=t>1?t-1:t,t=this._start+e/2+t/10),this._start=Math.min(Math.max(t-e/2,0),1-e),this._end=this._start+e,this._start=+this._start.toFixed(3),this._end=+this._end.toFixed(3),this.callComponents(["onUpdatePosition"])}setAreaSize(t,e){"start"===e?(this._start=+Math.min(Math.max(t,0),this._end-.07).toFixed(3),this.drawReverse=!0):(this._end=+Math.max(Math.min(t,1),this._start+.07).toFixed(3),this.drawReverse=!1),this.callComponents(["onUpdatePosition"])}setActivePoint(t,e,i){this.activeX=t,this.activeY=e,this.activeData=i,this.callComponents(["onSetActivePoint"])}toggleDataset(t){this.baseData.datasets[t].hidden=!this.baseData.datasets[t].hidden,this.callComponents(["onToggleDataset"])}onScreenResize(){this.callComponents(["resize","render"])}};i(0)}]);