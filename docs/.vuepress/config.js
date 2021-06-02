module.exports = {
  title: "wl05",
  description: "随学随记",
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: "/",
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 2,
    lastUpdated: "最后更新于",
    nav: [
      { text: "技术", link: "/tech/" },
      { text: "爱好", link: "/hobby/" },
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
          collapsable: true,
          children: [
            "git.md",
            "algorithm/leetcode.md",
            "algorithm/sort-algorithm/bubble-sort.md",
            "git-rebase/git-rebase.md",
            "abort-request.md",
            "cicd-concepts.md",
            "google-search.md",
            "docker/docker.md",
          ],
        },
      ],
      // "/hobby/": [
      //   {
      //     path: "/hobby/",
      //     title: "Hobby",
      //     collapsable: false,
      //     children: ["BreedingOfTheThreeToedBoxTurtle/index"],
      //   },
      // ],
    },
  },
};
