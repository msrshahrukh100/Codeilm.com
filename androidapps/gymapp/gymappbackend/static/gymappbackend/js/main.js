(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{106:function(e,t,a){e.exports=a(254)},111:function(e,t,a){},254:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(22),l=a.n(i),c=(a(111),a(17)),o=a(18),s=a(20),u=a(19),m=a(21),h=a(46),p=a(94),d=a.n(p),g=a(96),b=a.n(g),f=a(43),E=a.n(f),v=a(26),w=a.n(v),y=a(99),O=a.n(y),j=a(25),k=a(29),x=a(97),S=a.n(x),N=a(98),B=a.n(N);var C=Object(k.withStyles)(function(e){return{root:{width:"100%"},grow:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:20},title:Object(h.a)({display:"none"},e.breakpoints.up("sm"),{display:"block"}),search:Object(h.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(j.fade)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(j.fade)(e.palette.common.white,.25)},marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing.unit,width:"auto"}),searchIcon:{width:9*e.spacing.unit,height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit",width:"100%"},inputInput:Object(h.a)({paddingTop:e.spacing.unit,paddingRight:e.spacing.unit,paddingBottom:e.spacing.unit,paddingLeft:10*e.spacing.unit,transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("sm"),{width:120,"&:focus":{width:200}})}})(function(e){var t=e.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(d.a,{position:"static"},r.a.createElement(b.a,null,r.a.createElement(E.a,{className:t.menuButton,color:"inherit","aria-label":"Open drawer"},r.a.createElement(S.a,null)),r.a.createElement(w.a,{className:t.title,variant:"h6",color:"inherit",noWrap:!0},"Material-UI"),r.a.createElement("div",{className:t.grow}),r.a.createElement("div",{className:t.search},r.a.createElement("div",{className:t.searchIcon},r.a.createElement(B.a,null)),r.a.createElement(O.a,{placeholder:"Search\u2026",classes:{root:t.inputRoot,input:t.inputInput}})))))}),I=a(100),L=a.n(I),T=a(101),R=a.n(T),P=a(103),q=a.n(P),A=a(102),D=a.n(A),F=a(255);var M=Object(k.withStyles)(function(e){return{card:{marginBottom:e.spacing.unit+20,marginLeft:e.spacing.unit+30,marginRight:e.spacing.unit+30,marginTop:e.spacing.unit+30},playIcon:{height:38,width:38}}},{withTheme:!0})(function(e){var t=e.classes;return r.a.createElement(L.a,{className:t.card},r.a.createElement("div",null,r.a.createElement(R.a,{className:t.content},r.a.createElement(F.a,{to:e.link},r.a.createElement(D.a,{title:e.tooltiptitle,"aria-label":e.tooltiptitle,placement:e.tooltipplacement},r.a.createElement(E.a,{"aria-label":"Play/pause",style:{float:"right"}},r.a.createElement(q.a,{className:t.playIcon})))),r.a.createElement(w.a,{component:"h5",variant:"h5"},e.name),r.a.createElement(w.a,{variant:"subtitle1",color:"textSecondary"},e.extraText))))}),W=function(e){return r.a.createElement(M,e)},G=function(e){var t=[{name:"Chest Day",extraText:"Last done on sunday"},{name:"Back Day",extraText:"Last done on monday "}].map(function(e,t){return r.a.createElement(W,{link:"/schedule-start",name:e.name,tooltiptitle:"Start this schedule",tooltipplacement:"left",extraText:e.extraText,key:"schedule"+t})});return r.a.createElement(r.a.Fragment,null,t)},U=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(G,null)}}]),t}(r.a.Component),z=a(105),J=a.n(z),V=a(34),$=a.n(V),H=a(63),K=a.n(H),Q=a(64),X=a.n(Q),Y=a(65),Z=a.n(Y),_=a(104),ee=a.n(_),te=(a(239),[{label:"San Francisco \u2013 Oakland Bay Bridge, United States",imgPath:"https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"},{label:"Bird",imgPath:"https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60"},{label:"Bali, Indonesia",imgPath:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80"},{label:"NeONBRAND Digital Marketing, Las Vegas, United States",imgPath:"https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60"},{label:"Go\u010d, Serbia",imgPath:"https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60"}]),ae=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={activeStep:0},a.handleNext=function(){a.setState(function(e){return{activeStep:e.activeStep+1}})},a.handleBack=function(){a.setState(function(e){return{activeStep:e.activeStep-1}})},a.handleStepChange=function(e){a.setState({activeStep:e})},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.theme,n=this.state.activeStep,i=te.length;return r.a.createElement("div",{className:t.root},r.a.createElement($.a,{square:!0,elevation:0,className:t.header},r.a.createElement(w.a,null,te[n].label)),r.a.createElement(ee.a,{axis:"rtl"===a.direction?"x-reverse":"x",index:n,onChangeIndex:this.handleStepChange,enableMouseEvents:!0},te.map(function(e,a){return r.a.createElement("div",{key:e.label},Math.abs(n-a)<=2?r.a.createElement("img",{className:t.img,src:e.imgPath,alt:e.label}):null)})),r.a.createElement(J.a,{steps:i,position:"static",activeStep:n,className:t.mobileStepper,nextButton:r.a.createElement(K.a,{size:"small",onClick:this.handleNext,disabled:n===i-1},"Next","rtl"===a.direction?r.a.createElement(X.a,null):r.a.createElement(Z.a,null)),backButton:r.a.createElement(K.a,{size:"small",onClick:this.handleBack,disabled:0===n},"rtl"===a.direction?r.a.createElement(Z.a,null):r.a.createElement(X.a,null),"Back")}))}}]),t}(r.a.Component),ne=Object(k.withStyles)(function(e){return{root:{flexGrow:1},header:{display:"flex",alignItems:"center",height:50,paddingLeft:4*e.spacing.unit,backgroundColor:e.palette.background.default},img:{height:255,display:"block",maxWidth:400,overflow:"hidden",width:"100%"},mobileStepper:{position:"fixed",bottom:0,width:"98%"}}},{withTheme:!0})(ae),re=function(e){return r.a.createElement(ne,null)},ie=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"A schedule"),r.a.createElement(re,null))}}]),t}(r.a.Component),le=a(259),ce=a(258),oe=a(257),se=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(C,null),r.a.createElement(le.a,null,r.a.createElement(ce.a,{path:"/schedules",component:U}),r.a.createElement(ce.a,{path:"/schedule-start",component:ie}),r.a.createElement(oe.a,{to:"/schedules"}),r.a.createElement(ce.a,{render:function(){return r.a.createElement("h1",null,"404 page is yet to be found")}})))}}]),t}(r.a.Component),ue=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(se,null)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var me=a(256),he=r.a.createElement(me.a,{basename:"/android/gym-home/"},r.a.createElement(ue,null));l.a.render(he,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[106,1,2]]]);
//# sourceMappingURL=main.5872bff6.chunk.js.map