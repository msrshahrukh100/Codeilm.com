(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{142:function(e,t,a){"use strict";var n=a(1),r=a.n(n),o=a(207);t.a=function(e){var t=e.title,a=void 0===t?"Codeilm":t,n=e.description,i=void 0===n?"Codeilm is the online community for developers to Share, Inspire & Teach, how they build their Projects, in the form of Tutorials using Markdown.":n,l=e.canonicalUrl,c=void 0===l?"https://codeilm.com":l;return r.a.createElement(o.Helmet,{titleTemplate:"%s - Codeilm",defaultTitle:"Codeilm"},r.a.createElement("title",{itemProp:"name",lang:"en"},a),r.a.createElement("meta",{name:"description",content:i}),r.a.createElement("meta",{property:"og:type",content:"website"}),r.a.createElement("meta",{property:"og:title",content:a}),r.a.createElement("meta",{property:"og:description",content:i}),r.a.createElement("meta",{property:"og:url",content:c}),r.a.createElement("meta",{property:"og:image",content:"https://codeilm.com/static/images/logo/codeilm.png"}),r.a.createElement("link",{rel:"canonical",href:c}),r.a.createElement("link",{rel:"apple-touch-icon",href:"https://codeilm.com/static/images/logo/codeilm.png"}),r.a.createElement("link",{rel:"apple-touch-icon",sizes:"72x72",href:"https://codeilm.com/static/images/logo/codeilm.png"}))}},145:function(e,t,a){"use strict";t.a=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var a=document.cookie.split(";"),n=0;n<a.length;n++){var r=a[n].trim();if(r.substring(0,e.length+1)===e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}return t}},150:function(e,t,a){"use strict";var n=a(14),r=a(15),o=a(17),i=a(16),l=a(18),c=a(115),s=a(1),u=a.n(s),m=a(5),p=a(197),d=a.n(p),h=a(199),g=a.n(h),f=a(200),E=a.n(f),b=a(169),v=a.n(b),k=a(201),y=a.n(k),w=a(202),_=a.n(w),O=a(325),j=a(355),C=a(326),N=a(198),x=a.n(N),S=a(6),D={success:d.a,warning:x.a,error:g.a,info:E.a};var T=Object(S.a)(function(e){return{success:{backgroundColor:y.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.dark},warning:{backgroundColor:_.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing()},message:{display:"flex",alignItems:"center"}}})(function(e){var t=e.classes,a=e.className,n=e.message,r=e.onClose,o=e.variant,i=Object(c.a)(e,["classes","className","message","onClose","variant"]),l=D[o];return u.a.createElement(C.a,Object.assign({className:Object(m.a)(t[o],a),"aria-describedby":"client-snackbar",message:u.a.createElement("span",{id:"client-snackbar",className:t.message},u.a.createElement(l,{className:Object(m.a)(t.icon,t.iconVariant)}),n),action:[u.a.createElement(O.a,{key:"close","aria-label":"Close",color:"inherit",className:t.close,onClick:r},u.a.createElement(v.a,{className:t.icon}))]},i))}),A=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,l=new Array(r),c=0;c<r;c++)l[c]=arguments[c];return(a=Object(o.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(l)))).state={open:a.props.open},a.handleClose=function(e,t){"clickaway"!==t&&a.setState({open:!1})},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.type,a=e.text,n=this.props.onCloseHandler?this.props.onCloseHandler:this.handleClose,r=this.props.onCloseHandler?this.props.open:this.state.open;return u.a.createElement("div",null,u.a.createElement(j.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:r,autoHideDuration:1e4,onClose:n},u.a.createElement(T,{onClose:n,variant:t,message:a})))}}]),t}(u.a.Component);t.a=Object(S.a)(function(e){return{margin:{margin:e.spacing()}}})(A)},151:function(e,t,a){"use strict";var n=a(1),r=a.n(n),o=a(6),i=a(64),l=a(85);t.a=Object(o.a)(function(e){return{root:{flexGrow:1},paper:{textAlign:"center"}}})(function(e){var t=e.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(l.a,{container:!0,spacing:0},r.a.createElement(l.a,{item:!0,xs:12,sm:e.right?8:12},r.a.createElement(i.a,{elevation:0,className:t.paper},e.left)),e.right?r.a.createElement(l.a,{item:!0,xs:12,sm:4},r.a.createElement(i.a,{elevation:0,className:t.paper},e.right)):null))})},152:function(e,t,a){"use strict";var n=a(1),r=a.n(n),o=a(6),i=a(204),l=a(354);t.a=Object(o.a)(function(e){return{chip:{marginLeft:e.spacing(2),marginTop:e.spacing(2),backgroundColor:"white"},avatar:{marginRight:e.spacing(1),width:50,height:50},name:{fontSize:15},intro:{fontSize:13,color:"grey"}}})(function(e){var t=e.classes,a=e.user?r.a.createElement("p",null,r.a.createElement("span",{className:t.name},e.user.full_name),r.a.createElement("br",null),r.a.createElement("span",{className:t.intro},e.user.intro)):null;return e.user?r.a.createElement(l.a,{avatar:r.a.createElement(i.a,{className:t.avatar,alt:e.user.full_name,src:e.user.user_profile_pic}),label:a,className:t.chip}):null})},154:function(e,t,a){"use strict";var n=a(33),r=function(e){return{type:n.e,data:e}},o=a(79),i=function(){return localStorage.setItem("authenticated",""),{type:n.b}},l=function(){return function(e){e({type:n.c}),o.a.get("/get-auth-status").then(function(t){var a,r;e((a=t.data.authenticated?"true":"",r=t.data.user,localStorage.setItem("authenticated",a),{type:n.d,authenticated:a,user:r}))}).catch(function(e){console.log(e)})}};a.d(t,"c",function(){return r}),a.d(t,"a",function(){return l}),a.d(t,"b",function(){return i})},171:function(e,t,a){"use strict";var n=a(14),r=a(15),o=a(17),i=a(16),l=a(18),c=a(1),s=a.n(c),u=a(206),m=a(138),p=a(6),d=a(98),h=a.n(d),g=a(211),f=function(e){function t(){return Object(n.a)(this,t),Object(o.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.props.tutorial;return s.a.createElement(s.a.Fragment,null,t.view_data.views_count?s.a.createElement(g.a,{title:"Views"},s.a.createElement(m.a,{size:"small",color:"primary",className:e.viewButton},s.a.createElement(u.a,{className:e.iconSmall}),s.a.createElement(h.a,{value:t.view_data.views_count,displayType:"text",thousandSeparator:!0,renderText:function(e){return s.a.createElement(s.a.Fragment,null,"0"!==e&&""!==e?e:"")}}))):null)}}]),t}(s.a.Component);t.a=Object(p.a)(function(e){return{iconSmall:{marginRight:e.spacing(),fontSize:20},viewButton:{color:"black",textTransform:"none",marginLeft:e.spacing(2)}}})(f)},173:function(e,t,a){"use strict";var n=a(14),r=a(15),o=a(17),i=a(16),l=a(18),c=a(1),s=a.n(c),u=a(52),m=a(5),p=a(138),d=a(6),h=a(211),g=(a(274),a(332)),f=a(352),E=a(334),b=a(335),v=a(333),k=a(38),y=a(336),w=a(337),_=a(338),O=a(339),j=a(340),C=a(341),N=a(342),x=a(343),S=a(344),D=a(345),T=a(346),A=a(347),L=a(348),I=a(349),B=a(350),R=a(351),z=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,l=new Array(r),c=0;c<r;c++)l[c]=arguments[c];return(a=Object(o.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(l)))).state={open:!1},a.shareHandler=function(){a.setState({open:!0}),k.a.modalview("sharing ".concat(a.props.url)),k.a.event({category:"User",action:"Clicked share button",label:"SHARE_BUTTON_CLICKED"})},a.handleClose=function(){a.setState({open:!1})},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.props.title,a=this.props.url,n=this.state.liked?[e.likeButton]:[e.likeButton,e.notLiked];return s.a.createElement(s.a.Fragment,null,s.a.createElement(h.a,{title:"Share"},s.a.createElement(p.a,{size:"small",color:"primary",className:Object(m.a)(n),onClick:this.shareHandler},s.a.createElement(u.c,{className:e.iconSmall}))),s.a.createElement(g.a,{open:this.state.open,onClose:this.handleClose,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},s.a.createElement(v.a,{id:"alert-dialog-title"},t),s.a.createElement(E.a,null,s.a.createElement(b.a,{component:"div",id:"alert-dialog-description"},"Share on",s.a.createElement("div",{className:"Demo__container"},s.a.createElement("div",{className:"Demo__some-network"},s.a.createElement(y.a,{url:a,quote:t,className:"Demo__some-network__share-button"},s.a.createElement(w.a,{size:32,round:!0})),s.a.createElement(_.a,{url:a,className:"Demo__some-network__share-count"},function(e){return e})),s.a.createElement("div",{className:"Demo__some-network"},s.a.createElement(O.a,{url:a,title:t,className:"Demo__some-network__share-button"},s.a.createElement(j.a,{size:32,round:!0})),s.a.createElement("div",{className:"Demo__some-network__share-count"},"\xa0")),s.a.createElement("div",{className:"Demo__some-network"},s.a.createElement(C.a,{url:a,title:t,className:"Demo__some-network__share-button"},s.a.createElement(N.a,{size:32,round:!0})),s.a.createElement("div",{className:"Demo__some-network__share-count"},"\xa0")),s.a.createElement("div",{className:"Demo__some-network"},s.a.createElement(x.a,{url:a,title:t,separator:":: ",className:"Demo__some-network__share-button"},s.a.createElement(S.a,{size:32,round:!0})),s.a.createElement("div",{className:"Demo__some-network__share-count"},"\xa0")),s.a.createElement("div",{className:"Demo__some-network"},s.a.createElement(D.a,{url:a,windowWidth:750,windowHeight:600,className:"Demo__some-network__share-button"},s.a.createElement(T.a,{size:32,round:!0}))),s.a.createElement("div",{className:"Demo__some-network"},s.a.createElement(A.a,{url:a,title:t,windowWidth:660,windowHeight:460,className:"Demo__some-network__share-button"},s.a.createElement(L.a,{size:32,round:!0})),s.a.createElement(I.a,{url:a,className:"Demo__some-network__share-count"})),s.a.createElement("div",{className:"Demo__some-network"},s.a.createElement(B.a,{url:a,subject:t,body:"body",className:"Demo__some-network__share-button"},s.a.createElement(R.a,{size:32,round:!0})))))),s.a.createElement(f.a,null,s.a.createElement(p.a,{onClick:this.handleClose,color:"primary"},"Close"))))}}]),t}(s.a.Component);t.a=Object(d.a)(function(e){return{iconSmall:{marginRight:e.spacing(),fontSize:20},likeButton:{textTransform:"none",marginLeft:e.spacing()},notLiked:{color:"black"}}})(z)},189:function(e,t,a){"use strict";var n=a(14),r=a(15),o=a(17),i=a(16),l=a(18),c=a(1),s=a.n(c),u=a(52),m=a(5),p=a(138),d=a(6),h=a(98),g=a.n(h),f=a(90),E=a.n(f).a.create({baseURL:"https://codeilm.com/api/v1"}),b=a(145),v=a(204),k=a(211),y=a(86),w=a(38),_=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(o.a)(this,Object(i.a)(t).call(this,e))).likeHandler=function(){a.setState({loading:!0}),w.a.modalview("liked ".concat(a.state.tutorialId)),w.a.event({category:"User",action:"Clicked like button",label:"LIKE_BUTTON_CLICKED",value:a.state.liked?0:1});var e=Object(b.a)("csrftoken"),t={liked:!a.state.liked,tutorial_id:a.state.tutorialId};E.defaults.headers.common["X-CSRFToken"]=e,E.post("/tutorials/like",t).then(function(e){a.setState({liked:e.data.like_data.liked,likeCount:e.data.tutorial_like_data.count,likeUsers:e.data.tutorial_like_data.like_users,loading:!1})}).catch(function(e){})},a.state={liked:!!a.props.tutorial&&a.props.tutorial.liked_by_authenticated_user,tutorialId:a.props.tutorial?a.props.tutorial.id:null,likeCount:a.props.tutorial?a.props.tutorial.like_data.count:0,likeUsers:a.props.tutorial&&a.props.tutorial.like_data?a.props.tutorial.like_data.like_users:[],loading:!1},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.state.liked?[e.likeButton]:[e.likeButton,e.notLiked],a=this.state.likeUsers?this.state.likeUsers.map(function(t){return s.a.createElement(k.a,{key:t.id,classes:{tooltip:e.htmlTooltip},title:s.a.createElement(s.a.Fragment,null,s.a.createElement("div",null,s.a.createElement("h4",null,t.user.full_name),s.a.createElement("p",{style:{color:"grey"}},t.user.intro)))},s.a.createElement(v.a,{key:t.id,alt:t.user.full_name,src:t.user.user_profile_pic,className:e.avatar}))}):null;return s.a.createElement(s.a.Fragment,null,s.a.createElement(k.a,{title:this.state.likeCount?"Likes":"Like this"},s.a.createElement(p.a,{disabled:this.state.loading,size:"small",color:"primary",className:Object(m.a)(t),onClick:this.likeHandler},s.a.createElement(u.d,{className:e.iconSmall}),s.a.createElement(g.a,{value:this.state.likeCount,displayType:"text",thousandSeparator:!0,renderText:function(e){return s.a.createElement(s.a.Fragment,null,"0"!==e&&""!==e?e:"Like this")}}))),a)}}]),t}(s.a.Component);t.a=Object(d.a)(function(e){return{iconSmall:{marginRight:e.spacing(),fontSize:20},avatar:{margin:3,width:25,height:25},likeButton:{textTransform:"none",marginLeft:e.spacing()},notLiked:{color:"black"},htmlTooltip:{backgroundColor:e.palette.common.white,color:"rgba(0, 0, 0, 0.87)",boxShadow:e.shadows[1],maxWidth:220,fontSize:e.typography.pxToRem(12),border:"1px solid #dadde9","& b":{fontWeight:e.typography.fontWeightMedium},opacity:1}}})(Object(y.a)(_,E))},227:function(e,t,a){e.exports=a(323)},232:function(e,t,a){},274:function(e,t,a){},323:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(12),i=a.n(o),l=(a(232),a(14)),c=a(15),s=a(17),u=a(16),m=a(18),p=a(115),d=a(61),h=a(405),g=a(406),f=a(325),E=a(42),b=a(133),v=a(6),k=a(196),y=a.n(k),w=a(410),_=a(398),O=a(400),j=a(401),C=a(192),N=a.n(C),x=a(193),S=a.n(x),D=a(190),T=a.n(D),A=a(191),L=a.n(A),I=a(397),B=a(402),R=a(50),z={All:r.a.createElement(T.a,null),Create:r.a.createElement(L.a,null),HomeIcon:r.a.createElement(N.a,null),FitnessCenterIcon:r.a.createElement(S.a,null)},U=Object(v.a)({list:{width:250}})(function(e){var t=e.classes,a=e.listitems;return r.a.createElement("div",{className:t.list},r.a.createElement(I.a,null,a.map(function(e,t){return r.a.createElement(R.a,{to:e.link,key:e.key,style:{textDecoration:"None"}},r.a.createElement(_.a,{button:!0},r.a.createElement(O.a,null,z[e.icon]),r.a.createElement(j.a,{primary:e.text})))})),r.a.createElement(B.a,null))}),F=[{text:"All Stories",icon:"All",key:"all123",link:"/stories"},{text:"Create",icon:"Create",key:"create123",link:"/create"}],H=function(e){return r.a.createElement("div",null,r.a.createElement(w.a,{open:e.open,onClose:e.toggleDrawer(!1),onOpen:e.toggleDrawer(!0)},r.a.createElement("div",{tabIndex:0,role:"button",onClick:e.toggleDrawer(!1),onKeyDown:e.toggleDrawer(!1)},r.a.createElement(U,{listitems:F}))))},P=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={drawerOpen:!1},a.toggleDrawer=function(e){return function(){a.setState({drawerOpen:e})}},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(h.a,{elevation:0,position:"static"},r.a.createElement(g.a,null,r.a.createElement(f.a,{onClick:function(){return e.toggleDrawer(!0)()},className:t.menuButton,color:"inherit","aria-label":"Open drawer"},r.a.createElement(y.a,null)),r.a.createElement(E.a,{className:t.title,variant:"body1",color:"inherit",noWrap:!0},"Codeilm"))),r.a.createElement(H,{open:this.state.drawerOpen,toggleDrawer:this.toggleDrawer}))}}]),t}(r.a.Component),W=Object(v.a)(function(e){return{root:{width:"100%"},grow:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:20},title:{fontSize:25,display:"block"},search:Object(d.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(b.fade)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(b.fade)(e.palette.common.white,.25)},marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(),width:"auto"}),searchIcon:{width:e.spacing(9),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit",width:"100%"},inputInput:Object(d.a)({paddingTop:e.spacing(),paddingRight:e.spacing(),paddingBottom:e.spacing(),paddingLeft:e.spacing(10),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("sm"),{width:120,"&:focus":{width:200}})}})(P),M=a(79),V=a(86),q=a(72),G=a(152),K=a(37),X=a(170),J=a.n(X),$=a(96),Q=a(97),Y=a(189),Z=a(171),ee=a(52),te=a(138),ae=a(142),ne=a(173),re=a(85),oe=a(409),ie=Object(oe.a)(function(e){return{button:{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",height:e.spacing(7)},input:{display:"none"}}}),le=function(e){var t=ie();return r.a.createElement(R.a,{to:e.link},r.a.createElement(te.a,{variant:"contained",color:"primary",className:t.button},e.text))},ce=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={tutorials:[],loading:!0,error:null,pageNumber:null,count:0},a.fetchTutorials=function(){var e=a.state.pageNumber?"/tutorials/?page="+a.state.pageNumber:"/tutorials";M.a.get(e).then(function(e){a.setState(function(t){return{tutorials:t.tutorials.concat(e.data.results),loading:!1,pageNumber:e.data.next_page_number,count:e.data.count}})}).catch(function(e){console.log(e),a.setState({error:e,loading:!1})})},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.fetchTutorials()}},{key:"render",value:function(){var e=this,t=this.props.classes,a=r.a.createElement(J.a,{dataLength:this.state.tutorials.length,next:this.fetchTutorials,hasMore:this.state.pageNumber,loader:r.a.createElement($.a,null,r.a.createElement(Q.a,null))},this.state.tutorials.map(function(a,n){var o=a.repository_name?"/create/".concat(a.repository_name,"/").concat(a.id,"/").concat(a.slug,"/").concat(a.branch_name):"/create/new/".concat(a.id,"/").concat(a.slug),i=r.a.createElement(r.a.Fragment,null,r.a.createElement(Y.a,{tutorial:a}),r.a.createElement(Z.a,{tutorial:a}),r.a.createElement(ne.a,{url:"https://codeilm.com/stories/"+a.id+"/"+a.slug,title:a.title}),a.owner_is_authenticated_user?r.a.createElement(r.a.Fragment,null,r.a.createElement(te.a,{size:"small",color:"primary",className:t.metricsButton,onClick:function(){return e.props.history.push("/metrics/"+a.id+"/"+a.slug)}},r.a.createElement(ee.e,{className:t.iconSmall})," Metrics"),r.a.createElement(te.a,{size:"small",color:"primary",className:t.metricsButton,onClick:function(){return e.props.history.push(o)}},r.a.createElement(ee.b,{className:t.iconSmall})," Edit")):null),l=r.a.createElement(r.a.Fragment,null,r.a.createElement(G.a,{user:a.user}));return r.a.createElement(q.a,{headerVariant:"h5",key:a.id,link:"/stories/"+a.id+"/"+a.slug,content:l,actionButtons:i,title:a.title})}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(ae.a,{title:"Stories on Codeilm"}),r.a.createElement(re.a,{container:!0,spacing:0},r.a.createElement(re.a,{item:!0,xs:12,lg:9,sm:10},a),r.a.createElement(re.a,{item:!0,lg:3,sm:2},r.a.createElement("div",{className:t.coolButton},r.a.createElement(le,{text:"Create",link:"/create"})))))}}]),t}(r.a.Component),se=Object(V.a)(Object(K.f)(Object(v.a)(function(e){return{margin:{margin:e.spacing(2),marginRight:e.spacing(3)},metricsButton:{textTransform:"none",marginLeft:e.spacing()},iconSmall:{marginRight:e.spacing(),fontSize:20},coolButton:{marginLeft:e.spacing(2),marginTop:e.spacing(5)}}})(ce)),M.a,"list"),ue=a(46),me=function(e){return function(t){function a(){var e,t;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=Object(s.a)(this,(e=Object(u.a)(a)).call.apply(e,[this].concat(r)))).state={component:null},t}return Object(m.a)(a,t),Object(c.a)(a,[{key:"componentDidMount",value:function(){var t=this;e().then(function(e){t.setState({component:e.default})})}},{key:"render",value:function(){var e=this.state.component;return e?r.a.createElement(e,this.props):null}}]),a}(n.Component)},pe=me(function(){return Promise.all([a.e(19),a.e(16)]).then(a.bind(null,978))}),de=me(function(){return Promise.all([a.e(0),a.e(13)]).then(a.bind(null,979))}),he=me(function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(10),a.e(7)]).then(a.bind(null,993))}),ge=me(function(){return Promise.all([a.e(1),a.e(8),a.e(9)]).then(a.bind(null,984))}),fe=me(function(){return Promise.all([a.e(0),a.e(6),a.e(15)]).then(a.bind(null,985))}),Ee=me(function(){return Promise.all([a.e(11),a.e(12)]).then(a.bind(null,996))}),be=me(function(){return Promise.all([a.e(2),a.e(14)]).then(a.bind(null,989))});function ve(e){var t=e.component,a=e.isAuthenticated,n=Object(p.a)(e,["component","isAuthenticated"]);return r.a.createElement(K.a,Object.assign({},n,{render:function(e){return a?r.a.createElement(t,e):r.a.createElement(fe,e)}}))}var ke=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(W,null),r.a.createElement(K.c,null,r.a.createElement(K.a,{path:"/login",component:fe}),r.a.createElement(ve,{exact:!0,path:"/create/",component:de,isAuthenticated:this.props.isAuthenticated}),r.a.createElement(ve,{exact:!0,path:"/create/github",component:pe,isAuthenticated:this.props.isAuthenticated}),r.a.createElement(ve,{exact:!0,path:"/create/new",component:be,isAuthenticated:this.props.isAuthenticated}),r.a.createElement(ve,{exact:!0,path:"/create/new/:tutorialId/:tutorialSlug",component:he,isAuthenticated:this.props.isAuthenticated}),r.a.createElement(ve,{exact:!0,path:"/create/:repoName/:tutorialId/:tutorialSlug/:branchName",component:he,isAuthenticated:this.props.isAuthenticated}),r.a.createElement(ve,{exact:!0,path:"/create/:repoName",component:be,isAuthenticated:this.props.isAuthenticated}),r.a.createElement(K.a,{path:"/metrics/:tutorialId/:slug",component:Ee}),r.a.createElement(K.a,{path:"/stories/:tutorialId/:slug/:activeStep/:stepSlug",component:ge}),r.a.createElement(K.a,{path:"/stories/:tutorialId/:slug/:activeStep",component:ge}),r.a.createElement(K.a,{path:"/stories/:tutorialId/:slug/",component:ge}),r.a.createElement(K.a,{path:"/stories",component:se}),r.a.createElement(K.a,{render:function(){return r.a.createElement("h1",null,"404 page is yet to be found")}})))}}]),t}(r.a.Component),ye=Object(ue.b)(function(e){return{isAuthenticated:e.aReducer.authenticated}},null)(ke),we=a(38),_e=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){we.a.set({userId:this.props.userId})}},{key:"render",value:function(){return r.a.createElement(ye,null)}}]),t}(n.Component),Oe=Object(ue.b)(function(e){return{userId:e.aReducer.user?e.aReducer.user.id:""}},null)(_e);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var je=a(63),Ce=a(140),Ne=a(33),xe={repoData:null},Se=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:xe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Ne.e:return Object(Ce.a)({},e,{repoData:t.data})}return e},De=a(137),Te={authenticated:null,user:null,authLoading:!1,error:null},Ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Te,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Ne.c:return Object(De.a)({},e,{authLoading:!0,error:null});case Ne.d:return{authenticated:t.authenticated,user:t.user,authLoading:!1,error:null};case Ne.b:return{authenticated:"",user:null,authLoading:!1,error:null};case Ne.a:return Object(De.a)({},e,{error:t.error,authLoading:!1});default:return e}},Le=a(209),Ie=a(30);we.a.initialize("UA-142472289-1",{debug:!1});var Be=Object(Ie.a)();Be.listen(function(e){we.a.pageview(e.pathname+e.search)}),we.a.pageview("/stories");var Re=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||je.d,ze=Object(je.c)({rdReducer:Se,aReducer:Ae}),Ue=Object(je.e)(ze,Re(Object(je.a)(Le.a))),Fe=r.a.createElement(K.b,{basename:"/",history:Be},r.a.createElement(ue.a,{store:Ue},r.a.createElement(Oe,null)));i.a.render(Fe,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},33:function(e,t,a){"use strict";a.d(t,"e",function(){return n}),a.d(t,"c",function(){return r}),a.d(t,"d",function(){return o}),a.d(t,"b",function(){return i}),a.d(t,"a",function(){return l});var n="SET_REPO_DATA",r="AUTH_START",o="AUTH_SUCCESS",i="AUTH_LOGOUT",l="AUTH_FAIL"},72:function(e,t,a){"use strict";var n=a(61),r=a(1),o=a.n(r),i=a(6),l=a(330),c=a(329),s=a(331),u=a(328),m=a(327),p=a(42),d=a(50);t.a=Object(i.a)(function(e){return{card:Object(n.a)({maxWidth:"100%",margin:e.spacing(5)},e.breakpoints.down("xs"),{margin:e.spacing(2)}),media:{height:140},actionBtn:{marginLeft:e.spacing(2)},title:{marginLeft:16}}})(function(e){var t=e.classes,a=o.a.createElement(o.a.Fragment,null,e.image?o.a.createElement(m.a,{className:t.media,image:"/static/images/cards/contemplative-reptile.jpg",title:"Contemplative Reptile"}):null,o.a.createElement(u.a,{onClick:e.onClick},e.title?o.a.createElement(p.a,{className:t.title,gutterBottom:!0,variant:e.headerVariant?e.headerVariant:"h3",component:e.headerComponent?e.headerComponent:"h2"},e.title):null,o.a.createElement(p.a,{component:"div"},e.content))),n=e.link?o.a.createElement(c.a,null,o.a.createElement(d.a,{to:{pathname:e.link,search:e.search}},a)):a;return o.a.createElement(l.a,{className:t.card,elevation:e.elevation},n,e.actionButtons?o.a.createElement(s.a,{className:t.actionBtn},e.actionButtons):null)})},79:function(e,t,a){"use strict";var n=a(90),r=a.n(n).a.create({baseURL:"https://codeilm.com/api/v1"});t.a=r},86:function(e,t,a){"use strict";var n=a(14),r=a(15),o=a(17),i=a(16),l=a(18),c=a(1),s=a.n(c),u=a(150),m=a(96),p=a(106),d=function(){return s.a.createElement(p.a,{height:160,width:400,speed:2,primaryColor:"#f3f3f3",secondaryColor:"#ecebeb"},s.a.createElement("rect",{x:"54",y:"13",rx:"0",ry:"0",width:"306",height:"9"}),s.a.createElement("rect",{x:"110",y:"32",rx:"0",ry:"0",width:"202",height:"4"}),s.a.createElement("rect",{x:"49",y:"45",rx:"0",ry:"0",width:"316",height:"179"}))},h=a(97),g=a(151),f=a(6),E=a(408);var b=Object(f.a)({root:{flexGrow:1}})(function(e){var t=e.classes;return s.a.createElement("div",{className:t.root},s.a.createElement(E.a,null))}),v=a(46),k=a(154),y=a(37);t.a=function(e,t,a){var c=function(c){function p(){var e,t;Object(n.a)(this,p);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(t=Object(o.a)(this,(e=Object(i.a)(p)).call.apply(e,[this].concat(r)))).state={error:null,loading:null},t.hideErrorHandler=function(){t.setState({error:null})},t}return Object(l.a)(p,c),Object(r.a)(p,[{key:"componentWillMount",value:function(){var e=this;this.reqInterceptor=t.interceptors.request.use(function(t){return e.setState({error:null,loading:!0}),t},function(t){e.setState({error:t,loading:!1})}),this.resInterceptor=t.interceptors.response.use(function(t){return e.setState({loading:!1}),t},function(t){401===t.response.status||403===t.response.status?(e.props.onLogout(),e.props.history.push("/login/?next="+e.props.match.path)):e.setState({error:t,loading:!1})})}},{key:"componentWillUnmount",value:function(){t.interceptors.request.eject(this.reqInterceptor),t.interceptors.response.eject(this.resInterceptor)}},{key:"render",value:function(){var t=s.a.createElement(g.a,{left:s.a.createElement(m.a,null,s.a.createElement(d,null))});return t="list"==a?s.a.createElement(h.a,null):"circular"==a?s.a.createElement(b,null):"detail"==a?s.a.createElement(d,null):null,s.a.createElement(s.a.Fragment,null,t&&this.state.loading?t:null,this.state.error?this.state.error.message:null,this.state.error?s.a.createElement(u.a,{open:!0,type:"error",text:this.state.error.message}):null,this.state.error?null:s.a.createElement(e,this.props))}}]),p}(s.a.Component);return Object(v.b)(function(e){return{authenticated:e.aReducer.authenticated}},function(e){return{onLogout:function(){return e(k.b())}}})(Object(y.f)(c))}},96:function(e,t,a){"use strict";var n=a(1),r=a.n(n),o=a(6),i=a(64),l=a(85);t.a=Object(o.a)(function(e){return{root:{flexGrow:1,paddingTop:e.spacing(2)},paper:{padding:e.spacing(2),textAlign:"center"}}})(function(e){var t=e.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(l.a,{container:!0,spacing:0,justify:"center",alignItems:"center"},r.a.createElement(l.a,{item:!0,sm:12,xs:12},r.a.createElement(i.a,{elevation:0,className:t.paper},e.children))))})},97:function(e,t,a){"use strict";var n=a(106),r=a(1),o=a.n(r),i=a(72);t.a=function(){var e=o.a.createElement(n.a,{height:"155",width:"1793",speed:2,primaryColor:"#f3f3f3",secondaryColor:"#ecebeb"},o.a.createElement("rect",{x:"0",y:"18",rx:"0",ry:"0",width:"1500",height:"25"}),o.a.createElement("circle",{cx:"30",cy:"90",r:"25"}),o.a.createElement("rect",{x:"70",y:"70",rx:"0",ry:"0",width:"190",height:"8"}),o.a.createElement("rect",{x:"70",y:"90",rx:"0",ry:"0",width:"80",height:"6"}),o.a.createElement("rect",{x:"5",y:"140",rx:"0",ry:"0",width:"30",height:"13"}),o.a.createElement("rect",{x:"40",y:"140",rx:"0",ry:"0",width:"30",height:"13"}));return o.a.createElement(o.a.Fragment,null,o.a.createElement(i.a,{content:e}),o.a.createElement(i.a,{content:e}),o.a.createElement(i.a,{content:e}))}}},[[227,4,5]]]);
//# sourceMappingURL=main.0dcdd330.chunk.js.map