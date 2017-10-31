# 快速开始

开始使用 React Web 项目的最简单的方法是使用一个名为 Create React App 的工具，这是一个拥有大量社区帮助的 Facebook 项目。

首先安装create-react-app（如果还没有），然后用它创建一个新的项目。

```
npm install -g create-react-app
create-react-app demo-app
cd demo-app
```

## 安装

React Router DOM 发布到了 npm，所以您可以使用 npm 或 yarn 进行安装。使用 yarn 创建我们将要使用的 React App。

```
yarn add react-router-dom
# or, if you're not using yarn
npm install react-router-dom
```

现在您可以将任何示例复制/粘贴到 src/App.js 中。这是基本的：

```js
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)
export default BasicExample
```

现在你准备好修补了。routing 快乐！












.
