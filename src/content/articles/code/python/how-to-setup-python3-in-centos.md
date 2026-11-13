# 在CentOS上安装和配置Python3


## 一、安装前的检查工作
检查CentOS版本
```bash
cat /etc/centos-release
```
屏幕显示
```
CentOS Linux release 7.6.1810 (Core)
```

检查当前Python的版本
```bash
python --version
```

## 二、安装Python3

### 1、创建安装目录（自定义）
```bash
mkdir /usr/local/python3
```

### 2、安装相关依赖
```bash
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel libffi-devel
```

### 3、从官网下载python3的压缩包，解压（以3.7.6版本为例）
```bash
wget https://www.python.org/ftp/python/3.7.6/Python-3.7.6.tgz
tar zxf Python-3.7.6.tgz
```

### 4、cd 进入解压目录，然后
```bash
cd Python-3.7.6
./configure --prefix=/usr/local/python3/
make && make install
```

### 5、cd 进入/usr/bin
其中有python、python2、python2.7三个文件依次指向后者。
备份当前默认版本python，如果有需要还可还原：
```bash
cd /usr/bin
sudo mv python python.bak
sudo mv pip pip.bak
```

### 6.1、创建python3.7的新链接

（也可建立python3命令以区分，同mac），这样默认的python版本就替换为python3.7了
但宝塔面板是基于python2的，如果直接替换掉，会导致宝塔面板无法启动

```bash
ln -s /usr/local/python3/bin/python3 /usr/bin/python3
ln -s /usr/local/python3/bin/pip3 /usr/bin/pip3
```

### 6.2、如果想替换本机默认的python用下面两行命令
```bash
ln -s /usr/local/python3/bin/python3 /usr/bin/python
ln -s /usr/local/python3/bin/pip3 /usr/bin/pip
```

### 8、更新pip
```bash
pip install --upgrade pip
```

### 9、检查当前默认python版本
```bash
python -V
```

## 三、修改相关Python2的依赖

由于yum使用python2，替换为python3后无法正常工作，

### 1、修改yum配置文件:
```bash
sudo vi /usr/bin/yum
```

将第一行指定的python版本改为python2.7:
```
#!/usr/bin/python 改为 #!/usr/bin/python2.7
```

### 2、修改urlgrabber配置文件（网上很多教程都漏了这一步）
```bash
sudo vi /usr/libexec/urlgrabber-ext-down
```
同yum，把头部的python改成python2.7

### 3、修改yum manager配置文件
```bash
sudo vi /bin/yum-config-manager
```
同yum，把头部的python改成python2.7

## 四、修改pip源，切换到国内镜像

有两次方法，一种是一次性的，一种是永久性的。

### 1、临时修改国内源

其中的pandas就是要安装的的python库，可替换成其他库名
```bash
pip install pandas -i https://pypi.python.org/simple
```

### 2、永久替换成国内源
永久性设置，是在用户根目录(~，而非系统根目录 / )下添加配置~/.pip/pip.conf目录添加可信源，如果目录文件不存在，可直接创建。
```bash
[root@localhost ~]# cd ~
[root@localhost ~]# mkdir .pip
[root@localhost ~]# cd .pip
[root@localhost .pip]# vim pip.conf
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

