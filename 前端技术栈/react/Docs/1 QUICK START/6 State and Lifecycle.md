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

这使我们可以使用附加特性，例如本地状态和生命周期钩子。



## 添加本地状态到类

我们分三个步骤将 date 从属性移动到状态：

1. 将 render() 方法中的 this.props.date 替换为 this.state.date：

    ```js
    class Clock extends React.Component {
      render() {
        return (
          <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          </div>
        );
      }
    }
    ```

2. 添加一个 [类的构造函数](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor) 来指定初始的 this.state：

    ```js
    class Clock extends React.Component {
      constructor(props) {
        super(props);
        this.state = {date: new Date()};
      }

      render() {
        return (
          <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          </div>
        );
      }
    }
    ```

    注意我们如何传递 props 给基础构造函数：

    ```js
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
    ```

    类组件应该总是使用 props 调用基础构造函数。

3. 从 <Clock /> 元素中删除 date 属性：

    ```js
    ReactDOM.render(
      <Clock />,
      document.getElementById('root')
    );
    ```

稍后，我们会将计时器代码添加到组件自身。

结果如下所示：

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[在 CodePen 中试试](http://codepen.io/gaearon/pen/KgQpJd?editors=0010)

接下来，我们让 Clock 设置自己的计时器，并每秒更新一次。



## 将生命周期方法添加到类

在具有许多组件的应用中，组件被销毁时释放所占用的资源是非常重要的。

我们希望在第一次将 Clock 渲染成 DOM 时设置一个计时器。这在 React 中被称为 “挂载”。

我们也想当由 Clock 生成的 DOM 被移除时清除那个定时器。这在 React 中被称为 “卸载”。

我们可以在组件类上声明特殊方法来在组件装载和卸载时运行一些代码：

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

这些方法被称为 “生命周期钩子”。

componentDidMount() 钩子在组件输出被渲染给 DOM 之后运行。这是一个设置计时器的好地方：

```js
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

this.props 是由 React 自身设置的，this.state 也有特殊的含义，如果您需要存储某些不用于视觉输出的内容，则可以自由向该类手动添加其他字段。

如果你在 render() 中不使用某些东西，它不应该将它添加到 state。

我们将在 componentWillUnmount() 生命周期钩子中拆除计时器：

```js
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

最后，我们将实现一个 Clock 组件将每秒运行一次的 tick() 方法。

它将使用 this.setState() 来更新组件的本地 state：

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[在 CodePen 中试试](http://codepen.io/gaearon/pen/amqdNA?editors=0010)

现在时钟每秒钟都在滴答。

让我们快速回顾一下发生了什么以及方法调用的顺序：

1. 当 <Clock /> 传递给 ReactDOM.render() 时，React 调用 Clock 组件的构造函数。由于 Clock 需要显示当前时间，因此它会使用包含当前时间的对象来初始化 this.state。我们稍后会更新这个状态。
2. 然后 React 调用 Clock 组件的 render() 方法。在这里 React 了解到屏幕上应该显示的内容。然后 React 更新 DOM 以匹配 Clock 的渲染输出。
3. 当 Clock 插入到 DOM 时，React 调用 componentDidMount() 生命周期钩子。在它里面，Clock 组件要求浏览器设置一个定时器来每秒调用一次组件的 tick() 方法。
4. 浏览器每秒调用 tick() 方法。在它里面，Clock 组件通过用包含当前时间的对象调用 setState() 来安排 UI 更新。感谢 setState() 调用，React 知道状态已经改变，并再次调用 render() 方法来了解屏幕上应该显示的内容。这次，render() 方法中的 this.state.date 将会不同，所以渲染输出将包含更新的时间。React 会相应地更新 DOM。
5. 如果 Clock 组件被从 DOM 中移除，React 调用 componentWillUnmount() 生命周期钩子，定时器停止。



## 正确使用状态

关于 setState() 你应该知道的三件事。


### 不要直接修改状态

例如，这不会重新渲染组件：

```js
// Wrong
this.state.comment = 'Hello';
```

相反，使用 setState()：

```js
// Correct
this.setState({comment: 'Hello'});
```

唯一可以指定 this.state 的地方是构造函数。


### 状态更新可能是异步的

React 可能会将多个 setState() 调用批量处理为单个更新以提高性能。

因为 this.props 和 this.state 可能会异步更新，所以不应该依赖它们的值来计算下一个状态。

例如，此代码可能无法更新计数器：

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

为了解决这个问题，使用接受函数而不是对象的第二种形式的 setState()。该函数将接收前一个状态作为第一个参数，并将更新应用时的 props 作为第二个参数：

```js
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

上面我们使用了[箭头函数](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，但它也适用于常规函数：

```js
// Correct
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```


### 状态更新被合并

当你调用 setState() 时，React 将你提供的对象合并到当前状态。

例如，你的状态可能包含几个独立变量：

```js
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

然后你可以分开调用 setState() 来单独地更新它们：

```js
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

这个合并很浅，所以 this.setState({comments}) 离开 this.state.posts 完好无损，但完全替换了 this.state.comments。



## 数据向下流

无论是父组件还是子组件都不知道某个组件是有状态的或无状态的，并且他们不应该关心它是被定义为一个函数还是一个类。

这就是为什么 state 经常被称为本地的或封装的。除了拥有和设置它的组件之外，任何组件都无法访问它。

组件可以选择将其状态作为属性传递给其子组件：

```js
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

这也适用于用户自定义的组件：

```js
<FormattedDate date={this.state.date} />
```

FormattedDate 组件将在其属性中接收到 date，并不知道它是来自 Clock 的 state，来自 Clock 的 props，还是手动输入的：

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

[在 CodePen 中试试](http://codepen.io/gaearon/pen/zKRqNB?editors=0010)

这通常被称为 “自上而下” 或 “单向” 数据流。任何状态总是由某个特定组件所拥有，并且从该状态派生的任何数据或 UI 只能影响树中 “在其下面” 的组件。

如果将组件树想像为属性的瀑布，则每个组件的状态就像是一个额外的水源，它在任意点加入，但是也会流下来。

为了显示所有组件都是真正隔离的，我们可以创建一个呈现三个 <Clock> 的 App 组件：

```js
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[在 CodePen 中试试](http://codepen.io/gaearon/pen/vXdGmd?editors=0010)

每个 Clock 设置自己的计时器并独立更新。

在 React 应用程序中，无论组件是有状态的还是无状态的，都被认为是组件的实现细节，可能随时间而改变。您可以在有状态组件内使用无状态组件，反之亦然。
























.
