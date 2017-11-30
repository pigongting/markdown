# 状态和生命周期

考虑上一节中的[滴答时钟示例](https://reactjs.org/docs/rendering-elements.html#updating-the-rendered-element)。

到目前为止，我们只学到了一种更新 UI 的方法。

我们调用 ReactDOM.render() 来更改渲染的输出：

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

在本节中，我们将学习如何使 Clock 组件真正重用和封装。它将设置自己的计时器，并且每秒更新一次。

我们可以开始封装 clock 的外观：

```js
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[在 CodePen 中试试](http://codepen.io/gaearon/pen/dpdoYR?editors=0010)

但是，它却忽略了一个关键的要求：每秒更新一次 UI 的定时器应该是 Clock 的细节。

理想情况下，我们只想写一次，并且 Clock 可以自己更新：

```js
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

为了实现这个，我们需要给 Clock 组件添加 state。

State 类似于属性，但它是私有的，完全由组件控制。

我们之前提到，定义为类的组件具有一些额外的特性。本地 state 正是这样的：只有类才有的特性。



## 将函数转换为类

您可以按五个步骤将 Clock 等函数组件转换为类组件：

1. 创建一个继承了 React.Component 的 [ES6 类](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)，名字和函数组件相同。
2. 向其添加一个名为 render() 的空方法。
3. 将函数的主体移到 render() 方法中。
4. 在 render() 主体中用 this.props 替换 props。
5. 删除剩余的空函数声明。

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[在 CodePen 中试试](http://codepen.io/gaearon/pen/zKRGpo?editors=0010)

Clock 现在被定义为一个类而不是一个函数。

这使我们可以使用附加特性，例如本地状态和生命周期挂钩。






















.
