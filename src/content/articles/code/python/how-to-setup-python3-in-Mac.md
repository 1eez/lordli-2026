# 在Mac上安装和配置Python3


## 一、安装Homebrew

> 使用 Homebrew 可在Mac（或Linux）上安装没有预装但你需要的东西。

> Homebrew 会将软件包安装到独立目录，并将其文件软链接至 /usr/local。

> Homebrew 不会将文件安装到它本身目录之外，所以您可将 Homebrew 安装到任意位置。

> Homebrew 官网：https://brew.sh/index_zh-cn

复制如下命令，并在Terminal里粘贴，回车。

```python
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

屏幕显示：

```html
==> This script will install:

Press RETURN to continue or any other key to abort
==> Downloading and installing Homebrew...
.....
....
...
==> Installation successful!

==> Next steps:
- Run `brew help` to get started
- Further documentation:
    https://docs.brew.sh


```

## 二、关闭brew执行命令时的自动更新(不然每次启动都会很慢)

1、 编辑配置文件

```bash
open ~/.bash_profile
```

2、 文件内新增一行

```bash
export HOMEBREW_NO_AUTO_UPDATE=true
```

3、 重新加载配置文件

```bash
source ~/.bash_profile
```

## 三、替换brew源

```bash
cd "$(brew --repo)"
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
```

替换homebrew-core.git
```bash
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
brew update
```

备用地址-1
```bash
cd "$(brew --repo)"
git remote set-url origin https://git.coding.net/homebrew/homebrew.git
brew update
```

备用地址-2
```bash
cd "$(brew --repo)"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/brew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew-core.git
brew update
```

## 四、安装Python 3

使用homebrew安装
```bash
brew install python3
```

查看python的版本

```bash
python --version
python3 --version
pip --version
pip3 --version
```

## 五、修改Mac默认为Python3

查看Python3 安装路径

> 打开终端，输入which python3，查看路径，比如： /usr/local/bin/python3

打开配置文件
```bash
open ~/.bash_profile
```

写入外部环境变量
```shell
export PATH=${PATH}:/usr/local/bin/python3
```

重命名Python
```shell
alias python="/usr/local/bin/python3"
```

关闭文件

终端执行命令：
```bash
source ~/.bash_profile
```

如果安装了zsh，或者oh-my-zsh，则需要修改如下文件
```bash
open ~/.zshrc
```

在最后加上一行：
```bash
source ~/.bash_profile
```

## 六、安装pip3

```bash
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
```

下面这句一定是用python3，不然安装的pip是python2.7对应的版本
```bash
sudo python3 get-pip.py
```

## 七、临时修改国内源

其中的pandas就是要安装的的python库，可替换成其他库名
```bash
pip install pandas -i https://pypi.python.org/simple
```

## 八、永久替换成国内源
永久性设置，是在用户根目录(~，而非系统根目录 / )下添加配置~/.pip/pip.conf目录添加可信源，如果目录文件不存在，可直接创建。
```bash
cd ~
mkdir .pip
cd .pip
vim pip.conf
```

添加如下内容：
```python
[global]
index-url=https://pypi.tuna.tsinghua.edu.cn/simple
trusted-host = pypi.tuna.tsinghua.edu.cn
```

或者想替换成豆瓣源：
```python
[global]
index-url=http://pypi.douban.com/simple
trusted-host = pypi.douban.com
```

## 九、安装Spyder IDE环境（需要安装很多依赖库）
```bash
pip install spyder
```

运行spyder方法：
在终端下输入spyder后，回车即可