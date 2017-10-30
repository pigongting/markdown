# 服务端渲染

服务器上的渲染有点不同，因为它都是无状态的。基本思想是我们使用无状态的 <StaticRouter> 替换 <BrowserRouter> 来包裹应用程序。我们传递来自服务器的路由可以匹配的请求 URL，和下一步将讨论的 context 属性。

```js
// client
<BrowserRouter>
  <App/>
</BrowserRouter>

// server (not the complete story)
<StaticRouter
  location={req.url}
  context={context}
>
  <App/>
</StaticRouter>
```

当你中客户端渲染 <Redirect>，浏览器历史记录更改状态，并获得新的画面。在静态服务器环境中，我们无法更改应用程序状态。我们使用 context 属性来找出渲染的结果。如果我们发现一个 context.url，我们知道 app 重定向了。这就表示，我们可以从服务器发送一个适当的重定向。

```js
const context = {}
const markup = ReactDOMServer.renderToString(
  <StaticRouter
    location={req.url}
    context={context}
  >
    <App/>
  </StaticRouter>
)

if (context.url) {
  // Somewhere a `<Redirect>` was rendered
  redirect(301, context.url)
} else {
  // we're good, send the response
}
```

## 添加 App 特定的 context 信息

router 只添加了 context.url。但是您可能希望某些重定向是 301，而其他的是 302。或者，如果 UI 的某些特定分支渲染了，您可能希望发送 404 响应，如果他们没有授权，发送 401 响应。context 属性是你的，因此你可以改变它。以下是区分301和302重定向的方法：

```js
const RedirectWithStatus = ({ from, to, status }) => (
  <Route render={({ staticContext }) => {
    // there is no `staticContext` on the client, so
    // we need to guard against that here
    if (staticContext)
      staticContext.status = status
    return <Redirect from={from} to={to}/>
  }}/>
)

// somewhere in your app
const App = () => (
  <Switch>
    {/* some other routes */}
    <RedirectWithStatus
      status={301}
      from="/users"
      to="/profiles"
    />
    <RedirectWithStatus
      status={302}
      from="/courses"
      to="/dashboard"
    />
  </Switch>
)

// on the server
const context = {}

const markup = ReactDOMServer.renderToString(
  <StaticRouter context={context}>
    <App/>
  </StaticRouter>
)

if (context.url) {
  // can use the `context.status` that
  // we added in RedirectWithStatus
  redirect(context.status, context.url)
}
```

## 404, 401, 或其他状态

我们像上面一样做同样的事情。创建一个添加了一些 context 的组件，并将其渲染在 app 的任何位置，来获取不同的状态代码。

```js
const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext)
      staticContext.status = code
    return children
  }}/>
)
```

现在，您可以在 app 的任何你想要添加 code 到 staticContext 的地方渲染 Status。

```js
const NotFound = () => (
  <Status code={404}>
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  </Status>
)

// somewhere else
<Switch>
  <Route path="/about" component={About}/>
  <Route path="/dashboard" component={Dashboard}/>
  <Route component={NotFound}/>
</Switch>
```

## 把它们放在一起

这不是一个真正的 app，但它显示了所有你需要把放在一起的部分。

```js
import { createServer } from 'http'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

createServer((req, res) => {
  const context = {}

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App/>
    </StaticRouter>
  )

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `)
    res.end()
  }
}).listen(3000)
```

客户端是这样的：

```js
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('app'))
```

## 数据加载

有这么多不同的方法，还没有明确的最佳实践，所以我们试图用一些方法来组合，而不是处方或倾向于一个或另一个。我们相信 router 可以适应您的 app 的约束。

主要的约束是在渲染之前要加载数据。React Router 会导出其内部使用的 matchPath static 函数，以匹配路由位置。您可以在服务器上使用此功能来帮助确定在渲染之前您的数据依赖关系。

这种方法的要点依赖于静态路由配置，用于在渲染之前渲染路由并匹配，以确定数据依赖性。

```js
const routes = [
  { path: '/',
    component: Root,
    loadData: () => getSomeData(),
  },
  // etc.
]
```

在 app 中使用配置渲染你的路由：

```js
import { routes } from './routes'

const App = () => (
  <Switch>
    {routes.map(route => (
      <Route {...route}/>
    ))}
  </Switch>
)
```

在服务端你将有一些这样的：

```js
import { matchPath } from 'react-router-dom'

// inside a request
const promises = []
// use `some` to imitate `<Switch>` behavior of selecting only
// the first to match
routes.some(route => {
  // use `matchPath` here
  const match = matchPath(req.url, route)
  if (match)
    promises.push(route.loadData(match))
  return match
})

Promise.all(promises).then(data => {
  // do something w/ the data so the client
  // can access it then render the app
})
```

最后，客户端将需要接收数据。再次申明，我们没有为您的 app 处理数据加载模式，但这些是您需要实现的接触点。

您可能对我们的 [React Router Config](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config) 软件包感兴趣，以协助使用静态路由配置进行数据加载和服务器渲染。



























.
