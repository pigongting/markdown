# 设置主题

1. 安装字体 `Microsoft JhengHei Mono`
2. 安装主题 `Theme - One Dark`
3. 安装文件图标 `A File Icon`
2. 打开设置文件：`Preferences -> Settings`
3. 覆盖文件内容：  

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
		"match_selection": false,
		"tree_animation_enabled": false,
		"scroll_past_end": false,
		"show_definitions": false,
		"show_scroll_tabs": true,
		"show_tabs_dropdown": true
	}
	```


# 修改配色方案

文件路径：`C:\Users\Administrator\AppData\Roaming\Sublime Text 3\Packages\User\SublimeLinter\Monokai (SL).tmTheme`

## 注释斜体

> 找到 Comment 节点，添加 fontStyle 设置  

```xml
<dict>
	<key>name</key>
	<string>Comment</string>
	<key>scope</key>
	<string>comment</string>
	<key>settings</key>
	<dict>
		<key>fontStyle</key>
		<string>italic</string>
		<key>foreground</key>
		<string>#75715E</string>
	</dict>
</dict>
```



































*
