export const searchIndex = [
  {
    "title": "博客主页",
    "headers": [],
    "path": "/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "前端",
    "headers": [
      {
        "level": 2,
        "title": "目录",
        "slug": "目录",
        "children": []
      }
    ],
    "path": "/frontend/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "工具",
    "headers": [
      {
        "level": 2,
        "title": "目录",
        "slug": "目录",
        "children": []
      }
    ],
    "path": "/frontend/tools/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "VuePress初体验",
    "headers": [
      {
        "level": 2,
        "title": "起因",
        "slug": "起因",
        "children": []
      },
      {
        "level": 2,
        "title": "初步搭建",
        "slug": "初步搭建",
        "children": []
      },
      {
        "level": 2,
        "title": "部署",
        "slug": "部署",
        "children": []
      },
      {
        "level": 2,
        "title": "配置主题",
        "slug": "配置主题",
        "children": [
          {
            "level": 3,
            "title": "初始化",
            "slug": "初始化",
            "children": []
          },
          {
            "level": 3,
            "title": "配置",
            "slug": "配置",
            "children": []
          }
        ]
      }
    ],
    "path": "/frontend/tools/vuepress.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "",
    "headers": [],
    "path": "/404.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "分类",
    "headers": [],
    "path": "/category/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "标签",
    "headers": [],
    "path": "/tag/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "文章",
    "headers": [],
    "path": "/article/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "加密",
    "headers": [],
    "path": "/encrypted/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "幻灯片",
    "headers": [],
    "path": "/slides/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "收藏",
    "headers": [],
    "path": "/star/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "时间轴",
    "headers": [],
    "path": "/timeline/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "前端 分类",
    "headers": [],
    "path": "/category/%E5%89%8D%E7%AB%AF/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "前端 标签",
    "headers": [],
    "path": "/tag/%E5%89%8D%E7%AB%AF/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "工具 分类",
    "headers": [],
    "path": "/category/%E5%B7%A5%E5%85%B7/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "VuePress 标签",
    "headers": [],
    "path": "/tag/vuepress/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "Vue 标签",
    "headers": [],
    "path": "/tag/vue/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "Vite 标签",
    "headers": [],
    "path": "/tag/vite/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "TypeScript 标签",
    "headers": [],
    "path": "/tag/typescript/",
    "pathLocale": "/",
    "extraFields": []
  }
]

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSearchIndex) {
    __VUE_HMR_RUNTIME__.updateSearchIndex(searchIndex)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ searchIndex }) => {
    __VUE_HMR_RUNTIME__.updateSearchIndex(searchIndex)
  })
}
