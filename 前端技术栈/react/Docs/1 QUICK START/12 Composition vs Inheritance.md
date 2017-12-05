# 组合与继承 Composition vs Inheritance

React 有一个强大的组合模型，我们建议使用组合而不是继承来重用组件之间的代码。

在本节中，我们将考虑一些新的 React 开发人员经常接触到的问题，并展示如何用组合来解决它们。



### 容器 Containment

有些组件事先不知道他们的子组件。这对于代表通用“盒子”的组件（如 Sidebar 或 Dialog）是特别常见的。我们建议这样的组件使用特殊的`children`属性将子元素直接传递到他们的输出：

```js
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

这可以让其他组件通过嵌套 JSX 来传递任意子对象：

```js
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)

任何在`<FancyBorder>` JSX 标签内的东西都会作为`children`属性传入到`FancyBorder`组件中。由于`FancyBorder`在`<div>`内会渲染`{props.children}`，传递的元素出现在最终的输出中。

虽然这种情况不太常见，但是有时您可能需要在组件中出现多个“漏洞”。在这种情况下，你可以建立你自己的约定而不是使用`children`：

```js
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

React 元素如 <Contacts /> 和 <Chat /> 就是对象，所以你可以像任何其他数据一样将它们作为属性传递。



### 特例 Specialization

有时我们想某个组件是其他组件的特例。例如，我们可以说`WelcomeDialog`是`Dialog`的一个特例。

在 React 中，这也是通过组合来实现的，一个更特例的组件渲染出自一个更通用的组件，并通过 props 配置它：

```js
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />

  );
}
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

对于类定义的组件，组合的作用同样好：

```js
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />

        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)



### 那么继承呢？ So What About Inheritance?

在 Facebook，我们在成千上万的组件中使用了 React，而且我们还没有发现任何建议通过继承层次结构创建组件的用例。

属性和组合为您提供了所有需要的灵活性，以明确和安全的方式自定义组件的外观和行为。请记住，组件可以接受任意属性，包括原始值，React 元素或函数。

如果你想在组件之间重用非 UI 功能，我们建议把它提取到一个单独的 JavaScript 模块中。组件可以将其导入并使用该函数，对象或类，而不用继承它。





































.
