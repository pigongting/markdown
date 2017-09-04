# 获取方法
前端使用 js 向服务端的接口发送 ajax 请求（这个接口可以通过接收前端传递过来的 code，获取 openid），服务端获取成功后再返回给前端

# code 如何获取？
最终 code 是从 window.location.search 中获取到的，但是默认情况下 window.location.search 中是不存在 code 的，需要调用微信的接口：
https://open.weixin.qq.com/connect/oauth2/authorize?appid=自定义1位置&redirect_uri=自定义2位置&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect;

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

# ajax 如何发送？

```javascript
$.ajax({
  async: false,
  cache: false,
  url: '[服务端通过 code 获取 openid 的接口的地址]',
  data: { code: '[刚刚获取到的 code]' },
  type: 'GET',
  // 因为往往移动端和接口分属不同的域名，使用 jsonp 解决跨域问题
  // jsonp 的值自定义，如果使用 jsoncallback，那么服务器端,要返回一个 jsoncallback 的值对应的对象
  dataType: 'jsonp',
  jsonp: 'callback',
  jsonpCallback: 'callback',
  timeout: 5000,
  success: (result) => {
    if (result != null && Object.prototype.hasOwnProperty.call(result, 'openid') && result.openid !== '') {
      alert(result.openid);
    } else {
      alert(`微信身份识别失败 \n ${result}`);
      location.href = '[浏览器当前地址（未附加 code 的地址）]';
    }
  },
});
```

# 前端拿到 openid 后，可以：

1. 保存到 cookie 中
2. 保存到 localStore 中
3. 每次请求都将 openid 发送给服务端数据获取接口

# 前端完整代码

```javascript
/**
 * 获取 url 中 "?" 符后的字符串并正则匹配
 * 如：http://xxx.xx.xx?code=aaaa，返回 aaaa
 * @param {String} name
 */
function GetQueryString(name) {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  let r = window.location.search.substr(1).match(reg);
  let context = '';
  if (r != null) {
    context = r[2];
  }
  reg = null;
  r = null;
  return context == null || context === '' || context === 'undefined' ? '' : context;
}

/**
 * ajax 成功后的回调函数
 */
function callback(result) {
  if (result != null && Object.prototype.hasOwnProperty.call(result, 'openid') && result.openid !== '') {
    alert(result.openid);
  } else {
    alert(`微信身份识别失败 \n ${result}`);
    location.href = '[浏览器当前地址（未附加 code 的地址）]';
  }
}

$(() => {
  const accessCode = GetQueryString('code');

  if (accessCode == null) {
    // fromurl 需要urlencode编码处理
    const fromurl = location.href;
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${'自定义1位置'}&redirect_uri=${'自定义2位置'}&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect`;
    // 打开微信授权页面
    location.href = url;
  } else {
    $.ajax({
      async: false,
      cache: false,
      url: '[服务端通过 code 获取 openid 的接口的地址]',
      data: { code: '[刚刚获取到的 code]' },
      type: 'GET',
      // 因为往往移动端和接口分属不同的域名，使用 jsonp 解决跨域问题
      // 那么服务器端,要返回一个 jsoncallback 的值对应的对象
      dataType: 'jsonp',
      jsonpCallback: 'callback',
      timeout: 5000,
      success: (result) => {
        callback(result);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        alert(textStatus);
      },
    });
  }
});
```
































*
