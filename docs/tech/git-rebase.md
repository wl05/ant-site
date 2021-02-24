# git rebase 详解
平时工作中很少使用git rebase 这个命令，源于前段时间同事在我合并分支时让我先rebase一下，当时一脸懵逼。源于此这里学习总结一下git rebase 的具体使用方法和应用场景。
## 分支合并
git rebase 这个命令最常用的场景就是合并分支了吧，平时git merge使用比较多，但是git merge合并会产生一个合并commit，提交记录也会分叉，平时大家用得比较多，这里就不再赘述。但是如果你想维护一条干净整洁没有冗余commit的分支那么git rebase就派上用场了。

![git-rebase.png](./images/git-rebase.jpg)

在这个场景中我们从master 分支中checkout出一个dev分支，然后在dev分支上做了D、C两次提交，在合并到master分支之前又有别的开发者在master上做了E提交，此时在dev分支上进行git rebase master操作，我们就可以得到 D->C->E->B->A的提交记录，然后再checkout 到master分支上执行git merge dev操作，此时master分支不会产生新的commit也不会分叉。那么这个过程发生了什么呢。

在dev分支上执行git rebase master 操作时，这个命令会将dev分支上的所有提交保存为patch，并存放到“.git/rebase”目录下，然后dev分支会去同步master上的最新提交，紧接着将dev上的patch接到dev分支上。这样看来也比较好理解了。

总结一下操作命令：

```bash
$ git checkout dev
# 执行这个命令后可能会产生一些冲突，解决完冲突后执行git add操作，然后执行 git rebase --continue
$ git rebase master
$ git checkout master
$ git merge dev
```
## 合并多个commit
记得有次面试，有个面试官问我，如果想把多个没有意义的commit合并成一个有意义的操作应该怎么做，这个也是git rebase的应用
场景之一。



# 参考

* [分支合并](http://gitbook.liuhui998.com/4_2.html)
* [使用git rebase合并多次commit](https://juejin.cn/post/6844903600976576519)
* [Rebase 当前分支](https://www.liaoxuefeng.com/wiki/896043488029600/1216289527823648)

3