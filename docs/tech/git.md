# git 命令总结

## git cherry-pick 

* 基本用法
``` bash
# cherry-pick 单条commit
git cherry-pick <commitHash>
# cherry-pick feature分支的最新一次提交
git cherry-pick <feature 分支>
# cherry-pick 多个commit
git cherry-pick <HashA> <HashB>
# cherry-pick 连续的多个commit，这个命令不包含commit A
git cherry-pick A..B 
# cherry-pick 连续的多个commit，这个命令包含commit A
git cherry-pick A^..B 
```

* cherry-pick 有冲突解决
```bash
# 解决冲突后执行执行
git add .
# 然后
git cherry-pick --continue
```

* 丢弃修改
```bash
git cherry-pick --abort
```


## 批量处理冲突

```bash
# 采用当前的
$ git checkout --ours filepath
# 采用传入的
$ git checkout --theirs filepath
```

## git reset
例如有 A<-B<-C<-D 次提交，当前在D这个commit，现在想回退到B这个commit，使用命令：

```bash
$ git reset --hard B
```
这里要特别注意的是这个操作是回退到B,意思就是执行完这个操作以后B之后的提交都没了。
如果远程分支是领先于reset过后的本地分支，此时push是会报错的。这里只有使用git push -f 提交，
但是要特别注意，如果你不确定是否会覆盖别人的提交，最好小心执行这个命令。

## git revert


## 参考
1. [cherry-pick](http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)
2. [revert](https://juejin.cn/post/6844903647390744589#heading-3)
3. [revert](https://blog.csdn.net/yxlshk/article/details/79944535)




