import { defineThemeConfig } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default defineThemeConfig({
  hostname: "https://xiafrog.github.io/my-blog/",

  author: {
    name: "俞浩然",
    url: "https://xiafrog.github.io/my-blog/",
  },

  iconPrefix: "iconfont icon-",

  logo: "/avatar.jpg",

  repo: "https://github.com/xiafrog/my-blog",

  docsDir: "/docs",

  docsBranch: "master",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: "鱼塘——俞浩然的个人博客",

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    description: "向上，向善",
    medias: {
      GitHub: "https://github.com/xiafrog",
      Gitee: "https://gitee.com/xiafrog",
    },
    roundAvatar: true,
  },

  home: "/",

  darkmode: "switch",

  plugins: {
    blog: {
      autoExcerpt: true,
    },

    pwa: {
      favicon: "avatar.ico",
    },

    // 你也可以使用 Waline
    comment: {
      type: "giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69",
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },

    search: {},
  },
});
