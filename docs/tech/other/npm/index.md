# 重新认识 npm

## 配置本地开发环境

在本地安装 nodejs 时，会同时安装 npm ，npm 发版的频率一般要比 nodejs 高。如果要安装最新文档版本的 npm 可以执行下面的命令：

```bash
$ npm install npm@latest -g
```

官方建议安装 nodejs 的时候使用 nodejs 版本管理工具进行安装，

* OSX 和 Linux： [nvm](https://github.com/creationix/nvm)、[n](https://github.com/tj/n)
* Windows: [nodist](https://github.com/marcelklehr/nodist)、[nvm-windows](https://github.com/coreybutler/nvm-windows)


例如使用 nvm 可以安装不同版本的 Node，可以在不同版本之间进行切换，这在测试应用在不同环境之间的稳定性时很有用。