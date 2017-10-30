# Redux 集成

Redux 是 React 生态系统的重要组成部分。为那些想要使用这两者的人们，我们希望使 React Router 和 Redux 尽可能无缝地融合在一起。

## 阻止更新

一般来说，React Router 和 Redux 可以很好的一起工作。有时候，一个 app 可以有一个组件在位置更改时不会更新（子路由或活动导航链接不更新）。

如果发生这种情况：

1. 该组件通过 connect()(Comp) 连接到 redux。
2. 组件不是“路由组件”，这意味着它不会像这样渲染：<Route component = {SomeConnectedThing} />

问题是，Redux 实现了 shouldComponentUpdate，如果没有从路由器接收属性，不会有任何事情发生。最直接的解决方法。找到您 connect 组件的位置并将其使用 withRouter 包裹。

```js
// before
export default connect(mapStateToProps)(Something)

// after
import { withRouter } from 'react-router-dom'
export default withRouter(connect(mapStateToProps)(Something))
```

## 深度集成

有些人想：

- 将路由数据同步到 store，并通过 store 访问
- 能够通过派发 actions 导航
- 支持 Redux devtools 中对路由更改的时间轴调试

所有这些都需要更深入的整合。请注意，您不需要这种深度整合：

- 路由变化对于时间轴调试来说不太重要。
- 您可以将提供的 history 对象传递给您的 actions，并使用它进行导航，而不是派发 actions 来导航。
- 路由数据已经成为您关注的大多数组件的属性，无论是来自 store 还是 router 都不会更改您的组件的代码。

但是，我们知道有些人对此感到强烈，所以我们希望提供最好的深度整合。从 React Router v4 起，React Router Redux 软件包是项目的一部分。请参考它进行深度整合。

[React Router Redux](https://github.com/reacttraining/react-router/tree/master/packages/react-router-redux)



































.
