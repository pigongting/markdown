# Philosophy 哲学

本指南的目的是阐释使用 React Router 时的心理模型。我们称之为“动态路由”，这与您可能比较熟悉的“静态路由”截然不同。

## 静态路由

如果您使用了 Rails，Express，Ember，Angular 等，则使用的是静态路由。在这些框架中，在发生任何渲染之前，您将路由声明为应用程序初始化的一部分。React Router pre-v4 大多数时候也是静态的。我们来看看如何在 express 中配置路由：

```js
app.get('/', handleIndex)
app.get('/invoices', handleInvoices)
app.get('/invoices/:id', handleInvoice)
app.get('/invoices/:id/edit', handleInvoiceEdit)

app.listen()

// 请注意在应用程序侦听之前如何声明路由。
```

我们使用的客户端路由器是类似的。在 Angular 你在前面声明你的路由，然后在渲染之前将它们导入顶级 AppModule：

```js
const appRoutes: Routes = [
  { path: 'crisis-center',
    component: CrisisListComponent
  },
  { path: 'hero/:id',
    component: HeroDetailComponent
  },
  { path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})

export class AppModule { }
```

Ember 有一个常规的 routes.js 文件，在构建时读取并导入到应用程序中。同样，这发生在您的应用程序渲染之前。

```js
Router.map(function() {
  this.route('about');
  this.route('contact');
  this.route('rentals', function() {
    this.route('show', { path: '/:rental_id' });
  });
});

export default Router
```

虽然 API 不同，但它们都共享“静态路由”的模型。React 路由器也跟着直到 v4。

要成功的使用 React Router，您需要忘记所有这些！


## 背景故事

坦白的说，我们对 React Router v2 采用的方向感到非常沮丧。当我们实现 React 部分的时候（生命周期等），感觉受到了 API 的限制，而且它不符合 React 为我们撰写 UI 所提供的心理模型。

在研讨会讨论如何处理之前，我们正在走过酒店的走廊。我们问了对方：“如果我们使用我们在研讨会上教授的模式构建路由器，它会是什么样子？”

仅仅使用了几个小时开发来验证这个概念，我们知道是我们想要的路由的未来。我们最终得到了 API，它不是 React 的“外部”，它是与 React 的其余部分组成或自然成立的API。我们认为你会爱上它。


## 动态路由

当我们说动态路由时，我们的意思是在您的应用程序呈现时发生的路由，而不是在正在运行的应用程序之外的配置或约定中。这意味着几乎所有的都是 React Router 中的一个组件，这是 API 的 60 秒预览，看看它是如何工作的：

首先，为您定位的环境获取路由器组件，并将其渲染在您的应用程序的顶部。

```js
// react-native
import { NativeRouter } from 'react-router-native'

// react-dom (what we'll use here)
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), el)
```

接下来，获取 Link 组件链接到一个新的位置：

```js
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
)
```

最后，当用户访问 /dashboard 时，渲染一个路由显示一些 UI。

```js
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
    <div>
      <Route path="/dashboard" component={Dashboard}/>
    </div>
  </div>
)
```

这个 Route 会渲染成 <Dashboard {...props}/> （props 包括这些 { match, location, history }），如果用户不在 /dashboard，则 Route 将渲染成 null。这几乎都是这样的。


## 嵌套路由

许多路由器都有“嵌套路由”的概念。如果您使用过 React Router V4 之前的版本，那么您也会知道它也是如此！当您从静态路由转移到动态路由配置时，渲染的路由，怎么样使用“嵌套路由”？那么你是如何嵌套一个div？

```js
const App = () => (
  <BrowserRouter>
    {/* 这里是一个 div */}
    <div>
      {/* 这里是一个 Route */}
      <Route path="/tacos" component={Tacos}/>
    </div>
  </BrowserRouter>
)

// 当 url 匹配 `/tacos` 时，渲染这个组件
const Tacos  = ({ match }) => (
  // 这里是一个嵌套 div
  <div>
    {/* 这里是一个嵌套 Route,
        match.url 帮助我们制作一个相对路径 */}
    <Route
      path={match.url + '/carnitas'}
      component={Carnitas}
    />
  </div>
)
```

router 怎么看不到“嵌套” API？Route 只是一个组件，就像 div 一样。所以，嵌套一个 Route 或一个 div，你做就是了。

让我们变得更狡猾。


## 响应路由

考虑一个用户导航到 /invoices。您的应用程序适应不同的屏幕尺寸，他们有狭窄的视口，因此您只向他们显示发票清单和发票仪表板的链接。他们可以从那里进一步深入。

```
Small Screen
url: /invoices

+----------------------+
|                      |
|      Dashboard       |
|                      |
+----------------------+
|                      |
|      Invoice 01      |
|                      |
+----------------------+
|                      |
|      Invoice 02      |
|                      |
+----------------------+
|                      |
|      Invoice 03      |
|                      |
+----------------------+
|                      |
|      Invoice 04      |
|                      |
+----------------------+
```

在较大的屏幕上，我们想显示一个主视图，导航位于左侧，仪表板或特定发票显示在右侧。

```
Large Screen
url: /invoices/dashboard

+----------------------+---------------------------+
|                      |                           |
|      Dashboard       |                           |
|                      |   Unpaid:             5   |
+----------------------+                           |
|                      |   Balance:   $53,543.00   |
|      Invoice 01      |                           |
|                      |   Past Due:           2   |
+----------------------+                           |
|                      |                           |
|      Invoice 02      |                           |
|                      |   +-------------------+   |
+----------------------+   |                   |   |
|                      |   |  +    +     +     |   |
|      Invoice 03      |   |  | +  |     |     |   |
|                      |   |  | |  |  +  |  +  |   |
+----------------------+   |  | |  |  |  |  |  |   |
|                      |   +--+-+--+--+--+--+--+   |
|      Invoice 04      |                           |
|                      |                           |
+----------------------+---------------------------+
```

现在暂停一分钟，为 /invoices url 考虑两个尺寸的屏幕。对大屏幕是一个有效的路由吗？我们应该把什么放在右边？

```
Large Screen
url: /invoices
+----------------------+---------------------------+
|                      |                           |
|      Dashboard       |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 01      |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 02      |             ???           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 03      |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 04      |                           |
|                      |                           |
+----------------------+---------------------------+
```

在大屏幕上，/invoices 不是有效的 route，但是在一个小屏幕上是有效的！为了使事情变得更有意思，请考虑有人用巨大的手机。他们可以以纵向方向查看 /invoices，然后将手机旋转到景观。突然间，我们有足够的空间来显示主界面 UI，所以你应该重定向吧！

React Router 以前版本的静态路由并没有真正具有可组合的答案。当路由是动态的，您可以声明式地撰写此功能。如果您开始思考路由是 UI，不是静态配置，您的直觉将导致以下代码：

```js
const App = () => (
  <AppLayout>
    <Route path="/invoices" component={Invoices}/>
  </AppLayout>
)

const Invoices = () => (
  <Layout>

    {/* 总是显示导航 */}
    <InvoicesNav/>

    <Media query={PRETTY_SMALL}>
      {screenIsSmall => screenIsSmall
        // 小屏幕没有重定向
        ? <Switch>
            <Route exact path="/invoices/dashboard" component={Dashboard}/>
            <Route path="/invoices/:id" component={Invoice}/>
          </Switch>
        // 大屏幕有
        : <Switch>
            <Route exact path="/invoices/dashboard" component={Dashboard}/>
            <Route path="/invoices/:id" component={Invoice}/>
            <Redirect from="/invoices" to="/invoices/dashboard"/>
          </Switch>
      }
    </Media>
  </Layout>
)
```

当用户将手机从纵向旋转到横向时，此代码将自动将其重定向到仪表板。有效路由的集合根据用户手中的移动设备的动态特性而改变。

这只是一个例子。还有很多其他的我们可以讨论，但我们将总结出这个建议：为了让您的直觉符合 React Router，请考虑组件，而不是静态路由。想想如何解决 React 的声明性可组合性的问题，因为几乎每个“React Router 问题”都可能是一个“React 问题”。















































，
