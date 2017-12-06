# 深入 JSX JSX In Depth

从根本上说，JSX 只是`React.createElement(component, props, ...children)`函数的语法糖。

JSX 代码：
```html
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

编译成：
```js
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

如果没有子元素，你可以使用自闭形式的标签。所以：
```html
<div className="sidebar" />
```

编译成：
```js
React.createElement(
  'div',
  {className: 'sidebar'},
  null
)
```

如果你想要测试某些特定的 JSX 怎么被转换成 JavaScript，你可以试试[Babel在线编译](https://babeljs.io/repl/#?presets=react&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA)




## 指定 React 元素类型 Specifying The React Element Type

JSX 标签的第一部分决定了 React 元素的类型。

大写的类型表示 JSX 标签引用了一个 React 组件。这些标签被编译成指定变量的直接引用，所以如果你使用 JSX `<Foo />`表达式，`Foo`必须在作用域内。



### React 必须在作用域内 React Must Be in Scope

由于 JSX 编译成`React.createElement`调用，React 库必须始终处于 JSX 代码的作用域内。

例如，这个代码中的两个导入都是必需的，即使`React`和`CustomButton`在 JavaScript 没有直接引用：
```js
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
```

如果您不使用 JavaScript 打包器，通过`<script>`标签加载 React，`React`已经在全局作用域内。



### 为 JSX 类型使用点符号 Using Dot Notation for JSX Type

您也可以在 JSX 中使用点符号来引用 React 组件。这对于一个可以导出许多 React 组件的模块来说很方便。例如，如果`MyComponents.DatePicker`是一个组件，你可以直接在 JSX 中使用它：
```js
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```



### 用户定义的组件必须大写 User-Defined Components Must Be Capitalized

当元素类型以小写字母开头时，它指的是一个内置的组件，如`<div>`或者`<span>`，结果是一个字符串'div'或'span'传递给`React.createElement`。以大写字母开头的类型，如`<Foo />`编译成`React.createElement(Foo)`，并对应 JavaScript 文件中定义或导入的组件。

我们建议用大写字母命名组件。如果您确实有一个以小写字母开头的组件，在 JSX 中使用它之前，将它分配给一个大写的变量。

例如，此代码将不会按预期方式运行：
```js
import React from 'react';

// 错误！这是一个组件，应该大写：
function hello(props) {
  // 正确！这个 <div> 的用法是对的，因为 div 是一个有效的 HTML 标签：
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // 错误！React 认为 <hello /> 是一个 HTML 标签，因为它没有大写：
  return <hello toWhat="World" />;
}
```

为了解决这个问题，我们将`hello`重命名为`Hello`，引用它时使用`<Hello />`：
```js
import React from 'react';

// Correct! This is a component and should be capitalized:
function Hello(props) {
  // Correct! This use of <div> is legitimate because div is a valid HTML tag:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // Correct! React knows <Hello /> is a component because it's capitalized.
  return <Hello toWhat="World" />;
}
```



### 在运行时选择类型 Choosing the Type at Runtime

您不能使用通用表达式作为 React 元素类型。如果您确实想使用通用表达式来作为元素的类型，首先需要将其分配给大写变量。当你想基于属性渲染不同的组件时，经常会出现这种情况：
```js
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 错误！JSX 类型不能是一个表达式。
  return <components[props.storyType] story={props.story} />;
}
```

为了解决这个问题，我们首先将类型赋值给一个大写的变量：
```js
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 正确！JSX 可以是一个大写的变量
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```




## JSX 中的属性 Props in JSX

在 JSX 中有几种不同的方法可以指定属性。



### JavaScript 表达式作为属性 JavaScript Expressions as Props

您可以传递任何 JavaScript 表达式作为属性，使用`{}`将它括起来。例如，在这个 JSX 中：
```html
<MyComponent foo={1 + 2 + 3 + 4} />
```
对于`MyComponent`，`props.foo`的值将是`10`，因为表达式`1 + 2 + 3 + 4`会被计算。


`if`语句和`for`循环在 JavaScript 中不是表达式，所以它们不能直接在 JSX 中使用。相反，你可以把它们放在周围的代码中。例如：
```js
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return <div>{props.number} is an {description} number</div>;
}
```

您可以了解更多关于[条件渲染](https://reactjs.org/docs/conditional-rendering.html)和[循环](https://reactjs.org/docs/lists-and-keys.html)的相关章节。



### 字符串文字 String Literals

你可以传递一个字符串作为属性。这两个 JSX 表达式是等价的：
```html
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />
```

当你传递一个字符串时，它的值是 HTML-unescaped 的。所以这两个 JSX 表达式是等价的：
```html
<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
```
这种行为通常是不相关的。在这里提到只是为了完整性。



### 属性默认为 "true" Props Default to “True”

如果你传递一个没有值的属性，它默认是`true`。这两个JSX表达式是等价的：
```html
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

一般来说，我们不推荐使用它，因为它可能与`{foo：foo}`而不是`{foo：true}`的[ES6 object shorthand](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015)`{foo}`混淆。这种行为只是为了匹配 HTML 的行为。



### 扩展属性 Spread Attributes

如果你已经有的`props`是一个对象，而且你想在 JSX 中传递它，你可以使用`...`扩展操作符来传递整个 props 对象。这两个组件是等价的：
```js
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

你也可以选择你的组件将要消耗的特定的 props，同时使用扩展操作符传递所有其他的属性。

```js
const Button = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  );
};
```

在上面的例子中，kind 属性是安全消耗的，而不是传递给 DOM 中的`<button>`元素。所有其他属性都通过`...other`对象传递使这个组件非常灵活。你可以看到它传递了一个`onClick`和`children`属性。

扩展属性是可以使用的，但也可以很容易地将不必要的属性传递给组件，如将它们不关心或将无效的 HTML 属性传递给 DOM。我们建议少用这个语法。




## JSX 中的 Children Children in JSX

在同时包含开始标签和结束标签的 JSX 表达式中，这些标签之间的内容作为特殊的属性：`props.children`传递。有几种不同的方式来传递 children：



### 字符串文字 String Literals

你可以在开始和结束标签之间放置一个字符串，`props.children`就是那个字符串。这对于许多内置的 HTML元素很有用。例如：
```html
<MyComponent>Hello world!</MyComponent>
```

这是有效的 JSX，`MyComponent`中的`props.children`只是字符串`"Hello world！"`。HTML 是非转义的，所以你通常可以编写 JSX，就像你用这种方式写 HTML 一样：
```html
<div>This is valid HTML &amp; JSX at the same time.</div>
```

JSX 删除一行的开头和结尾的空格。它也删除空行。与标签相邻的新行被删除；发生在字符串中间的新行被压缩成一个空格。所以这些渲染的东西都是相同的：
```html
<div>Hello World</div>

<div>
  Hello World
</div>

<div>
  Hello
  World
</div>

<div>

  Hello World
</div>
```



### JSX Children

您可以提供更多的 JSX 元素作为 Children。这对于显示嵌套组件很有用：
```html
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>
```

您可以将不同类型的 children 混合在一起，因此可以将 JSX children 与字符串文字一起使用。这是 JSX 与 HTML 相似的另一种方式，所以这是有效的 JSX 和有效的 HTML：
```html
<div>
  Here is a list:
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

React 组件也可以返回一组元素：
```js
render() {
  // No need to wrap list items in an extra element!
  return [
    // Don't forget the keys :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```



### JavaScript 表达式作为 Children JavaScript Expressions as Children

您可以将任何 JavaScript 表达式作为 Children 传递，方法是将其封闭在`{}`中。例如，这些表达式是等价的：
```html
<MyComponent>foo</MyComponent>

<MyComponent>{'foo'}</MyComponent>
```

这通常用于渲染任意长度的 JSX 表达式列表。例如，渲染一个 HTML 列表：
```js
function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}
```

JavaScript 表达式可以与其他类型的 children 混合使用。这通常可以代替字符串模板：
```js
function Hello(props) {
  return <div>Hello {props.addressee}!</div>;
}
```



### 函数作为 Children Functions as Children

通常情况下，插入到 JSX 中的 JavaScript 表达式将评估为一个字符串，一个 React 元素或这些东西的列表。然而，`props.children`就像任何其他属性一样工作，因为它可以传递任何类型的数据，而不仅仅是 React 知道如何渲染的类型。例如，如果您有自定义组件，则可以使用`props.children`进行回调：
```js
// 调用 children 回调函数 numTimes 次来产生重复的组件
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

传递给自定义组件的 Children 可以是任何东西，只要该组件将它们转换为 React 在渲染之前可以理解的东西。这种用法并不常见，但是如果您想要扩展 JSX 的功能，它就可以工作。



### Booleans, Null, 和 Undefined 会被忽略

false, null, undefined, 和 true 是有效的 Children。他们根本不渲染。这些 JSX 表达式都将渲染相同的东西：
```html
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

这对有条件地渲染 React 元素很有用。这段 JSX 只在`showHeader`为`true`时渲染`<Header />`：
```html
<div>
  {showHeader && <Header />}
  <Content />
</div>
```

一个需要注意的是，一些[虚假的值](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)，比如数字`0`，React 仍然会渲染。例如，这段代码不会像您所期望的那样工作，因为当`props.messages`是一个空数组时将会打印`0`：
```html
<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>
```

要解决这个问题，请确保`&&`之前的表达式总是布尔值：
```html
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>
```

相反，如果您希望在输出中显示`false`, `true`, `null`, 或 `undefined`等值，则必须先将其转换为字符串：
```html
<div>
  My JavaScript variable is {String(myVariable)}.
</div>
```






































.
