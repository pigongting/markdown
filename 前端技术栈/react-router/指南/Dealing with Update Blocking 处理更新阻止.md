# 处理更新阻止

React Router 有一些位置感知组件，它们使用当前位置对象来确定它们呈现的内容。默认情况下，使用 React 的 context 模型将当前位置隐式传递给组件。当位置更改时，这些组件应使用 context 中的新位置对象进行重新渲染。

React 提供了两种方法来优化应用程序的渲染性能：shouldComponentUpdate 生命周期方法和 PureComponent。两者都阻止重新渲染组件，除非满足正确的条件。不幸的是，这意味着如果 React Router 的重新呈现被阻止，React Router 的位置感知组件可能与当前位置不同步。

问题的例子。

我们从一个防止更新的组件开始。

```js
class UpdateBlocker extends React.PureComponent {
  render() {
    return this.props.children
  }
}
```

当 <UpdateBlocker> 正在装载，某个位置感知的子组件将使用当前位置并匹配对象进行渲染。

```js
// location = { pathname: '/about' }
<UpdateBlocker>
  <NavLink to='/about'>About</NavLink>
  // <a href='/about' class='active'>About</a>
  <NavLink to='/faq'>F.A.Q.</NavLink>
  // <a href='/faq'>F.A.Q.</a>
</UpdateBlocker>
```

当位置更改时，<UpdateBlocker> 不会检测到任何属性或状态更改，因此其子组件将不会被重新渲染。

```js
// location = { pathname: '/faq' }
<UpdateBlocker>
  // the links will not re-render, so they retain their previous attributes
  <NavLink to='/about'>About</NavLink>
  // <a href='/about' class='active'>About</a>
  <NavLink to='/faq'>F.A.Q.</NavLink>
  // <a href='/faq'>F.A.Q.</a>
</UpdateBlocker>
```

## shouldComponentUpdate

为了实现 shouldComponentUpdate 的组件知道应该在位置更改时更新，它的 shouldComponentUpdate 方法需要能够检测位置更改。

如果您自己实现了 shouldComponentUpdate，您可以比较当前和下一个 context.router 对象的位置。但是，作为用户，您不必直接使用 context。相反，如果您可以比较当前和下一个位置而不触及上下文，那将是理想的。

## 第三方代码

尽管没有调用 shouldComponentUpdate，您可能遇到位置更改后未更新的组件的问题。这很可能是因为 shouldComponentUpdate 被第三方代码调用，比如 react-redux 的 connect 和 mobx-react 的 observer。

```js
// react-redux
const MyConnectedComponent = connect(mapStateToProps)(MyComponent)

// mobx-react
const MyObservedComponent = observer(MyComponent)
```

使用第三方代码，您甚至无法控制 shouldComponentUpdate 的实现。相反，您将必须构建代码，使位置更改对于这些方法显而易见。connect 和 observer 都会创建其组件，其 shouldComponentUpdate 方法对其当前属性及其下一个属性进行浅层比较。这些组件只有在至少一个属性已经改变时才会重新渲染。这意味着为了确保它们在位置更改时更新，它们将需要被赋予一个在位置更改时更改的属性。

## PureComponent

React 的 PureComponent 不实现 shouldComponentUpdate，但它采取类似的方法来防止更新。当“纯”组件更新时，会将其当前属性和状态与下一个属性和状态进行比较。如果比较没有检测到任何差异，组件将不会更新。与 shouldComponentUpdate 一样，这意味着为了强制“纯”组件在位置更改时进行更新，它需要具有更改的 prop 或 state。

## 解决方案

避免在位置更改后阻止重新渲染的关键是将阻挡组件作为属性传递位置对象。每当位置变化时，这将是不同的，因此比较将检测当前和下一个位置是不同的。

```js
// location = { pathname: '/about' }
<UpdateBlocker location={location}>
  <NavLink to='/about'>About</NavLink>
  // <a href='/about' class='active'>About</a>
  <NavLink to='/faq'>F.A.Q.</NavLink>
  // <a href='/faq'>F.A.Q.</a>
</UpdateBlocker>

// location = { pathname: '/faq' }
<UpdateBlocker location={location}>
  <NavLink to='/about'>About</NavLink>
  // <a href='/about'>About</a>
  <NavLink to='/faq'>F.A.Q.</NavLink>
  // <a href='/faq' class='active'>F.A.Q.</a>
</UpdateBlocker>
```

## 获取位置

为了将当前位置对象作为属性传递给组件，您必须具有对其的访问权限。组件可以访问该位置的主要方式是通过 <Route> 组件。当 <Route> 匹配（或者总是使用子属性）时，它将当前位置传递给它渲染的子元素。

```js
<Route path='/here' component={Here}/>
const Here = (props) => {
  // props.location = { pathname: '/here', ... }
  return <div>You are here</div>
}

<Route path='/there' render={(props) => {
  // props.location = { pathname: '/there', ... }
  return <div>You are there</div>
}}/>

<Route path='/everywhere' children={(props) => {
  // props.location = { pathname: '/everywhere', ... }
  return <div>You are everywhere</div>
}}/>
```

这意味着给定一个阻止更新的组件，您可以通过以下方式轻松将其作为属性传递：

```js
// the Blocker is a "pure" component, so it will only
// update when it receives new props
class Blocker extends React.PureComponent {
  render() {
    <div>
      <NavLink to='/oz'>Oz</NavLink>
      <NavLink to='/kansas'>Kansas</NavLink>
    </div>
  }
}
```

1. 直接由 <Route> 渲染组件不必担心阻止更新，因为它将位置注入为属性。

```js
// The <Blocker>'s location prop will change whenever
// the location changes
<Route path='/:place' component={Blocker}/>
```

2. 由 <Route> 直接渲染的组件可以将该位置属性传递给其创建的任何子元素。

```js
<Route path='/parent' component={Parent} />

const Parent = (props) => {
  // <Parent> receives the location as a prop. Any child
  // element is creates can be passed the location.
  return (
    <SomeComponent>
      <Blocker location={props.location} />
    </SomeComponent>
  )
}
```

当组件未被 <Route> 渲染并且渲染它的组件在其可变范围内没有位置时会发生什么？您可以采用两种方法将自动注入位置作为您的组件的属性。

1. 渲染无路径的 <Route>。虽然 <Route> 通常用于匹配特定路径，但无路径 <Route> 将始终匹配，因此它将始终呈现其组件。

```js
// pathless <Route> = <Blocker> will always be rendered
const MyComponent= () => (
  <SomeComponent>
    <Route component={Blocker} />
  </SomeComponent>
)
```

2. 您可以使用 withRouter 高阶组件包装组件，并将其作为其属性之一赋予当前位置。

```js
// internally, withRouter just renders a pathless <Route>
const BlockAvoider = withRouter(Blocker)

const MyComponent = () => (
  <SomeComponent>
    <BlockAvoider />
  </SomeComponent>
)
```



























.
