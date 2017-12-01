# Forms

在 React 中 HTML 表单元素与其他 DOM 元素有点不同，因为表单元素天然的会保持一些内部状态。例如，这个纯 HTML 格式的表单接受一个 name：

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

当用户提交表单时，这个表单具有默认的 HTML 表单行为：浏览一个新的页面。如果你想在 React 中使用这种行为，它可以工作。但在大多数情况下，使用 JavaScript 函数可以方便地处理表单的提交，并可以访问用户在表单中输入的数据。实现这一目标的标准方法是使用称为 “受控组件” 的技术。



## 受控组件

在 HTML 中，<input>，<textarea> 和 <select> 等表单元素通常会保持其自身的状态并根据用户输入进行更新。在 React 中，可变状态通常保存在组件的状态属性中，只能用 setState() 更新。

我们可以通过使 React state 成为 “单一的真实来源” 将两者结合。根据用户随后在表单中的输入控制 React 组件渲染的表单。这种由 React 控制值的输入的表单元素被称为 “受控组件”。

例如，如果我们想要使前面的示例在提交时 log name，我们可以将表单编写为受控组件：

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)

由于 value 属性是在我们的表单元素上设置的，显示的值将始终是 this.state.value，React state 成了真实的来源。由于每次击键都会运行 handleChange 来更新 React state，显示的值将随用户输入而更新。

使用受控组件，每个状态变华都会有一个关联的处理函数。这使得修改或验证用户输入变得直截了当。例如，如果我们想强制使用全部大写字母来编写名称，我们可以将 handleChange 写为：

```js
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```



### textarea 标签

在 HTML 中，一个 <textarea> 元素通过子元素来定义文本：

```html
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

在 React 中，<textarea> 使用了一个 value 属性。这样，<textarea> 的使用非常类似于 <input>：

```js
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

请注意，this.state.value 是在构造函数中初始化的，所以文本域一开始就有一些文本。






























.
