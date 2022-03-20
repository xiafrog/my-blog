export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "博客主页",
  "lang": "zh-CN",
  "frontmatter": {
    "home": true,
    "layout": "Blog",
    "icon": "home",
    "title": "博客主页",
    "heroText": "鱼塘",
    "bgImage": "/background.jpg",
    "heroFullScreen": true,
    "tagline": "俞浩然的个人博客",
    "footer": "鱼塘——俞浩然的个人博客",
    "summary": "",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "https://xiafrog.github.io/my-blog/my-blog/"
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
          "content": "博客主页"
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
  "filePathRelative": "README.md"
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
