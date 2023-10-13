import{S as Q,i as W,s as X,e as U,b as G,E as j,h,o as Z,k as b,q as V,a as A,l as k,m as E,r as P,c as F,n as f,D as i,G as L,u as O,C as w}from"../chunks/index.b64d6e43.js";import{j as x,h as ee}from"../chunks/firebase.b4d57d33.js";import{b as H}from"../chunks/paths.adf63d3d.js";function z(c,t,r){const l=c.slice();return l[1]=t[r],l}function B(c,t,r){const l=c.slice();return l[4]=t[r],l}function te(c){let t,r,l,s,a;return{c(){t=b("h2"),r=V("You haven't ordered anything yet"),l=A(),s=b("a"),a=V("Start shopping"),this.h()},l(e){t=k(e,"H2",{class:!0});var o=E(t);r=P(o,"You haven't ordered anything yet"),o.forEach(h),l=F(e),s=k(e,"A",{href:!0,class:!0});var u=E(s);a=P(u,"Start shopping"),u.forEach(h),this.h()},h(){f(t,"class","orders__title svelte-d0bf4k"),f(s,"href",H+"/categories"),f(s,"class","btn start-shopping svelte-d0bf4k")},m(e,o){G(e,t,o),i(t,r),G(e,l,o),G(e,s,o),i(s,a)},p:j,d(e){e&&h(t),e&&h(l),e&&h(s)}}}function le(c){let t,r=c[0],l=[];for(let s=0;s<r.length;s+=1)l[s]=K(z(c,r,s));return{c(){t=b("div");for(let s=0;s<l.length;s+=1)l[s].c();this.h()},l(s){t=k(s,"DIV",{class:!0});var a=E(t);for(let e=0;e<l.length;e+=1)l[e].l(a);a.forEach(h),this.h()},h(){f(t,"class","orders svelte-d0bf4k")},m(s,a){G(s,t,a);for(let e=0;e<l.length;e+=1)l[e]&&l[e].m(t,null)},p(s,a){if(a&1){r=s[0];let e;for(e=0;e<r.length;e+=1){const o=z(s,r,e);l[e]?l[e].p(o,a):(l[e]=K(o),l[e].c(),l[e].m(t,null))}for(;e<l.length;e+=1)l[e].d(1);l.length=r.length}},d(s){s&&h(t),L(l,s)}}}function J(c){let t,r,l,s,a,e,o,u=c[4].name+"",D,y,q,m,I,C=c[4].price+"",S;return{c(){t=b("div"),r=b("img"),a=A(),e=b("div"),o=b("a"),D=V(u),q=A(),m=b("p"),I=V("$"),S=V(C),this.h()},l(p){t=k(p,"DIV",{class:!0});var v=E(t);r=k(v,"IMG",{class:!0,src:!0,alt:!0}),a=F(v),e=k(v,"DIV",{class:!0});var $=E(e);o=k($,"A",{class:!0,href:!0});var _=E(o);D=P(_,u),_.forEach(h),q=F($),m=k($,"P",{class:!0});var n=E(m);I=P(n,"$"),S=P(n,C),n.forEach(h),$.forEach(h),v.forEach(h),this.h()},h(){f(r,"class","product__img svelte-d0bf4k"),w(r.src,l=c[4].api_featured_image)||f(r,"src",l),f(r,"alt",s=c[4].name),f(o,"class","product__link svelte-d0bf4k"),f(o,"href",y=H+"/"+c[4].url),f(m,"class","product__price svelte-d0bf4k"),f(e,"class","product__details svelte-d0bf4k"),f(t,"class","product svelte-d0bf4k")},m(p,v){G(p,t,v),i(t,r),i(t,a),i(t,e),i(e,o),i(o,D),i(e,q),i(e,m),i(m,I),i(m,S)},p(p,v){v&1&&!w(r.src,l=p[4].api_featured_image)&&f(r,"src",l),v&1&&s!==(s=p[4].name)&&f(r,"alt",s),v&1&&u!==(u=p[4].name+"")&&O(D,u),v&1&&y!==(y=H+"/"+p[4].url)&&f(o,"href",y),v&1&&C!==(C=p[4].price+"")&&O(S,C)},d(p){p&&h(t)}}}function K(c){let t,r,l,s,a=c[1].orderId.slice(-8)+"",e,o,u,D,y,q,m,I,C,S=c[1].total+"",p,v,$=c[1].orderInfo,_=[];for(let n=0;n<$.length;n+=1)_[n]=J(B(c,$,n));return{c(){t=b("div"),r=b("div"),l=b("p"),s=V("Order №"),e=V(a),o=A(),u=b("p"),D=V("Completed"),y=A();for(let n=0;n<_.length;n+=1)_[n].c();q=A(),m=b("div"),I=b("p"),C=V("Total: $"),p=V(S),v=A(),this.h()},l(n){t=k(n,"DIV",{class:!0});var g=E(t);r=k(g,"DIV",{class:!0});var d=E(r);l=k(d,"P",{class:!0});var M=E(l);s=P(M,"Order №"),e=P(M,a),M.forEach(h),o=F(d),u=k(d,"P",{class:!0});var N=E(u);D=P(N,"Completed"),N.forEach(h),d.forEach(h),y=F(g);for(let Y=0;Y<_.length;Y+=1)_[Y].l(g);q=F(g),m=k(g,"DIV",{class:!0});var R=E(m);I=k(R,"P",{class:!0});var T=E(I);C=P(T,"Total: $"),p=P(T,S),T.forEach(h),R.forEach(h),v=F(g),g.forEach(h),this.h()},h(){f(l,"class","orders__num svelte-d0bf4k"),f(u,"class","orders__status svelte-d0bf4k"),f(r,"class","orders__info svelte-d0bf4k"),f(I,"class","total__sum svelte-d0bf4k"),f(m,"class","total svelte-d0bf4k"),f(t,"class","orders__order svelte-d0bf4k")},m(n,g){G(n,t,g),i(t,r),i(r,l),i(l,s),i(l,e),i(r,o),i(r,u),i(u,D),i(t,y);for(let d=0;d<_.length;d+=1)_[d]&&_[d].m(t,null);i(t,q),i(t,m),i(m,I),i(I,C),i(I,p),i(t,v)},p(n,g){if(g&1&&a!==(a=n[1].orderId.slice(-8)+"")&&O(e,a),g&1){$=n[1].orderInfo;let d;for(d=0;d<$.length;d+=1){const M=B(n,$,d);_[d]?_[d].p(M,g):(_[d]=J(M),_[d].c(),_[d].m(t,q))}for(;d<_.length;d+=1)_[d].d(1);_.length=$.length}g&1&&S!==(S=n[1].total+"")&&O(p,S)},d(n){n&&h(t),L(_,n)}}}function se(c){let t;function r(a,e){return a[0].length?le:te}let l=r(c),s=l(c);return{c(){s.c(),t=U()},l(a){s.l(a),t=U()},m(a,e){s.m(a,e),G(a,t,e)},p(a,[e]){l===(l=r(a))&&s?s.p(a,e):(s.d(1),s=l(a),s&&(s.c(),s.m(t.parentNode,t)))},i:j,o:j,d(a){s.d(a),a&&h(t)}}}function re(c,t,r){let l=[];return Z(()=>{const s=localStorage.getItem("uid");x(ee).then(a=>{let e=[];a.docs.forEach(o=>{if(o.data().userId===s){const u=+o.data().orderInfo.reduce((D,y)=>D+ +y.price,0).toFixed(2);e.push({...o.data(),orderId:o.id,total:u})}}),r(0,l=e)})}),c.$$.update=()=>{c.$$.dirty&1&&console.log(l)},[l]}class ie extends Q{constructor(t){super(),W(this,t,re,se,X,{})}}export{ie as default};
