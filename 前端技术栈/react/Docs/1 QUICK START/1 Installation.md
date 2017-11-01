# Installation

React 是灵活的，可用于各种项目。您可以使用它创建新的应用程序，您也可以逐渐将其引入到现有的代码库中，而无需重写。

以下是几种入门方式：

- [Try React](https://reactjs.org/docs/installation.html#trying-out-react)
- [Create a New App](https://reactjs.org/docs/installation.html#creating-a-new-application)
- [Add React to an Existing App](https://reactjs.org/docs/installation.html#adding-react-to-an-existing-application)

## 尝试 React

如果您只想玩玩 React，可以使用 CodePen。尝试 [Hello World 示例代码](http://codepen.io/gaearon/pen/rrpgNB?editors=0010)。你不需要安装任何东西；你只要修改代码，就可以看到效果。

如果您喜欢使用自己的文本编辑器，你也可以下载[这个 HTML 文件](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html)，编辑它，并使用浏览器从本地文件系统打开它。它执行一个缓慢的运行时代码转换，所以不要在生产环境使用它。

如果你想在完整的应用程序使用它，有两种流行的方式开始使用 React：使用 Create React App，或将其添加到现有应用程序。

## 创建新的应用程序

[Create React App](http://github.com/facebookincubator/create-react-app) 是开始构建新的 React 单页应用程序的最佳方式。它设置您的开发环境，以便您可以使用最新的 JavaScript 功能，提供不错的开发人员体验，并优化您的应用程序进行生产。您的机器上 Node 需要 >= 6。

```
npm install -g create-react-app
create-react-app my-app

cd my-app
npm start
```

如果您安装了 npm 5.2.0 以上的版本，可以使用 npx。

```
npx create-react-app my-app

cd my-app
npm start
```

Create React App 不处理后端逻辑或数据库；它只是创建一个前端构建管道，因此它可以与你想要的任何后端一起使用。它在内部使用 Babel 和 webpack 作为构建工具，但不需要你配置。

当您准备好部署到生产环境时，运行 npm run build，将在 build 文件夹中创建一个优化构建的应用程序。您可以从它的 [README](https://github.com/facebookincubator/create-react-app#create-react-app-) 和[用户指南](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#table-of-contents)中了解更多有关 Create React App 的信息。

## 向现有应用程序添加 React

您不需要重写应用程序即可开始使用 React。

我们建议您使用 React 实现应用程序的一个小功能，例如单个窗口小部件，以便您可以看到它是否适用于您。

虽然 React 可以在没有构建管道的情况下[使用](https://reactjs.org/docs/react-without-es6.html)，我们建议您设置它，以便您可以更有效率。现代构建管道通常包括：

- 包管理器，如 [Yarn](https://yarnpkg.com/) 或 [npm](https://www.npmjs.com/)。它可以让您利用庞大的第三方软件包生态系统，轻松安装或更新它们。
- 打包器，如 [webpack](https://webpack.js.org/) 或 [Browserify](http://browserify.org/)。它允许您编写模块化代码并将其打包成为小的软件包，以优化加载时间。
- 编译器，如 [Babel](http://babeljs.io/)。它可以让您编写仍旧适用于旧版浏览器的现代 JavaScript 代码。

### 安装 React

> 注意：
> 一旦安装，我们强烈建议您设置[生产构建进程](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build)，以确保您在生产中使用 React 的快速版本。

我们建议使用 [Yarn](https://yarnpkg.com/) 或 [npm](https://www.npmjs.com/) 来管理前端依赖关系。如果您是管理软件包的新手，那么 Yarn [文档](https://yarnpkg.com/en/docs/getting-started)是开始使用的好地方。

使用 Yarn 安装 React，请运行：

```
yarn init
yarn add react react-dom
```

使用 npm 安装 React，请运行：

```
npm init
npm install --save react react-dom
```

Yarn 和 npm 都是 从 [npm registry](http://npmjs.com/) 中下载软件包。

### 启用 ES6 和 JSX

我们建议您 React 和 Babel 配合使用，让您在 JavaScript 代码中使用 ES6 和 JSX。ES6 是一组现代化的 JavaScript 特性，可以使开发变得更简单，JSX 是对 React 的很好的 JavaScript 语言的扩展。

[Babel 设置说明](https://babeljs.io/docs/setup/)讲解如何在许多不同的构建环境中配置 Babel。确保您安装了 [babel-preset-react](http://babeljs.io/docs/plugins/preset-react/#basic-setup-with-the-cli-) 和 [babel-preset-env](http://babeljs.io/docs/plugins/preset-env/)，并在 [.babelrc configuration](http://babeljs.io/docs/usage/babelrc/) 中启用它们。

### Hello World 与 ES6 和 JSX

我们建议使用像 webpack 或 Browserify 这样的打包器，它允许您编写模块化代码并将其打包成为小的软件包，以优化加载时间。

最小的 React 示例如下所示：

```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

这段代码在 id 为 root 的元素中渲染一个 DOM 元素，因此在你的 HTML 文件中需要有 <div id="root"></div> 元素。

类似地，您可以在使用了其他 JavaScript UI 库的现有的应用程序的 DOM 元素中渲染 React 组件。

[了解有关将 React 与现有代码集成的更多信息。](https://reactjs.org/docs/integrating-with-other-libraries.html#integrating-with-other-view-libraries)

### 开发环境和生产环境的版本

默认情况下，React 包含许多有用的警告。这些警告在开发环境中非常有用。

但是，它们使 React 的开发环境版本变得越来越慢，所以您应该在部署应用程序时使用生产环境版本。

学习[如何判断您的网站是否提供正确版本的 React](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build)，如何最有效地配置生产构建过程：

- [使用 Create React App 创建生产环境构建](https://reactjs.org/docs/optimizing-performance.html#create-react-app)
- [使用 Single-File Builds 创建生产环境构建](https://reactjs.org/docs/optimizing-performance.html#single-file-builds)
- [使用 Brunch 创建生产环境构建](https://reactjs.org/docs/optimizing-performance.html#brunch)
- [使用 Browserify 创建生产环境构建](https://reactjs.org/docs/optimizing-performance.html#browserify)
- [使用 Rollup 创建生产环境构建](https://reactjs.org/docs/optimizing-performance.html#rollup)
- [使用 webpack 创建生产环境构建](https://reactjs.org/docs/optimizing-performance.html#webpack)

### 使用 CDN

如果您不想使用 npm 来管理客户端软件包，react 和 react-dom npm 软件包在 umd 文件夹中也提供单文件分发，它们托管在CDN上：

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

以上版本仅用于开发环境，不适合生产环境。React 的优化生产环境版本可以在以下网址获取：

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

要加载 react 和 react-dom 的特定版本，请将 16 替换为特定版本号。

如果您使用 Bower，React 可通过 react 软件包获得。

#### 为什么有 crossorigin 属性

如果您从 CDN 提供 React，我们建议保持 [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) 属性设置：

```html
<script crossorigin src="..."></script>
```

我们还建议验证您正在使用的 CDN 的 HTTP 头的设置 Access-Control-Allow-Origin：*

![Response Headers](https://reactjs.org/static/89baed0a6540f29e954065ce04661048-5447f.png)

这样可以在 React 16 及更高版本中实现更好的错误处理体验。











































.
