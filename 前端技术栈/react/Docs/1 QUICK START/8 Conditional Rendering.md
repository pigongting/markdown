# 有条件的渲染

在 React 中，你可以创建不同的组件来封装你需要的行为。然后，根据应用程序的状态，只渲染其中的一部分。

React 中的条件渲染与 JavaScript 中的条件工作方式相同。使用 JavaScript 运算符（如 if 或条件运算符）来创建表示当前状态的元素，并让 React 更新 UI 以匹配它们。

考虑这两个组件：

```js
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

我们将创建一个 Greeting 组件，根据用户是否登录来显示这些组件中的一个：

```js
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

此示例根据 isLoggedIn prop 的值渲染不同的问候语。



### 元素变量

您可以使用变量来存储元素。这可以帮助您有条件地渲染组件的一部分，而其余的输出不会改变。

考虑这两个代表注销和登录按钮的新组件：

```js
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

在下面的例子中，我们将创建一个名为 LoginControl 的有状态组件。

它将根据当前状态渲染 <LoginButton /> 或 <LogoutButton />。

它也将渲染前面例子中的 <Greeting />：

```js
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

虽然声明变量并使用 if 语句是条件渲染组件的好方法，但有时您可能需要使用更短的语法。如下所述，有几种方法可以在 JSX 中内联条件。



### 通过逻辑操作符 && 内联 If

你可以在 JSX 中嵌入任何表达式，用大括号括起来。包括 JavaScript 逻辑操作符 &&。它可以方便的在一个元素中包含条件：

```js
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

它可以工作，因为在 JavaScript 中，true && expression 总被评估为 expression，false && expression 总被评估为 false。

那么，如果条件为 true，&& 右边的元素将出现在输出中。如果是 false，React 会忽略并跳过它。




### 通过条件操作符内联 If-Else

内联条件渲染元素的另一种方法是使用 JavaScript 条件运算符 condition ? true : false

在下面的例子中，我们使用它来有条件地渲染一小块文本。

```js
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

它也可以用于更大的表达式尽管不太容易理解：

```js
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

就像在 JavaScript 中一样，您可以根据您和您的团队认为更具可读性来选择合适的样式。还要记住，只要条件变得太复杂，可能是提取组件的好时机。



### 防止组件渲染

在极少数情况下，您可能希望组件能够隐藏自己，即使它是由另一个组件渲染的。为此，返回 null 代替它的渲染输出。

在下面的示例中，<WarningBanner /> 根据名为 warn 的属性的值来渲染。如果属性的值是 false，那么该组件不会渲染：

```js
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

从组件的 render 方法返回 null 不会影响组件生命周期方法的触发。例如，componentWillUpdate 和 componentDidUpdate 仍然会被调用。
































.
