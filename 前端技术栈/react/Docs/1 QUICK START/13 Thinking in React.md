# React 思维方式 Thinking in React

在我们看来，React 是用 JavaScript 构建大型，快速 Web 应用程序的首要方式。它在 Facebook 和 Instagram 上为我们提供了很好的扩展性。

React 一个重要的部分是在构建应用程序时你应该怎么样思考应用程序。在这个文挡中，我们将引导你使用 React 构建可搜索的产品数据表格的思考过程。



## 从模拟开始 Start With A Mock

想象一下，我们已经有了一个 JSON API 和来自我们设计师的模拟。模拟看起来像这样：

![Mockup](https://reactjs.org/static/thinking-in-react-mock-1071fbcc9eed01fddc115b41e193ec11-4dd91.png)

我们的 JSON API 返回一些如下所示的数据：

```js
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```



## 第 1 步：将 UI 分解为有层次结构的组件 Step 1: Break The UI Into A Component Hierarchy

你要做的第一件事就是在模拟中的每个组件（和子组件）周围画框，并给它们命名。如果你正在和一个设计师合作，他们可能已经这样做了，所以去和他们谈谈！他们的 Photoshop 图层名称可能最终会成为您的 React 组件的名称！

但是，你怎么知道它应该有哪些组件？一个技术是当你应该创建一个新的函数或对象时，另一个技术是[单一责任原则](https://en.wikipedia.org/wiki/Single_responsibility_principle)，即一个组件最好只做一件事。如果它太臃肿了，它应该被分解成更小的子组件。

由于您经常向用户显示 JSON 数据模型，你会发现如果你的模型是正确的，你的 UI（和你的组件结构）将映射地很好。这是因为 UI 和数据模型倾向于遵循相同的信息架构，这意味着将 UI 分解为组件的工作通常是微不足道的。只要分解成的组件可以表示您的数据模型的一个部分。

![Component diagram](https://reactjs.org/static/thinking-in-react-components-eb8bda25806a89ebdc838813bdfa3601-82965.png)

在这里你可以看到，我们这个简单的应用程序有五个组件。我们已经将每个组件代表的数据以斜体表示。

1. FilterableProductTable 可过滤产品表格 (橘色): 包含整个示例
2. SearchBar 搜索栏 (蓝色): 接收所有的*用户输入*
3. ProductTable 产品表格 (绿色): 根据*用户输入*显示和过滤*数据集*
4. ProductCategoryRow 产品分类行 (青绿色): 显示每个*类别*的标题
5. ProductRow 产品行 (红色): 显示一行*产品*

如果你看`ProductTable`，你会看到表头（包含“Name”和“Price”标签）不是它的组件。这是一个偏好的问题，有两个方面的论点。对于这个例子，我们将其作为`ProductTable`的一部分，因为它是负责渲染数据集的`ProductTable`的一部分。然而，如果这个头部变得复杂（即，如果我们要添加可供排序的功能），将它作为自己的`ProductTableHeader`组件肯定是有意义的。

现在我们已经确定了模拟中的组件，让我们把它们安排成一个层次结构。这很容易。在模拟中出现在一个组件中的另一个组件应该在层次结构中显示为一个子组件：

- FilterableProductTable
    - SearchBar
    - ProductTable
        - ProductCategoryRow
        - ProductRow




## 第 2 步：在 React 中构建静态版本

[在 CodePen 中查看 Thinking In React: Step 2](https://codepen.io/gaearon/pen/BwWzwm)

现在你有了有层次结构的组件，现在是时候实施你的应用程序了。最简单的方法是构建一个采用数据模型并渲染 UI 但不具有交互性的版本。最好解耦这些过程，因为构建一个静态的版本需要大量的输入而不是思考，而增加交互性需要大量的思考而不是很多的输入。我们会看到为什么。

构建渲染数据模型的应用程序的静态版本，你会想要构建重用其他组件并使用属性传递数据的组件。组件是一种将数据从父组件传递给子组件的方式。如果你熟悉状态的概念，不要使用状态来建立这个静态的版本。状态仅用于交互，保存那些随时间变化的数据。由于这是应用程序的静态版本，您不需要它。

您可以自上而下或自下而上构建。就是说，您可以从构建层次结构中较高层（如：从 FilterableProductTable 开始）或者低一点（ProductRow）的组件开始。在简单的例子中，自上而下通常比较容易，而在大型项目中，而在较大的项目中，自下而上构建和编写测试更容易。

在这一步的结尾，您将拥有一个渲染数据模型的可重用组件的库。因为这是你的应用程序的静态版本，组件将只有 render() 方法。层次结构顶部的组件（FilterableProductTable）将把你的数据模型作为一个属性。如果你修改了底层的数据模型，会再次调用 ReactDOM.render()，UI 将会更新。很容易看到你的 UI 是怎么更新的和哪里改变了，因为没有什么复杂的事情发生。React 的单向数据流（也叫单向绑定）让所有的东西保持模块化和快速。

如果您需要执行此步骤的帮助，请参阅 React 文档。


### 一个简短的插曲：Props 和 State

React 中有两种“模型”数据：Props 和 State。理解他们之间的分别是很重要的；如果你不确定他们之间的不同，请浏览 [React 官方文档](https://reactjs.org/docs/interactivity-and-dynamic-uis.html)。



## 第 3 步：确定表示 UI 状态的最小值（但是是完整的） Step 3: Identify The Minimal (but complete) Representation Of UI State

让你的 UI 互动，您需要能够触发对底层数据模型的更改。React 使用 **state** 可以轻松实现。

要正确的构建你的 app，你首先就要思考你的 app 需要的可变状态的最小集合。关键是你[自己不要重复了](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)。弄清楚你的 app 需要的 state 的绝对最小表示，然后通过计算得到您需要的其他一切。例如，如果你要构建一个 TODO list，只要保留关于 TODO items 的数组；不要为了保留 count（计数）单独定义一个状态变量。相反，当你需要渲染 TODO count，简单地拿 TODO items 数组的长度就可以了。

思考我们的示例 app 中所有的数据块。我们有：

- 产品的原始列表

- 用户输入的搜索文本

- 复选框的值

- 过滤后的产品列表

让我们一个一个来看，弄清楚哪一个是状态。对每个数据块问三个问题：

1. 它是从父级通过 props 传递的吗？如果是，它大概不是 state。
2. 它随着时间保持不变吗？如果是，它大概不是 state。
3. 在你的组件中可以通过其他的 state 或 props 计算得到它吗？如果是，它大概不是 state。

产品的原始列表是通过 props 传递进来的，所以它不是状态。搜索文字和复选框看起来是状态，因为他们会随着时间改变并且不能通过计算得到。最后，过滤后的产品列表不是 state 因为可以通过产品的原始列表，搜索文本和复选框的值计算得到。

所以最后，我们的状态是：

- 用户输入的搜索文本

- 复选框的值



## 第 4 步：确定你的 state 应该呆在哪里 Step 4: Identify Where Your State Should Live

[在 CodePen 中查看 Thinking In React: Step 4](https://codepen.io/gaearon/pen/qPrNQZ)

好的，我们已经确定了 app state 的最小设置。下一步，





































.
