(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{167:function(e,t,a){e.exports=a(429)},172:function(e,t,a){},429:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(24),i=a.n(l),c=(a(172),a(16)),o=a(17),s=a(19),u=a(18),m=a(20),h=a(65),p=a(140),d=a.n(p),g=a(141),E=a.n(g),f=a(63),v=a.n(f),b=a(31),y=a.n(b),w=a(144),O=a.n(w),j=a(35),k=a(21),x=a(142),S=a.n(x),C=a(143),N=a.n(C),I=a(139),R=a.n(I),D=a(135),A=a.n(D),B=a(136),F=a.n(B),H=a(137),M=a.n(H),L=a(128),W=a.n(L),_=a(130),q=a.n(_),T=a(131),z=a.n(T),G=a(132),U=a.n(G),J=a(133),V=a.n(J),K=a(138),P=a.n(K),$=a(40),Q={InboxIcon:r.a.createElement(W.a,null),MailIcon:r.a.createElement(q.a,null),HomeIcon:r.a.createElement(z.a,null),FitnessCenterIcon:r.a.createElement(U.a,null)},X=Object(k.withStyles)({list:{width:250}})(function(e){var t=e.classes,a=e.listitems;return r.a.createElement("div",{className:t.list},r.a.createElement(V.a,null,a.map(function(e,t){return r.a.createElement($.b,{to:e.link,key:e.key,style:{textDecoration:"None"}},r.a.createElement(A.a,{button:!0},r.a.createElement(F.a,null,Q[e.icon]),r.a.createElement(M.a,{primary:e.text})))})),r.a.createElement(P.a,null))}),Y=[{text:"Home",icon:"HomeIcon",key:"home123",link:""},{text:"All Exercises",icon:"FitnessCenterIcon",key:"allexercises123",link:""},{text:"Inbox",icon:"InboxIcon",key:"asfd",link:""},{text:"Mail",icon:"MailIcon",key:"gfd",link:""}],Z=function(e){return r.a.createElement("div",null,r.a.createElement(R.a,{open:e.open,onClose:e.toggleDrawer(!1),onOpen:e.toggleDrawer(!0)},r.a.createElement("div",{tabIndex:0,role:"button",onClick:e.toggleDrawer(!1),onKeyDown:e.toggleDrawer(!1)},r.a.createElement(X,{listitems:Y}))))},ee=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={drawerOpen:!1},a.toggleDrawer=function(e){return function(){a.setState({drawerOpen:e})}},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(d.a,{elevation:0,position:"static"},r.a.createElement(E.a,null,r.a.createElement(v.a,{onClick:function(){return e.toggleDrawer(!0)()},className:t.menuButton,color:"inherit","aria-label":"Open drawer"},r.a.createElement(S.a,null)),r.a.createElement(y.a,{className:t.title,variant:"h6",color:"inherit",noWrap:!0},"Allywith"),r.a.createElement("div",{className:t.grow}),r.a.createElement("div",{className:t.search},r.a.createElement("div",{className:t.searchIcon},r.a.createElement(N.a,null)),r.a.createElement(O.a,{placeholder:"Search\u2026",classes:{root:t.inputRoot,input:t.inputInput}})))),r.a.createElement(Z,{open:this.state.drawerOpen,toggleDrawer:this.toggleDrawer}))}}]),t}(r.a.Component),te=Object(k.withStyles)(function(e){return{root:{width:"100%"},grow:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:20},title:Object(h.a)({display:"none"},e.breakpoints.up("sm"),{display:"block"}),search:Object(h.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(j.fade)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(j.fade)(e.palette.common.white,.25)},marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing.unit,width:"auto"}),searchIcon:{width:9*e.spacing.unit,height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit",width:"100%"},inputInput:Object(h.a)({paddingTop:e.spacing.unit,paddingRight:e.spacing.unit,paddingBottom:e.spacing.unit,paddingLeft:10*e.spacing.unit,transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("sm"),{width:120,"&:focus":{width:200}})}})(ee),ae=a(145),ne=a.n(ae).a.create({baseURL:"https://allywith.com/api/v1"}),re=a(146),le=a(5),ie=a.n(le),ce=a(147),oe=a.n(ce),se=a(149),ue=a.n(se),me=a(150),he=a.n(me),pe=a(153),de=a.n(pe),ge=a(151),Ee=a.n(ge),fe=a(152),ve=a.n(fe),be=a(154),ye=a.n(be),we=a(83),Oe=a.n(we),je=a(148),ke=a.n(je),xe={success:oe.a,warning:ke.a,error:ue.a,info:he.a};var Se=Object(k.withStyles)(function(e){return{success:{backgroundColor:Ee.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.dark},warning:{backgroundColor:ve.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing.unit},message:{display:"flex",alignItems:"center"}}})(function(e){var t=e.classes,a=e.className,n=e.message,l=e.onClose,i=e.variant,c=Object(re.a)(e,["classes","className","message","onClose","variant"]),o=xe[i];return r.a.createElement(Oe.a,Object.assign({className:ie()(t[i],a),"aria-describedby":"client-snackbar",message:r.a.createElement("span",{id:"client-snackbar",className:t.message},r.a.createElement(o,{className:ie()(t.icon,t.iconVariant)}),n),action:[r.a.createElement(v.a,{key:"close","aria-label":"Close",color:"inherit",className:t.close,onClick:l},r.a.createElement(de.a,{className:t.icon}))]},c))}),Ce=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={open:a.props.show},a.handleClose=function(e,t){"clickaway"!==t&&a.setState({open:!1})},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=(e.classes,e.type),a=e.text;return r.a.createElement("div",null,r.a.createElement(ye.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:this.state.open,autoHideDuration:1e4,onClose:this.handleClose},r.a.createElement(Se,{onClose:this.handleClose,variant:t,message:a})))}}]),t}(r.a.Component),Ne=Object(k.withStyles)(function(e){return{margin:{margin:e.spacing.unit}}})(Ce),Ie=a(25),Re=a.n(Ie),De=a(41),Ae=a.n(De);var Be=Object(k.withStyles)(function(e){return{root:{flexGrow:1,paddingTop:2*e.spacing.unit},paper:{padding:2*e.spacing.unit,textAlign:"center"}}})(function(e){var t=e.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(Ae.a,{container:!0,spacing:0,justify:"center",alignItems:"center"},r.a.createElement(Ae.a,{item:!0,sm:12,xs:12},r.a.createElement(Re.a,{elevation:0,className:t.paper},e.children))))}),Fe=a(53),He=function(){return r.a.createElement(Fe.a,{height:160,width:400,speed:2,primaryColor:"#f3f3f3",secondaryColor:"#ecebeb"},r.a.createElement("rect",{x:"54",y:"13",rx:"0",ry:"0",width:"306",height:"9"}),r.a.createElement("rect",{x:"110",y:"32",rx:"0",ry:"0",width:"202",height:"4"}),r.a.createElement("rect",{x:"49",y:"45",rx:"0",ry:"0",width:"316",height:"179"}))},Me=function(){return r.a.createElement(Fe.a,{height:160,width:400,speed:2,primaryColor:"#f3f3f3",secondaryColor:"#ecebeb"},r.a.createElement("rect",{x:"0",y:"18",rx:"0",ry:"0",width:"249",height:"5"}),r.a.createElement("rect",{x:"0",y:"31",rx:"0",ry:"0",width:"91",height:"3"}),r.a.createElement("rect",{x:"0",y:"40",rx:"0",ry:"0",width:"91",height:"3"}),r.a.createElement("rect",{x:"0",y:"52",rx:"0",ry:"0",width:"18",height:"7"}),r.a.createElement("rect",{x:"0",y:"70",rx:"0",ry:"0",width:"249",height:"5"}),r.a.createElement("rect",{x:"0",y:"83",rx:"0",ry:"0",width:"91",height:"3"}),r.a.createElement("rect",{x:"0",y:"92",rx:"0",ry:"0",width:"91",height:"3"}),r.a.createElement("rect",{x:"0",y:"104",rx:"0",ry:"0",width:"18",height:"7"}))};var Le=Object(k.withStyles)(function(e){return{root:{flexGrow:1},paper:{padding:2*e.spacing.unit,textAlign:"center"}}})(function(e){var t=e.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(Ae.a,{container:!0,spacing:0},r.a.createElement(Ae.a,{item:!0,xs:12,sm:8},r.a.createElement(Re.a,{elevation:0,className:t.paper},e.left)),r.a.createElement(Ae.a,{item:!0,xs:12,sm:4},r.a.createElement(Re.a,{elevation:0,className:t.paper},e.right))))}),We=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"detail";return function(n){function l(){var e,t;Object(c.a)(this,l);for(var a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(t=Object(s.a)(this,(e=Object(u.a)(l)).call.apply(e,[this].concat(n)))).state={error:null,loading:null},t.hideErrorHandler=function(){t.setState({error:null})},t}return Object(m.a)(l,n),Object(o.a)(l,[{key:"componentWillMount",value:function(){var e=this;this.reqInterceptor=t.interceptors.request.use(function(t){return e.setState({error:null,loading:!0}),t},function(t){e.setState({error:t,loading:!1})}),this.resInterceptor=t.interceptors.response.use(function(t){return e.setState({loading:!1}),t},function(t){e.setState({error:t,loading:!1})})}},{key:"componentWillUnmount",value:function(){t.interceptors.request.eject(this.reqInterceptor),t.interceptors.response.eject(this.resInterceptor)}},{key:"render",value:function(){var t=r.a.createElement(Le,{left:r.a.createElement(Be,null,r.a.createElement(He,null))});return"list"==a&&(t=r.a.createElement(Be,null,r.a.createElement(Me,null))),r.a.createElement(r.a.Fragment,null,this.state.loading?t:null,this.state.error?this.state.error.message:null,this.state.error?r.a.createElement(Ne,{show:!0,type:"error",text:this.state.error.message}):null,this.state.error?null:r.a.createElement(e,this.props))}}]),l}(r.a.Component)},_e=a(155),qe=a.n(_e),Te=a(156),ze=a.n(Te),Ge=a(159),Ue=a.n(Ge),Je=a(158),Ve=a.n(Je),Ke=a(157),Pe=a.n(Ke),$e=a(34),Qe=a.n($e);var Xe=Object(k.withStyles)({card:{maxWidth:"100%",margin:50},media:{height:140}})(function(e){var t=e.classes;return r.a.createElement(qe.a,{className:t.card},r.a.createElement(ze.a,null,r.a.createElement($.b,{to:{pathname:e.link,search:e.search}},e.image?r.a.createElement(Pe.a,{className:t.media,image:"/static/images/cards/contemplative-reptile.jpg",title:"Contemplative Reptile"}):null,r.a.createElement(Ve.a,null,r.a.createElement(y.a,{gutterBottom:!0,variant:"h5",component:"h2"},e.title),r.a.createElement(y.a,{component:"p"},e.content)))),r.a.createElement(Ue.a,null,r.a.createElement(Qe.a,{size:"small",color:"primary"},"Share"),r.a.createElement(Qe.a,{size:"small",color:"primary"},"Learn More")))}),Ye=a(166),Ze=a(160),et=a.n(Ze),tt=function(e){return r.a.createElement(et.a,{title:"Uses Python"},r.a.createElement(Ye.a,null))},at=a(33),nt=a(64),rt=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={tutorials:null,loading:!0,error:null},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;ne.get("/tutorials").then(function(t){console.log(t.data),e.setState({tutorials:t.data,loading:!1})}).catch(function(t){console.log(t),e.setState({error:t,loading:!1})})}},{key:"render",value:function(){var e=this,t=this.state.tutorials?this.state.tutorials.results.map(function(t,a){return r.a.createElement(Xe,{key:t.hash_id,link:e.props.match.path+"/"+t.hash_id+"/"+t.slug,content:r.a.createElement(tt,null),title:t.title})}):null;return r.a.createElement(r.a.Fragment,null,r.a.createElement(nt.Helmet,null,r.a.createElement("meta",{charSet:"utf-8"}),r.a.createElement("title",null,"Tutorials on Allywith")),t)}}]),t}(r.a.Component),lt=We(Object(at.e)(rt),ne,"list"),it=a(161),ct=a.n(it),ot=a(162),st=a.n(ot),ut=a(163),mt=a.n(ut),ht=a(164),pt=a.n(ht);var dt=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={activeStep:0},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes,a=this.props.steps;this.state.activeStep;return r.a.createElement("div",{className:t.root},r.a.createElement(ct.a,{activeStep:this.props.activeStep,orientation:"vertical"},a.map(function(n,l){return r.a.createElement(st.a,{key:n},r.a.createElement(mt.a,null,n),r.a.createElement(pt.a,null,r.a.createElement("div",{className:t.actionsContainer},r.a.createElement("div",null,r.a.createElement(Qe.a,{disabled:0===e.props.activeStep,onClick:e.props.handleBack,className:t.button},"Back"),r.a.createElement(Qe.a,{variant:"contained",color:"primary",onClick:e.props.handleNext,className:t.button},e.props.activeStep===a.length-1?"Finish":"Next")))))})),this.props.activeStep===a.length&&r.a.createElement(Re.a,{square:!0,elevation:0,className:t.resetContainer},r.a.createElement(y.a,null,"All steps completed - you're finished"),r.a.createElement(Qe.a,{onClick:this.props.handleReset,className:t.button},"Reset")))}}]),t}(r.a.Component),gt=Object(k.withStyles)(function(e){return{root:{width:"90%"},button:{marginTop:e.spacing.unit,marginRight:e.spacing.unit},actionsContainer:{marginBottom:2*e.spacing.unit},resetContainer:{padding:3*e.spacing.unit}}})(dt),Et=a(165),ft=a.n(Et),vt=function(e){var t=e.page?e.page.title:null,a=e.page?e.page.content.map(function(e,t){if("md"==e.type)return r.a.createElement(ft.a,{key:"markdown"+t,source:e.value})}):null;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,t),a)},bt=We(function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={tutorial:null,loading:!0,error:null,activeStep:0},a.handleNext=function(){a.setState(function(e){return{activeStep:e.activeStep+1}})},a.handleBack=function(){a.setState(function(e){return{activeStep:e.activeStep-1}})},a.handleReset=function(){a.setState({activeStep:0})},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.hash_id;ne.get("/tutorials/"+t).then(function(t){console.log(t.data),e.setState({tutorial:t.data,loading:!1})}).catch(function(t){console.log(t),e.setState({error:t,loading:!1})})}},{key:"render",value:function(){var e=this.state.tutorial?this.state.tutorial.tutorial_data.data.map(function(e){return e.title}):null,t=(e&&e[this.state.activeStep],this.state.tutorial?this.state.tutorial.tutorial_data.data[this.state.activeStep]:null),a=r.a.createElement(vt,{page:t});return console.log(t),r.a.createElement(r.a.Fragment,null,r.a.createElement(nt.Helmet,null,r.a.createElement("meta",{charSet:"utf-8"}),r.a.createElement("title",null,"Tutorial Detail")),this.state.loading?null:r.a.createElement(Le,{left:a,right:r.a.createElement(gt,{activeStep:this.state.activeStep,handleBack:this.handleBack,handleNext:this.handleNext,handleReset:this.handleReset,steps:e})}))}}]),t}(r.a.Component),ne),yt=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(te,null),r.a.createElement(at.c,null,r.a.createElement(at.a,{path:"/tutorials/:hash_id/:slug/",component:bt}),r.a.createElement(at.a,{path:"/tutorials",component:lt}),r.a.createElement(at.a,{render:function(){return r.a.createElement("h1",null,"404 page is yet to be found")}})))}}]),t}(r.a.Component),wt=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(yt,null)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ot=r.a.createElement($.a,{basename:"/"},r.a.createElement(wt,null));i.a.render(Ot,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[167,1,2]]]);
//# sourceMappingURL=main.4e2d2343.chunk.js.map