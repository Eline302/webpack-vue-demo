# 使用webpack实现vue项目打包任务

> 项目使用webpack5和webpack-cli4

## 项目基本使用

### Compiles and hot-reloads for development

yarn serve

### Compiles and minifies for production

yarn build

### Lints files

yarn lint

### Lints and fixes files

yarn lintfix

## Webpack 打包构建的过程

* Webpack 构建过程
  * 根据配置，识别入口文件；
  * 逐层识别模块依赖（包括 Commonjs、AMD、或 ES6 的 import 等，都会被识别和分析）；
  * Webpack 主要工作内容就是分析代码，转换代码，编译代码，最后输出代码；
  * 输出最后打包后的代码。

* Webpack 构建详细介绍

（1）初始化参数

根据用户在命令窗口输入的参数，解析`Webpack`配置参数，合并`Shell`传入和`webpack.config.js`文件配置的参数，形成最后的配置结果。

（2）开始编译

上一步得到的参数初始化`compiler`对象，注册所有配置的插件，插件监听`Webpack`构建生命周期的事件节点，做出相应的反应，执行对象的`run`方法开始执行编译。

（3）确定入口

从`webpack.config.js`(配置文件) 中指定的 `entry` 入口，开始解析文件构建 `AST` 语法树，找出依赖，递归下去。

（4）编译模块

递归中根据文件类型和`loader` 配置，调用所有配置的 `loader` 对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。

（5）完成模块编译并输出

递归完后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据 `entry` 配置生成代码块 `chunk` 。

（6）输出完成

输出所有的 `chunk` 到文件系统。

## Loader 和 Plugin 有哪些不同以及开发Loader和Plugin的思路

* Loader 和 Plugin 的不同点：
  * Loader 专注实现资源模块的转换和加载（编译转换代码、文件操作、代码检查）
  * Plugin 解决其他自动化工作（打包之前清除 dist 目录、拷贝静态文件、压缩代码等等）

* 开发 Loader 的思路：
  * 可以直接在项目根目录新建 test-loader.js （完成后也可以发布到 npm 作为独立模块使用）
  * 这个文件需要导出一个函数，这个函数就是我们的 loader 对所加载到的资源的处理过程
  * 函数输入为 加载到的资源，输出为 加工后的结果
  * 输出结果可以有两种形式：第一，输出标准的 JS 代码，让打包结果的代码能正常执行；第二，输出处理结果，交给下一个 loader 进一步处理成 JS 代码
  * 在 webpack.config.js 中使用 loader，配置 module.rules ，其中 use 除了可以使用模块名称，也可以使用模块路径

* Plugins实现思路：
  plugin 是通过钩子机制实现的，我们可以在不同的事件节点上挂载不同的任务，就可以扩展一个插件，插件必须是一个函数或者是一个包含 apply 方法的对象，具体思路如下：

  * 导出一个插件类，在类的原型上定义apply方法

  * webpack初始化完成，apply方法上接收compiler对象

  * 通过compiler对象的钩子，定义在某个阶段注入插件，通过tabable定义钩子的触发方式

  * tabable中的方法接受插件名和一个函数，这个函数中接受compliation对象

  * 通过compliation对象上的属性，执行自己想要实现的功能，比如资源类的assets

  * 最后将处理后的结果给compliation上assets属性重新赋值
