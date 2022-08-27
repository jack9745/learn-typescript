let numberRegexp = /^[0-9]+$/
class ZipCodeValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s)
  }
}
type Person = {
  name?: string
  age?: number
  height?: number
  rich?: boolean
}
let obj = { name: 'huangtao' }
const USERNAME = 'huangtao'
export = ZipCodeValidator

// export =and import = require()

//  TypeScript supports export = to model the traditional CommonJS and AMD workflow.

// The export = syntax specifies a single object that is exported from the module. This can be a class, interface, namespace, function, or enum.
// 这个语法可以导出单个对象， 好像是都可以导出
// 可以导出常量，导出对象，导出类型别名，导出接口

//
// When exporting a module using export =, TypeScript-specific import module = require("module") must be used to import the module.
// 当用export =语法导出一个对象，
// 要用 import module = require('module') 语法导入这个对象
