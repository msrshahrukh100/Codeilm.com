(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{988:function(e,t,a){"use strict";a.r(t);var n=a(15),r=a(16),o=a(19),s=a(17),i=a(18),c=a(1),u=a.n(c),l=a(75),p=a(85),h=a(142),f=a(169),d=a.n(f),b=a(81),m=a(96),k=a(35),g=a(69),j=a(151),O=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,i=new Array(r),c=0;c<r;c++)i[c]=arguments[c];return(a=Object(o.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(i)))).state={userrepositories:[],links:{},pageNumber:0,loading:!0,hasMoreRepo:!1,error:null},a.fetchRepositories=function(){l.a.defaults.headers.common.Authorization="JWT ".concat(localStorage.getItem("token")),l.a.get("/userrepositories/"+a.state.pageNumber).then(function(e){e&&a.setState(function(t){return{userrepositories:t.userrepositories.concat(e.data.data),links:e.data.links,loading:!1,hasMoreRepo:!!e.data.links.next,pageNumber:e.data.links.next?e.data.links.next:-1}})}).catch(function(e){a.setState({error:e,loading:!1})})},a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.fetchRepositories()}},{key:"render",value:function(){var e=this;return u.a.createElement(d.a,{dataLength:this.state.userrepositories.length,next:this.fetchRepositories,hasMore:this.state.hasMoreRepo,loader:u.a.createElement(b.a,null,u.a.createElement(m.a,null))},this.state.userrepositories.map(function(t){return u.a.createElement(h.a,{key:t.id,onClick:function(){return e.props.setRepoData(t)},link:"/create/"+t.name,search:"?branch_name="+t.default_branch,title:t.name})}))}}]),t}(u.a.Component);t.default=Object(p.a)(Object(k.f)(Object(g.b)(null,function(e){return{setRepoData:function(t){return e(j.c(t))}}})(O)),l.a,"list")}}]);
//# sourceMappingURL=16.44555241.chunk.js.map