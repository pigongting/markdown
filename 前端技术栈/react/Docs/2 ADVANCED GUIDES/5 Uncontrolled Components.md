# 非受控组件 Uncontrolled Components

在大多数情况下，我们建议使用受控组件来实现表单。在受控组件中，表单数据由 React 组件处理。替代方案是不受控制的组件，其中表单数据由 DOM 本身处理。

编写一个非受控组件，可以使用 ref 从 DOM 获取表单值，而不是为每个状态更新编写一个事件处理程序。

例如，这段代码在一个非受控组件中接受一个 name：
```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/WooRWa?editors=0010)

由于非受控组件在 DOM 中保留了真实的来源，在使用非受控组件时，集成 React 和非 React 代码有时更容易。它也可以少些一点代码，如果你想快速和接受变脏。否则，您通常应该使用受控组件。

如果您仍然不清楚在特定情况下应该使用哪种类型的组件，那么您可能会发现这篇[关于受控与非受控输入的文章](http://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)将有所帮助。




## 默认值 Default Values

在 React 渲染生命周期中，表单元素上的`value`属性将覆盖 DOM 中的值。对于不受控制的组件，您通常希望 React 指定初始值，但是使后续更新不受控制。为了处理这种情况，你可以指定一个`defaultValue`属性而不是`value`。

```js
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={(input) => this.input = input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

同样，`<input type="checkbox">`和`<input type="radio">`支持`defaultChecked`，`<select>`和`<textarea>`支持`defaultValue`。









































.
