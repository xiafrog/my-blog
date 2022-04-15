import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  "/",
  {
    text: "前端",
    icon: "template",
    prefix: "/frontend/",
    children: [
      {
        text: "前端工具",
        prefix: "tools/",
        children: ["vuepress.md", "eslint.md", "axios.md"],
      },
      {
        text: "JavaScript",
        prefix: "javascript/",
        children: ["tips.md"],
      },
    ],
  },
  {
    text: "杂文",
    icon: "blog",
    prefix: "/essay/",
    children: ["One_Flew_Over_the_Cuckoos_Nest.md"],
  },
]);
