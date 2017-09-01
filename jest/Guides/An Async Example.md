# 一个异步的例子
首先，按照 [入门指南](https://facebook.github.io/jest/docs/getting-started.html#using-babel) 中的说明，在 Jest 中启用 Babel 支持。

让我们实现一个从 API 获取用户数据并返回 user name 的简单模块。

```javascript
// user.js
import request from './request';

export function getUserName(userID) {
  return request('/users/' + userID).then(user => user.name);
}
```

在上面的实现中，我们期望 request.js 模块返回一个 promise。我们链式调用 then 来接收 user name。

现在想象一个访问网络并获取一些用户数据的 request.js 的实现。

```javascript
// request.js
const http = require('http');

export default function request(url) {
  return new Promise(resolve => {
    // This is an example of an http request, for example to fetch
    // user data from an API.
    // This module is being mocked in __mocks__/request.js
    http.get({path: url}, response => {
      let data = '';
      response.on('data', _data => data += _data);
      response.on('end', () => resolve(data));
    });
  });
}
```

因为我们不想在我们的测试中去访问网络，我们将在 \_\_mocks\_\_ 文件夹中创建一个手动模拟的 request.js 模块。它可能看起来像这样：

```javascript
// __mocks__/request.js
const users = {
  4: {name: 'Mark'},
  5: {name: 'Paul'},
};

export default function request(url) {
  return new Promise((resolve, reject) => {
    const userID = parseInt(url.substr('/users/'.length), 10);
    process.nextTick(
      () => users[userID] ? resolve(users[userID]) : reject({
        error: 'User with ' + userID + ' not found.',
      })
    );
  });
}
```

现在我们来为我们的异步功能编写一个测试。

```javascript
// __tests__/user-test.js
jest.mock('../request');

import * as user from '../user';

// The assertion for a promise must be returned.
it('works with promises', () => {
  expect.assertions(1);
  return user.getUserName(4).then(data => expect(data).toEqual('Mark'));
});
```

我们调用 jest.mock('../request') 告诉 Jest 使用我们的手动模拟。it 期望返回值是一个将要 resolved 的 Promise。您可以链式调用多个 Promise，随时调用 expect，只要你在最后返回 Promise。
