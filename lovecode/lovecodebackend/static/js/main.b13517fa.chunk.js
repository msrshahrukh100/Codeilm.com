(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{100:function(e,t,a){"use strict";var n=a(109),r=a(1),o=a.n(r);t.a=function(){return o.a.createElement(n.a,{height:160,width:400,speed:2,primaryColor:"#f3f3f3",secondaryColor:"#ecebeb"},o.a.createElement("rect",{x:"0",y:"18",rx:"0",ry:"0",width:"249",height:"5"}),o.a.createElement("rect",{x:"0",y:"31",rx:"0",ry:"0",width:"91",height:"3"}),o.a.createElement("rect",{x:"0",y:"40",rx:"0",ry:"0",width:"91",height:"3"}),o.a.createElement("rect",{x:"0",y:"52",rx:"0",ry:"0",width:"18",height:"7"}),o.a.createElement("rect",{x:"0",y:"70",rx:"0",ry:"0",width:"249",height:"5"}),o.a.createElement("rect",{x:"0",y:"83",rx:"0",ry:"0",width:"91",height:"3"}),o.a.createElement("rect",{x:"0",y:"92",rx:"0",ry:"0",width:"91",height:"3"}),o.a.createElement("rect",{x:"0",y:"104",rx:"0",ry:"0",width:"18",height:"7"}))}},146:function(e,t,a){"use strict";var n=a(54),r=a(1),o=a.n(r),i=a(6),l=a(338),c=a(337),s=a(339),u=a(336),m=a(335),p=a(47),h=a(64);t.a=Object(i.a)(function(e){return{card:Object(n.a)({maxWidth:"100%",margin:e.spacing(5)},e.breakpoints.down("xs"),{margin:e.spacing(2)}),media:{height:140},actionBtn:{marginLeft:e.spacing(2)}}})(function(e){var t=e.classes,a=o.a.createElement(o.a.Fragment,null,e.image?o.a.createElement(m.a,{className:t.media,image:"/static/images/cards/contemplative-reptile.jpg",title:"Contemplative Reptile"}):null,o.a.createElement(u.a,{onClick:e.onClick},o.a.createElement(p.a,{gutterBottom:!0,variant:e.headerVariant?e.headerVariant:"h3",component:e.headerComponent?e.headerComponent:"h2"},e.title),o.a.createElement(p.a,{component:"div"},e.content))),n=e.link?o.a.createElement(c.a,null,o.a.createElement(h.b,{to:{pathname:e.link,search:e.search}},a)):a;return o.a.createElement(l.a,{className:t.card,elevation:e.elevation},n,o.a.createElement(s.a,{className:t.actionBtn},e.actionButtons))})},148:function(e,t,a){"use strict";t.a=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var a=document.cookie.split(";"),n=0;n<a.length;n++){var r=a[n].trim();if(r.substring(0,e.length+1)===e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}return t}},153:function(e,t,a){"use strict";var n=a(36),r=a(21),o=a(38),i=a(37),l=a(39),c=a(201),s=a(1),u=a.n(s),m=a(5),p=a(202),h=a.n(p),d=a(204),g=a.n(d),f=a(205),E=a.n(f),b=a(171),v=a.n(b),k=a(206),y=a.n(k),w=a(207),_=a.n(w),O=a(333),j=a(363),C=a(334),N=a(203),x=a.n(N),S=a(6),D={success:h.a,warning:x.a,error:g.a,info:E.a};var T=Object(S.a)(function(e){return{success:{backgroundColor:y.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.dark},warning:{backgroundColor:_.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing.unit},message:{display:"flex",alignItems:"center"}}})(function(e){var t=e.classes,a=e.className,n=e.message,r=e.onClose,o=e.variant,i=Object(c.a)(e,["classes","className","message","onClose","variant"]),l=D[o];return u.a.createElement(C.a,Object.assign({className:Object(m.a)(t[o],a),"aria-describedby":"client-snackbar",message:u.a.createElement("span",{id:"client-snackbar",className:t.message},u.a.createElement(l,{className:Object(m.a)(t.icon,t.iconVariant)}),n),action:[u.a.createElement(O.a,{key:"close","aria-label":"Close",color:"inherit",className:t.close,onClick:r},u.a.createElement(v.a,{className:t.icon}))]},i))}),A=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,l=new Array(r),c=0;c<r;c++)l[c]=arguments[c];return(a=Object(o.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(l)))).state={open:a.props.open},a.handleClose=function(e,t){"clickaway"!==t&&a.setState({open:!1})},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.type,a=e.text,n=this.props.onCloseHandler?this.props.onCloseHandler:this.handleClose,r=this.props.onCloseHandler?this.props.open:this.state.open;return u.a.createElement("div",null,u.a.createElement(j.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:r,autoHideDuration:1e4,onClose:n},u.a.createElement(T,{onClose:n,variant:t,message:a})))}}]),t}(u.a.Component);t.a=Object(S.a)(function(e){return{margin:{margin:e.spacing.unit}}})(A)},154:function(e,t,a){"use strict";var n=a(1),r=a.n(n),o=a(6),i=a(67),l=a(88);t.a=Object(o.a)(function(e){return{root:{flexGrow:1},paper:{textAlign:"center"}}})(function(e){var t=e.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(l.a,{container:!0,spacing:0},r.a.createElement(l.a,{item:!0,xs:12,sm:e.right?8:12},r.a.createElement(i.a,{elevation:0,className:t.paper},e.left)),e.right?r.a.createElement(l.a,{item:!0,xs:12,sm:4},r.a.createElement(i.a,{elevation:0,className:t.paper},e.right)):null))})},155:function(e,t,a){"use strict";var n=a(1),r=a.n(n),o=a(6),i=a(209),l=a(362);t.a=Object(o.a)(function(e){return{chip:{marginLeft:e.spacing(2),marginTop:e.spacing(2),backgroundColor:"white"},avatar:{marginRight:e.spacing(1),width:50,height:50},name:{fontSize:15},intro:{fontSize:13,color:"grey"}}})(function(e){var t=e.classes,a=e.user?r.a.createElement("p",null,r.a.createElement("span",{className:t.name},e.user.full_name),r.a.createElement("br",null),r.a.createElement("span",{className:t.intro},e.user.intro)):null;return e.user?r.a.createElement(l.a,{avatar:r.a.createElement(i.a,{className:t.avatar,alt:e.user.full_name,src:e.user.user_profile_pic}),label:a,className:t.chip}):null})},156:function(e,t,a){"use strict";var n=a(28),r=function(e){return{type:n.e,data:e}},o=a(80),i=function(){return localStorage.setItem("authenticated",""),{type:n.b}},l=function(){return function(e){e({type:n.c}),o.a.get("/get-auth-status").then(function(t){var a,r;e((a=t.data.authenticated?"true":"",r=t.data.user,localStorage.setItem("authenticated",a),{type:n.d,authenticated:a,user:r}))}).catch(function(e){console.log(e)})}};a.d(t,"c",function(){return r}),a.d(t,"a",function(){return l}),a.d(t,"b",function(){return i})},173:function(e,t,a){"use strict";var n=a(36),r=a(21),o=a(38),i=a(37),l=a(39),c=a(1),s=a.n(c),u=a(211),m=a(140),p=a(6),h=a(101),d=a.n(h),g=a(217),f=function(e){function t(){return Object(n.a)(this,t),Object(o.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.props.tutorial;return s.a.createElement(s.a.Fragment,null,t.view_data.views_count?s.a.createElement(g.a,{title:"Views"},s.a.createElement(m.a,{size:"small",color:"primary",className:e.viewButton},s.a.createElement(u.a,{className:e.iconSmall}),s.a.createElement(d.a,{value:t.view_data.views_count,displayType:"text",thousandSeparator:!0,renderText:function(e){return s.a.createElement(s.a.Fragment,null,"0"!==e&&""!==e?e:"")}}))):null)}}]),t}(s.a.Component);t.a=Object(p.a)(function(e){return{iconSmall:{marginRight:e.spacing.unit,fontSize:20},viewButton:{color:"black",textTransform:"none",marginLeft:2*e.spacing.unit}}})(f)},174:function(e,t,a){"use strict";var n=a(1),r=a.n(n),o=a(212);t.a=function(e){var t=e.title,a=void 0===t?"Codeilm":t,n=e.description,i=void 0===n?"Codeilm is the online community for developers to Share, Inspire & Teach, how they build their Projects, in the form of Tutorials using Markdown.":n,l=e.canonicalUrl,c=void 0===l?"https://codeilm.com":l;return r.a.createElement(o.Helmet,{titleTemplate:"%s - Codeilm",defaultTitle:"Codeilm"},r.a.createElement("title",{itemProp:"name",lang:"en"},a),r.a.createElement("meta",{name:"description",content:i}),r.a.createElement("meta",{property:"og:type",content:"website"}),r.a.createElement("meta",{property:"og:title",content:a}),r.a.createElement("meta",{property:"og:description",content:i}),r.a.createElement("meta",{property:"og:url",content:c}),r.a.createElement("meta",{property:"og:image",content:"http://mysite.com/img/apple-touch-icon-57x57.png"}),r.a.createElement("link",{rel:"canonical",href:c}),r.a.createElement("link",{rel:"apple-touch-icon",href:"http://mysite.com/img/apple-touch-icon-57x57.png"}),r.a.createElement("link",{rel:"apple-touch-icon",sizes:"72x72",href:"http://mysite.com/img/apple-touch-icon-72x72.png"}))}},176:function(e,t,a){"use strict";var n=a(36),r=a(21),o=a(38),i=a(37),l=a(39),c=a(1),s=a.n(c),u=a(63),m=a(5),p=a(140),h=a(6),d=a(217),g=(a(282),a(340)),f=a(360),E=a(342),b=a(343),v=a(341),k=a(344),y=a(345),w=a(346),_=a(347),O=a(348),j=a(349),C=a(350),N=a(351),x=a(352),S=a(353),D=a(354),T=a(355),A=a(356),L=a(357),I=a(358),R=a(359),z=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,l=new Array(r),c=0;c<r;c++)l[c]=arguments[c];return(a=Object(o.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(l)))).state={open:!1},a.shareHandler=function(){a.setState({open:!0})},a.handleClose=function(){a.setState({open:!1})},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes,a=this.props.title,n=this.props.url,r=this.state.liked?[t.likeButton]:[t.likeButton,t.notLiked];return s.a.createElement(s.a.Fragment,null,s.a.createElement(d.a,{title:"Share"},s.a.createElement(p.a,{size:"small",color:"primary",className:Object(m.a)(r),onClick:function(){return e.setState({open:!0})}},s.a.createElement(u.b,{className:t.iconSmall}))),s.a.createElement(g.a,{open:this.state.open,onClose:this.handleClose,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},s.a.createElement(v.a,{id:"alert-dialog-title"},a),s.a.createElement(E.a,null,s.a.createElement(b.a,{component:"div",id:"alert-dialog-description"},"Share on",s.a.createElement("div",{className:"Demo__container"},s.a.createElement("div",{className:"Demo__some-network"},s.a.createElement(k.a,{url:n,quote:a,className:"Demo__some-network__share-button"},s.a.createElement(y.a,{size:32,round:!0})),s.a.createElement(w.a,{url:n,className:"Demo__some-network__share-count"},function(e){return e})),s.a.createElement("div",{className:"Demo__some-network"},s.a.createElement(_.a,{url:n,title:a,className:"Demo__some-network__share-button"},s.a.createElement(O.a,{size:32,round:!0})),s.a.createElement("div",{className:"Demo__some-network__share-count"},"\xa0")),s.a.createElement("div",{className:"Demo__some-network"},s.a.createElement(j.a,{url:n,title:a,className:"Demo__some-network__share-button"},s.a.createElement(C.a,{size:32,round:!0})),s.a.createElement("div",{className:"Demo__some-network__share-count"},"\xa0")),s.a.createElement("div",{className:"Demo__some-network"},s.a.createElement(N.a,{url:n,title:a,separator:":: ",className:"Demo__some-network__share-button"},s.a.createElement(x.a,{size:32,round:!0})),s.a.createElement("div",{className:"Demo__some-network__share-count"},"\xa0")),s.a.createElement("div",{className:"Demo__some-network"},s.a.createElement(S.a,{url:n,windowWidth:750,windowHeight:600,className:"Demo__some-network__share-button"},s.a.createElement(D.a,{size:32,round:!0}))),s.a.createElement("div",{className:"Demo__some-network"},s.a.createElement(T.a,{url:n,title:a,windowWidth:660,windowHeight:460,className:"Demo__some-network__share-button"},s.a.createElement(A.a,{size:32,round:!0})),s.a.createElement(L.a,{url:n,className:"Demo__some-network__share-count"})),s.a.createElement("div",{className:"Demo__some-network"},s.a.createElement(I.a,{url:n,subject:a,body:"body",className:"Demo__some-network__share-button"},s.a.createElement(R.a,{size:32,round:!0})))))),s.a.createElement(f.a,null,s.a.createElement(p.a,{onClick:this.handleClose,color:"primary"},"Close"))))}}]),t}(s.a.Component);t.a=Object(h.a)(function(e){return{iconSmall:{marginRight:e.spacing.unit,fontSize:20},likeButton:{textTransform:"none",marginLeft:e.spacing.unit},notLiked:{color:"black"}}})(z)},191:function(e,t,a){"use strict";var n=a(40),r=a(41),o=a(43),i=a(42),l=a(44),c=a(1),s=a.n(c),u=a(63),m=a(5),p=a(140),h=a(6),d=a(101),g=a.n(d),f=a(92),E=a.n(f).a.create({baseURL:"https://codeilm.com/api/v1"}),b=a(148),v=a(209),k=a(217),y=a(89),w=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(o.a)(this,Object(i.a)(t).call(this,e))).likeHandler=function(){a.setState({loading:!0});var e=Object(b.a)("csrftoken"),t={liked:!a.state.liked,tutorial_id:a.state.tutorialId};E.defaults.headers.common["X-CSRFToken"]=e,E.post("/tutorials/like",t).then(function(e){a.setState({liked:e.data.like_data.liked,likeCount:e.data.tutorial_like_data.count,likeUsers:e.data.tutorial_like_data.like_users,loading:!1})}).catch(function(e){})},a.state={liked:!!a.props.tutorial&&a.props.tutorial.liked_by_authenticated_user,tutorialId:a.props.tutorial?a.props.tutorial.id:null,likeCount:a.props.tutorial?a.props.tutorial.like_data.count:0,likeUsers:a.props.tutorial&&a.props.tutorial.like_data?a.props.tutorial.like_data.like_users:[],loading:!1},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.state.liked?[e.likeButton]:[e.likeButton,e.notLiked],a=this.state.likeUsers?this.state.likeUsers.map(function(t){return s.a.createElement(k.a,{key:t.id,classes:{tooltip:e.htmlTooltip},title:s.a.createElement(s.a.Fragment,null,s.a.createElement("div",null,s.a.createElement("h4",null,t.user.full_name),s.a.createElement("p",{style:{color:"grey"}},t.user.intro)))},s.a.createElement(v.a,{key:t.id,alt:t.user.full_name,src:t.user.user_profile_pic,className:e.avatar}))}):null;return s.a.createElement(s.a.Fragment,null,s.a.createElement(k.a,{title:this.state.likeCount?"Likes":"Like this"},s.a.createElement(p.a,{disabled:this.state.loading,size:"small",color:"primary",className:Object(m.a)(t),onClick:this.likeHandler},s.a.createElement(u.c,{className:e.iconSmall}),s.a.createElement(g.a,{value:this.state.likeCount,displayType:"text",thousandSeparator:!0,renderText:function(e){return s.a.createElement(s.a.Fragment,null,"0"!==e&&""!==e?e:"Like this")}}))),a)}}]),t}(s.a.Component);t.a=Object(h.a)(function(e){return{iconSmall:{marginRight:e.spacing.unit,fontSize:20},avatar:{margin:3,width:25,height:25},likeButton:{textTransform:"none",marginLeft:e.spacing.unit},notLiked:{color:"black"},htmlTooltip:{backgroundColor:e.palette.common.white,color:"rgba(0, 0, 0, 0.87)",boxShadow:e.shadows[1],maxWidth:220,fontSize:e.typography.pxToRem(12),border:"1px solid #dadde9","& b":{fontWeight:e.typography.fontWeightMedium},opacity:1}}})(Object(y.a)(w,E))},235:function(e,t,a){e.exports=a(331)},240:function(e,t,a){},28:function(e,t,a){"use strict";a.d(t,"e",function(){return n}),a.d(t,"c",function(){return r}),a.d(t,"d",function(){return o}),a.d(t,"b",function(){return i}),a.d(t,"a",function(){return l});var n="SET_REPO_DATA",r="AUTH_START",o="AUTH_SUCCESS",i="AUTH_LOGOUT",l="AUTH_FAIL"},282:function(e,t,a){},331:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(12),i=a.n(o),l=(a(240),a(36)),c=a(21),s=a(38),u=a(37),m=a(39),p=a(40),h=a(41),d=a(43),g=a(42),f=a(44),E=a(215),b=a(54),v=a(412),k=a(413),y=a(333),w=a(47),_=a(417),O=a(135),j=a(6),C=a(199),N=a.n(C),x=a(200),S=a.n(x),D=a(416),T=a(405),A=a(407),L=a(408),I=a(195),R=a.n(I),z=a(196),B=a.n(z),H=a(193),U=a.n(H),F=a(194),P=a.n(F),W=a(404),M=a(409),V=a(64),q={All:r.a.createElement(U.a,null),Create:r.a.createElement(P.a,null),HomeIcon:r.a.createElement(R.a,null),FitnessCenterIcon:r.a.createElement(B.a,null)},G=Object(j.a)({list:{width:250}})(function(e){var t=e.classes,a=e.listitems;return r.a.createElement("div",{className:t.list},r.a.createElement(W.a,null,a.map(function(e,t){return r.a.createElement(V.b,{to:e.link,key:e.key,style:{textDecoration:"None"}},r.a.createElement(T.a,{button:!0},r.a.createElement(A.a,null,q[e.icon]),r.a.createElement(L.a,{primary:e.text})))})),r.a.createElement(M.a,null))}),X=[{text:"All Stories",icon:"All",key:"all123",link:"/tutorials"},{text:"Create",icon:"Create",key:"create123",link:"/tutorials/create"}],J=function(e){return r.a.createElement("div",null,r.a.createElement(D.a,{open:e.open,onClose:e.toggleDrawer(!1),onOpen:e.toggleDrawer(!0)},r.a.createElement("div",{tabIndex:0,role:"button",onClick:e.toggleDrawer(!1),onKeyDown:e.toggleDrawer(!1)},r.a.createElement(G,{listitems:X}))))},K=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={drawerOpen:!1},a.toggleDrawer=function(e){return function(){a.setState({drawerOpen:e})}},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(v.a,{elevation:0,position:"static"},r.a.createElement(k.a,null,r.a.createElement(y.a,{onClick:function(){return e.toggleDrawer(!0)()},className:t.menuButton,color:"inherit","aria-label":"Open drawer"},r.a.createElement(N.a,null)),r.a.createElement(w.a,{className:t.title,variant:"body1",color:"inherit",noWrap:!0},"Codeilm"),r.a.createElement("div",{className:t.grow}),r.a.createElement("div",{className:t.search},r.a.createElement("div",{className:t.searchIcon},r.a.createElement(S.a,null)),r.a.createElement(_.a,{placeholder:"Search\u2026",classes:{root:t.inputRoot,input:t.inputInput}})))),r.a.createElement(J,{open:this.state.drawerOpen,toggleDrawer:this.toggleDrawer}))}}]),t}(r.a.Component),$=Object(j.a)(function(e){return{root:{width:"100%"},grow:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:20},title:Object(b.a)({display:"none",fontSize:25},e.breakpoints.up("sm"),{display:"block"}),search:Object(b.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(O.fade)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(O.fade)(e.palette.common.white,.25)},marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(),width:"auto"}),searchIcon:{width:e.spacing(9),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit",width:"100%"},inputInput:Object(b.a)({paddingTop:e.spacing(),paddingRight:e.spacing(),paddingBottom:e.spacing(),paddingLeft:e.spacing(10),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("sm"),{width:120,"&:focus":{width:200}})}})(K),Q=a(80),Y=a(89),Z=a(146),ee=a(155),te=a(31),ae=a(172),ne=a.n(ae),re=a(85),oe=a(100),ie=a(191),le=a(173),ce=a(63),se=a(140),ue=a(174),me=a(176),pe=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).state={tutorials:[],loading:!0,error:null,pageNumber:null,count:0},a.fetchTutorials=function(){var e=a.state.pageNumber?"/tutorials/?page="+a.state.pageNumber:"/tutorials";Q.a.get(e).then(function(e){a.setState(function(t){return{tutorials:t.tutorials.concat(e.data.results),loading:!1,pageNumber:e.data.next_page_number,count:e.data.count}})}).catch(function(e){console.log(e),a.setState({error:e,loading:!1})})},a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){this.fetchTutorials()}},{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement(r.a.Fragment,null,r.a.createElement(ue.a,{title:"Posts on Codeilm"}),r.a.createElement(ne.a,{dataLength:this.state.tutorials.length,next:this.fetchTutorials,hasMore:this.state.pageNumber,loader:r.a.createElement(re.a,null,r.a.createElement(oe.a,null))},this.state.tutorials.map(function(a,n){var o=r.a.createElement(r.a.Fragment,null,r.a.createElement(ie.a,{tutorial:a}),r.a.createElement(le.a,{tutorial:a}),r.a.createElement(me.a,{url:"https://codeilm.com/tutorials/"+a.id+"/"+a.slug,title:a.title}),a.owner_is_authenticated_user?r.a.createElement(se.a,{size:"small",color:"primary",className:t.metricsButton,onClick:function(){return e.props.history.push(e.props.match.path+"/metrics/"+a.id+"/"+a.slug)}},r.a.createElement(ce.d,{className:t.iconSmall})," Metrics"):null),i=r.a.createElement(r.a.Fragment,null,r.a.createElement(ee.a,{user:a.user}));return r.a.createElement(Z.a,{headerVariant:"h5",key:a.id,link:"/tutorials/"+a.id+"/"+a.slug,content:i,actionButtons:o,title:a.title})})))}}]),t}(r.a.Component),he=Object(Y.a)(Object(te.f)(Object(j.a)(function(e){return{margin:{margin:e.spacing(2),marginRight:e.spacing(3)},metricsButton:{textTransform:"none",marginLeft:e.spacing()},iconSmall:{marginRight:e.spacing(),fontSize:20}}})(pe)),Q.a,"list"),de=a(74),ge=function(e){return function(t){function a(){var e,t;Object(p.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=Object(d.a)(this,(e=Object(g.a)(a)).call.apply(e,[this].concat(r)))).state={component:null},t}return Object(f.a)(a,t),Object(h.a)(a,[{key:"componentDidMount",value:function(){var t=this;e().then(function(e){t.setState({component:e.default})})}},{key:"render",value:function(){var e=this.state.component;return e?r.a.createElement(e,this.props):null}}]),a}(n.Component)},fe=ge(function(){return a.e(16).then(a.bind(null,977))}),Ee=ge(function(){return Promise.all([a.e(0),a.e(12)]).then(a.bind(null,978))}),be=ge(function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(10),a.e(7)]).then(a.bind(null,992))}),ve=ge(function(){return Promise.all([a.e(1),a.e(8),a.e(9)]).then(a.bind(null,983))}),ke=ge(function(){return Promise.all([a.e(0),a.e(6),a.e(15)]).then(a.bind(null,984))}),ye=ge(function(){return Promise.all([a.e(11),a.e(13)]).then(a.bind(null,994))}),we=ge(function(){return Promise.all([a.e(2),a.e(14)]).then(a.bind(null,988))});function _e(e){var t=e.component,a=e.isAuthenticated,n=Object(E.a)(e,["component","isAuthenticated"]);return r.a.createElement(te.a,Object.assign({},n,{render:function(e){return a?r.a.createElement(t,e):r.a.createElement(ke,e)}}))}var Oe=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).state={},a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement($,null),r.a.createElement(te.c,null,r.a.createElement(te.a,{path:"/tutorials/login",component:ke}),r.a.createElement(_e,{exact:!0,path:"/tutorials/create/",component:Ee,isAuthenticated:this.props.isAuthenticated}),r.a.createElement(_e,{exact:!0,path:"/tutorials/create/github",component:fe,isAuthenticated:this.props.isAuthenticated}),r.a.createElement(_e,{exact:!0,path:"/tutorials/create/:repoName/:tutorialId/:tutorialSlug/:branchName",component:be,isAuthenticated:this.props.isAuthenticated}),r.a.createElement(_e,{exact:!0,path:"/tutorials/create/:repoName",component:we,isAuthenticated:this.props.isAuthenticated}),r.a.createElement(te.a,{path:"/tutorials/metrics/:tutorialId/:slug",component:ye}),r.a.createElement(te.a,{path:"/tutorials/:tutorialId/:slug/:activeStep/:stepSlug",component:ve}),r.a.createElement(te.a,{path:"/tutorials/:tutorialId/:slug/:activeStep",component:ve}),r.a.createElement(te.a,{path:"/tutorials/:tutorialId/:slug/",component:ve}),r.a.createElement(te.a,{path:"/tutorials",component:he}),r.a.createElement(te.a,{render:function(){return r.a.createElement("h1",null,"404 page is yet to be found")}})))}}]),t}(r.a.Component),je=Object(de.b)(function(e){return{isAuthenticated:localStorage.getItem("authenticated")}},null)(Oe),Ce=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(je,null)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ne=a(66),xe=a(142),Se=a(28),De={repoData:null},Te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:De,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Se.e:return Object(xe.a)({},e,{repoData:t.data})}return e},Ae=a(139),Le={authenticated:null,user:null,authLoading:!1,error:null},Ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Se.c:return Object(Ae.a)({},e,{authLoading:!0,error:null});case Se.d:return{authenticated:t.authenticated,user:t.user,authLoading:!1,error:null};case Se.b:return{authenticated:"",user:null,authLoading:!1,error:null};case Se.a:return Object(Ae.a)({},e,{error:t.error,authLoading:!1});default:return e}},Re=a(214),ze=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Ne.d,Be=Object(Ne.c)({rdReducer:Te,aReducer:Ie}),He=Object(Ne.e)(Be,ze(Object(Ne.a)(Re.a))),Ue=r.a.createElement(V.a,{basename:"/"},r.a.createElement(de.a,{store:He},r.a.createElement(Ce,null)));i.a.render(Ue,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},80:function(e,t,a){"use strict";var n=a(92),r=a.n(n).a.create({baseURL:"https://codeilm.com/api/v1"});t.a=r},85:function(e,t,a){"use strict";var n=a(1),r=a.n(n),o=a(6),i=a(67),l=a(88);t.a=Object(o.a)(function(e){return{root:{flexGrow:1,paddingTop:e.spacing(2)},paper:{padding:e.spacing(2),textAlign:"center"}}})(function(e){var t=e.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(l.a,{container:!0,spacing:0,justify:"center",alignItems:"center"},r.a.createElement(l.a,{item:!0,sm:12,xs:12},r.a.createElement(i.a,{elevation:0,className:t.paper},e.children))))})},89:function(e,t,a){"use strict";var n=a(40),r=a(41),o=a(43),i=a(42),l=a(44),c=a(1),s=a.n(c),u=a(153),m=a(85),p=a(109),h=function(){return s.a.createElement(p.a,{height:160,width:400,speed:2,primaryColor:"#f3f3f3",secondaryColor:"#ecebeb"},s.a.createElement("rect",{x:"54",y:"13",rx:"0",ry:"0",width:"306",height:"9"}),s.a.createElement("rect",{x:"110",y:"32",rx:"0",ry:"0",width:"202",height:"4"}),s.a.createElement("rect",{x:"49",y:"45",rx:"0",ry:"0",width:"316",height:"179"}))},d=a(100),g=a(154),f=a(6),E=a(415);var b=Object(f.a)({root:{flexGrow:1}})(function(e){var t=e.classes;return s.a.createElement("div",{className:t.root},s.a.createElement(E.a,null))}),v=a(74),k=a(156),y=a(31);t.a=function(e,t,a){var c=function(c){function p(){var e,t;Object(n.a)(this,p);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(t=Object(o.a)(this,(e=Object(i.a)(p)).call.apply(e,[this].concat(r)))).state={error:null,loading:null},t.hideErrorHandler=function(){t.setState({error:null})},t}return Object(l.a)(p,c),Object(r.a)(p,[{key:"componentWillMount",value:function(){var e=this;this.reqInterceptor=t.interceptors.request.use(function(t){return e.setState({error:null,loading:!0}),t},function(t){e.setState({error:t,loading:!1})}),this.resInterceptor=t.interceptors.response.use(function(t){return e.setState({loading:!1}),t},function(t){401===t.response.status||403===t.response.status?(e.props.onLogout(),e.props.history.push("/tutorials/login/?next="+e.props.match.path)):e.setState({error:t,loading:!1})})}},{key:"componentWillUnmount",value:function(){t.interceptors.request.eject(this.reqInterceptor),t.interceptors.response.eject(this.resInterceptor)}},{key:"render",value:function(){var t=s.a.createElement(g.a,{left:s.a.createElement(m.a,null,s.a.createElement(h,null))});return t="list"==a?s.a.createElement(m.a,null,s.a.createElement(d.a,null)):"circular"==a?s.a.createElement(b,null):null,s.a.createElement(s.a.Fragment,null,t&&this.state.loading?t:null,this.state.error?this.state.error.message:null,this.state.error?s.a.createElement(u.a,{open:!0,type:"error",text:this.state.error.message}):null,this.state.error?null:s.a.createElement(e,this.props))}}]),p}(s.a.Component);return Object(v.b)(function(e){return{authenticated:e.aReducer.authenticated}},function(e){return{onLogout:function(){return e(k.b())}}})(Object(y.f)(c))}}},[[235,4,5]]]);
//# sourceMappingURL=main.b13517fa.chunk.js.map