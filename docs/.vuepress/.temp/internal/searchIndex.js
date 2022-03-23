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
    "headers": [],
    "path": "/frontend/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "JavaScript",
    "headers": [],
    "path": "/frontend/javascript/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "JS小技巧",
    "headers": [
      {
        "level": 2,
        "title": "用??来判断null或undefined",
        "slug": "用-来判断null或undefined",
        "children": [
          {
            "level": 3,
            "title": "提出问题",
            "slug": "提出问题",
            "children": []
          },
          {
            "level": 3,
            "title": "用||来设置默认值",
            "slug": "用-来设置默认值",
            "children": []
          },
          {
            "level": 3,
            "title": "truthy和falsy",
            "slug": "truthy和falsy",
            "children": []
          },
          {
            "level": 3,
            "title": "用??来设定默认值",
            "slug": "用-来设定默认值",
            "children": []
          }
        ]
      }
    ],
    "path": "/frontend/javascript/tips.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "前端工具",
    "headers": [],
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
          },
          {
            "level": 3,
            "title": "博客主页",
            "slug": "博客主页",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "完成",
        "slug": "完成",
        "children": []
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
    "title": "目录 分类",
    "headers": [],
    "path": "/category/%E7%9B%AE%E5%BD%95/",
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
    "title": "前端 分类",
    "headers": [],
    "path": "/category/%E5%89%8D%E7%AB%AF/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "JavaScript 标签",
    "headers": [],
    "path": "/tag/javascript/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "编程语言 分类",
    "headers": [],
    "path": "/category/%E7%BC%96%E7%A8%8B%E8%AF%AD%E8%A8%80/",
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
    "title": "工具 分类",
    "headers": [],
    "path": "/category/%E5%B7%A5%E5%85%B7/",
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
