# 处理事件

处理 React 元素事件与处理 DOM 元素上的事件非常相似。有一些语法差异：

- React 事件使用 camelCase 命名，而不是小写。
- 由于使用 JSX，您要传递一个函数作为事件处理程序，而不是字符串。

例如，HTML：

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

在 React 中略有不同：

```html
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

另一个区别是你不能返回 false 来防止 React 中的默认行为。您必须显式调用 preventDefault。例如，对于纯 HTML，为了防止打开新页面的默认链接行为，可以这样写：

```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

在 React 中，可能是这样：

```js
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

这里，e 是一个合成事件。React 根据 [W3C 规范](https://www.w3.org/TR/DOM-Level-3-Events/) 定义了这些合成事件。所以你不必担心跨浏览器兼容性。请参阅 [SyntheticEvent](https://reactjs.org/docs/events.html) 参考指南以了解更多信息。

在使用 React 时，通常不需要调用 addEventListener 在创建 DOM 元素之后添加监听器。相反，只需在元素初始呈现时提供一个侦听器。

当您使用 ES6 class 定义组件时，一个常见的模式是事件处理程序是类中的一个方法。例如，这个 Toggle 组件呈现一个按钮，让用户在 “ON” 和 “OFF” 状态之间切换：

```js
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 这个绑定是必要的，确保 this 在回调中可以正常工作
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('this is:', this);
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

[在 CodePen 中试试](http://codepen.io/gaearon/pen/xEmzGg?editors=0010)

在 JSX 回调函数中，你必须小心 this 的含义。在 JavaScript 中，默认情况下类方法没有 [bound](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind)。如果你忘记绑定 this.handleClick 并将其传递给了 onClick，当函数被实际调用时 this 的值将会是 undefined。

这不是 React 个别的行为；它是 [在 JavaScript 中函数如何工作](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/) 的一部分。一般来说，如果你在它后面引用一个没有 () 的方法，比如 onClick = {this.handleClick}，你应该绑定那个方法。

如果调用 bind 会让你烦恼，那么有两种方法可以解决这个问题。如果您正在使用实验性[公共类字段语法](https://babeljs.io/docs/plugins/transform-class-properties/)，你可以使用 class 字段来正确地绑定回调：

```js
class LoggingButton extends React.Component {
  // 这个语法确保 this 被绑定在 handleClick 中。
  // 警告：这是*实验*语法。
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

在 Create React App 中默认启用此语法。

如果您不使用类字段语法，则可以在回调中使用箭头函数：

```js
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 这个语法确保 this 被绑定在 handleClick 中。
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

这个语法的问题是每次 LoggingButton 渲染时都会创建一个不同的回调函数。在大多数情况下，这很好。但是，如果这个回调作为一个属性传递给组件，这些组件可能会做额外的重新渲染。我们通常建议在构造函数中绑定或使用类字段语法，以避免这种性能问题。



## 将参数传递给事件处理程序

在循环内部，通常需要将一个额外的参数传递给事件处理程序。例如，如果 id 是行 ID，则下面任一项都可以工作：

```html
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

上面两行是等价的，分别使用箭头函数和 Function.prototype.bind。

在这两种情况下，表示 React 事件的 e 参数将作为 ID 之后的第二个参数传递。使用箭头函数，我们必须明确地传递它，但是通过 bind，任何更远的参数都会被自动转发。





























.
