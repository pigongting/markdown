# 使用 xampp（PHP 5.4.34）

1. 位置：`移动硬盘\jiyigongdian 记忆宫殿\jineng 技能\yuyan 语言\php\xampp_5_2_2.exe`
2. 安装：解压到 `D:\xampp`
3. 启动 Apache 服务器



# 使用 memcache
1. 位置：`移动硬盘\jiyigongdian 记忆宫殿\jineng 技能\yuyan 语言\php\memcached-win32-1.4.4-14`
2. 安装：
    > 1. 复制文件夹到 `D:\xampp`
    > 2. 进入 memcached-win32-1.4.4-14 文件夹
    > 3. 按住 Shift 右键，在右键菜单中选择 在此处打开命令窗口
    > 4. 安装：memcached.exe -d install（如果要卸载：memcached.exe -d uninstall）
    > 5. 启动：memcached.exe -d start（如果要停止：memcached.exe -d stop）



# 使用 php_memcache 扩展
1. 位置：`移动硬盘\jiyigongdian 记忆宫殿\jineng 技能\yuyan 语言\php\php_memcache-3.0.8-5.4-ts-vc9-x86`
2. 使用：
    > 1. 进入 php_memcache-3.0.8-5.4-ts-vc9-x86 文件夹
    > 2. 复制 php_memcache.dll 文件到 `D:\xampp\php\ext`
    > 3. 修改文件 `D:\xampp\php\php.ini`，在末尾添加

    ```
    ;php-memcached
    extension=php_memcache.dll
    [Memcache]
    memcache.allow_failover = 1
    memcache.max_failover_attempts=20
    memcache.chunk_size =8192
    memcache.default_port = 11211
    ```

3. 重启 Apache 服务器



# 使用 php_blitz.dll 扩展
1. 位置：`移动硬盘\jiyigongdian 记忆宫殿\jineng 技能\yuyan 语言\php\php_blitz.dll`
2. 使用：
    > 1. 复制 php_memcache.dll 文件到 `D:\xampp\php\ext`
    > 2. 修改文件 `D:\xampp\php\php.ini`，在末尾添加
    ```
    extension=php_blitz.dll
    ```

3.  重启Apache 服务器













*
