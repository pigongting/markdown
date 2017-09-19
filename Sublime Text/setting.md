# 设置主题

1. 安装字体 `Microsoft JhengHei Mono`
2. 安装主题 `Boxy`
2. 打开设置文件：`Preferences -> Settings`
3. 覆盖文件内容：  

	```json
	{
		"color_scheme": "Packages/User/SublimeLinter/Monokai (SL).tmTheme",
		"font_face": "Microsoft JhengHei Mono",
		"font_size": 13,
		"ignored_packages":
		[
			"Vintage"
		],
		"theme": "Boxy Monokai.sublime-theme"
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
