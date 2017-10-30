# 滚动恢复

在早期版本的 React Router 中，我们提供了即时支持滚动恢复功能，人们一直在追求它。希望本文档可帮助您从滚动条和路由中获取所需的内容！

浏览器正以与正常浏览器导航方式相同的方式开始处理具有 history.pushState 的滚动恢复。它已经在chrome中工作了，真的很棒。[这是滚动恢复标标准](https://majido.github.io/scroll-restoration-proposal/history-based-api.html#web-idl)。


虽然浏览器开始处理“默认情况”，但是 app 有不同的滚动需求，我们不会使用默认滚动管理。本指南应该帮助您实现任何滚动需求。

## 滚动到顶部

大多数时候你需要“滚动到顶部”，因为你有一个很长的内容页面，当导航到，保持向下滚动。使用 <ScrollToTop> 组件可以处理这一点，这个组件将会在每个导航上滚动窗口，确保使用 withRouter 将其包裹，以便访问 router 的属性：

```js
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
```

然后将其渲染在您的 app 的顶部，但位于 Router 的下方：

```js
const App = () => (
  <Router>
    <ScrollToTop>
      <App/>
    </ScrollToTop>
  </Router>
)

// or just render it bare anywhere you want, but just one :)
<ScrollToTop/>
```

如果您有一个选项卡界面连接到路由器，那么您可能不想在切换选项卡时滚动到顶部。相反，如何构造 <ScrollToTopOnMount> 组件可以滚动到指定的位置？

```js
class ScrollToTopOnMount extends Component {
  componentDidMount(prevProps) {
    window.scrollTo(0, 0)
  }

  render() {
    return null
  }
}

class LongContent extends Component {
  render() {
    <div>
      <ScrollToTopOnMount/>
      <h1>Here is my long content page</h1>
    </div>
  }
}

// somewhere else
<Route path="/long-content" component={LongContent}/>
```

## 通用解决方案

对于一个通用的解决方案（以及什么浏览器正在开始实现），我们在谈论两件事情：

  1. 在导航中向上滚动，以便您不会启动滚动到底部的新屏幕
  2. 在“后退”和“转发”点击恢复窗口的滚动位置和溢出元素（但不是链接点击！）

在某个时间点我们会发布一个通用的API。这是我们前进的方向：

```js
<Router>
  <ScrollRestoration>
    <div>
      <h1>App</h1>

      <RestoredScroll id="bunny">
        <div style={{ height: '200px', overflow: 'auto' }}>
          I will overflow
        </div>
      </RestoredScroll>
    </div>
  </ScrollRestoration>
</Router>
```

首先，ScrollRestoration 会在导航时滚动窗口。其次，它将使用 location.key 将 RestoredScroll 组件的滚动位置和窗口滚动位置保存到 sessionStorage。然后，当 ScrollRestoration 或 RestoredScroll 组件挂载时，他们可以从 sessionsStorage 查找其位置。

当我不希望管理窗口滚动条时，对我来说有些棘手的是定义了一个“选择退出” API。例如，如果您的页面内容中有一些标签导航，您可能不想滚动到顶部（选项卡可能会滚出视图！）。

当我了解到 Chrome 现在为我们管理滚动位置，并意识到不同的应用程序将会有不同的滚动需求，我失去了我们需要提供的东西的信念 - 特别是当人们只想要滚动到顶部
（你看到的是直接添加到你自己的应用程序）。

基于此，我们不再觉得自己做得很好，就像我们有限的时间一样！但是，我们很乐意帮助倾向于实施通用解决方案的任何人。一个坚实的解决方案甚至可以在项目中生活。如果你开始它，告诉我们








.
