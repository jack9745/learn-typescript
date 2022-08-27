// ts 中的module 语法学习

// js 在es6中支持了模块化

// In TypeScript, just as in ECMAScript 2015, any file containing a
// top-level import or export is considered a module.

// 在一个文件的顶层中 如果有 import 和export 那么就认为是一个module
//  在 es6 和 ts中都是这样的

// Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).

// 如果一个文件中么有顶层的import或者 export 那么这个文件的内容就是在全局作用域中生效的

// Modules are executed within their own scope, not in the global scope. This means that variables, functions, classes, etc. declared in a module are not visible outside the module unless they are explicitly exported using one of the export forms. Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the import forms.
// modules中的脚本是在自己的作用域执行的，不是在全局作用域里执行的，
// 模块中的变量，函数，类，等等在模块外是不可见的，除非他们明确的导出

// 例子
import type Person from './module/validation'
//  type 关键字 可有可无
let user: Person = {
  name: 'jack',
  age: 12,
}

// Non-modules
// 在ts中，
// Before we start, it’s important to understand what TypeScript considers a module. The JavaScript specification declares that any JavaScript files without an export or top-level await should be considered a script and not a module.

// 上面没有写 without import ，经过测验，如果有import，那么这个文件也被认为是一个mudule ，
// 我们可以测验 testModule,将这个文件红的import语句注释或者打开

// You can import a file and not include any variables into your current module via import "./file":
// 会执行所加载的模块但是不会 输入任何值

// In this case, the import does nothing. However, all of the code in maths.ts was evaluated, which could trigger side-effects which affect other objects.

// Import a module for side-effects only
// Though not recommended practice, some modules set up some global state that can be used by other modules. These modules may not have any exports, or the consumer is not interested in any of their exports. To import these modules, use:

// 不管是不是模块，都可以这样导入，不会导入任何变量，仅仅是产生一些副作用
import './module/testModule'

// let a: Student = {
//   name: 'student',
// }
// console.log(a)

// import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。
// 运行时执行，什么时候运行到这一句就会加载指定的模块
// import()函数与所加载的模块没有静态连接关系，这点也是与import语句不相同。
// 动态加载一个模块 如果这个文件不是一个模块，会加载失败
// 路径可以是静态的
import('./module/hello')

//
//路径也可以是动态的，
const path = 'hello'
import(`./module/${path}`).then((module) => {
  console.log(module)
  module.helloWorld('abc')
})

// 如果testModule没有export 或者import命令 那么下面会提示不是模块
import('./module/testModule')

//
// If you have a file that doesn’t currently have any imports or exports, but you want to be treated as a module, add the line:

// export {};

// 如果一个文件 没有import或者 export 但是你想把它当成一个module 可以export {}
// 这里有一个场景，就是执行一段js,但是又不想暴露变量给全局

// Modules in TypeScript

// 导入默认导出 和 常规导出

// import {old as new}:
// 导入的变量可以被重新命名
// An import can be renamed using a format like import {old as new}:
import sayHello, { userName as localUserName } from './module/hello'
sayHello()
console.log(localUserName)

// You can take all of the exported objects and put them into a single namespace using * as name:

import * as helloObj from './module/hello'

console.log(helloObj.default) // 默认导出
typeof helloObj.default === 'function' && helloObj.default()
console.log(helloObj.helloWorld)
console.log(helloObj.userName)

//
export type Dog = {
  birth: string
  name: string
}

// TypeScript has extended the import syntax with two concepts for declaring an import of a type:

// import type
// Which is an import statement which can only import types:
// 表示只能引入类型
import type { Student as localStudent } from './module/testModule'
import { helloWorld } from './module/testModule'
//

// TypeScript 4.5 also allows for individual imports to be prefixed with type to indicate that the imported reference is a type:

// 还可以这样引入
import { type Student, createName } from './module/testModule'

// interface声明的类型 也是用type
import type Book from './module/testModule'

let book: Book = {
  name: '学习前端',
  editor: 'jack',
}
console.log(book)

// 验证一些东西

// 支持 CommonJS Syntax
import commonModule = require('./module/commonModule') // 为什么自己写的commonJS module 不支持 import 语法

// 不能从module.exports导出
// import { addString } from './module/commonModule'
// addString('a', 'b')
// commonModule.add(1)
commonModule.add('abc', 'sss') // 没有类型提示呢？？
import fs = require('fs') //

// Default exports
// Default exports are marked with the keyword default; and there can only be one default export per module.

// 一个模块只能有一个默认导出

// Default export class and function declaration names are optional
// 默认导出的类 和函数的名称是可选的

// 这样是不可以的
// import sayHello as localSayHello from './module/hello'

// 可以这样给默认导出重新命名
import { default as abc } from './module/hello'

// 怎么理解 export default a
// export default a 命令的本质是导出一个变量，这个变量叫default ,后面的a表示将a的值赋值给变量default,
// 所以 export default后面不能是语句，可以是表达式
const a = ''
export default a
