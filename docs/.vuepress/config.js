module.exports = {
  title: "wl05",
  description: "随学随记",
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: "/wl05.github.io/",
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 2,
    lastUpdated: "最后更新于",
    nav: [
      { text: "技术", link: "/tech/" },
      {
        text: "GitHub",
        link: "https://github.com/wl05/ant-site",
      },
    ],
    sidebar: {
      "/tech/": [
        {
          path: "/tech/",
          title: "Tech",
          collapsable: false,
          children: [
            "git",
            // "git-rebase",
            // "cicd-concepts",
            // "abort-request",
            // "google-search",
            // "algorithm/backtracking-algorithm",
            // "algorithm/sort-algorithm/bubble-sort",
          ],
        },
      ],
    },
  },
};
