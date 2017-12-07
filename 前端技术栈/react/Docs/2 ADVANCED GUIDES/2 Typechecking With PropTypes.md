# 用 PropTypes 进行类型检查 Typechecking With PropTypes

> 注意：
> 从 React v15.5 开始，React.PropTypes 移到了另一个软件包。请改用 [prop-types](https://www.npmjs.com/package/prop-types) 库。
> 我们提供了一个 [codemod](https://reactjs.org/blog/2017/04/07/react-v15.5.0.html#migrating-from-reactproptypes) 脚本来自动化转换。

随着您的应用程序的增长，你可以通过类型检查来捕捉很多错误。对于一些应用，你可以使用像[Flow](https://flowtype.org/)或[TypeScript](https://www.typescriptlang.org/)这样的 JavaScript 扩展来检查整个应用程序。但即使你不使用这些，React 也有一些内置的类型检测功能。要在组件的属性上运行类型检查，可以指定特殊的`propTypes`属性：
```js
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

`PropTypes`导出一系列验证器，这些验证器可以用来确保您收到的数据是有效的。在这个例子中，我们使用`PropTypes.string`。当一个属性提供了一个无效的值，JavaScript 控制台将显示警告。出于性能方面的考虑，propTypes 只在开发模式下检查。



### PropTypes

下面的例子记录了提供的不同验证器：
```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以声明，一个属性是一个特定的 JS 原生类型。默认情况下，这些都是可选的
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可以渲染的东西：numbers, strings, elements 或者一个 array （或 fragment）包含这些类型
  optionalNode: PropTypes.node,

  // 一个 React 元素
  optionalElement: PropTypes.element,

  // 你也可以声明一个 prop 是一个类的实例。这使用 JS 的 instanceof 操作符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 您可以将您的属性进行枚举处理，以确保您的属性被限制在特定的值。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个可以是多个类型的对象
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 一个特定类型的数组
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 具有特定类型属性值的对象
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 呈现一个特定外观的对象
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // 你可以用 `isRequired` 连接上面的任何一个来确保如果属性没有提供，则显示一个警告。
  requiredFunc: PropTypes.func.isRequired,

  // 任何数据类型的值
  requiredAny: PropTypes.any.isRequired,

  // 您也可以指定一个自定义验证器。如果验证失败，它应该返回一个 Error 对象。不要使用 `console.warn` 或 throw，因为这在 `oneOfType`内不起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 你也可以给 `arrayOf`和 `objectOf`提供一个自定义的验证器。
  // 如果验证失败，它应该返回一个 Error 对象。
  // 验证器将被数组或对象中的每个 key 调用。
  // 验证器的第一个参数是数组或对象本身，第二个参数是当前项的 key。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```



### Requiring Single Child

使用`PropTypes.element`，您可以指定只有一个 Child 可以作为 Child 传递给一个组件。

```js
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // 必须存在一个元素，否则它会出现警告
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```



### Default Prop Values

您可以通过分配特殊的`defaultProps`属性来定义`props`的默认值：
```js
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 为 props 指定默认值
Greeting.defaultProps = {
  name: 'Stranger'
};

// 渲染 "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

如果您正在使用一个 Babel 变换器，如[transform-class-properties](https://babeljs.io/docs/plugins/transform-class-properties/)，你也可以在 React 组件类中声明`defaultProps`作为静态属性。这个语法尚未完成，需要一个编译步骤才能在浏览器中工作。有关更多信息，请参阅[class fields proposal](https://github.com/tc39/proposal-class-fields)。

```js
class Greeting extends React.Component {
  static defaultProps = {
    name: 'stranger'
  }

  render() {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}
```

如果在父组件没有指定，则使用`defaultProps`来确保`this.props.name`有值。`propTypes`类型检查发生在`defaultProps`解析之后，所以类型检查对`defaultProps`也适用于。

















.
