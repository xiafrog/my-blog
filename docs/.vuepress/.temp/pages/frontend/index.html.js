export const data = {
  "key": "v-06198984",
  "path": "/frontend/",
  "title": "目录",
  "lang": "zh-CN",
  "frontmatter": {
    "summary": "目录 所有前端相关的文章都会在这里展示 工具;",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "https://xiafrog.github.io/my-blog/my-blog/frontend/"
        }
      ],
      [
        "meta",
        {
          "property": "og:site_name",
          "content": "鱼塘"
        }
      ],
      [
        "meta",
        {
          "property": "og:title",
          "content": "目录"
        }
      ],
      [
        "meta",
        {
          "property": "og:type",
          "content": "article"
        }
      ],
      [
        "meta",
        {
          "property": "og:locale",
          "content": "zh-CN"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [],
  "readingTime": {
    "minutes": 0.08,
    "words": 23
  },
  "filePathRelative": "frontend/README.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
