export const categoryMap = {"category":{"/":{"path":"/category/","map":{"前端":{"path":"/category/%E5%89%8D%E7%AB%AF/","keys":["v-0401e826"]},"工具":{"path":"/category/%E5%B7%A5%E5%85%B7/","keys":["v-0401e826"]}}}},"tag":{"/":{"path":"/tag/","map":{"前端":{"path":"/tag/%E5%89%8D%E7%AB%AF/","keys":["v-0401e826"]},"VuePress":{"path":"/tag/vuepress/","keys":["v-0401e826"]},"Vue":{"path":"/tag/vue/","keys":["v-0401e826"]},"Vite":{"path":"/tag/vite/","keys":["v-0401e826"]},"TypeScript":{"path":"/tag/typescript/","keys":["v-0401e826"]}}}}}

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
