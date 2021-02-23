module.exports = {
  title: "Ant Notes",
  description: "个人日常记录",
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: "/web_accumulate/", // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: "Last Updated", // 文档更新时间：每个文件git最后提交的时间
    nav: [
      { text: "笔记", link: "/algorithm/" }, // 内部链接 以docs为根目录
      { text: "日常", link: "/algorithm/" }, // 外部链接
      { text: "日常", link: "/algorithm/" }, // 外部链接
      { text: "日常", link: "/algorithm/" }, // 外部链接
      // 下拉列表
      {
        text: "GitHub",
        items: [
          { text: "GitHub地址", link: "https://github.com/OBKoro1" },
          {
            text: "算法仓库",
            link: "https://github.com/OBKoro1/Brush_algorithm",
          },
        ],
      },
    ],
    sidebar: {
      // docs文件夹下面的accumulate文件夹 文档中md文件 书写的位置(命名随意)
      "/accumulate/": [
        "/accumulate/", // accumulate文件夹的README.md 不是下拉框形式
        {
          title: "侧边栏下拉框的标题1",
          children: [
            "/accumulate/JS/test", // 以docs为根目录来查找文件
            // 上面地址查找的是：docs>accumulate>JS>test.md 文件
            // 自动加.md 每个子选项的标题 是该md文件中的第一个h1/h2/h3标题
          ],
        },
      ],
      // docs文件夹下面的algorithm文件夹 这是第二组侧边栏 跟第一组侧边栏没关系
      "/algorithm/": [
        "/algorithm/",
        {
          title: "第二组侧边栏下拉框的标题1",
          children: ["/algorithm/simple/test"],
        },
      ],
    },
  },
};
