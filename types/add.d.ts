// declare module 'add' {
//   function add(a: number, b: number): number
//   export default add
// }

// 这里不能用export
// 声明全局函数addString的类型
declare function addString(a: string, b: string): string

// 声明全局对象，对象有属性
declare namespace localLib {
  function assign(obj: object, object1: object): object
}
