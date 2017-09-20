# 设置主题

## 准备

1. 安装字体 `Microsoft JhengHei Mono` 和 `Inconsolata-Regular`
2. 安装主题 `Theme - One Dark`
3. 安装文件图标 `A File Icon`
4. 安装包源码查看器 `PackageResourceViewer`


## 选择主题

> 在 Sublime Text 中，`Preferences -> Theme...`  
> 在列表中选择 `One Dark.sublime-theme`


## 选择颜色方案

> 在 Sublime Text 中，`Preferences -> Color Scheme...`  
> 在列表中选择 `One Dark (SL)`


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
	"binary_file_patterns": [".git/", ".svn/", ".sass-cache/", "node_modules/", "bower_components/", "dist/"],
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
/** 说明
 *  tabset_control 中修改 tab_height
 *  tab_label 中修改 font.size 和 font.face
 *  sidebar_label 中修改 font.size 和 font.face  
 *  sidebar_tree 中修改 row_padding  
 *  tab_close_button 全部替换为默认的样子
 */
```


## 进入主题文件夹

1. 注意：保存修改主题文件后 Theme - One Dark 文件夹才会出现
2. 路径：`C:\Users\Administrator\AppData\Roaming\Sublime Text 3\Packages\Theme - One Dark`
3. 创建 assets 文件夹


## 下载主题源码

	> 源码地址：https://github.com/andresmichel/one-dark-theme
	> 下载后解压到当前文件夹
	> 进入文件夹 `one-dark-theme-1.3.4`，发展 tab_selected.png 和 tab_unselected.png 图片到 assets 文件夹
	> 修改 tab_selected.png 和 tab_unselected.png































*
