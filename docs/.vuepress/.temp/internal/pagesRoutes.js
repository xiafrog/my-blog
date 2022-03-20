import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"博客主页","icon":"home","type":"home","readingTime":{"minutes":0,"words":0},"excerpt":""},["/index.html","/README.md"]],
  ["v-06198984","/frontend/",{"title":"目录","type":"article","readingTime":{"minutes":0.08,"words":23},"excerpt":"目录 所有前端相关的文章都会在这里展示 工具;"},["/frontend/index.html","/frontend/README.md"]],
  ["v-cff06f90","/frontend/tools/",{"title":"目录","type":"article","readingTime":{"minutes":0.05,"words":14},"excerpt":"目录 前端所使用到的工具 VuePress;"},["/frontend/tools/index.html","/frontend/tools/README.md"]],
  ["v-39063b44","/frontend/tools/vuepress.html",{"title":"VuePress初体验","icon":"vue","type":"article","readingTime":{"minutes":3.88,"words":1163},"excerpt":"VuePress初体验 起因 最近因为找实习和做项目的原因，接触了很多新知识，想着需要有一个地方来记录自己学到的只是，因此就想着搭建一个个人的博客。 因为本身是做前端开发的，所以动态网站对我来说就有些复杂了，服务器的配置、Java环境的搭建对我来说都很有难度，那些动态的功能我也都用不到。最后，我选择做一个静态网站。 最近在学Vue，就顺理成章地想到了VueP","category":["前端","工具"],"tag":["前端","VuePress","Vue","Vite","TypeScript"],"star":true},["/frontend/tools/vuepress","/frontend/tools/vuepress.md"]],
  ["v-3706649a","/404.html",{"title":"","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/404"]],
  ["v-5bc93818","/category/",{"title":"分类","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/index.html"]],
  ["v-744d024e","/tag/",{"title":"标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/index.html"]],
  ["v-e52c881c","/article/",{"title":"文章","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/article/index.html"]],
  ["v-75ed4ea4","/encrypted/",{"title":"加密","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/encrypted/index.html"]],
  ["v-2897d318","/slides/",{"title":"幻灯片","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/slides/index.html"]],
  ["v-154dc4c4","/star/",{"title":"收藏","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/star/index.html"]],
  ["v-01560935","/timeline/",{"title":"时间轴","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/timeline/index.html"]],
  ["v-e9c7e408","/category/%E5%89%8D%E7%AB%AF/",{"title":"前端 分类","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/前端/","/category/%E5%89%8D%E7%AB%AF/index.html"]],
  ["v-95f987f4","/tag/%E5%89%8D%E7%AB%AF/",{"title":"前端 标签","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/前端/","/tag/%E5%89%8D%E7%AB%AF/index.html"]],
  ["v-14145d44","/category/%E5%B7%A5%E5%85%B7/",{"title":"工具 分类","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/工具/","/category/%E5%B7%A5%E5%85%B7/index.html"]],
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
