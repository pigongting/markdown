# 渲染元素

元素是 React 应用程序的最小构建块。

一个元素描述了你想要在屏幕上看到的内容：

```js
const element = <h1>Hello, world</h1>;
```

与浏览器的 DOM 元素不同，React 元素是普通的对象，创建起来很廉价。

React DOM 负责更新 DOM 以匹配 React 元素。

> 注意：  
> 人们可能会将元素与更广为人知的 “组件” 概念混为一谈。我们将在 [下一节](https://reactjs.org/docs/components-and-props.html) 介绍组件。组件是由元素组成的，我们鼓励您在跳过之前阅读本节。

## 将元素渲染到 DOM 中

假设你的 HTML 文件中有一个 <div>：

```js
<div id="root"></div>
```

我们称之为 “根” DOM 节点，因为它内部的一切都将由 React DOM 进行管理。

使用 React 构建的应用程序通常只有一个根 DOM 节点。如果您将 React 集成到现有的应用程序中，则可以拥有多个孤立的根 DOM 节点。

要将 React 元素渲染到根 DOM 节点中，请将两者都传递给 ReactDOM.render()：

```js
const element = <h1>Hello, world</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[在 CodePen 中试试](http://codepen.io/gaearon/pen/rrpgNB?editors=1010)

它在页面上显示 “Hello, world”。

## 更新渲染的元素

React 元素是[不可变的](https://en.wikipedia.org/wiki/Immutable_object)。一旦创建了一个元素，就不能更改其子元素或属性。一个元素就像电影中的一个帧：它代表了某个时间点的 UI。

根据我们迄今的知识，更新 UI 的唯一方法是创建一个新元素，并将其传递给 ReactDOM.render()。

考虑这个滴答的时钟的例子：

```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[在 CodePen 中试试](http://codepen.io/gaearon/pen/gwoJZk?editors=0010)

它每秒从一个 setInterval() 回调中调用 ReactDOM.render()。

> 注意：  
> 实际上，大多数 React 应用程序只调用一次 ReactDOM.render()。在下一节中，我们将学习如何将这些代码封装到 [有状态的组件](https://reactjs.org/docs/state-and-lifecycle.html) 中。
> 我们建议您不要跳过主题，因为它们彼此相互构建。


## React 仅在必要的时候更新

React DOM 将元素及其子元素与前一元素进行比较，并仅应用必要的 DOM 更新以使 DOM 达到所需的状态。

您可以通过浏览器工具检查 [最后一个例子](http://codepen.io/gaearon/pen/gwoJZk?editors=0010) 来验证：

尽管我们创建了一个描述整个 UI 树的元素，但是只有内容已经改变的文本节点被 React DOM 更新了。

根据我们的经验，UI 在任何特定的时刻的样子而不是随着时间的推移如何改变的思维方式可以消除一整类的错误。

























.
