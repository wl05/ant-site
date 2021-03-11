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

[参考](http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)




1