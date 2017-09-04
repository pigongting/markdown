# 获取方法
前端使用 js 向服务端的接口发送 ajax 请求（这个接口可以通过接收前端传递过来的 code，获取 openid），服务端获取成功后再返回给前端

# code 如何获取？
最终 code 是从 window.location.search 中获取到的，但是默认情况下 window.location.search 中是不存在 code 的，需要调用微信的接口：
https://open.weixin.qq.com/connect/oauth2/authorize?appid=自定义1位置&redirect_uri=自定义2位置&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';

## 这个接口有两个参数需要修改成你自己的：
1. 自定义1位置：appid（示例：wx51c136eef5a37565）
    > appid 在哪里
    > 微信公众平台->基本配置->开发者ID(AppID)

2. 自定义2位置：redirect_uri 浏览器当前地址（示例：hawksharp.vicp.net%2Fapp）
    > redirect_uri 规则
    > 1. 域名必须是微信公众平台->公众号设置->功能设置->网页授权域名设置的
    > 2. 域名必须是经过 encodeURIComponent() 转码

## 接口调用之后
并不会真的进入到微信的某个页面，微信的这个接口会返回一个 302 跳转，指示浏览器跳转到附加了 code 的 redirect_uri 指定的地址。
此时 window.location.search 中就有 code 了。

## 调试
1. 安装微信 PC 版
2. 将你自己真实的 appid 和 redirect_uri 填入这个微信接口
3. 复制接口到文件传输助手，并打开，会弹出微信网页浏览窗口
4. 加载完成后，点击 复制链接地址 按钮，会得到附加了 code 的地址：http://hawksharp.vicp.net/app?code=071Z3WC92yXB5O06qgG92YlVC92Z3WCj&state=STATE%23wechat_redirect
5. 这个接口每次调用，code 都不一样







































*
