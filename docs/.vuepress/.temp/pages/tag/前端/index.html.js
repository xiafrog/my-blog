export const data = {
  "key": "v-95f987f4",
  "path": "/tag/%E5%89%8D%E7%AB%AF/",
  "title": "前端 标签",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "前端 标签",
    "blog": {
      "type": "category",
      "name": "前端",
      "key": "tag"
    },
    "layout": "Blog",
    "summary": "",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "https://xiafrog.github.io/my-blog/my-blog/tag/%E5%89%8D%E7%AB%AF/"
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
          "content": "前端 标签"
        }
      ],
      [
        "meta",
        {
          "property": "og:type",
          "content": "website"
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
    "minutes": 0,
    "words": 0
  },
  "filePathRelative": null
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
