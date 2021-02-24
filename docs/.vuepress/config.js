module.exports = {
  title: "wl05 ",
  description: "随学随记",
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: "/wl05.github.io/", // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: "Last Updated", // 文档更新时间：每个文件git最后提交的时间
    nav: [
      { text: "Tech", link: "/tech/" },
      { text: "Life", link: "/life/" },
      // 下拉列表
      {
        text: "GitHub",
        link: "https://github.com/wl05/ant-site",
      },
    ],
    sidebar: {
      "/tech/": [
        {
          title: "Tech",
          collapsable: false,
          children: ["git"],
        },
      ],
      "/life/": [
        {
          title: "Life",
          collapsable: false,
          children: ["one", "two"],
        },
      ],
    },
  },
};
