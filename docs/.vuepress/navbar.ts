import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  "/",
  {
    text: "前端",
    icon: "template",
    prefix: "/frontend/",
    children: [
      {
        text: "工具",
        prefix: "tools/",
        children: ["vuepress.md"],
      },
    ],
  },
]);
