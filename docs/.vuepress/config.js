const path = require("path");
module.exports = {
  base: "/",
  title: "ANT 记录",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  palette: path.resolve(__dirname, "./styles/palette.styl"),
  markdown: {
    toc: {
      includeLevel: [1, 2, 3, 4],
    },
  },
  themeConfig: {
    repo: "wl05/ant-site",
    docsDir: "docs",
    lastUpdated: "更新于",
    nav: [
      { text: "技术", link: "/tech/" },
      { text: "读书", link: "/read/" },
    ],
    sidebar: {
      "/tech/": [
        {
          title: "CSS",
          collapsable: false,
          children: ["css/css-box-model/", "css/css-bfc/"],
        },
        {
          title: "Javascript",
          collapsable: false,
          children: ["javascript/ast/"],
        },
        {
          title: "Typescript",
          collapsable: false,
          children: [
            "typescript/basic-type/",
            "typescript/type-manipulation/generics.md",
            "typescript/function/",
          ],
        },
        {
          title: "浏览器",
          collapsable: false,
          children: [
            "browser/1-chrome-browser-architecture/",
            "browser/2-what-happens-in-navigation/",
            "browser/3-inner-workings-of-a-renderer-process/",
            "browser/4-input-is-coming-to-the-compositor/",
            "browser/how-v8-works/",
          ],
        },
        {
          title: "前端性能优化",
          collapsable: false,
          children: [],
        },
        {
          title: "前端框架",
          collapsable: false,
          children: ["framework/react/create-your-own-react/"],
        },
        {
          title: "设计模式",
          collapsable: false,
          children: ["design-patterns/"],
        },
        {
          title: "web 安全",
          collapsable: false,
          children: ["web-security/xss/"],
        },
        {
          title: "git",
          collapsable: false,
          children: ["git/git-base.md", "git/git-rebase/", "git/git-config.md"],
        },
        {
          title: "算法",
          collapsable: false,
          children: [
            "algorithm/leetcode/",
            "algorithm/leetcode/dynamic-programming.md",
            "algorithm/leetcode/greedy-algorithm.md",
            "algorithm/leetcode/bfs.md",
            "algorithm/leetcode/dfs.md",
            "algorithm/sort-algorithm/bubble-sort.md",
          ],
        },
        {
          title: "前端监控",
          collapsable: false,
          children: [
            "monitor/monitor/",
            "monitor/data-visualization/histogram/",
            "monitor/data-visualization/1/",
            "monitor/data-visualization/2/",
          ],
        },
        {
          title: "其他",
          collapsable: false,
          children: [
            "other/abort-request.md",
            "other/cicd-concepts.md",
            "other/flow-chart.md",
            "other/google-search.md",
            "other/how-to-output-log.md",
            "other/linux-command.md",
            "other/sketchup.md",
            "other/docker/docker-introduction/",
            "other/lerna/",
            "other/npm/",
            "other/svg/",
          ],
        },
        {
          title: "面试",
          collapsable: false,
          children: ["interview/handwritten-topic.md"],
        },
      ],
      "/read/": [
        {
          title: "英语",
          collapsable: false,
          children: ["english/", "english/learn-source/"],
        },
        {
          title: "逻辑思考",
          collapsable: false,
          children: ["logical-thinking/"],
        },
      ],
    },
  },
};
