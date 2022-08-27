// 这种方法不会导出默认值 ？？
export * from './hello'

export * from './validation'

export * from './ZipCodeValidator'

// Optionally, a module can wrap one or more modules and combine all their exports using export * from "module" syntax.

// 一个模块可以包装多个模块来一次性导出多个模块的变量

// 需要注意的是  export * 这种写法是会忽略模块的默认导出的

// 这样默认导出 a 是不对的
// export default const a = 'ss'

// 这样是可以的，导出一个变量
export const a = 'a'
const b = 'b'

// 这样也是可以的
export { b }

// 导出全部  这样也可以导出默认的导出
export * as helloObj from './hello'
