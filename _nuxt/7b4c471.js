(window.webpackJsonp=window.webpackJsonp||[]).push([[5,2,3],{266:function(t,e,r){"use strict";var n=r(13),o=r(1),l=r(3),c=r(104),f=r(19),d=r(14),m=r(193),_=r(37),v=r(103),y=r(192),h=r(5),w=r(80).f,N=r(32).f,x=r(18).f,k=r(267),I=r(195).trim,z="Number",E=o.Number,j=E.prototype,C=o.TypeError,S=l("".slice),A=l("".charCodeAt),D=function(t){var e=y(t,"number");return"bigint"==typeof e?e:O(e)},O=function(t){var e,r,n,o,l,c,f,code,d=y(t,"number");if(v(d))throw C("Cannot convert a Symbol value to a number");if("string"==typeof d&&d.length>2)if(d=I(d),43===(e=A(d,0))||45===e){if(88===(r=A(d,2))||120===r)return NaN}else if(48===e){switch(A(d,1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+d}for(c=(l=S(d,2)).length,f=0;f<c;f++)if((code=A(l,f))<48||code>o)return NaN;return parseInt(l,n)}return+d};if(c(z,!E(" 0o1")||!E("0b1")||E("+0x1"))){for(var P,T=function(t){var e=arguments.length<1?0:E(D(t)),r=this;return _(j,r)&&h((function(){k(r)}))?m(Object(e),r,T):e},L=n?w(E):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),F=0;L.length>F;F++)d(E,P=L[F])&&!d(T,P)&&x(T,P,N(E,P));T.prototype=j,j.constructor=T,f(o,z,T)}},267:function(t,e,r){var n=r(3);t.exports=n(1..valueOf)},268:function(t,e,r){"use strict";r.r(e);var n={name:"Hero"},o=r(17),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"px-4 md:px-0"},[r("p",{staticClass:"w-5/6 md:w-3/5"},[t._v("Cześć! Jestem Sebastian 'Zboru' Zborowski i witam na moim blogu! Przeczytasz tutaj o mojej podróży przez kolejne linijki kodu oraz jak rozwiązałem wiele problemów podczas pracy\n    nad kolejnym `Hello World`. ")]),t._v(" "),r("p",{staticClass:"mt-4"},[t._v("Moje postępy możesz sprawdzić wchodząc na "),r("a",{staticClass:"text-indigo-600 dark:text-indigo-400",attrs:{href:"https://github.com/zboru",target:"_blank"}},[t._v("GitHub")])])])}],!1,null,null,null);e.default=component.exports},269:function(t,e,r){"use strict";r.r(e);r(266);var n={name:"Post",props:{link:{type:String,default:"/"},title:{type:String,default:"Post"},date:{type:Number,default:(new Date).getTime()},description:{type:String,default:"Description"}},computed:{getLocalizedDate:function(){return new Date(this.date).toLocaleDateString("pl",{day:"numeric",month:"long",year:"numeric"})}}},o=r(17),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"flex flex-col py-6 px-4"},[r("NuxtLink",{staticClass:"container",attrs:{to:t.link}},[r("span",[t._v(t._s(t.getLocalizedDate))]),t._v(" "),r("h2",{staticClass:"text-3xl font-semibold my-1"},[t._v(t._s(t.title))]),t._v(" "),r("p",[t._v(t._s(t.description))]),t._v(" "),r("span",{staticClass:"text-gray-500 font-semibold text-sm text-indigo-600 dark:text-indigo-400"},[t._v("Czytaj więcej ¬")])])],1)}),[],!1,null,null,null);e.default=component.exports},282:function(t,e,r){"use strict";r.r(e);var n=r(8),o=(r(46),r(268)),l={components:{Post:r(269).default,Hero:o.default},layout:"Default",asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$content,e.next=3,r().only(["title","description","image","slug","author"]).sortBy("createdAt","asc").fetch();case 3:return n=e.sent,e.abrupt("return",{articles:n});case 5:case"end":return e.stop()}}),e)})))()}},c=r(17),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("Hero",{staticClass:"container mb-8"}),t._v(" "),t._l(t.articles,(function(article,t){return[r("Post",{key:article.slug,class:{"post-background":t%2==0},attrs:{link:article.slug,title:article.title,description:article.description}})]}))],2)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Hero:r(268).default,Post:r(269).default})}}]);