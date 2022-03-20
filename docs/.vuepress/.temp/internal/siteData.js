export const siteData = {
  "base": "/my-blog/",
  "lang": "en-US",
  "title": "",
  "description": "",
  "head": [
    [
      "link",
      {
        "rel": "stylesheet",
        "href": "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css"
      }
    ],
    [
      "link",
      {
        "rel": "icon",
        "href": "avatar.ico"
      }
    ],
    [
      "link",
      {
        "rel": "manifest",
        "href": "/my-blog/manifest.webmanifest",
        "crossorigin": "use-credentials"
      }
    ],
    [
      "meta",
      {
        "name": "theme-color",
        "content": "#46bd87"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
      }
    ]
  ],
  "locales": {
    "/": {
      "lang": "zh-CN",
      "title": "鱼塘",
      "description": "俞浩然的个人博客"
    }
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
