# 测试 React Apps
在 Facebook，我们使用 Jest 来测试 React 应用程序。

## 开始
### 使用 Create React App 开始
如果您刚开始使用 React，我们建议您使用 [Create React App](https://github.com/facebookincubator/create-react-app)。它已经搭载了 Jest！您无需执行任何额外的安装步骤，就可以直接进行下一个步骤。

### 不使用 Create React App 开始
如果你有一个现有的应用程序，您将需要安装一些软件包，使所有功能都可以一起工作。我们使用 babel-jest 包和 react babel 预设来转换我们的测试环境中的代码。另见 [using babel](https://facebook.github.io/jest/docs/getting-started.html#using-babel)。

运行

```
npm install --save-dev jest babel-jest babel-preset-es2015 babel-preset-react react-test-renderer
```

你的 package.json 应该是这样的（<current-version> 的地方是该包的实际最新版本号）。请添加 scripts 和 jest 配置项。

```json
// package.json
  "dependencies": {
    "react": "<current-version>",
    "react-dom": "<current-version>"
  },
  "devDependencies": {
    "babel-jest": "<current-version>",
    "babel-preset-es2015": "<current-version>",
    "babel-preset-react": "<current-version>",
    "jest": "<current-version>",
    "react-test-renderer": "<current-version>"
  },
  "scripts": {
    "test": "jest"
  }
```

```json
// .babelrc
{
  "presets": ["es2015", "react"]
}
```

然后你就可以使用了。

### 快照测试
让我们创建一个 Link 组件的快照测试，该组件可以呈现超链接：

```javascript
// Link.react.js
import React from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

export default class Link extends React.Component {

  constructor(props) {
    super(props);

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      class: STATUS.NORMAL,
    };
  }

  _onMouseEnter() {
    this.setState({class: STATUS.HOVERED});
  }

  _onMouseLeave() {
    this.setState({class: STATUS.NORMAL});
  }

  render() {
    return (
      <a
        className={this.state.class}
        href={this.props.page || '#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}>
        {this.props.children}
      </a>
    );
  }

}
```

现在让我们使用 React 的 test renderer（测试渲染器） 和 Jest 的快照功能来与组件交互并捕获渲染的输出并创建一个快照文件：

```javascript
// Link.react-test.js
import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // 手动触发回调
  tree.props.onMouseEnter();
  // 重新渲染
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // 手动触发回调
  tree.props.onMouseLeave();
  // 重新渲染
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
```

当您运行 npm test 或 jest 时，这将产生如下输出文件：

```javascript
// __tests__/__snapshots__/Link.react-test.js.snap
exports[`Link changes the class when hovered 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;

exports[`Link changes the class when hovered 2`] = `
<a
  className="hovered"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;

exports[`Link changes the class when hovered 3`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;
```

下次运行测试时，渲染的输出将与先前创建的快照进行比较。快照应该跟着代码更改一起提交。当快照测试失败时，您需要检查是否是预期的或非预期的更改。如果是预期的更改，您可以使用 jest -u 调用 Jest 来覆盖现有的快照。

此示例的代码在 [examples/snapshot](https://github.com/facebook/jest/tree/master/examples/snapshot)。

### Dom 测试
如果你想用断言，您可以使用 [Enzyme](http://airbnb.io/enzyme/) 或 React 的 [TestUtils](http://facebook.github.io/react/docs/test-utils.html) 操纵您渲染的组件。我们在这个例子中使用 Enzyme。

您必须运行 npm install --save-dev enzyme 才能使用 Enzyme。如果您使用 15.5.0 以下版本的 React，您还需要安装 react-addons-test-utils

我们来实现一个在两个标签之间进行切换的简单的复选框

```javascript
// CheckboxWithLabel.js

import React from 'react';

export default class CheckboxWithLabel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isChecked: false};

    // 因为 React class 组件不会自动绑定，因此需要手动绑定
    // http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({isChecked: !this.state.isChecked});
  }

  render() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
}
```

在这个例子中我们使用 Enzyme 的 [shallow renderer 浅层渲染器](http://airbnb.io/enzyme/docs/api/shallow.html)

```javascript
// __tests__/CheckboxWithLabel-test.js

import React from 'react';
import {shallow} from 'enzyme';
import CheckboxWithLabel from '../CheckboxWithLabel';

test('CheckboxWithLabel changes the text after click', () => {
  // 在文档中渲染带有 label 的复选框
  const checkbox = shallow(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />
  );

  expect(checkbox.text()).toEqual('Off');

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');
});
```

此示例的代码在 [examples/enzyme](https://github.com/facebook/jest/tree/master/examples/enzyme)

### 自定义转换器
如果您需要更高级的功能，你也可以建立自己的转换器。这里是使用 babel 的代替 babel-jest 的例子：

```javascript
// custom-transformer.js
'use strict';

const babel = require('babel-core');
const jestPreset = require('babel-preset-jest');

module.exports = {
  process(src, filename) {
    if (babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename,
        presets: [jestPreset],
        retainLines: true,
      }).code;
    }
    return src;
  },
};
```

不要忘了安装让这个例子能够工作的 babel-core 和 babel-preset-jest 包。

为了使它能够与 Jest 一起工作，您需要更新您的 Jest 配置：`"transform": {"\\.js$": "path/to/custom-transformer.js"}`

如果你想要创建一个 babel 支持的转换器，你也可以使用 babel-jest 来组成一个并且传递您的自定义配置选项：

```javascript
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: ['my-custom-preset'],
});
```
