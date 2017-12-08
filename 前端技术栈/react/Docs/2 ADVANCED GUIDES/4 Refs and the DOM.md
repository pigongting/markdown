# Refs and the DOM

在典型的 React 数据流中，props 是父组件与子组件互动的唯一方式。要修改一个子组件，你要用新的 props 重新渲染它。但是，在少数情况下，您需要在典型的数据流之外强制修改子组件。要修改的子组件可以是 React 组件的一个实例，也可以是 DOM 元素。对于这两种情况，React 都提供了一个逃生舱口。




## 什么时候使用 Refs When to Use Refs

对于 refs，有几个很好的用例：

- 管理焦点，文本选择，或媒体播放。

- 触发势在必行的动画。

- 与第三方 DOM 库集成。

避免使用 refs 来处理可以通过声明来完成任何事情。

例如，不要在`Dialog`组件上暴露`open()`和`close()`方法，而是向它传递一个`isOpen`属性。




## 不要过度使用 Refs Don’t Overuse Refs

你使用 Refs 的第一个意愿可能是在你的应用程序中“让事情发生”。如果是这样的话，花一点时间，更仔细地考虑组件层次结构中哪里应该拥有 state。通常情况下，很显然，层次结构中处于更高层次的组件是拥有 state 的最合适的地方。有关这方面的示例，请参阅[提升状态](https://reactjs.org/docs/lifting-state-up.html)指南。




## 添加一个 Ref 到 DOM 元素 Adding a Ref to a DOM Element

React 支持一个可以附加到任何组件的特殊的属性。ref 属性需要一个回调函数，并在组件挂载或卸载后立即执行回调。

当在 HTML 元素上使用`ref`属性时，`ref`回调接收基础 DOM 元素作为其参数。例如，此代码使用 ref 回调函数来存储对 DOM 节点的引用：
```js
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 使用原始 DOM API 显式地聚焦文本输入框
    this.textInput.focus();
  }

  render() {
    // 使用 `ref`回调函数将文本输入框 DOM 元素的引用存储到实例字段中（例如：this.textInput）
    return (
      <div>
        <input
          type="text"
          ref={(input) => { this.textInput = input; }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

React 将在组件挂载时使用 DOM 元素调用`ref`回调函数，并在卸载时用`null`调用它。`ref`回调函数会在生命周期钩子`componentDidMount`和`componentDidUpdate`执行之前调用。

使用`ref`回调函数来设置类的属性是访问 DOM 元素的常见模式。首选的方法是像上例中那样在`ref`回调函数中设置属性。甚至有一个更短的写法：`ref={input => this.textInput = input}`。




## 将一个 Ref 添加到一个类组件 Adding a Ref to a Class Component

在声明为类的自定义组件上使用`ref`属性时，`ref`回调函数接收组件的挂载实例作为其参数。例如，如果我们想封装上面的`CustomTextInput`来模拟挂载后立即点击它：
```js
class AutoFocusTextInput extends React.Component {
  componentDidMount() {
    this.textInput.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput
        ref={(input) => { this.textInput = input; }} />
    );
  }
}
```

请注意，这只有在 CustomTextInput 被声明为类时才有效：
```js
class CustomTextInput extends React.Component {
  // ...
}
```




## Refs 和函数组件 Refs and Functional Components

**您不能在函数组件上使用 ref 属性** 因为他们没有实例：
```js
function MyFunctionalComponent() {
  return <input />;
}

class Parent extends React.Component {
  render() {
    // 这样将不会工作
    return (
      <MyFunctionalComponent
        ref={(input) => { this.textInput = input; }} />
    );
  }
}
```

如果需要使用`ref`，则应该将组件转换为类组件，就像你需要生命周期方法或状态一样。

然而，**函数组件内部是可以使用`ref`属性** 只要引用的是 DOM 元素或类组件：
```js
function CustomTextInput(props) {
  // textInput 必须在这里声明，以便 ref 回调函数可以引用它
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );  
}
```




## 将 DOM Refs 暴露给父组件 Exposing DOM Refs to Parent Components

在极少数情况下，您可能希望从父组件访问子组件的 DOM 节点。这通常不被推荐因为它打破了组件封装，但对于触发焦点或测量子 DOM 节点的大小或位置有时可能有用。

虽然你可以添加一个 ref 到子组件，这不是一个理想的解决方案，因为你只会得到一个组件实例而不是一个 DOM 节点。此外，这不适用于函数组件。

相反，在这种情况下，我们建议给子组件一个特殊的 prop。这个子组件会用一个任意的名字（如：`inputRef`）将一个函数属性带上，并将它作为`ref`属性附加到 DOM 节点。这可以让父组件通过中间组件将其 ref 回调函数传递给子组件的 DOM 节点。

这适用于类和函数组件。

```js
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

在上面的例子中，`Parent`将它的`ref`回调函数作为`inputRef`属性传递给`CustomTextInput`，并且`CustomTextInput`将与特殊的`ref`属性相同的函数传递给`<input>`。因此，`Parent`中的`this.inputElement`将被设置为与`CustomTextInput`中`<input>`元素对应的 DOM 节点。

请注意，上例中`inputRef`属性的名称没有特殊含义，因为它是常规组件 prop。然而，在`<input>`上使用的`ref`属性很重要，因为它告诉 React 将 ref 附加到它的 DOM 节点上。

即使`CustomTextInput`是一个函数组件，它也可以工作。不像只能为 DOM 元素和类组件指定的特殊的`ref`属性，像`inputRef`这样的常规组件属性没有限制。

这种模式的另一个好处是，它深入地处理了几个组件。例如，假设`Parent`不需要 DOM 节点，但是一个渲染`Parent`组件的组件（我们称之为“祖父”）需要访问它。我们可以让`Grandparent`指定`inputRef`属性到`Parent`，让`Parent`转发到`CustomTextInput`：
```js
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

function Parent(props) {
  return (
    <div>
      My input: <CustomTextInput inputRef={props.inputRef} />
    </div>
  );
}


class Grandparent extends React.Component {
  render() {
    return (
      <Parent
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

这里，`Grandparent`首先指定 ref 回调函数。它传递一个名为`inputRef`的常规属性给`Parent`，`Parent`也将它作为属性传递给`CustomTextInput`。最后，`CustomTextInput`读取`inputRef`属性，并将传递的函数作为`ref`属性附加到`<input>`。因此，`Grandparent`中的`this.inputElement`将被设置为与`CustomTextInput`中的`<input>`元素对应的 DOM 节点。

从各方面考虑，我们建议尽可能不暴露 DOM 节点，但是，这可能是一个有用的逃生舱口。请注意，这种方法要求您将一些代码添加到子组件。如果你完全不能控制子组件的实现，你最后的选择是使用 [findDOMNode()](https://reactjs.org/docs/react-dom.html#finddomnode)，但不鼓励使用它。




## 旧版 API：字符串 Refs  Legacy API: String Refs

如果你之前使用过 React，您可能熟悉旧 API 中 ref 属性是字符串的，如`"textInput"`，并且 DOM 节点以`this.refs.textInput`的形式访问。我们建议不要这样做，因为字符串 refs 有一些问题，它被认为是遗留的，并且 **可能在未来的版本中被删除**。如果您正在使用`this.refs.textInput`来访问`ref`，我们建议使用回调模式替代。




## 注意事项 Caveats

如果 ref 回调函数被定义为内联函数，它会在更新期间被调用两次，首先用`null`，然后再用 DOM 元素。这是因为每个渲染都会创建一个新的函数实例，所以 React 需要清除旧的`ref`并设置新的`ref`。您可以通过将`ref`回调函数定义为该类的绑定方法来避免这种情况，但请注意，在大多数情况下，这应该不重要。












.
