# 组件和属性

组件让你把用户界面分成独立的，可重复使用的部分，并且将每个部分分开考虑。

从概念上讲，组件就像 JavaScript 函数一样。他们接受任意输入（称为 “属性”），并返回描述屏幕上应显示内容的 React 元素。



## 函数组件 和 类组件

定义组件的最简单的方法是编写一个 JavaScript 函数：

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

这个函数是一个有效的 React 组件，因为它接受一个带有数据的 “props”（代表属性）对象参数并返回一个 React 元素。我们将这些组件称为 “函数”，因为它们实际上是 JavaScript 的函数。

您也可以使用 [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) 来定义组件：

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

从 React 的角度来看，以上两个组件的外观是相同的。

类有一些额外的特性，我们将在 [下一节](https://reactjs.org/docs/state-and-lifecycle.html) 讨论。在此之前，为了简单我们将使用函数组件。



## 渲染一个组件

以前，我们只遇到了表示 DOM 标签的 React 元素：

```js
const element = <div />;
```

但是，元素也可以表示用户自定义的组件：

```js
const element = <Welcome name="Sara" />;
```

当 React 看到表示用户自定义组件的元素时，它会将 JSX 属性作为单个对象传递给此组件。我们称这个对象为 “属性”。

例如，这段代码在页面上呈现 “Hello, Sara”：

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[在 CodePen 中试试](https://reactjs.org/redirect-to-codepen/components-and-props/rendering-a-component)

让我们回顾一下在这个例子中发生了什么：

1. 我们使用 <Welcome name="Sara" /> 元素调用 ReactDOM.render()。
2. React 使用 {name: 'Sara'} 作为属性调用 Welcome 组件。
3. 我们的 Welcome 组件返回 <h1>Hello, Sara</h1> 元素作为结果。
4. React DOM 有效地更新 DOM 来匹配 <h1>Hello, Sara</h1>。

> 警告：  
> 始终用大写字母开始组件名称。  
> 例如，<div /> 表示一个 DOM 标签，但是 <Welcome /> 表示一个组件，并且要求 Welcome 在范围内。



## 组合组件

组件可以在其输出中引用其他组件。这让我们可以使用相同的组件抽象来实现任何级别的细节。一个按钮，一个表单，一个对话框，一个屏幕：在 React 应用程序中，所有这些都通常表示为组件。

例如，我们可以创建一个渲染 Welcome 多次的 App 组件：

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[在 CodePen 中试试](https://reactjs.org/redirect-to-codepen/components-and-props/composing-components)

通常情况下，新的 React 应用程序在顶部有一个 App 组件。但是，如果您将 React 集成到现有的应用程序中，则可以使用 Button 之类的小组件自下而上地开始，并逐渐走向视图层次结构的顶部。



## 提取组件

不要害怕将组件分解成更小的组件。

例如，考虑这个 Comment 组件：

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[在 CodePen 中试试](https://reactjs.org/redirect-to-codepen/components-and-props/extracting-components)

它接受 author (一个对象)，text (一个字符串), 和 date (一个日期) 作为属性，并且描述在社交媒体网站上的一条评论。

由于所有东西都嵌套在一起，这个组件可能会很难改变，并且很难重用它的各个部分。让我们从中提取一些组件。

首先，我们将提取 Avatar：

```js
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />

  );
}
```

Avatar 并不需要知道它会在 Comment 内渲染。这就是为什么我们给它的属性是一个更通用的名称：user 而不是 author。

我们建议从组件自己的角度来命名属性，而不是使用它的环境。

我们现在可以简化一点 Comment：

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

接下来，我们将提取一个 UserInfo 组件，用于渲染用户名称和旁边的头像：

```js
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

这让我们更进一步简化 Comment：

```js
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[在 CodePen 中试试](https://reactjs.org/redirect-to-codepen/components-and-props/extracting-components-continued)

一开始，提取组件看起来可能像是 grunt 的工作，但是在更大的应用程序中使用可重用组件的工具箱也是值得的。一个好的经验法则是，如果你的 UI 的一部分被多次使用（Button，Panel，Avatar），或者其自身足够复杂（App，FeedStory，Comment），最好变成可重用组件是一个很好的选择。



## 属性是只读的

无论您是将一个组件声明为一个函数还是一个类，它绝不能修改自己的属性。考虑这个 sum 函数：

```js
function sum(a, b) {
  return a + b;
}
```

这样的函数被称为 “[纯函数](https://en.wikipedia.org/wiki/Pure_function)” 因为他们不会尝试改变他们的输入，并且总是为相同的输入返回相同的结果。

相反，这个函数是不纯的，因为它改变了自己的输入：

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React 非常灵活，但它有一个严格的规则：

所有的 React 组件都必须像纯函数一样对其属性进行操作。

当然，应用程序 UI 是动态的，随着时间的推移而变化。在[下一节](https://reactjs.org/docs/state-and-lifecycle.html)中，我们将介绍一个新的 state 的概念。state 允许 React 组件随着时间的推移改变他们的输出，以响应用户操作，网​​络响应和其他任何事情，而不违反这个规则。


















.
