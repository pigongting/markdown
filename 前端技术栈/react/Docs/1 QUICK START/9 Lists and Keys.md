# Lists and Keys

首先，让我们回顾一下如何在 JavaScript 中转换列表。

给定下面的代码，我们使用 map() 函数拿出 numbers 数组的数字，并使它翻倍。我们将 map() 返回的新数组赋给变量 doubled 并记录下来：

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

这段代码将在控制台记录 [2, 4, 6, 8, 10]。

在 React 中，将数组转换为元素列表几乎是相同的。



### 渲染多个组件

您可以构建元素的集合，并使用大括号 {} 将其包含在 JSX 中。

下面，我们使用 JavaScript map() 函数遍历 numbers 数组。我们为每个项目返回一个 <li> 元素。最后，我们将得到的元素数组分配给 listItems：

```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

我们将整个 listItems 数组包含在 <ul> 元素中，并将其渲染成 DOM：

```js
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

此代码显示数字 1 到 5 的项目符号列表。



### 基本列表组件

通常你会在一个组件内渲染列表。

我们可以将前面的例子重构成接受 numbers 数组并输出无序列表的元素。

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

当你运行这段代码时，会给你一个警告，需要提供 key 给每个列表项。key 是创建元素列表时需要包含的特殊字符串属性。我们将在下一节讨论为什么它很重要。

让我们给 numbers.map() 里面的列表项指定一个 key，并修复缺少 key 的问题。

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[在 CodePen 中试试]https://codepen.io/gaearon/pen/jrXYRR?editors=0011



## Keys

Keys 可帮助 React 识别哪些项目已更改，添加或删除。应该给数组内的元素赋予一个稳定的标识：

```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

选择 key 的最佳方法是使用字符串在其兄弟姐妹之中唯一标识一个列表项 。大多数情况下，您可以使用数据中的 ID 作为 key：

```js
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

如果您没有渲染项的稳定 ID，则可以使用项索引作为最后的手段：

```js
const todoItems = todos.map((todo, index) =>
  // 只在 items 没有稳定 ID 时这样做
  <li key={index}>
    {todo.text}
  </li>
);
```

如果项目的顺序可能改变，我们不建议使用索引作为 key。这可能会对性能产生负面影响，并可能导致组件状态问题。查阅罗宾·波克尼的文章 [深入解释使用索引作为关键的负面影响](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)。如果您不显式的为 list items 指定 key，则 React 将默认使用索引作为 key。

如果你有兴趣学习更多，可以看看 [深入解释为什么键是必要的](https://reactjs.org/docs/reconciliation.html#recursing-on-children)。



### 用 key 提取组件

Keys 仅在数组上下文环境才有意义。

例如，如果您提取一个 ListItem 组件，你应该在数组中的 <ListItem /> 元素上指定 key，而不是 ListItem 本身的根元素 <li> 上指定 key。

示例：不正确的 key 用法

```js
function ListItem(props) {
  const value = props.value;
  return (
    // 错误！这里不需要指定 key
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 错误！key 应该在这里指定
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

示例：正确的 key 用法

```js
function ListItem(props) {
  // 正确！这里不需要指定 key
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 正确！key 应该在这里指定
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

一个好的经验法则是元素在 map() 函数内的时候需要 key。



### key 在兄弟姐妹之间必须是唯一的

在数组中使用的 key 在它们的兄弟中应该是唯一的。但是，他们不需要是全球唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key：

```js
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

Keys 可以作为一个暗示为 React 服务，但不会传递给组件。如果您的组件需要相同的值，请将其明确地作为具有不同名称的属性进行传递：

```js
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

上面的例子，Post 组件可以读取 props.id，而不是 props.key。



### 在 JSX 中嵌入 map()

在上面的例子中，我们声明了一个单独的 listItems 变量，并将其包含在 JSX 中：

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX 允许在花括号中嵌入任何表达式，所以我们可以嵌入 map()：

```js
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />

      )}
    </ul>
  );
}
```

[在 CodePen 中试试](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

有时这样可以得到更清晰的代码，但是这种风格也可能被滥用。就像在 JavaScript 中一样，由您决定是否值得提取变量以提高可读性。请记住，如果 map() 主体太嵌套，可能是提取组件的好时机。















.
