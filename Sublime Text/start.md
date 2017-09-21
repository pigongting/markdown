# 安装插件

1. 安装 Package Control
    > 网址：https://packagecontrol.io/installation
    > 在 Sublime Text 3 中菜单 View->Show Console 打开控制台
    > 复制网站中 SUBLIME TEXT 3 选项卡下方的内容，粘贴到控制台，并回车执行。如：

    ```
    import urllib.request,os,hashlib; h = '6f4c264a24d933ce70df5dedcf1dcaee' + 'ebe013ee18cced0ef93d5f746d80ef60'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
    ```

    > 验证执行结果：Ctrl+Shift+P，在输入框中输入 Package Control


2. 安装 SublimeLinter
