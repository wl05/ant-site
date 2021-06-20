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
例如有 A -> B -> C -> D 次提交，当前在D这个commit，现在想回退到B这个commit，使用命令：

```bash
$ git reset --hard B
```
这里要特别注意的是这个操作是回退到B,意思就是执行完这个操作以后B之后的提交都没了。
如果远程分支是领先于reset过后的本地分支，此时push是会报错的。这里只有使用git push -f 覆盖远程分支提交，
*所以如果你不确定是否会覆盖别人的提交，最好不要执行这个命令。*

## git revert

### revert普通提交
例如有 A -> B -> C -> D 次提交，当前在D这个commit，现在想回退B这个commit，使用命令：

```bash
$ git revert B
```
执行完命令后提交记录变成： A -> B -> C -> D -> E， E会保存D，E 的修改撤销B的修改，
这里就能看出 ```git revert```和```git reset```的区别了。
### revert合并

相对于revert 普通提交，revert merge提交会稍微麻烦些。

我们来看一个例子：

这里将dev合并到了master生成了一个merge提交，

```
A -> B -> C -> D --  merge  (master)
      \            /
      A'  -->  B'  (dev)
```
然后又有一个feature分支做完了一些开发，合并到了master分支，
master分支部署后，发现在merge那个点引入了bug，现在想撤销merge那个commit，
但是又不想影响其他的commit，此时revert就可以派上用场了。

```
A -> B -> C -> D --  merge -> E -> F(master)
     \ \            /                   /
      \ A'  -->  B' -> D' -> E'(dev)   /
       \                              /
        A'' --> B'' --- D''（feature）/ 
```

我们先执行git log 查看一下merge 的commit id，

```
commit 3fd41a0027820066a4f07876ee3905ef5704d98b
Merge: 8506600c9 4cffdcd01
Author: ant
Date:   Wed Mar 10 18:59:43 2021 +0800

    Merge branch 'dev' into master
```

这里merge 的 commit id是 ```3fd41a```,执行 ```git revert 3fd41a```,
然后报错了:

```
git revert faulty merge
error: Commit faulty merge is a merge but no -m option was given.
fatal: revert failed
```
报错原因是git 不知道保留哪一个分支的修改，是保留```dev```还是```master```呢？ 怎么区分？
这里我们需要使用-m参数指定```parant number```，-m后面的值可以```1```或者```2```，看上面的```merge log```
```Merge: 8506600c9 4cffdcd01``` 这里```8506600c9```是```master```的```commit id```,
```4cffdcd01``` 是```dev```的```commit id```, 这里```1```，```2```分别就对应```8506600c9,4cffdcd01```,也就是分别对应```master、dev```

这里我们想保留master分支上的修改所以我们执行命令：

```
$ git revert 3fd41a -m 1
```
执行完后的分支
```
A -> B -> C -> D --  merge -> E --------> F ---- G(master)
     \ \            /                   /
      \ A'  -->  B' -> D' -> E'(dev)   /
       \                              /
        A'' --> B'' --- D''（feature）/ 
```
此时生成一个新的```commit G```，这里```G```是包含```E```，```F```不包含```merge```的。


## git stash 

git stash 使用场景，比如正在feature分支上开发，然后遇到一个bug需要从master 切出分支修改，
此时我们功能开发到一半不想commit，这个时候就可以使用git stash来操作了。

```bash
# 将工作区和暂存区的进度保存下来
git stash 

# 查看保存的进度列表
git stash list

# 将进度恢复到工作区
git stash pop

# 将原来在工作区的改动恢复到工作区，将原来在暂存区的改动恢复到暂存区
git stash pop [–index]

# 恢复指定的进度到工作区
git stash pop [stash_id]

# 和git stash pop使用方式一样，区别是git stash pop执行完后会删除当前的保存的进度，而git stash apply不会
git stash apply

# 删除指定的进度
git stash drop [stash_id]

# 删除保存的所有进度
git stash clear

```



## 参考
1. [cherry-pick](http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)
2. [revert](https://juejin.cn/post/6844903647390744589#heading-3)
3. [revert](https://blog.csdn.net/yxlshk/article/details/79944535)
