# 提升状态

通常，几个组件需要反映相同的变化数据。我们建议将共享状态提升到最接近的共同祖先。让我们看看这是如何工作的。

在本节中，我们将创建一个温度计算器，计算在给定温度下水是否会沸腾。

我们将从一个名为`BoilingVerdict`的组件开始。它接受`celsius`温度作为属性，并打印是否足够煮沸水：

```js
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

接下来，我们将创建一个名为`Calculator`的组件。它渲染一个`<input>`让您输入温度，并将它的值保存在 this.state.temperature 中。

此外，它将当前输入的值渲染到`BoilingVerdict`组件。

```js
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />

        <BoilingVerdict
          celsius={parseFloat(temperature)} />

      </fieldset>
    );
  }
}
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)



### 添加第二个输入

我们的新要求是，除了一个摄氏度输入，除了一个摄氏度输入，并保持同步。

我们可以从`Calculator`中提取`TemperatureInput`组件开始。我们将增加一个新的`scale`属性，让它可以是`"c"`也可以是`"f"`：

```js
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

我们现在可以改变`Calculator`来渲染两个独立的温度输入：

```js
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/jGBryx?editors=0010)

我们现在有两个输入框，但是当你在其中一个输入温度，另一个不更新。这与我们的要求相矛盾：我们希望保持同步。

我们也无法通过`Calculator`显示`BoilingVerdict`。`Calculator`不知道当前的温度，因为它隐藏在了`TemperatureInput`里面。



### 编写转换函数 Writing Conversion Functions

首先，我们将写两个函数将摄氏度转换成华氏度，和将华氏度转换成摄氏度：

```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

这两个函数转换数字。我们将编写另一个函数，它将字符串`temperature`和转换器函数作为参数，并返回一个字符串。我们将使用它来计算基于另一个输入框的一个输入框的值。

它在无效`temperature`下返回一个空字符串，并保持输出四舍五入到小数点后第三位：

```js
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

例如，`tryConvert('abc', toCelsius)`返回一个空字符串，`tryConvert('10.22', toFahrenheit)`返回`'50.396'`。



### 提升状态 Lifting State Up

目前，两个`TemperatureInput`组件都独立地将其值保持在本地状态：

```js
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...  
  }
}
```

但是，我们希望这两个输入是相互同步的。当我们更新摄氏温度输入框时，华氏温度输入框应该反映转换后的温度，反之亦然。

在 React 中，共享状态是通过将其移动到需要它的组件的最接近的共同祖先来完成的。这被称为“提升状态”。我们将从`TemperatureInput`中移除本地状态，并将其移入`Calculator`中。

如果`Calculator`拥有共享状态，它成为两个输入框中当前温度的“真实来源”。它可以指导他们两个保持相互一致的值。由于两个`TemperatureInput`组件的属性都来自相同的父级`Calculator`组件，两个输入将始终同步。

让我们看看这是如何一步一步工作。

首先，我们将`TemperatureInput`组件中的`this.state.temperature`替换成`this.props.temperature`。现在，让我们假装`this.props.temperature`已经存在，虽然我们将来需要从`Calculator`中传递它：

```js
render() {
  // Before: const temperature = this.state.temperature;
  const temperature = this.props.temperature;
  // ...
}
```

我们知道属性是只读的。当`temperature`是本地状态，`TemperatureInput`只能调用`this.setState()`去改变它。但是，现在属性来自父组件，`TemperatureInput`无法控制它。

在 React 中，这通常通过使组件“受控”来解决。就像 DOM `<input>`同时接受 value 和 onChange 属性一样，自定义`TemperatureInput`可以接受来自其父组件`Calculator`的`temperature`和`onTemperatureChange`属性。

现在，当温度输入框想要更新其温度，它可以调用`this.props.onTemperatureChange`：

```js
handleChange(e) {
  // Before: this.setState({temperature: e.target.value});
  this.props.onTemperatureChange(e.target.value);
  // ...
}
```

> 注意：  
> 自定义组件中的`temperature`或`onTemperatureChange`属性名称没有特殊含义。我们可以叫别的，例如可以给他们一个通用名称：value 和 onChange。

父组件`Calculator`除了提供`temperature`属性，还会提供`onTemperatureChange`属性。它将通过修改自己的本地状态来处理更改，从而将这两个输入框重新渲染为新的值。我们将很快看到新的`Calculator`实现。

在深入更改`Calculator`之前，让我们回顾一下对`TemperatureInput`组件的更改。我们已经从中删除了本地状态，不再读取`this.state.temperature`，而是`this.props.temperature`。当我们想要改变，不调用`this.setState()`，而是调用`Calculator`提供的`this.props.onTemperatureChange()`：

```js
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

现在我们来看一下`Calculator`组件。

我们将把当前输入框的`temperature`和`scale`保存在本地状态。这是我们从输入中“提升”的状态，它将成为两者的“真实来源”。这是为了渲染两个输入框，我们最少需要知道的数据。

例如，如果我们输入 37 到摄氏度输入框，`Calculator`组件的状态将是：

```js
{
  temperature: '37',
  scale: 'c'
}
```

如果我们稍后编辑华氏温度字段为 212，`Calculator`的状态将是：

```js
{
  temperature: '212',
  scale: 'f'
}
```

我们可以存储这两个输入框的值，但事实证明是不必要的。存储最近更改的输入的值就足够了，以及它所代表的`scale`。然后，我们可以根据当前的温度和比例推断另一个输入框的值。

输入会保持同步，因为它们的值是从相同的状态计算得到的：

```js
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />

        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />

        <BoilingVerdict
          celsius={parseFloat(celsius)} />

      </div>
    );
  }
}
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)

现在，不管你编辑哪个输入框，`Calculator`中的`this.state.temperature`和`this.state.scale`都会更新。其中一个输入按原样得到值，所以任何用户输入都会被保留，而另一个输入值总是基于它重新计算。

让我们回顾一下编辑输入框时会发生什么情况：

- React 调用在 DOM `<input>`上指定为`onChange`函数。在我们的例子中，是`TemperatureInput`组件中的`handleChange`方法。

- `TemperatureInput`组件中的`handleChange`方法使用新的期望值调用`this.props.onTemperatureChange()`。它的属性，包括`onTemperatureChange`，是由其父组件`Calculator`提供的。

- 以前，它渲染的时候，`Calculator`已经指定了摄氏`TemperatureInput`的`onTemperatureChange`是`Calculator`的`handleCelsiusChange`方法，而华氏`TemperatureInput`的`onTemperatureChange`是`Calculator`的`handleFahrenheitChange`方法。所以会根据我们编辑的输入框来调用这两个`Calculator`方法。

- 这些方法里面，`Calculator`组件要求 React 使用我们刚刚编辑的输入框输入的新值和当前比例通过调用`this.setState()`来重新渲染自身。

- React 调用`Calculator`组件的`render`方法来了解 UI 的外观。两个输入框的值根据当前温度和比例重新计算。在这里执行温度转换。

- React 使用`Calculator`指定的新属性调用各个`TemperatureInput`组件的渲染方法。它会知道 UI 应该是什么样子。

- React DOM 更新 DOM 以匹配所需的输入值。我们刚刚编辑的输入框接收其当前值，另一个输入框更新到转换后的温度。

每个更新都经过相同的步骤，以保持输入框同步。



### 得到教训 Lessons Learned

对于在 React 应用程序中更改的数据，应该有一个“真实来源”。通常，状态首先被添加到需要渲染的组件中。如果其他组件也需要它，你可以把它提升到最接近的共同祖先。与其试图在不同组件之间同步状态，你应该依靠自上而下的数据流。

提升状态比双向绑定方法要编写更多的“样板”代码，但是有一个好处，更容易找到并隔离 bug。由于任何状态“生活”在某个组件，而且这个组件本身就可以改变它，bug 的接触面大大减小。此外，您可以实现任何自定义逻辑来拒绝或转换用户输入。

如果可以从属性或状态中派生出一些东西，它可能不应该在状态中。例如，不同时存储`celsiusValue`和`FahrenheitValue`，我们只存储最后编辑的`temperature`和它的`scale`。其他输入框的值总是可以根据它们在`render()`方法中计算出来。这让我们可以清除或应用四舍五入到其他字段，而不会丢失用户输入的任何精度。

当你在 UI 中看到错误的时候，您可以使用 [React Developer Tools](https://github.com/facebook/react-devtools) 来检查属性并向上移动树，直到找到负责更新状态的组件。这可以让你跟踪错误的来源：

![Monitoring State in React DevTools](https://d33wubrfki0l68.cloudfront.net/05ade6c3d5ae581cb542d01ac6980aaf703763c5/373b7/react-devtools-state-ef94afc3447d75cdc245c77efb0d63be.gif)

























.
