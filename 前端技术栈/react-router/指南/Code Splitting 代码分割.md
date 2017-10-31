# 代码分割

网站的一大特性是在访客没有使用之前不需要下载整个 app。您可以将代码分割看成逐步下载 app。虽然还有其他工具，我们将在本指南中使用 Webpack 的 bundle loader。

以下是您现在使用的网站的代码分割方式：<Bundle>。最值得注意的是 router 实际上与此无关。当你在一个路由，只是意味着“你正在渲染一个组件”。因此，我们可以创建一个在用户导航到它时加载动态导入的组件。此方法适用于您应用的任何部分。

```js
import loadSomething from 'bundle-loader?lazy!./Something'

<Bundle load={loadSomething}>
  {(mod) => (
    // do something w/ the module
  )}
</Bundle>
```

如果模块是一个组件，我们可以在这里渲染：

```js
<Bundle load={loadSomething}>
  {(Comp) => (Comp
    ? <Comp/>
    : <Loading/>
  )}
</Bundle>
```

该组件从 webpack bundle loader 获取一个称为 load 的属性。我们将谈谈为什么我们在此时使用它。当组件挂载或获取新的 load 属性时，它会调用 load，然后将返回值放到 state。最后，在模块的渲染中回调。

```js
import React, { Component } from 'react'

class Bundle extends Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      mod: null
    })
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}

export default Bundle
```

您会注意到，在获取模块之前，任何渲染模块之前的渲染 state.mod 会使用 null 进行回调。这很重要，因此你可以向用户说明我们在等什么。

## 为什么 bundle loader，而不是 import()？

我们一直使用了它很多年，并且它将继续工作，直到 TC39 提出正式的动态导入。最新的提案是 import()，我们可以调整我们的 Bundle 组件以使用 import()：

```js
<Bundle load={() => import('./something')}>
  {(mod) => ()}
</Bundle>
```

bundle loader 的另一个巨大优点是第二次同步回调，这可以防止每次访问代码分割画面时闪烁加载画面。

不管您导入的方式如何，想法是一样的：一个在渲染时处理代码加载的组件。现在你所做的就是在你想要动态加载代码的地方渲染 <Bundle>。

## 渲染完成后加载

Bundle 组件在加载一个新的画面时非常适合，而且在后台预加载 app 的其余部分也是有益的。

```js
import loadAbout from 'bundle-loader?lazy!./loadAbout'
import loadDashboard from 'bundle-loader?lazy!./loadDashboard'

// components load their module for initial visit
const About = (props) => (
  <Bundle load={loadAbout}>
    {(About) => <About {...props}/>}
  </Bundle>
)

const Dashboard = (props) => (
  <Bundle load={loadDashboard}>
    {(Dashboard) => <Dashboard {...props}/>}
  </Bundle>
)

class App extends React.Component {
  componentDidMount() {
    // preloads the rest
    loadAbout(() => {})
    loadDashboard(() => {})
  }

  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <Route path="/about" component={About}/>
        <Route path="/dashboard" component={Dashboard}/>
      </div>
    )
  }
}
```

您的 app 何时加载多少，是您自己的决定。它不需要绑定到特定的路由。也许您只想在用户处于非活动状态时执行此操作，也许只有当他们访问路由时，也许你想在初始渲染后预加载 app 的其他部分：

```js
ReactDOM.render(<App/>, preloadTheRestOfTheApp)
```

## 代码分割 + 服务端渲染

我们已经尝试并失败了几次。我们学到了什么：

1. 您需要在服务器上同步解析模块，以便您可以在初始渲染中获取这些软件包。
2. 您需要在渲染之前加载客户端中涉及到服务器渲染的所有 bundle，以便客户端渲染与服务器渲染相同。（最棘手的部分，我认为它可能，但这是我放弃的地方。）
3. 客户端 app 的其余部分需要异步解析。

我们确定，Google 对我们的网站进行索引，足以满足我们的需求，而不需要服务器渲染，所以我们放弃了代码分割 + 服务工作者缓存。祝那些尝试服务器渲染 + 代码分割的应用程序一帆风顺。

























.
