(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{149:function(e,t,a){e.exports=a(333)},154:function(e,t,a){},333:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(23),i=a.n(l),c=(a(154),a(17)),o=a(18),s=a(20),u=a(19),m=a(21),h=a(60),p=a(122),d=a.n(p),g=a(123),E=a.n(g),f=a(58),b=a.n(f),y=a(30),v=a.n(y),w=a(126),O=a.n(w),j=a(33),k=a(16),x=a(124),C=a.n(x),N=a(125),S=a.n(N),I=a(121),D=a.n(I),A=a(117),R=a.n(A),B=a(118),F=a.n(B),H=a(119),M=a.n(H),L=a(110),W=a.n(L),q=a(112),T=a.n(q),z=a(113),_=a.n(z),G=a(114),U=a.n(G),J=a(115),V=a.n(J),K=a(120),P=a.n(K),$=a(38),Q={InboxIcon:r.a.createElement(W.a,null),MailIcon:r.a.createElement(T.a,null),HomeIcon:r.a.createElement(_.a,null),FitnessCenterIcon:r.a.createElement(U.a,null)},X=Object(k.withStyles)({list:{width:250}})(function(e){var t=e.classes,a=e.listitems;return r.a.createElement("div",{className:t.list},r.a.createElement(V.a,null,a.map(function(e,t){return r.a.createElement($.b,{to:e.link,key:e.key,style:{textDecoration:"None"}},r.a.createElement(R.a,{button:!0},r.a.createElement(F.a,null,Q[e.icon]),r.a.createElement(M.a,{primary:e.text})))})),r.a.createElement(P.a,null))}),Y=[{text:"Home",icon:"HomeIcon",key:"home123",link:""},{text:"All Exercises",icon:"FitnessCenterIcon",key:"allexercises123",link:""},{text:"Inbox",icon:"InboxIcon",key:"asfd",link:""},{text:"Mail",icon:"MailIcon",key:"gfd",link:""}],Z=function(e){return r.a.createElement("div",null,r.a.createElement(D.a,{open:e.open,onClose:e.toggleDrawer(!1),onOpen:e.toggleDrawer(!0)},r.a.createElement("div",{tabIndex:0,role:"button",onClick:e.toggleDrawer(!1),onKeyDown:e.toggleDrawer(!1)},r.a.createElement(X,{listitems:Y}))))},ee=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={drawerOpen:!1},a.toggleDrawer=function(e){return function(){a.setState({drawerOpen:e})}},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(d.a,{elevation:0,position:"static"},r.a.createElement(E.a,null,r.a.createElement(b.a,{onClick:function(){return e.toggleDrawer(!0)()},className:t.menuButton,color:"inherit","aria-label":"Open drawer"},r.a.createElement(C.a,null)),r.a.createElement(v.a,{className:t.title,variant:"h6",color:"inherit",noWrap:!0},"Allywith"),r.a.createElement("div",{className:t.grow}),r.a.createElement("div",{className:t.search},r.a.createElement("div",{className:t.searchIcon},r.a.createElement(S.a,null)),r.a.createElement(O.a,{placeholder:"Search\u2026",classes:{root:t.inputRoot,input:t.inputInput}})))),r.a.createElement(Z,{open:this.state.drawerOpen,toggleDrawer:this.toggleDrawer}))}}]),t}(r.a.Component),te=Object(k.withStyles)(function(e){return{root:{width:"100%"},grow:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:20},title:Object(h.a)({display:"none"},e.breakpoints.up("sm"),{display:"block"}),search:Object(h.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(j.fade)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(j.fade)(e.palette.common.white,.25)},marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing.unit,width:"auto"}),searchIcon:{width:9*e.spacing.unit,height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit",width:"100%"},inputInput:Object(h.a)({paddingTop:e.spacing.unit,paddingRight:e.spacing.unit,paddingBottom:e.spacing.unit,paddingLeft:10*e.spacing.unit,transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("sm"),{width:120,"&:focus":{width:200}})}})(ee),ae=a(127),ne=a.n(ae).a.create({baseURL:"https://allywith.com/api/v1"}),re=a(128),le=a(5),ie=a.n(le),ce=a(129),oe=a.n(ce),se=a(131),ue=a.n(se),me=a(132),he=a.n(me),pe=a(135),de=a.n(pe),ge=a(133),Ee=a.n(ge),fe=a(134),be=a.n(fe),ye=a(136),ve=a.n(ye),we=a(72),Oe=a.n(we),je=a(130),ke=a.n(je),xe={success:oe.a,warning:ke.a,error:ue.a,info:he.a};var Ce=Object(k.withStyles)(function(e){return{success:{backgroundColor:Ee.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.dark},warning:{backgroundColor:be.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing.unit},message:{display:"flex",alignItems:"center"}}})(function(e){var t=e.classes,a=e.className,n=e.message,l=e.onClose,i=e.variant,c=Object(re.a)(e,["classes","className","message","onClose","variant"]),o=xe[i];return r.a.createElement(Oe.a,Object.assign({className:ie()(t[i],a),"aria-describedby":"client-snackbar",message:r.a.createElement("span",{id:"client-snackbar",className:t.message},r.a.createElement(o,{className:ie()(t.icon,t.iconVariant)}),n),action:[r.a.createElement(b.a,{key:"close","aria-label":"Close",color:"inherit",className:t.close,onClick:l},r.a.createElement(de.a,{className:t.icon}))]},c))}),Ne=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={open:a.props.show},a.handleClose=function(e,t){"clickaway"!==t&&a.setState({open:!1})},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=(e.classes,e.type),a=e.text;return r.a.createElement("div",null,r.a.createElement(ve.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:this.state.open,autoHideDuration:1e4,onClose:this.handleClose},r.a.createElement(Ce,{onClose:this.handleClose,variant:t,message:a})))}}]),t}(r.a.Component),Se=Object(k.withStyles)(function(e){return{margin:{margin:e.spacing.unit}}})(Ne),Ie=a(24),De=a.n(Ie),Ae=a(39),Re=a.n(Ae);var Be=Object(k.withStyles)(function(e){return{root:{flexGrow:1,paddingTop:2*e.spacing.unit},paper:{padding:2*e.spacing.unit,textAlign:"center"}}})(function(e){var t=e.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(Re.a,{container:!0,spacing:16,justify:"center",alignItems:"center"},r.a.createElement(Re.a,{item:!0,sm:10,xs:10},r.a.createElement(De.a,{elevation:0,className:t.paper},e.children))))}),Fe=a(50),He=function(){return r.a.createElement(Fe.a,{height:160,width:400,speed:2,primaryColor:"#f3f3f3",secondaryColor:"#ecebeb"},r.a.createElement("rect",{x:"54",y:"13",rx:"0",ry:"0",width:"306",height:"9"}),r.a.createElement("rect",{x:"110",y:"32",rx:"0",ry:"0",width:"202",height:"4"}),r.a.createElement("rect",{x:"49",y:"45",rx:"0",ry:"0",width:"316",height:"179"}))},Me=function(){return r.a.createElement(Fe.a,{height:160,width:400,speed:2,primaryColor:"#f3f3f3",secondaryColor:"#ecebeb"},r.a.createElement("rect",{x:"0",y:"18",rx:"0",ry:"0",width:"249",height:"5"}),r.a.createElement("rect",{x:"0",y:"31",rx:"0",ry:"0",width:"91",height:"3"}),r.a.createElement("rect",{x:"0",y:"40",rx:"0",ry:"0",width:"91",height:"3"}),r.a.createElement("rect",{x:"0",y:"52",rx:"0",ry:"0",width:"18",height:"7"}),r.a.createElement("rect",{x:"0",y:"70",rx:"0",ry:"0",width:"249",height:"5"}),r.a.createElement("rect",{x:"0",y:"83",rx:"0",ry:"0",width:"91",height:"3"}),r.a.createElement("rect",{x:"0",y:"92",rx:"0",ry:"0",width:"91",height:"3"}),r.a.createElement("rect",{x:"0",y:"104",rx:"0",ry:"0",width:"18",height:"7"}))};var Le=Object(k.withStyles)(function(e){return{root:{flexGrow:1},paper:{padding:2*e.spacing.unit,textAlign:"center"}}})(function(e){var t=e.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(Re.a,{container:!0,spacing:24},r.a.createElement(Re.a,{item:!0,xs:12,sm:8},r.a.createElement(De.a,{elevation:0,className:t.paper},e.left)),r.a.createElement(Re.a,{item:!0,xs:12,sm:4},r.a.createElement(De.a,{elevation:0,className:t.paper},e.right))))}),We=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"detail";return function(n){function l(){var e,t;Object(c.a)(this,l);for(var a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(t=Object(s.a)(this,(e=Object(u.a)(l)).call.apply(e,[this].concat(n)))).state={error:null,loading:null},t.hideErrorHandler=function(){t.setState({error:null})},t}return Object(m.a)(l,n),Object(o.a)(l,[{key:"componentWillMount",value:function(){var e=this;this.reqInterceptor=t.interceptors.request.use(function(t){return e.setState({error:null,loading:!0}),t},function(t){e.setState({error:t,loading:!1})}),this.resInterceptor=t.interceptors.response.use(function(t){return e.setState({loading:!1}),t},function(t){e.setState({error:t,loading:!1})})}},{key:"componentWillUnmount",value:function(){t.interceptors.request.eject(this.reqInterceptor),t.interceptors.response.eject(this.resInterceptor)}},{key:"render",value:function(){var t=r.a.createElement(Le,{left:r.a.createElement(Be,null,r.a.createElement(He,null))});return"list"==a&&(t=r.a.createElement(Be,null,r.a.createElement(Me,null))),r.a.createElement(r.a.Fragment,null,this.state.loading?t:null,this.state.error?this.state.error.message:null,this.state.error?r.a.createElement(Se,{show:!0,type:"error",text:this.state.error.message}):null,this.state.error?null:r.a.createElement(e,this.props))}}]),l}(r.a.Component)},qe=a(137),Te=a.n(qe),ze=a(138),_e=a.n(ze),Ge=a(141),Ue=a.n(Ge),Je=a(140),Ve=a.n(Je),Ke=a(139),Pe=a.n(Ke),$e=a(32),Qe=a.n($e);var Xe=Object(k.withStyles)({card:{maxWidth:"100%",margin:50},media:{height:140}})(function(e){var t=e.classes;return r.a.createElement(Te.a,{className:t.card},r.a.createElement(_e.a,null,r.a.createElement($.b,{to:{pathname:e.link,search:e.search}},e.image?r.a.createElement(Pe.a,{className:t.media,image:"/static/images/cards/contemplative-reptile.jpg",title:"Contemplative Reptile"}):null,r.a.createElement(Ve.a,null,r.a.createElement(v.a,{gutterBottom:!0,variant:"h5",component:"h2"},e.title),r.a.createElement(v.a,{component:"p"},e.content)))),r.a.createElement(Ue.a,null,r.a.createElement(Qe.a,{size:"small",color:"primary"},"Share"),r.a.createElement(Qe.a,{size:"small",color:"primary"},"Learn More")))}),Ye=a(148),Ze=a(142),et=a.n(Ze),tt=function(e){return r.a.createElement(et.a,{title:"Uses Python"},r.a.createElement(Ye.a,null))},at=a(31),nt=a(59),rt=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={tutorials:null,loading:!0,error:null},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;ne.get("/tutorials").then(function(t){console.log(t.data),e.setState({tutorials:t.data,loading:!1})}).catch(function(t){console.log(t),e.setState({error:t,loading:!1})})}},{key:"render",value:function(){var e=this,t=this.state.tutorials?this.state.tutorials.results.map(function(t,a){return r.a.createElement(Xe,{key:t.hash_id,link:e.props.match.path+"/"+t.hash_id+"/"+t.slug,content:r.a.createElement(tt,null),title:t.title})}):null;return r.a.createElement(r.a.Fragment,null,r.a.createElement(nt.Helmet,null,r.a.createElement("meta",{charSet:"utf-8"}),r.a.createElement("title",null,"Tutorials on Allywith")),t)}}]),t}(r.a.Component),lt=We(Object(at.e)(rt),ne,"list"),it=a(147),ct=a(143),ot=a.n(ct),st=a(144),ut=a.n(st),mt=a(145),ht=a.n(mt),pt=a(146),dt=a.n(pt);var gt=Object(k.withStyles)(function(e){return{root:{width:"90%"},button:{marginTop:1*e.spacing.unit,marginRight:1*e.spacing.unit},actionsContainer:{marginBottom:2*e.spacing.unit},resetContainer:{padding:3*e.spacing.unit}}})(function(e){var t=e.classes,a=r.a.useState(0),n=Object(it.a)(a,2),l=n[0],i=n[1],c=["Select campaign settings","Create an ad group","Create an ad"];function o(){i(function(e){return e+1})}function s(){i(function(e){return e-1})}return r.a.createElement("div",{className:t.root},r.a.createElement(ot.a,{activeStep:l,orientation:"vertical"},c.map(function(e,a){return r.a.createElement(ut.a,{key:e},r.a.createElement(ht.a,null,e),r.a.createElement(dt.a,null,r.a.createElement("div",{className:t.actionsContainer},r.a.createElement("div",null,r.a.createElement(Qe.a,{disabled:0===l,onClick:s,className:t.button},"Back"),r.a.createElement(Qe.a,{variant:"contained",color:"primary",onClick:o,className:t.button},l===c.length-1?"Finish":"Next")))))})),l===c.length&&r.a.createElement(De.a,{square:!0,elevation:0,className:t.resetContainer},r.a.createElement(v.a,null,"All steps completed - you're finished"),r.a.createElement(Qe.a,{onClick:function(){i(0)},className:t.button},"Reset")))}),Et=We(function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={tutorial:null,loading:!0,error:null},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log(this.props);var t=this.props.match.params.hash_id;ne.get("/tutorials/"+t).then(function(t){console.log(t.data),e.setState({tutorial:t.data,loading:!1})}).catch(function(t){console.log(t),e.setState({error:t,loading:!1})})}},{key:"render",value:function(){var e=this.state.tutorial?this.state.tutorial.title:null,t=this.state.tutorial?r.a.createElement(Be,null,r.a.createElement("h1",null,e),r.a.createElement("p",null,"sadf")):null;return r.a.createElement(r.a.Fragment,null,r.a.createElement(nt.Helmet,null,r.a.createElement("meta",{charSet:"utf-8"}),r.a.createElement("title",null,"Tutorial Detail")),this.state.loading?null:r.a.createElement(Le,{left:t,right:r.a.createElement(gt,null)}))}}]),t}(r.a.Component),ne),ft=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(te,null),r.a.createElement(at.c,null,r.a.createElement(at.a,{path:"/tutorials/:hash_id/:slug/",component:Et}),r.a.createElement(at.a,{path:"/tutorials",component:lt}),r.a.createElement(at.a,{render:function(){return r.a.createElement("h1",null,"404 page is yet to be found")}})))}}]),t}(r.a.Component),bt=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(ft,null)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var yt=r.a.createElement($.a,{basename:"/"},r.a.createElement(bt,null));i.a.render(yt,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[149,1,2]]]);
//# sourceMappingURL=main.7986f513.chunk.js.map