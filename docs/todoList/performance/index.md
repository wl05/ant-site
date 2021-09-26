
## 前端异常监控 (sentry)

1. [](https://confluence.shopee.io/pages/viewpage.action?pageId=591020150)
2. [](https://zhuanlan.zhihu.com/p/205144885)
3. [前端错误处理](https://juejin.cn/post/6844903641619365902#heading-1)

## 前端埋点

## 前端性能上报 （Prometheus）

### 安装

使用docker一键安装
```bash
$ docker run -p 9090:9090 -v /Users/lewang/Desktop/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```

### 使用Node Exporter采集主机数据


在Prometheus的架构设计中，Prometheus Server并不直接服务监控特定的目标，其主要任务负责数据的收集，存储并且对外提供数据查询支持。因此为了能够能够监控到某些东西，如主机的CPU使用率，我们需要使用到Exporter。Prometheus周期性的从Exporter暴露的HTTP服务地址（通常是/metrics）拉取监控样本数据。

广义上讲所有可以向Prometheus提供监控样本数据的程序都可以被称为一个Exporter。而Exporter的一个实例称为target，Prometheus通过轮询的方式定期从这些target中获取样本数据。






# 参考资料
1. [完全理解Prometheus查询语法](https://www.shangmayuan.com/a/a099fc4421dd407da2a81cea.html)
2. [Prometheus Metrics 设计的最佳实践和应用实例，看这篇够了！](https://segmentfault.com/a/1190000024467720)
3. [Prometheus 教程](https://yunlzheng.gitbook.io/prometheus-book/parti-prometheus-ji-chu/promql/what-is-prometheus-metrics-and-labels)
4. [prometheus的summary和histogram指标的简单理解](https://blog.csdn.net/wtan825/article/details/94616813)