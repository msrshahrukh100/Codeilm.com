(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{144:function(e,t,a){e.exports=a(326)},149:function(e,t,a){},326:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(26),c=a.n(l),i=(a(149),a(15)),o=a(16),s=a(18),m=a(17),u=a(19),p=a(60),h=a(124),d=a.n(h),g=a(125),f=a.n(g),b=a(28),E=a.n(b),v=a(23),y=a.n(v),w=a(128),x=a.n(w),O=a(29),j=a(24),k=a(126),S=a.n(k),C=a(127),N=a.n(C),I=a(123),B=a.n(I),D=a(119),L=a.n(D),R=a(120),q=a.n(R),T=a(121),A=a.n(T),M=a(113),F=a.n(M),P=a(115),z=a.n(P),W=a(116),H=a.n(W),G=a(117),U=a.n(G),V=a(118),_=a.n(V),J=a(122),K=a.n(J),$=a(327),Q={InboxIcon:r.a.createElement(F.a,null),MailIcon:r.a.createElement(z.a,null),HomeIcon:r.a.createElement(H.a,null),FitnessCenterIcon:r.a.createElement(U.a,null)},X=Object(j.withStyles)({list:{width:250}})(function(e){var t=e.classes,a=e.listitems;return r.a.createElement("div",{className:t.list},r.a.createElement(_.a,null,a.map(function(e,t){return r.a.createElement($.a,{to:e.link,key:e.key,style:{textDecoration:"None"}},r.a.createElement(L.a,{button:!0},r.a.createElement(q.a,null,Q[e.icon]),r.a.createElement(A.a,{primary:e.text})))})),r.a.createElement(K.a,null))}),Y=[{text:"Home",icon:"HomeIcon",key:"home123",link:"/"},{text:"All Exercises",icon:"FitnessCenterIcon",key:"allexercises123",link:"/all-exercises"},{text:"Inbox",icon:"InboxIcon",key:"asfd",link:"/all-exercises"},{text:"Mail",icon:"MailIcon",key:"gfd",link:""}],Z=function(e){return r.a.createElement("div",null,r.a.createElement(B.a,{open:e.open,onClose:e.toggleDrawer(!1),onOpen:e.toggleDrawer(!0)},r.a.createElement("div",{tabIndex:0,role:"button",onClick:e.toggleDrawer(!1),onKeyDown:e.toggleDrawer(!1)},r.a.createElement(X,{listitems:Y}))))},ee=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={drawerOpen:!1},a.toggleDrawer=function(e){return function(){a.setState({drawerOpen:e})}},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(d.a,{position:"static"},r.a.createElement(f.a,null,r.a.createElement(E.a,{onClick:function(){return e.toggleDrawer(!0)()},className:t.menuButton,color:"inherit","aria-label":"Open drawer"},r.a.createElement(S.a,null)),r.a.createElement(y.a,{className:t.title,variant:"h6",color:"inherit",noWrap:!0},"Gym"),r.a.createElement("div",{className:t.grow}),r.a.createElement("div",{className:t.search},r.a.createElement("div",{className:t.searchIcon},r.a.createElement(N.a,null)),r.a.createElement(x.a,{placeholder:"Search\u2026",classes:{root:t.inputRoot,input:t.inputInput}})))),r.a.createElement(Z,{open:this.state.drawerOpen,toggleDrawer:this.toggleDrawer}))}}]),t}(r.a.Component),te=Object(j.withStyles)(function(e){return{root:{width:"100%"},grow:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:20},title:Object(p.a)({display:"none"},e.breakpoints.up("sm"),{display:"block"}),search:Object(p.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(O.fade)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(O.fade)(e.palette.common.white,.25)},marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing.unit,width:"auto"}),searchIcon:{width:9*e.spacing.unit,height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit",width:"100%"},inputInput:Object(p.a)({paddingTop:e.spacing.unit,paddingRight:e.spacing.unit,paddingBottom:e.spacing.unit,paddingLeft:10*e.spacing.unit,transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("sm"),{width:120,"&:focus":{width:200}})}})(ee),ae=a(38),ne=a.n(ae),re=a(39),le=a.n(re),ce=a(56),ie=a.n(ce),oe=a(129),se=a.n(oe);var me=Object(j.withStyles)(function(e){return{card:{marginBottom:e.spacing.unit+20,marginLeft:e.spacing.unit+30,marginRight:e.spacing.unit+30,marginTop:e.spacing.unit+30},playIcon:{height:38,width:38}}},{withTheme:!0})(function(e){var t=e.classes;return r.a.createElement(ne.a,{className:t.card},r.a.createElement("div",null,r.a.createElement(le.a,{className:t.content},r.a.createElement($.a,{to:e.link},r.a.createElement(se.a,{title:e.tooltiptitle,"aria-label":e.tooltiptitle,placement:e.tooltipplacement},r.a.createElement(E.a,{"aria-label":"Play/pause",style:{float:"right"}},r.a.createElement(ie.a,{className:t.playIcon})))),r.a.createElement(y.a,{component:"h5",variant:"h5"},e.name),r.a.createElement(y.a,{variant:"subtitle1",color:"textSecondary"},e.extraText))))}),ue=function(e){return r.a.createElement(me,e)},pe=function(e){var t=[{name:"Chest Day",extraText:"Last done on sunday"},{name:"Back Day",extraText:"Last done on monday "}].map(function(e,t){return r.a.createElement(ue,{link:"/schedule-start",name:e.name,tooltiptitle:"Start this schedule",tooltipplacement:"left",extraText:e.extraText,key:"schedule"+t})});return r.a.createElement(r.a.Fragment,null,t)},he=a(143),de=a(6),ge=a.n(de),fe=a(130),be=a.n(fe),Ee=a(132),ve=a.n(Ee),ye=a(133),we=a.n(ye),xe=a(136),Oe=a.n(xe),je=a(134),ke=a.n(je),Se=a(135),Ce=a.n(Se),Ne=a(137),Ie=a.n(Ne),Be=a(70),De=a.n(Be),Le=a(131),Re=a.n(Le),qe={success:be.a,warning:Re.a,error:ve.a,info:we.a};var Te=Object(j.withStyles)(function(e){return{success:{backgroundColor:ke.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.dark},warning:{backgroundColor:Ce.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing.unit},message:{display:"flex",alignItems:"center"}}})(function(e){var t=e.classes,a=e.className,n=e.message,l=e.onClose,c=e.variant,i=Object(he.a)(e,["classes","className","message","onClose","variant"]),o=qe[c];return r.a.createElement(De.a,Object.assign({className:ge()(t[c],a),"aria-describedby":"client-snackbar",message:r.a.createElement("span",{id:"client-snackbar",className:t.message},r.a.createElement(o,{className:ge()(t.icon,t.iconVariant)}),n),action:[r.a.createElement(E.a,{key:"close","aria-label":"Close",color:"inherit",className:t.close,onClick:l},r.a.createElement(Oe.a,{className:t.icon}))]},i))}),Ae=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={open:a.props.show},a.handleClose=function(e,t){"clickaway"!==t&&a.setState({open:!1})},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=(e.classes,e.type),a=e.text;return r.a.createElement("div",null,r.a.createElement(Ie.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:this.state.open,autoHideDuration:1e4,onClose:this.handleClose},r.a.createElement(Te,{onClose:this.handleClose,variant:t,message:a})))}}]),t}(r.a.Component),Me=Object(j.withStyles)(function(e){return{margin:{margin:e.spacing.unit}}})(Ae),Fe=function(e,t){return function(a){function n(){var e,t;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(t=Object(s.a)(this,(e=Object(m.a)(n)).call.apply(e,[this].concat(r)))).state={error:null},t.hideErrorHandler=function(){t.setState({error:null})},t}return Object(u.a)(n,a),Object(o.a)(n,[{key:"componentWillMount",value:function(){var e=this;this.reqInterceptor=t.interceptors.request.use(function(t){return e.setState({error:null}),t},function(t){e.setState({error:t})}),this.resInterceptor=t.interceptors.response.use(function(e){return e},function(t){e.setState({error:t})})}},{key:"componentWillUnmount",value:function(){t.interceptors.request.eject(this.reqInterceptor),t.interceptors.response.eject(this.resInterceptor)}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.state.error?this.state.error.message:null,this.state.error?r.a.createElement(Me,{show:!0,type:"error",text:this.state.error.message}):null,r.a.createElement(e,this.props))}}]),n}(r.a.Component)},Pe=a(138),ze=a.n(Pe).a.create({baseURL:"http://localhost:8000/android/gymapp/api/"}),We=Fe(function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;ze.get("/schedules").then(function(t){console.log(t.data),e.setState({exercises:t.data,loading:!1})}).catch(function(t){console.log(t),e.setState({error:t,loading:!1})})}},{key:"render",value:function(){return r.a.createElement(pe,null)}}]),t}(r.a.Component),ze),He=a(140),Ge=a.n(He),Ue=a(33),Ve=a.n(Ue),_e=a(30),Je=a.n(_e),Ke=a(71),$e=a.n(Ke),Qe=a(72),Xe=a.n(Qe),Ye=a(139),Ze=a.n(Ye),et=[{label:"San Francisco \u2013 Oakland Bay Bridge, United States",imgPath:"https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"},{label:"Bird",imgPath:"https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60"},{label:"Bali, Indonesia",imgPath:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80"},{label:"NeONBRAND Digital Marketing, Las Vegas, United States",imgPath:"https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60"},{label:"Go\u010d, Serbia",imgPath:"https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60"}],tt=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={activeStep:0},a.handleNext=function(){a.setState(function(e){return{activeStep:e.activeStep+1}})},a.handleBack=function(){a.setState(function(e){return{activeStep:e.activeStep-1}})},a.handleStepChange=function(e){a.setState({activeStep:e})},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.theme,n=this.state.activeStep,l=et.length;return r.a.createElement("div",{className:t.root},r.a.createElement(Ve.a,{square:!0,elevation:0,className:t.header},r.a.createElement(y.a,null,et[n].label)),r.a.createElement(Ze.a,{axis:"rtl"===a.direction?"x-reverse":"x",index:n,onChangeIndex:this.handleStepChange,enableMouseEvents:!0},et.map(function(e,a){return r.a.createElement("div",{key:e.label},Math.abs(n-a)<=2?r.a.createElement("img",{className:t.img,src:e.imgPath,alt:e.label}):null)})),r.a.createElement(Ge.a,{steps:l,position:"static",activeStep:n,className:t.mobileStepper,nextButton:r.a.createElement(Je.a,{size:"small",onClick:this.handleNext,disabled:n===l-1},"Next","rtl"===a.direction?r.a.createElement($e.a,null):r.a.createElement(Xe.a,null)),backButton:r.a.createElement(Je.a,{size:"small",onClick:this.handleBack,disabled:0===n},"rtl"===a.direction?r.a.createElement(Xe.a,null):r.a.createElement($e.a,null),"Back")}))}}]),t}(r.a.Component),at=Object(j.withStyles)(function(e){return{root:{flexGrow:1},header:{display:"flex",alignItems:"center",height:50,paddingLeft:4*e.spacing.unit,backgroundColor:e.palette.background.default},img:{height:255,display:"block",maxWidth:400,overflow:"hidden",width:"100%"},mobileStepper:{position:"fixed",bottom:0,width:"98%"}}},{withTheme:!0})(tt),nt=function(e){return r.a.createElement(at,null)},rt=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"A schedule"),r.a.createElement(nt,null))}}]),t}(r.a.Component),lt=a(2),ct=a.n(lt),it=a(57),ot=a.n(it),st=a(74),mt=a.n(st),ut=a(73),pt=a.n(ut);function ht(e){var t=e.classes,a=e.theme;console.log(e.data);r.a.createElement("div",{className:t.controls},r.a.createElement(E.a,{"aria-label":"Previous"},"rtl"===a.direction?r.a.createElement(pt.a,null):r.a.createElement(mt.a,null)),r.a.createElement(E.a,{"aria-label":"Play/pause"},r.a.createElement(ie.a,{className:t.playIcon})),r.a.createElement(E.a,{"aria-label":"Next"},"rtl"===a.direction?r.a.createElement(mt.a,null):r.a.createElement(pt.a,null)));var n=r.a.createElement(ne.a,{className:t.card},r.a.createElement("div",{className:t.details},r.a.createElement(le.a,{className:t.content},r.a.createElement(y.a,{component:"h5",variant:"h5"},e.data.title),r.a.createElement(y.a,{variant:"subtitle1",color:"textSecondary"},e.data.subtitle)),r.a.createElement("div",{className:t.controls})),r.a.createElement(ot.a,{className:t.cover,image:e.data.image,title:e.data.title}));return e.data.link&&(n=r.a.createElement($.a,{style:{textDecoration:"none"},to:e.data.link},n)),n}ht.propTypes={classes:ct.a.object.isRequired,theme:ct.a.object.isRequired};var dt=Object(j.withStyles)(function(e){return{card:{display:"flex",marginBottom:e.spacing.unit+20,marginLeft:e.spacing.unit+30,marginRight:e.spacing.unit+30,marginTop:e.spacing.unit+30},details:{display:"flex",flexDirection:"column"},content:{flex:"1 0 auto"},cover:{width:151,marginLeft:"auto"},controls:{display:"flex",alignItems:"center",paddingLeft:e.spacing.unit,paddingBottom:e.spacing.unit},playIcon:{height:38,width:38}}},{withTheme:!0})(ht),gt=function(e){var t={title:e.exercise.name,subtitle:e.exercise.exercise_for,image:e.exercise.image,link:"/all-exercises/some-exercise"};return r.a.createElement(dt,{data:t})},ft=Fe(function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={exercises:null,loading:!0,error:null},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;ze.get("/exercises").then(function(t){console.log(t.data),e.setState({exercises:t.data,loading:!1})}).catch(function(t){console.log(t),e.setState({error:t,loading:!1})})}},{key:"render",value:function(){var e=this.state.exercises?this.state.exercises.map(function(e,t){return r.a.createElement(gt,{exercise:e,key:e.exercise_hash_id})}):null;return r.a.createElement(r.a.Fragment,null,e)}}]),t}(r.a.Component),ze),bt=a(141),Et=a.n(bt),vt=a(142),yt=a.n(vt);var wt=Object(j.withStyles)({card:{maxWidth:345},media:{objectFit:"cover"}})(function(e){var t=e.classes;return r.a.createElement(ne.a,{className:t.card},r.a.createElement(Et.a,null,r.a.createElement(ot.a,{component:"img",alt:"Contemplative Reptile",className:t.media,height:"140",image:"/static/images/cards/contemplative-reptile.jpg",title:"Contemplative Reptile"}),r.a.createElement(le.a,null,r.a.createElement(y.a,{gutterBottom:!0,variant:"h5",component:"h2"},"Lizard"),r.a.createElement(y.a,{component:"p"},"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"))),r.a.createElement(yt.a,null,r.a.createElement(Je.a,{size:"small",color:"primary"},"Share"),r.a.createElement(Je.a,{size:"small",color:"primary"},"Learn More")))}),xt=function(e){return r.a.createElement(wt,null)},Ot=a(331),jt=a(330),kt=a(329),St=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(te,null),r.a.createElement(Ot.a,null,r.a.createElement(jt.a,{path:"/schedules",component:We}),r.a.createElement(jt.a,{path:"/schedule-start",component:rt}),r.a.createElement(jt.a,{path:"/all-exercises/some-exercise",component:xt}),r.a.createElement(jt.a,{path:"/all-exercises",component:ft}),r.a.createElement(kt.a,{to:"/schedules"}),r.a.createElement(jt.a,{render:function(){return r.a.createElement("h1",null,"404 page is yet to be found")}})))}}]),t}(r.a.Component),Ct=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(St,null)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Nt=a(328),It=r.a.createElement(Nt.a,{basename:"/android/gym-home/"},r.a.createElement(Ct,null));c.a.render(It,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[144,1,2]]]);
//# sourceMappingURL=main.3c9af3b2.chunk.js.map