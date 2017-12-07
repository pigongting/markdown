# 静态类型检查 Static Type Checking

像`Flow`和`TypeScript`这样的静态类型检查程序可以在运行代码之前识别某些类型的问题。他们还可以通过添加自动完成功能来改善开发人员的工作流程。出于这个原因，我们建议在更大的代码库中使用`Flow`或`TypeScript`代替`PropType`。




## Flow

[Flow](https://flow.org/)是一个用于 JavaScript 代码的静态类型检查器。它是在 Facebook 开发的，经常和 React 一起使用。它可以让你使用特殊的类型语法来注释变量，函数和 React 组件，并尽早地发现错误。您可以阅读 [Flow 的介绍](https://flow.org/en/docs/getting-started/) 以了解其基本知识。

要使用 Flow，您需要：

- 将 Flow 作为依赖添加到您的项目。

- 确保 Flow 语法从编译的代码中剥离。

- 添加类型注释并运行 Flow 来检查它们。

我们将在下面详细解释这些步骤。



### 添加 Flow 到项目 Adding Flow to a Project

首先，在终端中导航到您的项目目录。您将需要运行两个命令。

如果您使用 Yarn，请运行：
```
yarn add --dev flow-bin
yarn run flow init
```

如果您使用 npm，请运行：
```
npm install --save-dev flow-bin
npm run flow init
```

第一个命令将最新版本的 Flow 安装到您的项目中。第二个命令创建一个您需要提交的 Flow 配置文件。

最后，将`Flow`添加到`package.json`的`scripts`部分：
```js
{
  // ...
  "scripts": {
    "flow": "flow",
    // ...
  },
  // ...
}
```



### 从编译代码中剥离 Flow 语法 Stripping Flow Syntax from the Compiled Code

Flow 使用特殊的语法来扩展 JavaScript 语言，用于类型注释。但是，浏览器不知道这个语法，所以我们需要确保它不会在编译的 JavaScript 包中，从而不会被发送到浏览器。

确切的做法取决于你用来编译 JavaScript 的工具。


#### Create React App

如果您的项目是使用`Create React App`设置的，恭喜！Flow 默认已被剥离，所以你不需要在这一步做任何事情。


#### Babel

> 注意：  
> 这些说明不适用于使用 Create React App 的用户。即使 Create React App 使用 Babel 引擎，它已被配置为了解 Flow 了。如果你不使用 Create React App，才可以按照这个步骤操作。

如果您为项目手动配置了 Babel，则需要为 Flow 安装一个特殊的 preset。

如果您使用 Yarn，请运行：
```
yarn add --dev babel-preset-flow
```

如果您使用 npm，请运行：
```
npm install --save-dev babel-preset-flow
```

然后添加 flow preset 到您的 Babel 配置中。例如，如果通过`.babelrc`文件配置 Babel，它可能看起来像这样：
```js
{
  "presets": [
    "flow",
    "react"
  ]
}
```

这将允许您在代码中使用 Flow 语法。

> 注意：  
> Flow 不需要 react 预设，但它们经常一起使用。Flow 本身就能理解 JSX 语法。


#### 其他构建设置 Other Build Setups

如果您不使用 Create React App 也不使用 Babel，您可以使用[flow-remove-types](https://github.com/flowtype/flow-remove-types)来去除类型注释。



### 运行 Flow Running Flow

如果你按照上面的说明做了，你应该能够第一次运行 Flow。

```
yarn flow
```

如果您使用 npm，请运行：
```
npm run flow
```

您应该会看到如下信息：
```
No errors!
✨  Done in 0.17s.
```



### 添加 Flow 类型注释 Adding Flow Type Annotations

默认情况下，Flow 仅检查包含此批注的文件：
```js
// @flow
```

通常它被放置在文件的顶部。尝试将其添加到项目中的某些文件中，并运行`yarn flow`或`npm run flow`来查看 Flow 是否已经发现了一些问题。

也可以选择强制让 Flow 检查所有文件，而不考虑注释。对于现有的项目，这可能太吵了，但是对于使用完全 Flow 输入的一个新项目是合理的。

现在你已经准备好了！我们建议查看以下资源以了解有关 Flow 的更多信息：

- Flow 文档：类型注释 [Flow Documentation: Type Annotations](https://flow.org/en/docs/types/)

- Flow 文档：编辑器 [Flow Documentation: Editors](https://flow.org/en/docs/editors/)

- Flow 文档：React [Flow Documentation: React](https://flow.org/en/docs/react/)

- Flow 中的代码检查 [Linting in Flow](https://medium.com/flow-type/linting-in-flow-7709d7a7e969)




## TypeScript

[TypeScript](https://www.typescriptlang.org/)是由微软开发的编程语言。它是一个 JavaScript 类型的超集，包含它自己的编译器。作为一种类型化的语言，Typescript 可以在构建时发现错误和 bug，早在您的应用程序上线之前。你可以在[这里](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter)了解更多关于使用 TypeScript 和 React 一起使用的知识。

要使用 TypeScript，您需要：

- 将 Typescript 作为依赖添加到您的项目

- 配置 TypeScript 编译器选项

- 使用正确的文件扩展名

- 添加您使用的库的定义

我们来详细介绍一下。



### 将 TypeScript 添加到项目 Adding TypeScript to a Project

这一切从在终端中运行一个命令开始。

如果您使用 Yarn，请运行：
```
yarn add --dev typescript
```

如果您使用 npm，请运行：
```
npm install --save-dev typescript
```

恭喜！您已经将最新版本的 TypeScript 安装到您的项目中。安装 TypeScript 让我们可以访问`tsc`命令。在配置之前，让我们将`tsc`添加到`package.json`中的`scripts`部分：

```js
{
  // ...
  "scripts": {
    "build": "tsc",
    // ...
  },
  // ...
}
```



### 配置 TypeScript 编译器 Configuring the TypeScript Compiler

编译器在我们告诉它该怎么做之前，对我们没有用。在 TypeScript 中，这些规则是在名为`tsconfig.json`的特殊文件中定义的。要生成这个文件，运行：
```
tsc --init
```

看看现在生成的`tsconfig.json`，你可以看到有很多选项可以用来配置编译器。有关所有选项的详细说明，请看[这里](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)。

在众多选项中，我们看到`rootDir`和`outDir`。按照它的方式，编译器将接收 typescript 文件并生成 JavaScript 文件。但是我们不想混淆我们的源文件和生成的输出。

我们将通过两个步骤解决这个问题：

- 首先，让我们来安排我们的项目结构。我们将所有的源代码放在`src`目录中。

```
├── package.json
├── src
│   └── index.ts
└── tsconfig.json
```

- 接下来，我们将告诉编译器我们的源代码在哪里以及输出应该在哪里。

```js
// tsconfig.json

{
  "compilerOptions": {
    // ...
    "rootDir": "src",
    "outDir": "build"
    // ...
  },
}
```

太棒了！现在，当我们运行我们的构建脚本时，编译器会将生成的 javascript 输出到构建文件夹。[TypeScript React Starter](https://github.com/Microsoft/TypeScript-React-Starter/blob/master/tsconfig.json)提供了一个`tsconfig.json`，其中有一套很好的规则来帮助你开始。

通常，您不希望将生成的 JavaScript 保留在源代码管理中，因此请确保将生成文件夹添加到`.gitignore`中。



### 文件扩展名 File extensions

在 React 中，您很可能会将您的组件写入 .js 文件。在 TypeScript 中我们有两个文件扩展名：

`.ts`是默认的文件扩展名，而`.tsx`是用于包含 JSX 的文件的特殊扩展。



### 运行 TypeScript Running TypeScript

如果你按照上面的说明去做，你应该能够第一次运行 TypeScript。

```
yarn build
```

如果你使用npm，运行：
```
npm run build
```

如果您看不到输出，则意味着它已成功完成。



### 类型定义 Type Definitions

为了能够显示来自其他包的错误和提示，编译器依赖于声明文件。声明文件提供了关于库的所有类型信息。这使我们能够在我们的项目中使用 npm 上的那些 JavaScript 库。

有两种主要的方式来获得库的声明：

**Bundled** - 该库的打包了它自己的声明文件。这对我们是最好的，因为我们所需要做的就是安装库，并且我们可以马上使用。检查库是否有捆绑类型，在项目中查找`index.d.ts`文件。有些库会在`package.json`中的`typings`或`types`字段指定它。

**DefinitelyTyped** - DefinitelyTyped 是库的一个巨大的声明库


























.
