export const data = {
  "key": "v-06198984",
  "path": "/frontend/",
  "title": "前端",
  "lang": "zh-CN",
  "frontmatter": {
    "icon": "template",
    "category": [
      "目录"
    ],
    "summary": "前端 所有前端相关的文章都会在这里展示 前端工具; VuePress;",
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
          "content": "前端"
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
    "minutes": 0.1,
    "words": 29
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
