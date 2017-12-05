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

在 HTML 中，`<input>`，`<textarea>` 和 `<select>` 等表单元素通常会保持其自身的状态并根据用户输入进行更新。在 React 中，可变状态通常保存在组件的状态属性中，只能用 setState() 更新。

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

在 HTML 中，一个 `<textarea>` 元素通过子元素来定义文本：

```html
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

在 React 中，`<textarea>` 使用了一个 value 属性。这样，`<textarea>` 的使用非常类似于 `<input>`：

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



### select 标签

在 HTML 中，`<select>` 创建一个下拉列表。例如，这个 HTML 创建一个下拉列表：

```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

请注意，coconut 选项时初始选中的，因为它有 selected 属性。React 在根 select 标签中使用 value 属性，而不是在具体项上使用 selected 属性。这在受控组件中更方便，因为您只需要在一个地方更新它。例如：

```js
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)

总的来说，`<input type="text">`, `<textarea>`, 和 `<select>` 的工作方式非常类似，他们都接受一个 value 属性，您可以使用它来实现受控组件。

> 注意  
> 您可以将数组传递给 value 属性，从而允许您在 select 标记中选择多个选项：  
> `<select multiple={true} value={['B', 'C']}>`



### 处理多个输入

当您需要处理多个受控`input`元素时，您可以为每个元素添加一个`name`属性，然后让处理函数根据`event.target.name`的值选择要执行的操作。

例如：

```js
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

请注意，我们如何使用 ES6 [computed property name](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) 语法来更新给定 input name 对应的 state key：

```js
this.setState({
  [name]: value
});
```

这相当于这个 ES5 代码：

```js
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

而且，由于 setState() 自动将局部状态合并到当前状态，我们调用它的时候只需要传递改变的部分。



### 受控输入 null 值

在受控组件上指定 value 属性，除非你愿意，用户不能改变这个 input。如果您已经指定了一个 value，但 input 仍然是可编辑的，你可能不小心把 value 设成了 undefined 或 null。

以下代码演示了这一点。（输入首先被锁定，但在短暂的延迟后变为可编辑。）

```js
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```



### 受控组件的替代品

使用受控组件有时可能很乏味，因为您需要为数据可以更改的每种方式编写事件处理程序，并通过 React 组件管理所有输入状态。当您将预先存在的代码库转换为 React 或将 React 应用程序与非 React 库集成时，这会变得特别烦人。在这些情况下，您可能需要查看[不受控制的组件](https://reactjs.org/docs/uncontrolled-components.html)，这是实现输入表单的另一种方法。
















.
