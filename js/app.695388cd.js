(function(){"use strict";var e={311:function(e,t,o){var n=o(144),r=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("menu-panel"),t("editor-panel"),t("map-panel")],1)},i=[],a=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"menu"}},[t("div",{attrs:{id:"menu-header"}},[t("img",{staticStyle:{margin:"14px 5px -3px 0px"},attrs:{src:e.imgSrc}}),e._v("SmartMapX JS 场景示例")]),t("div",{attrs:{id:"menu-content"}},[t("ul",e._l(e.scenarioList,(function(o,n,r){return t("li",{key:r},[t("a",{staticClass:"one_head",class:{clickState:e.curUnfoldedCategory===n},on:{click:function(t){return e.unfoldSubmenu(n)}}},[t("i",{class:e.curUnfoldedCategory===n?"t_open":"t_close"}),e._v(" "+e._s(o.label)+" ")]),t("div",{staticClass:"submenu",style:{display:e.curUnfoldedCategory===n?"block":"none"}},[t("dl",e._l(o.child,(function(o,n,r){return t("dd",{key:r},[t("a",{class:{clickState:e.curScenario===n},on:{click:function(t){return e.loadScenario(o)}}},[e._v(e._s(o.label))])])})),0)])])})),0)])])},l=[],s=JSON.parse('{"MapService":{"name":"MapService","label":"地图服务","child":{"MultiRoutePlanning1":{"name":"MultiRoutePlanning1","label":"多路径规划-方式1"},"MultiRoutePlanning2":{"name":"MultiRoutePlanning2","label":"多路径规划-方式2"},"LocalSearch":{"name":"LocalSearch","label":"本地搜索"}}},"SpatialCalculation":{"name":"SpatialCalculation","label":"空间计算","child":{"PointInPolygon":{"name":"PointInPolygon","label":"点位所属区域判断"},"PointInPolygonWithoutMap":{"name":"PointInPolygonWithoutMap","label":"点位所属区域判断(无地图)"}}},"Other":{"name":"Other","label":"其他","child":{"RegionHighlight":{"name":"RegionHighlight","label":"区域高亮"}}}}'),c={name:"MenuPanel",data(){return{scenarioList:s,curUnfoldedCategory:"",curScenario:null,imgSrc:"/smartmapx-webgis-examples/smartmapx-logo.png"}},methods:{loadScenario(e){this.$store.commit("SET_SCENARIO",e),this.curScenario=e.name},unfoldSubmenu(e){this.curUnfoldedCategory!==e?this.curUnfoldedCategory=e:this.curUnfoldedCategory=""}}},u=c,d=o(1),m=(0,d.Z)(u,a,l,!1,null,"191485ff",null),h=m.exports,f=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"editor"}},[t("div",{attrs:{id:"editor-header"}},[t("p",{attrs:{id:"editor-header-label"}},[e._v("代码编辑器")]),t("div",{attrs:{id:"editor-header-opr"}},[t("a",{attrs:{id:"opr_run_button"},on:{click:e.runCode}},[e._v("运行")]),t("a",{attrs:{id:"opr_restore_button"},on:{click:e.restoreCode}},[e._v("复原")])])]),t("codemirror",{ref:"cmEditor",attrs:{id:"codemirror",options:e.cmOptions},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}})],1)},p=[],g=o(55),C=(o(426),o(17),o(341),o(657),o(700),o(688),o(898),o(379),o(977),o(366),o(568),o(95),o(699),o(292),{name:"EditorPanel",components:{codemirror:g.codemirror},data(){return{code:null,cmOptions:{tabSize:2,smartIndent:!0,styleActiveLine:!0,lineNumbers:!0,lineWrapping:!0,autoCloseTags:!0,line:!0,mode:"text/html",theme:"default",foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter","CodeMirror-lint-markers"]}}},computed:{scenario(){return this.$store.state.scenario},codemirror(){return this.$refs.cmEditor.codemirror}},watch:{scenario:{handler:function(e,t){console.log("scenario oldVal:",t.label),console.log("scenario newVal:",e.label),this.commitCode(e).then((()=>{this.$store.commit("SET_RUN_CODE",!0)})).catch((e=>{console.log("commitCode() error:",e)}))}}},mounted(){},methods:{getDefaultCodeTxt(e){return console.log("getDefaultCodeTxt():",JSON.stringify(e)),new Promise(((t,o)=>{fetch(`/smartmapx-webgis-examples/scenarioDefaultCode/${e.name}.html`).then((e=>e.text())).then((e=>{t(e)})).catch((e=>{o(e)}))}))},commitCode(e){const t=this.getDefaultCodeTxt(e);return new Promise(((e,o)=>{t.then((t=>{this.code=t,this.$store.commit("SET_MAP_CODE",this.code),e()})).catch((e=>{console.log("getDefaultCodeTxt() error:",e),o(e)}))}))},runCode(){this.$store.commit("SET_MAP_CODE",this.code),this.$store.commit("SET_RUN_CODE",!0)},restoreCode(){console.log("restoreCode()"),this.commitCode(this.scenario).then((()=>{this.$store.commit("SET_RUN_CODE",!0)})).catch((e=>{console.log("commitCode() error:",e)}))}}}),_=C,v=(0,d.Z)(_,f,p,!1,null,"68866002",null),b=v.exports,S=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"mapContainer"}},[t("div",{attrs:{id:"iframe"}},[t("iframe",{staticClass:"map-iframe",attrs:{srcdoc:e.content}})])])},P=[],x={name:"MapPanel",data(){return{content:null}},computed:{isRunCode(){return this.$store.state.isRunCode}},watch:{isRunCode:{handler:function(e,t){!t&&e&&(this.content=this.$store.state.mapCode,this.$store.commit("SET_RUN_CODE",!1))}}},methods:{onLoad(){console.log("iframe loaded")}}},O=x,y=(0,d.Z)(O,S,P,!1,null,"41f3498e",null),E=y.exports,w={components:{MenuPanel:h,EditorPanel:b,MapPanel:E},name:"App"},M=w,R=(0,d.Z)(M,r,i,!1,null,null,null),T=R.exports,k=o(14);n.ZP.use(k.ZP);var D=new k.ZP.Store({state:{scenario:{},mapCode:"",isRunCode:!1},getters:{},mutations:{SET_SCENARIO:(e,t)=>{e.scenario={...t}},SET_MAP_CODE:(e,t)=>{e.mapCode=t},SET_RUN_CODE:(e,t)=>{e.isRunCode=t}},actions:{},modules:{}});n.ZP.config.productionTip=!1,new n.ZP({store:D,render:e=>e(T)}).$mount("#app")}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,o),i.exports}o.m=e,function(){var e=[];o.O=function(t,n,r,i){if(!n){var a=1/0;for(u=0;u<e.length;u++){n=e[u][0],r=e[u][1],i=e[u][2];for(var l=!0,s=0;s<n.length;s++)(!1&i||a>=i)&&Object.keys(o.O).every((function(e){return o.O[e](n[s])}))?n.splice(s--,1):(l=!1,i<a&&(a=i));if(l){e.splice(u--,1);var c=r();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,r,i]}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,i,a=n[0],l=n[1],s=n[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(r in l)o.o(l,r)&&(o.m[r]=l[r]);if(s)var u=s(o)}for(t&&t(n);c<a.length;c++)i=a[c],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(u)},n=self["webpackChunksmartmapx_webgis_examples"]=self["webpackChunksmartmapx_webgis_examples"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(311)}));n=o.O(n)})();
//# sourceMappingURL=app.695388cd.js.map