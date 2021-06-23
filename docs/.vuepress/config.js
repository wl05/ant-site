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
    ],
    sidebar: {
      "/tech/": [
        {
          title: "浏览器",
          collapsable: false,
          children: ["browser/1-chrome-browser-architecture/"],
        },
        {
          title: "git",
          collapsable: false,
          children: ["git/git-base", "git/git-rebase/"],
        },
        {
          title: "algorithm",
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
          ],
        },
      ],
    },
  },
};
