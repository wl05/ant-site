module.exports = {
  base: "/",
  title: "wl05 记录",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],

  markdown: {
    lineNumbers: true, // 代码块显示行号
  },

  themeConfig: {
    repo: "wl05/ant-site",
    docsDir: "docs",
    lastUpdated: "最后更新于",
    nav: [
      { text: "技术", link: "/tech/" },
      { text: "爱好", link: "/hobby/" },
      { text: "生活", link: "/life/" },
      { text: "读书", link: "/read/" },
    ],
    sidebar: {
      "/tech/": [
        {
          title: "CSS",
          collapsable: false,
          children: ["css/"],
        },
        {
          title: "Javascript",
          collapsable: false,
          children: ["javascript/ast/",],
        },
        {
          title: "Typescript",
          collapsable: false,
          children: [
            "typescript/basic-type/",
            "typescript/type-manipulation/generics.md",
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
          children: ["performance/"],
        },
        {
          title: "前端框架",
          collapsable: false,
          children: ["framework/"],
        },
        {
          title: "设计模式",
          collapsable: false,
          children: ["design-patterns/"],
        },
        {
          title: "git",
          collapsable: false,
          children: ["git/git-base", "git/git-rebase/"],
        },
        {
          title: "算法",
          collapsable: false,
          children: [
            "algorithm/leetcode.md",
            "algorithm/sort-algorithm/bubble-sort.md",
          ],
        },
        {
          title: "docker",
          collapsable: false,
          children: ["docker/docker-introduction/"],
        },
        {
          title: "其他",
          collapsable: false,
          children: [
            "other/abort-request.md",
            "other/abort-request.md",
            "other/google-search.md",
          ],
        },
      ],
      "/hobby/": [
        {
          collapsable: false,
          children: [
            "turtle-way/turtle-way.md",
            "three-toed-box-turtle/breeding.md",
            "cuora-galbinifrons/cuora-galbinifrons.md",
            "fall-down-and-hurt-oneself/",
            "dried-shrimp/",
          ],
        },
      ],
    },
  },
};
