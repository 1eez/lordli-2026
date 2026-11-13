# 在Mac上安装和配置R语言环境


## 一、安装R语言环境

> 首先说明：R是运行环境，RStudio是开发工具。

> RStudio是为了方便使用R语言而诞生的，他能方便代码的编辑、调试以及图形的显示。

> 所以安装RStudio之前必须要安装R。

> 另外看网上其他教程有说到安装路径要纯英文，注意下就好。Mac不存在这个问题，因为根本没机会给你选安装路径，哈哈哈哈。


R的下载路径：https://cran.r-project.org/

RStudio的下载路径：https://www.rstudio.com/products/rstudio/download/

安装步骤：两个都一直下一步就好。

## 二、我的第一个R程序

打开RStudio，

新建工程：File -> New Project -> New Directory -> Empty Project（注意这种工程路径尽量也不要出现中文）

新建脚本：File -> New File -> R Script

```r linenums="1"
age <- c(1,3,5,2,11,9,3,9,12,3)
weight <- c(4.4,5.3,7.2,5.2,8.5,7.3,6.0,10.4,10.2,6.1)
mean(weight)
sd(weight)
cor(age,weight)
```

看控制台输出：

```r
> age <- c(1,3,5,2,11,9,3,9,12,3)
> weight <- c(4.4,5.3,7.2,5.2,8.5,7.3,6.0,10.4,10.2,6.1)
> mean(weight)
[1] 7.06
> sd(weight)
[1] 2.077498
> cor(age,weight)
[1] 0.9075655
>

```


