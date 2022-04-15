export const categoryMap = {"category":{"/":{"path":"/category/","map":{"影评":{"path":"/category/%E5%BD%B1%E8%AF%84/","keys":["v-3e3a3245"]},"杂文":{"path":"/category/%E6%9D%82%E6%96%87/","keys":["v-3e3a3245"]},"目录":{"path":"/category/%E7%9B%AE%E5%BD%95/","keys":["v-7c80db8b","v-06198984","v-72d11f44","v-cff06f90"]},"前端":{"path":"/category/%E5%89%8D%E7%AB%AF/","keys":["v-3dcc4a03","v-1b02705b","v-e69a52e0","v-39063b44"]},"编程语言":{"path":"/category/%E7%BC%96%E7%A8%8B%E8%AF%AD%E8%A8%80/","keys":["v-3dcc4a03"]},"工具":{"path":"/category/%E5%B7%A5%E5%85%B7/","keys":["v-1b02705b","v-e69a52e0","v-39063b44"]}}}},"tag":{"/":{"path":"/tag/","map":{"飞越疯人院":{"path":"/tag/%E9%A3%9E%E8%B6%8A%E7%96%AF%E4%BA%BA%E9%99%A2/","keys":["v-3e3a3245"]},"回忆":{"path":"/tag/%E5%9B%9E%E5%BF%86/","keys":["v-3e3a3245"]},"前端":{"path":"/tag/%E5%89%8D%E7%AB%AF/","keys":["v-3dcc4a03","v-1b02705b","v-e69a52e0","v-39063b44"]},"JavaScript":{"path":"/tag/javascript/","keys":["v-3dcc4a03"]},"HTTP":{"path":"/tag/http/","keys":["v-1b02705b"]},"Axios":{"path":"/tag/axios/","keys":["v-1b02705b"]},"ESLint":{"path":"/tag/eslint/","keys":["v-e69a52e0"]},"Prettier":{"path":"/tag/prettier/","keys":["v-e69a52e0"]},"VuePress":{"path":"/tag/vuepress/","keys":["v-39063b44"]},"Vue":{"path":"/tag/vue/","keys":["v-39063b44"]},"Vite":{"path":"/tag/vite/","keys":["v-39063b44"]},"TypeScript":{"path":"/tag/typescript/","keys":["v-39063b44"]}}}}}

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
