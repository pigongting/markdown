# 调试 Node.js 应用程序

许多工具和库可用于帮助您调试 Node.js 应用程序。其中一些列在下面。

如果是手动连接而不是使用工具连接，请传递 --inspect 标志，并连接到打印在终端的 URL。

如果一个进程没有使用 --inspect 启动，通过 SIGUSR1 发信号去激活调试器，并打印连接 URL。

# 检查工具和客户端

这些商业和开源的工具使得 Node.js 应用程序的调试变得更加容易。

## node-inspect

- 一个 CLI 开发调试器：[https://github.com/nodejs/node-inspect](https://github.com/nodejs/node-inspect)
- 通过 Node 调用：`node inspect myscript.js`
- 也可以独立安装：`npm install -g node-inspect` 和调用 `node-inspect myscript.js`

## Chrome DevTools 55+

- 选项 1：在 Chromium 浏览器中打开 `chrome://inspect`。单击配置按钮，确认是否列出了您的目标主机和端口。然后从列表中选择您的 Node.js 应用程序。
- 选项 2：安装 Chrome 扩展 NIM (Node Inspector Manager)：[https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj](https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj)

# 命令行选项

下表列出了各种运行时标记对调试的影响：

\-\-inspect
  - 启用检查器代理
  - 监听默认端口上（9229）

\-\-inspect=port
  - 启用检查器代理
  - 监听 port 指定的端口

\-\-inspect-brk
  - 启用检查器代理
  - 监听默认端口上（9229）
  - 用户代码开始之前中断

\-\-inspect-brk=port
  - 启用检查器代理
  - 监听 port 指定的端口
  - 用户代码开始之前中断

node inspect script.js
  - 在 \-\-inspect 标志下生成子进程运行用户脚本；并使用主进程运行 CLI 调试器。

















*
