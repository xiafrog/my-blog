export const data = {
  "key": "v-1b02705b",
  "path": "/frontend/tools/axios.html",
  "title": "Axios封装",
  "lang": "zh-CN",
  "frontmatter": {
    "icon": "stack",
    "category": [
      "前端",
      "工具"
    ],
    "tag": [
      "前端",
      "HTTP",
      "Axios"
    ],
    "star": true,
    "summary": "Axios封装 Axios是前端中很常用的基于Promise的网络请求库，它封装了原生的XMLHttpRequests，可以添加各种配置和拦截器。 但是在日常使用中，我们通常会对Axios进行封装，引入一些自定义的配置，避免每次请求时，都需要写一遍配置。本文基于TypeScript + Vue3 + Vite的场景，对Axios进行了封装。 目标 我们需要将",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "https://xiafrog.github.io/my-blog/my-blog/frontend/tools/axios.html"
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
          "content": "Axios封装"
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
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "前端"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "HTTP"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Axios"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "目标",
      "slug": "目标",
      "children": []
    },
    {
      "level": 2,
      "title": "准备",
      "slug": "准备",
      "children": []
    },
    {
      "level": 2,
      "title": "初步封装",
      "slug": "初步封装",
      "children": []
    },
    {
      "level": 2,
      "title": "设置数据类型",
      "slug": "设置数据类型",
      "children": []
    },
    {
      "level": 2,
      "title": "全局拦截",
      "slug": "全局拦截",
      "children": []
    },
    {
      "level": 2,
      "title": "实例拦截",
      "slug": "实例拦截",
      "children": []
    },
    {
      "level": 2,
      "title": "单个请求拦截",
      "slug": "单个请求拦截",
      "children": []
    },
    {
      "level": 2,
      "title": "get、post等方法的封装",
      "slug": "get、post等方法的封装",
      "children": []
    },
    {
      "level": 2,
      "title": "完整代码",
      "slug": "完整代码",
      "children": []
    }
  ],
  "readingTime": {
    "minutes": 6.38,
    "words": 1915
  },
  "filePathRelative": "frontend/tools/axios.md"
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
