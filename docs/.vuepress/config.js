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
          children: ["javascript/ast/"],
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
            "other/cicd-concepts.md",
            "other/google-search.md",
            "other/linux-command.md",
            "other/flow-chart.md",
          ],
        },
      ],
      "/hobby/": [
        {
          title: "散记",
          collapsable: false,
          children: [
            "sidelights/turtle-way/turtle-way.md",
            "sidelights/three-toed-box-turtle/breeding.md",
            "sidelights/cuora-galbinifrons/cuora-galbinifrons.md",
            "sidelights/fall-down-and-hurt-oneself/",
            "sidelights/dried-shrimp/",
            "sidelights/website/",
            "sidelights/drill-pattern-turtle-rot-nail-treatment/",
          ],
        },
        {
          title: "养龟日常",
          collapsable: false,
          children: [
            "daily/2021-08-29.md",
            "daily/2021-08-28.md",
            "daily/2021-08-27.md",
            "daily/2021-08-26.md",
            "daily/2021-08-25.md",
            "daily/2021-08-22.md",
            "daily/2021-08-22/",
            "daily/2021-08-21.md",
            "daily/2021-08-20.md",
            "daily/2021-08-18.md",
            "daily/2021-08-17.md",
            "daily/2021-08-14.md",
            "daily/2021-08-13.md",
            "daily/2021-08-08.md",
            "daily/2021-08-07.md",
            "daily/2021-08-06.md",
            "daily/2021-08-05.md",
            "daily/2021-08-04.md",
            "daily/2021-08-03.md",
            "daily/2021-08-02.md",
            "daily/2021-08-01.md",
            "daily/2021-07-31.md",
            "daily/2021-07-28.md",
            "daily/2021-07-27.md",
            "daily/2021-07-25.md",
            "daily/2021-07-24.md",
            "daily/2021-07-23.md",
            "daily/2021-07-22.md",
            "daily/2021-07-20.md",
            "daily/2021-07-18.md",
            "daily/2021-07-17.md",
            "daily/2021-07-16.md",
            "daily/2021-07-13.md",
            "daily/2021-07-08.md",
            "daily/2021-07-07.md",
            "daily/2021-07-06.md",
            "daily/2021-07-05.md",
            "daily/2021-03-19.md",
            "daily/2020-10-16.md",
            "daily/2020-09-04.md",
          ],
        },
      ],
    },
  },
};
