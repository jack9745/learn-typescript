import { helloObj } from './module/exportTestHello'

console.log(helloObj.default)

//With TypeScript 3.8, you can use export * as ns as a shorthand for re-exporting another module with a name:

// 可以导出所以变量，挂载在all上
export * as all from './module/validation'

// 是这样导入的
// import {all} from "./xx.ts"

// export =and import = require() 语法
// 为什么会有这样的语法呢？？？
// The export = syntax specifies a single object that is exported from the module. This can be a class, interface, namespace, function, or enum.

// When exporting a module using export =, TypeScript-specific import module = require("module") must be used to import the module.
