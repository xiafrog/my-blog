export const categoryMap = {"category":{"/":{"path":"/category/","map":{"前端":{"path":"/category/%E5%89%8D%E7%AB%AF/","keys":["v-39063b44"]},"工具":{"path":"/category/%E5%B7%A5%E5%85%B7/","keys":["v-39063b44"]}}}},"tag":{"/":{"path":"/tag/","map":{"前端":{"path":"/tag/%E5%89%8D%E7%AB%AF/","keys":["v-39063b44"]},"VuePress":{"path":"/tag/vuepress/","keys":["v-39063b44"]},"Vue":{"path":"/tag/vue/","keys":["v-39063b44"]},"Vite":{"path":"/tag/vite/","keys":["v-39063b44"]},"TypeScript":{"path":"/tag/typescript/","keys":["v-39063b44"]}}}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogCategory) {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ categoryMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  })
}
