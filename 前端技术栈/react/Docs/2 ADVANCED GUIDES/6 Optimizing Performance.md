# 优化性能 Optimizing Performance

在内部，React 使用了一些聪明的技巧来最小化更新 UI 所需的昂贵 DOM 操作的数量。对于许多应用程序，使用 React 将会带来快速的用户界面，而不需要做太多的工作来专门优化性能。不过，有几种方法可以加快您的 React 应用程序。




## 使用生产构建 Use the Production Build

如果您在 React 应用程序中进行基准测试或遇到性能问题，请确保使用缩小的生产版本进行测试。

默认情况下，React 包含许多有用的警告。这些警告在开发中非常有用。但是，它们会使 React 变得越来越大，所以您应该确保在部署应用程序时使用生产版本。

如果您不确定您的构建进程是否设置正确，可以通过安装[React Developer for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)来检查它。如果您在生产模式下访问使用了 React 的网站，该图标将有一个黑暗的背景：
![React DevTools on a website with production version of React](https://reactjs.org/static/devtools-prod-d0f767f80866431ccdec18f200ca58f1-1e9b4.png)

如果您在开发模式下访问使用了 React 的网站，该图标将具有红色背景：
![React DevTools on a website with development version of React](https://reactjs.org/static/devtools-dev-e434ce2f7e64f63e597edf03f4465694-1e9b4.png)

符合预期的是，当你在应用程序上工作时使用开发模式，当你将应用程序部署到给用户时使用生产模式。

在下面您可以找到有关为生产构建您的应用程序的说明。



### Create React App

如果您的项目是使用 Create React App 构建的，请运行：
```shell
npm run build
```

这将在您的项目的`build/`文件夹中创建您的应用程序的生产版本。

请记住，这只是在部署到生产之前需要的。对于正常的开发，使用 npm start。



### 单文件构建 Single-File Builds

我们提供单文件的 React 和 React DOM 的生产版本：
```html
<script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

请记住，只有以`.production.min.js`结尾的 React 文件才适合生产。



### Brunch

对于最高效的 Brunch 生产版本，安装[uglify-js-brunch](https://github.com/brunch/uglify-js-brunch)插件：
```shell
# If you use npm
npm install --save-dev uglify-js-brunch

# If you use Yarn
yarn add --dev uglify-js-brunch
```

然后，要创建生产版本，请将`-p`标志添加到`build`命令：
```shell
brunch build -p
```

请记住，您只需要对生产版本进行此操作。你不应该通过`-p`标志或者在开发中应用这个插件，因为它会隐藏有用的 React 警告，并使构建慢得多。



### Browserify

为了最有效的 Browserify 生产构建，安装一些插件：
```shell
# If you use npm
npm install --save-dev envify uglify-js uglifyify

# If you use Yarn
yarn add --dev envify uglify-js uglifyify
```

要创建生产版本，请确保添加这些转换（**顺序很重要**）：

- envify 转换确保设置了正确的构建环境。把它全局化（`-g`）。

- uglifyify 转换删除开发环境的导入。把它全局化（`-g`）。

- 最后，产生的包被传送到 uglify-js 进行丑化。

例如：
```
browserify ./index.js \
  -g [ envify --NODE_ENV production ] \
  -g uglifyify \
  | uglifyjs --compress --mangle > ./bundle.js
```

> 注意：  
> 包名是 `uglify-js`，但是它提供的二进制文件名为 `uglifyjs`。  
> 这不是一个错别字。

请记住，您只需要对生产版本进行此操作。你不应该在开发中应用这些插件，因为它们会隐藏有用的 React 警告，并使构建慢得多。



### Rollup

要获得最高效的 Rollup 生产版本，请安装一些插件：
```shell
# If you use npm
npm install --save-dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-uglify

# If you use Yarn
yarn add --dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-uglify
```

要创建生产版本，请确保添加这些插件（**顺序很重要**）：

- replace 插件确保已设置了正确的构建环境。

- commonjs 插件为 Rollup 中的 CommonJS 提供支持。

- uglify 插件压缩并丑化最终的包。

```js
plugins: [
  // ...
  require('rollup-plugin-replace')({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  require('rollup-plugin-commonjs')(),
  require('rollup-plugin-uglify')(),
  // ...
]
```

有关完整的设置示例，请[参阅此要点](https://gist.github.com/Rich-Harris/cb14f4bc0670c47d00d191565be36bf0)。

请记住，您只需要对生产版本进行此操作。你不应该在开发中应用`uglify`插件，或用`'production'`值应用`replace`插件，因为它们会隐藏有用的 React 警告，并且使构建更慢。



### webpack

> 注意：  
> 如果您正在使用 Create React App，请按照上面的说明进行操作。
> 本节仅与您直接配置 webpack 有关。

要获得最高效的 webpack 生产版本，请确保在生产配置中包含这些插件：
```js
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
}),
new webpack.optimize.UglifyJsPlugin()
```

你可以在[webpack 文档](https://webpack.js.org/guides/production-build/)中了解更多。

请记住，您只需要对生产版本进行此操作。你不应该在开发中应用`UglifyJsPlugin`插件，或用`'production'`值应用`DefinePlugin`插件，因为它们会隐藏有用的 React 警告，并且使构建更慢。




## Chrome 性能选项卡的分析组件 Profiling Components with the Chrome Performance Tab



















.
