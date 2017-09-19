# 设置主题

1. 安装字体 `Microsoft JhengHei Mono`
2. 安装主题 `Theme - One Dark`
3. 安装文件图标 `A File Icon`
4. 安装包源码查看器 `PackageResourceViewer`


## 修改设置文件

> 在 Sublime Text 中，`Preferences -> Settings`  

```json
{
	"color_scheme": "Packages/User/SublimeLinter/One Dark (SL).tmTheme",
	"font_face": "Microsoft JhengHei Mono",
	"font_size": 13,
	"ignored_packages":
	[
		"Vintage"
	],
	"theme": "One Dark.sublime-theme",
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
	"show_scroll_tabs": true,
	"show_tabs_dropdown": true
}
/** 说明
 *  animation_enabled ~ show_definitions 是推荐设置
 *  show_scroll_tabs 和 show_tabs_dropdown 只能用于 Sublime Text3
 */
```

## 下载主题源码

	> 源码地址：https://github.com/andresmichel/one-dark-theme
	> 下载后解压到当前文件夹
	> 进入文件夹 `one-dark-theme-1.3.4`，将内容放到 `C:\Users\Administrator\AppData\Roaming\Sublime Text 3\Packages\Theme - One Dark` 文件夹（遇到替换时，不替换）
	> 修改 tab_selected.png 和 tab_unselected.png


## 打开主题文件
> 快捷键 `ctrl+shift+p` 调出命令面板后输入 `PackageResourceViewer: Open Resource`
> 接着输入 `Theme - One Dark` 回车进入
> 找到文件 `One Dark.sublime-theme` 回车打开


## 修改主题文件

```json
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
  "font.size": 17,
  "font.face": "Inconsolata-Regular",
  "font.italic": false,
  "shadow_color": [0, 0, 0, 0],
  "shadow_offset": [0, 0]
},
{
  "class": "sidebar_tree",
  "row_padding": [8, 8],
  "indent": 17,
  "indent_offset": 14,
  "indent_top_level": false,
  "layer0.tint": [33, 37, 43],
  "layer0.opacity": 1.0,
  "dark_content": false
},
/** 说明
 *  tabset_control 中修改 tab_height
 *  tab_label 中修改 font.size 和 font.face
 *  sidebar_label 中修改 font.size 和 font.face  
 *  sidebar_tree 中修改 row_padding  
 */
```

































*
