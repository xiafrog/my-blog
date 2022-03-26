export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-06198984","v-72d11f44","v-3dcc4a03","v-1b02705b","v-e69a52e0","v-cff06f90","v-39063b44"]}},"encrypted":{"/":{"path":"/encrypted/","keys":[]}},"slide":{"/":{"path":"/slides/","keys":[]}},"star":{"/":{"path":"/star/","keys":["v-3dcc4a03","v-1b02705b","v-e69a52e0","v-39063b44"]}},"timeline":{"/":{"path":"/timeline/","keys":[]}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogType) {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  })
}
