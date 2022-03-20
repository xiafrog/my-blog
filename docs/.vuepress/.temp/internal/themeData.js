export const themeData = {
  "blog": {
    "description": "向上，向善",
    "medias": {
      "GitHub": "https://github.com/xiafrog",
      "Gitee": "https://gitee.com/xiafrog"
    },
    "roundAvatar": true
  },
  "encrypt": {},
  "pure": false,
  "iconPrefix": "iconfont icon-",
  "darkmode": "switch",
  "themeColor": {
    "red": "#e74c3c",
    "blue": "#3498db",
    "green": "#3eaf7c",
    "orange": "#f39c12",
    "purple": "#8e44ad"
  },
  "fullscreen": true,
  "locales": {
    "/": {
      "blog": {
        "description": "向上，向善",
        "medias": {
          "GitHub": "https://github.com/xiafrog",
          "Gitee": "https://gitee.com/xiafrog"
        },
        "roundAvatar": true
      },
      "repoDisplay": true,
      "navbarIcon": true,
      "navbarAutoHide": "mobile",
      "hideSiteNameonMobile": true,
      "sidebar": "structure",
      "sidebarIcon": true,
      "headingDepth": 2,
      "author": {
        "name": "俞浩然",
        "url": "https://xiafrog.github.io/my-blog/"
      },
      "logo": "/avatar.jpg",
      "repo": "https://github.com/xiafrog/my-blog",
      "docsDir": "/docs",
      "docsBranch": "master",
      "navbar": [
        "/",
        {
          "text": "前端",
          "icon": "template",
          "prefix": "/frontend/",
          "children": [
            {
              "text": "工具",
              "prefix": "tools/",
              "children": [
                "vuepress.md"
              ]
            }
          ]
        }
      ],
      "footer": "鱼塘——俞浩然的个人博客",
      "displayFooter": true,
      "pageInfo": [
        "Author",
        "Original",
        "Date",
        "Category",
        "Tag",
        "ReadingTime"
      ],
      "home": "/",
      "lang": "zh-CN",
      "navbarLocales": {
        "langName": "简体中文",
        "selectLangText": "选择语言",
        "selectLangAriaLabel": "选择语言"
      },
      "metaLocales": {
        "prev": "上一页",
        "next": "下一页",
        "lastUpdated": "上次编辑于",
        "contributors": "贡献者",
        "editLink": "编辑此页"
      },
      "blogLocales": {
        "article": "文章",
        "articleList": "文章列表",
        "category": "分类",
        "tag": "标签",
        "timeline": "时间轴",
        "timelineTitle": "昨日不在",
        "all": "全部",
        "intro": "个人介绍",
        "star": "收藏",
        "slides": "幻灯片",
        "encrypt": "加密"
      },
      "outlookLocales": {
        "themeColor": "主题色",
        "darkmode": "外观",
        "fullscreen": "全屏"
      },
      "encryptLocales": {
        "title": "请输入密码",
        "errorHint": "请输入正确密码"
      },
      "routeLocales": {
        "404msg": [
          "这里什么也没有",
          "我们是怎么来到这儿的？",
          "这 是 四 零 四 !",
          "看起来你访问了一个失效的链接"
        ],
        "back": "返回上一页",
        "home": "带我回家"
      }
    }
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
