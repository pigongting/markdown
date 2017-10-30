# 测试

React Router 依赖于 React 的 context 来工作。这会影响如何测试使用了我们的组件的你的组件。

## Context 上下文

如果您尝试对您渲染了 <Link> 或 <Route> 等的组件进行单元测试。你会得到一些关于 context 的错误和警告。虽然您可能会尝试自己存储 router context，但我们建议您将单元测试封装在 <StaticRouter> 或 <MemoryRouter> 中。一探究竟：

```js
class Sidebar extends Component {
  // ...
  render() {
    return (
      <div>
        <button onClick={this.toggleExpand}>
          expand
        </button>
        <ul>
          {users.map(user => (
            <li>
               <Link to={user.path}>
                 {user.name}
               </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

// broken
test('it expands when the button is clicked', () => {
  render(
    <Sidebar/>
  )
  click(theButton)
  expect(theThingToBeOpen)
})

// fixed!
test('it expands when the button is clicked', () => {
  render(
    <MemoryRouter>
      <Sidebar/>
    </MemoryRouter>
  )
  click(theButton)
  expect(theThingToBeOpen)
})
```

这就是它的一切。

## 从具体的路由开始

<MemoryRouter> 支持 initialEntries 和 initialIndex 属性，因此您可以在特定位置（或应用程序的较小部分）启动应用程序。

```js
test('current user is active in sidebar', () => {
  render(
    <MemoryRouter initialEntries={[ '/users/2' ]}>
      <Sidebar/>
    </MemoryRouter>
  )
  expectUserToBeActive(2)
})
```

## 导航

我们有很多测试是在地址改变路由工作的时候，虽然你可能不需要测试这些东西。但是如果你必须，因为一切都在渲染中发生，我们会像这样做一些聪明的事情：

```js
import { render, unmountComponentAtNode } from 'react-dom'
import React from 'react'
import { Route, Link, MemoryRouter } from 'react-router-dom'
import { Simulate } from 'react-addons-test-utils'

// a way to render any part of your app inside a MemoryRouter
// you pass it a list of steps to execute when the location
// changes, it will call back to you with stuff like
// `match` and `location`, and `history` so you can control
// the flow and make assertions.
const renderTestSequence = ({
  initialEntries,
  initialIndex,
  subject: Subject,
  steps
}) => {
  const div = document.createElement('div')

  class Assert extends React.Component {

    componentDidMount() {
      this.assert()
    }

    componentDidUpdate() {
      this.assert()
    }

    assert() {
      const nextStep = steps.shift()
      if (nextStep) {
        nextStep({ ...this.props, div })
      } else {
        unmountComponentAtNode(div)
      }
    }

    render() {
      return this.props.children
    }
  }

  class Test extends React.Component {
    render() {
      return (
        <MemoryRouter
          initialIndex={initialIndex}
          initialEntries={initialEntries}
        >
          <Route render={(props) => (
            <Assert {...props}>
              <Subject/>
            </Assert>
          )}/>
        </MemoryRouter>
      )
    }
  }

  render(<Test/>, div)
}

// our Subject, the App, but you can test any sub
// section of your app too
const App = () => (
  <div>
    <Route exact path="/" render={() => (
      <div>
        <h1>Welcome</h1>
      </div>
    )}/>
    <Route path="/dashboard" render={() => (
      <div>
        <h1>Dashboard</h1>
        <Link to="/" id="click-me">Home</Link>
      </div>
    )}/>
  </div>
)

// the actual test!
it('navigates around', (done) => {

  renderTestSequence({

    // tell it the subject you're testing
    subject: App,

    // and the steps to execute each time the location changes
    steps: [

      // initial render
      ({ history, div }) => {
        // assert the screen says what we think it should
        console.assert(div.innerHTML.match(/Welcome/))

        // now we can imperatively navigate as the test
        history.push('/dashboard')
      },

      // second render from new location
      ({ div }) => {
        console.assert(div.innerHTML.match(/Dashboard/))

        // or we can simulate clicks on Links instead of
        // using history.push
        Simulate.click(div.querySelector('#click-me'), {
          button: 0
        })
      },

      // final render
      ({ location }) => {
        console.assert(location.pathname === '/')
        // you'll want something like `done()` so your test
        // fails if you never make it here.
        done()
      }
    ]
  })
})
```





































.
