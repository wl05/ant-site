# CI/CD 概念

CI/CD 其实是三个过程的缩写：

* Continuous Integration （持续集成）
* Continuous Delivery （持续交付）
* Continuous Deployment （持续部署）

下面分别介绍三个概念：

## Continuous Integration （持续集成）
就是说将代码推送到远程仓库后，我们可以编写脚本来自动的帮我们完成编译、测试的过程，帮我们尽早的发现bug，对于每一次push都会自动的
触发这个过程，这个过程我们叫做持续集成。
## Continuous Deployment （持续部署）
对于通过持续集成步骤的代码，可以自动的部署到生产环境，这个过程叫持续部署

## Continuous Delivery （持续交付）

持续交付会自动检查代码，与持续部署不同的是它需要人工干预来手动地、策略性地触发变更的部署。

## 参考资料
* [详解CI、CD相关概念](https://blog.csdn.net/sinat_35930259/article/details/79429743)
* [CI/CD concepts](https://docs.gitlab.com/ee/ci/introduction/)
* [CI/CD是什么？如何理解持续集成、持续交付和持续部署](https://www.redhat.com/zh/topics/devops/what-is-ci-cd#:~:text=%E6%8C%81%E7%BB%AD%E9%83%A8%E7%BD%B2%EF%BC%88%E5%8F%A6%E4%B8%80%E7%A7%8D,%E7%AE%A1%E9%81%93%E5%90%8E%E7%BB%AD%E9%98%B6%E6%AE%B5%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E3%80%82)