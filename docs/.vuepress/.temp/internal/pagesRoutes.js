import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"博客主页","icon":"home","type":"home","readingTime":{"minutes":0,"words":0},"excerpt":""},["/index.html","/README.md"]],
  ["v-3e3a3245","/essay/One_Flew_Over_the_Cuckoos_Nest.html",{"title":"飞越疯人院","icon":"comment","type":"article","readingTime":{"minutes":7.58,"words":2275},"excerpt":"飞越疯人院 \" 麦克墨菲（杰克·尼科尔森 Jack Nicholson 饰）为了逃避监狱里的强制劳动，装作精神异常，被送进了精神病院，他的到来，给死气沉沉的精神病院带来了剧烈的冲击。 麦克要求看棒球比赛的电视转播，挑战了医院严格的管理制度，受到护士长拉契特（路易丝·弗莱彻 Louise Fletcher 饰）的百般阻挠；麦克带领病人出海捕鱼，振奋了他们的精神","category":["影评","杂文"],"tag":["电影","回忆"],"star":true,"isEncrypted":true},["/essay/One_Flew_Over_the_Cuckoos_Nest","/essay/One_Flew_Over_the_Cuckoos_Nest.md"]],
  ["v-7c80db8b","/essay/",{"title":"杂文","icon":"blog","type":"article","readingTime":{"minutes":0.09,"words":28},"excerpt":"杂文 平时有什么想说的话，都在这里啦，有点乱，见谅。 飞越疯人院;","category":["目录"],"isEncrypted":true},["/essay/index.html","/essay/README.md"]],
  ["v-06198984","/frontend/",{"title":"前端","icon":"template","type":"article","readingTime":{"minutes":0.16,"words":48},"excerpt":"前端 所有前端相关的文章都会在这里展示 前端工具; VuePress; ESLint; Axios; JavaScript; JS小技巧;","category":["目录"]},["/frontend/index.html","/frontend/README.md"]],
  ["v-72d11f44","/frontend/javascript/",{"title":"JavaScript","icon":"javascript","type":"article","readingTime":{"minutes":0.05,"words":14},"excerpt":"JavaScript JavaScript语言相关知识 JS小技巧;","category":["目录"]},["/frontend/javascript/index.html","/frontend/javascript/README.md"]],
  ["v-3dcc4a03","/frontend/javascript/tips.html",{"title":"JS小技巧","icon":"creative","type":"article","readingTime":{"minutes":2.56,"words":767},"excerpt":"JS小技巧 ES6推出后，JS多了很多新特性，让我们之前需要些很多代码才能实现的功能，用简单的方式就能够代替。这篇文章总结了一些平时会用到的JS小技巧。 用??来判断null或undefined 提出问题 当我们想要引用一个对象的属性时，例如object.property，如果property不存在，则会返回undefined，就会造成许多不必要的麻烦。 比","category":["前端","编程语言"],"tag":["前端","JavaScript"],"star":true},["/frontend/javascript/tips","/frontend/javascript/tips.md"]],
  ["v-1b02705b","/frontend/tools/axios.html",{"title":"Axios封装","icon":"stack","type":"article","readingTime":{"minutes":6.38,"words":1915},"excerpt":"Axios封装 Axios是前端中很常用的基于Promise的网络请求库，它封装了原生的XMLHttpRequests，可以添加各种配置和拦截器。 但是在日常使用中，我们通常会对Axios进行封装，引入一些自定义的配置，避免每次请求时，都需要写一遍配置。本文基于TypeScript + Vue3 + Vite的场景，对Axios进行了封装。 目标 我们需要将","category":["前端","工具"],"tag":["前端","HTTP","Axios"],"star":true},["/frontend/tools/axios","/frontend/tools/axios.md"]],
  ["v-e69a52e0","/frontend/tools/eslint.html",{"title":"ESLint","icon":"linter","type":"article","readingTime":{"minutes":2.3,"words":690},"excerpt":"ESLint \" Lint（Linter）是一种静态代码分析工具，用于标记代码中某些编码错误、风格问题和不具结构性（易导致 bug）的代码。简单理解就是一个代码检查器，检查目标代码是否符合语法和规定的风格习惯。\" \"\" \" ESLint 是基于 ECMAScript/JavaScript 语法的 Lint，能够：\" \"\" \" - 查出JavaScript代码","category":["前端","工具"],"tag":["前端","ESLint","Prettier"],"star":true},["/frontend/tools/eslint","/frontend/tools/eslint.md"]],
  ["v-cff06f90","/frontend/tools/",{"title":"前端工具","icon":"tool","type":"article","readingTime":{"minutes":0.08,"words":23},"excerpt":"前端工具 前端所使用到的工具/库 VuePress; ESLint; Axios;","category":["目录"]},["/frontend/tools/index.html","/frontend/tools/README.md"]],
  ["v-39063b44","/frontend/tools/vuepress.html",{"title":"VuePress初体验","icon":"vue","type":"article","readingTime":{"minutes":5.15,"words":1545},"excerpt":"VuePress初体验 起因 最近因为找实习和做项目的原因，接触了很多新知识，想着需要有一个地方来记录自己学到的只是，因此就想着搭建一个个人的博客。 因为本身是做前端开发的，所以动态网站对我来说就有些复杂了，服务器的配置、Java环境的搭建对我来说都很有难度，那些动态的功能我也都用不到。最后，我选择做一个静态网站。 最近在学Vue，就顺理成章地想到了VueP","category":["前端","工具"],"tag":["前端","VuePress","Vue","Vite","TypeScript"],"star":true},["/frontend/tools/vuepress","/frontend/tools/vuepress.md"]],
  ["v-3706649a","/404.html",{"title":"","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/404"]],
  ["v-5bc93818","/category/",{"title":"分类","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/index.html"]],
  ["v-744d024e","/tag/",{"title":"标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/index.html"]],
  ["v-e52c881c","/article/",{"title":"文章","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/article/index.html"]],
  ["v-75ed4ea4","/encrypted/",{"title":"加密","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/encrypted/index.html"]],
  ["v-2897d318","/slides/",{"title":"幻灯片","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/slides/index.html"]],
  ["v-154dc4c4","/star/",{"title":"收藏","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/star/index.html"]],
  ["v-01560935","/timeline/",{"title":"时间轴","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/timeline/index.html"]],
  ["v-6a4676aa","/category/%E5%BD%B1%E8%AF%84/",{"title":"影评 分类","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/影评/","/category/%E5%BD%B1%E8%AF%84/index.html"]],
  ["v-21c8ac3c","/tag/%E9%A3%9E%E8%B6%8A%E7%96%AF%E4%BA%BA%E9%99%A2/",{"title":"飞越疯人院 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/飞越疯人院/","/tag/%E9%A3%9E%E8%B6%8A%E7%96%AF%E4%BA%BA%E9%99%A2/index.html"]],
  ["v-083981f8","/category/%E6%9D%82%E6%96%87/",{"title":"杂文 分类","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/杂文/","/category/%E6%9D%82%E6%96%87/index.html"]],
  ["v-632863ac","/tag/%E5%9B%9E%E5%BF%86/",{"title":"回忆 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/回忆/","/tag/%E5%9B%9E%E5%BF%86/index.html"]],
  ["v-f96d488c","/category/%E7%9B%AE%E5%BD%95/",{"title":"目录 分类","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/目录/","/category/%E7%9B%AE%E5%BD%95/index.html"]],
  ["v-95f987f4","/tag/%E5%89%8D%E7%AB%AF/",{"title":"前端 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/前端/","/tag/%E5%89%8D%E7%AB%AF/index.html"]],
  ["v-e9c7e408","/category/%E5%89%8D%E7%AB%AF/",{"title":"前端 分类","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/前端/","/category/%E5%89%8D%E7%AB%AF/index.html"]],
  ["v-3b951558","/tag/javascript/",{"title":"JavaScript 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/javascript/index.html"]],
  ["v-3df94dfd","/category/%E7%BC%96%E7%A8%8B%E8%AF%AD%E8%A8%80/",{"title":"编程语言 分类","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/编程语言/","/category/%E7%BC%96%E7%A8%8B%E8%AF%AD%E8%A8%80/index.html"]],
  ["v-288e4719","/tag/http/",{"title":"HTTP 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/http/index.html"]],
  ["v-14145d44","/category/%E5%B7%A5%E5%85%B7/",{"title":"工具 分类","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/工具/","/category/%E5%B7%A5%E5%85%B7/index.html"]],
  ["v-4507db72","/tag/axios/",{"title":"Axios 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/axios/index.html"]],
  ["v-c5832ae0","/tag/eslint/",{"title":"ESLint 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/eslint/index.html"]],
  ["v-41b09724","/tag/prettier/",{"title":"Prettier 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/prettier/index.html"]],
  ["v-ed16b278","/tag/vuepress/",{"title":"VuePress 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/vuepress/index.html"]],
  ["v-b302da92","/tag/vue/",{"title":"Vue 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/vue/index.html"]],
  ["v-294e8ebd","/tag/vite/",{"title":"Vite 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/vite/index.html"]],
  ["v-801db588","/tag/typescript/",{"title":"TypeScript 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/typescript/index.html"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
