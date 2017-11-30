# 介绍JSX

考虑这个变量声明：

```js
const element = <h1>Hello, world!</h1>;
```

这个有趣的标签语法既不是一个字符串也不是 HTML。

它被称为 JSX，它是 JavaScript 的语法扩展。我们建议在 React 中使用它来描述 UI 的外观。JSX 可能会让你觉得它是模板语言，但它具有 JavaScript 的全部功能。

JSX 生成 React “元素”。我们将在[下一节](https://reactjs.org/docs/rendering-elements.html)探讨将它们渲染成 DOM。在下面，您可以找到让你开始 JSX 的基础知识。


## 在 JSX 中嵌入表达式

在 JSX 中可以嵌入任何 JavaScript 表达式，JavaScript 表达式需要使用大括号括起来。

例如，2 + 2, user.firstName 和 formatName(user) 都是有效的表达式：

```js
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[在 CodePen 中试试](https://reactjs.org/redirect-to-codepen/introducing-jsx)

为了便于阅读，我们将 JSX 分成多行。虽然这不是必需的，但是当我们这样做的时候，我们也建议把它包装在括号内以避免[自动分号插入的缺陷](http://stackoverflow.com/q/2846283)。

## JSX 也是一个表达式

编译之后，JSX 表达式变成普通的 JavaScript 对象。

这意味着您可以在 if 语句和 for 循环中使用 JSX，将其分配给变量，将其作为参数接受，并从函数中返回：

```js
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

## 使用 JSX 指定属性

您可以使用引号将字符串文字指定为属性：

```js
const element = <div tabIndex="0"></div>;
```

您也可以使用大括号将 JavaScript 表达式嵌入到属性中：

```js
const element = <img src={user.avatarUrl}></img>;
```

在属性中嵌入 JavaScript 表达式时，不要用引号把花括号括起来。您应该使用引号（用于字符串值）或大括号（用于表达式），但不能在同一个属性中两个都使用。

> ## 警告：  
> 由于 JSX 相比于 HTML 更接近 JavaScript，React DOM 使用驼峰格式为属性命名，而不是 HTML 属性命名方式称。  
> 例如，class 在 JSX 中变成 className，而 tabindex 变成 tabIndex。  

## 使用 JSX 指定子元素

如果标签为空，则可以使用 /> 立即关闭它，就像 XML：

```js
const element = <img src={user.avatarUrl} />;
```

JSX 标签可能包含子元素：

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

## JSX 防止注入攻击

在 JSX 中嵌入用户输入是安全的：

```js
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

默认情况下，React DOM 在渲染之前[转义](http://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html)嵌入在 JSX 中的任何值。因此，它可以确保您永远不会注入任何未明确写入您的应用程序的东西。在呈现之前，所有内容都被转换为字符串。这有助于防止 [XSS（跨站脚本）攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。


## JSX 表示对象

Babel 将 JSX 编译成 React.createElement() 调用。

这两个例子是相同的：

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

React.createElement() 执行一些检查来帮助您编写无错代码，但本质上它创建了一个像这样的对象：

```js
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```

这些对象被称为 “React 元素”。你可以把它们想象成你想要在屏幕上看到的东西的描述。React 读取这些对象，并使用它们来构建 DOM 并使其保持最新状态。

我们将在下一节探讨将 React 元素渲染到 DOM。

> 提示：  
> 我们建议您为您选择的编辑器使用 [“Babel” 语言定义](http://babeljs.io/docs/editors)，以便 ES6 和 JSX 代码能够正确的高亮显示。本网站使用与它是兼容的 [Oceanic Next](https://labs.voronianski.com/oceanic-next-color-scheme/) 颜色方案。
































.
