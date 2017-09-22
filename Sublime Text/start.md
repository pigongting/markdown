# 安装插件

1. 卸载旧版本，使用 Everything 搜索 sublime 关键字，删除所有相关内容

2. 下载并安装 Sublime Text 3 (Build 3143) 不要升级上来的
    > 首页下载的有问题，从内页下载：http://www.sublimetext.com/3


3. 安装 Package Control
    > 网址：https://packagecontrol.io/installation
    > 在 Sublime Text 3 中菜单 View->Show Console 打开控制台
    > 复制网站中 SUBLIME TEXT 3 选项卡下方的内容，粘贴到控制台，并回车执行。如：

    ```
    import urllib.request,os,hashlib; h = '6f4c264a24d933ce70df5dedcf1dcaee' + 'ebe013ee18cced0ef93d5f746d80ef60'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
    ```

    > 验证执行结果：Ctrl+Shift+P，在输入框中输入 Package Control


4. 安装插件
    - SublimeLinter
    - SublimeLinter-contrib-eslint
    - A File Icon
    - Theme - One Dark
    - Babel
    - Better Less
    - Emmet
    - Expand Selection to Quotes
    - PackageResourceViewer


5. 配置主题

    1. 确认系统安装了字体：`Microsoft JhengHei Mono` 和 `Inconsolata-Regular`
    2. 选择主题
        > 1. 在 Sublime Text 中，`Preferences -> Theme...`  
        > 2. 在列表中选择 `One Dark.sublime-theme`

    3. 选择颜色方案
        > 1. 在 Sublime Text 中，`Preferences -> Color Scheme...`  
        > 2. 在列表中选择 `One Dark`


5. 修改主题文件

    1. 打开主题文件

        > 1. 快捷键 `ctrl+shift+p` 调出命令面板后输入 `PackageResourceViewer: Open Resource`
        > 2. 接着输入 `Theme - One Dark` 回车进入
        > 3. 找到文件 `One Dark.sublime-theme` 回车打开

        ```json
        /** 说明
         *  tabset_control 中修改 tab_height
         *  tab_label 中修改 font.size 和 font.face
         *  sidebar_label 中修改 font.size 和 font.face  
         *  sidebar_tree 中修改 row_padding  
         *  tab_close_button 全部替换为默认的样子
         */
        {
          "class": "tabset_control",
          "layer0.texture": "Theme - One Dark/assets/tab_panel_bg.png",
          "layer0.opacity": 1.0,
          "layer0.inner_margin": [1, 1, 1, 2],
          "tab_overlap": 0,
          "tab_width": 264,
          "tab_min_width": 107,
          "tab_height": 30,
          "mouse_wheel_switch": false
        },
        {
          "class": "tab_label",
          "fg": [157, 165, 180, 154],
          "shadow_color": [0, 0, 0, 0],
          "shadow_offset": [0, 0],
          "font.italic": false,
          "font.size": 15,
          "font.face": "Inconsolata-Regular"
        },
        {
          "class": "sidebar_label",
          "color": [157, 165, 180],
          "font.bold": false,
          "font.size": 15,
          "font.face": "Inconsolata-Regular",
          "font.italic": false,
          "shadow_color": [0, 0, 0, 0],
          "shadow_offset": [0, 0]
        },
        {
          "class": "sidebar_tree",
          "row_padding": [8, 5],
          "indent": 17,
          "indent_offset": 14,
          "indent_top_level": false,
          "layer0.tint": [33, 37, 43],
          "layer0.opacity": 1.0,
          "dark_content": false
        },
        {
          "class": "tab_close_button",
          "settings": ["show_tab_close_buttons"],
          "layer0.texture": "Theme - Default/common/dark/tab_close.png",
          "content_margin": [10, 9]
        },
        {
          "class": "tab_close_button",
          "parents": [{"class": "tab_control", "attributes": ["!selected"]}],
          "layer0.opacity": { "target": 0.3, "speed": 4.0, "interpolation": "smoothstep" },
        },
        {
          "class": "tab_close_button",
          "parents": [{"class": "tab_control", "attributes": ["selected"]}],
          "layer0.opacity": { "target": 0.5, "speed": 4.0, "interpolation": "smoothstep" },
        },
        {
          "class": "tab_close_button",
          "parents": [{"class": "tab_control", "attributes": ["file_light"]}],
          "layer0.texture": "Theme - Default/common/light/tab_close.png",
        },
        {
          "class": "tab_close_button",
          "parents": [{"class": "tab_control", "attributes": ["dirty"]}],
          "layer0.texture": "Theme - Default/common/dark/tab_dirty.png",
        },
        {
          "class": "tab_close_button",
          "parents": [{"class": "tab_control", "attributes": ["file_light", "dirty"]}],
          "layer0.texture": "Theme - Default/common/light/tab_dirty.png",
        },
        {
          "class": "tab_close_button",
          "attributes": ["hover"],
          "layer0.texture": "Theme - Default/common/dark/tab_close.png",
        },
        {
          "class": "tab_close_button",
          "attributes": ["hover"],
          "parents": [{"class": "tab_control", "attributes": ["!selected"]}],
          "layer0.opacity": { "target": 0.6, "speed": 4.0, "interpolation": "smoothstep" },
        },
        {
          "class": "tab_close_button",
          "attributes": ["hover"],
          "parents": [{"class": "tab_control", "attributes": ["selected"]}],
          "layer0.opacity": { "target": 0.8, "speed": 4.0, "interpolation": "smoothstep" },
        },
        {
          "class": "tab_close_button",
          "parents": [{"class": "tab_control", "attributes": ["file_light"]}],
          "attributes": ["hover"],
          "layer0.texture": "Theme - Default/common/light/tab_close.png",
        },
        ```

    2. 进入主题文件夹（新版本已经更新了，不需要修改了）

        > 1. 注意：保存修改主题文件后 Theme - One Dark 文件夹才会出现
        > 2. 路径：`C:\Users\Administrator\AppData\Roaming\Sublime Text 3\Packages\Theme - One Dark`
        > 3. 创建 assets 文件夹

    3. 修改图片（新版本已经更新了，不需要修改了）

        > 1. 下载源码：https://github.com/andresmichel/one-dark-theme
        > 2. 下载后解压到当前文件夹
        > 3. 进入文件夹 `one-dark-theme-1.3.4`，复制 tab_selected.png 和 tab_unselected.png 图片到 assets 文件夹
        > 4. 修改 tab_selected.png 和 tab_unselected.png


5. 偏好设置

    1. 在 Sublime Text 中，`Preferences -> Settings`
    2. 追加以下配置

    ```javascript
    {
      // 字体
      "font_face": "Microsoft JhengHei Mono",
      // 字号
      "font_size": 13,
      //在 Goto Anything（Ctrl+P） 或 Find in Files（Ctrl+Shift+F） 时，排除以下规则匹配的文件
      "binary_file_patterns": ["node_modules/*", "dist/*", "*.jpg", "*.jpeg", "*.png", "*.gif", "*.ttf", "*.tga", "*.dds", "*.ico", "*.eot", "*.pdf", "*.swf", "*.jar", "*.zip"],
      // 缩进尺寸
      "tab_size": 2,
      // 转换缩进为空格
      "translate_tabs_to_spaces": true,
      // 以下不知道什么意思，是 One Drak 推荐的
      "animation_enabled": false,
      "caret_extra_bottom": 1,
      "caret_extra_top": 2,
      "caret_extra_width": 1,
      "caret_style": "blink",
      "draw_white_space": "none",
      "ensure_newline_at_eof_on_save": true,
      "highlight_line": true,
      "line_padding_bottom": 1,
      "line_padding_top": 2,
      "margin": 0,
      "tree_animation_enabled": false,
      "scroll_past_end": false,
      "show_definitions": false,
      // Only Sublime Text 3
      "show_scroll_tabs": true,
      // Only Sublime Text 3
      "show_tabs_dropdown": true,
    }
    ```



6. 语法设置

    1. 以 JavaScript(Babel) 语法打开 js 文件

        > 打开一个 js 文件
        > 菜单->View->Syntax->Open all with current extension as...->Babel->JavaScript(Babel)





















*
