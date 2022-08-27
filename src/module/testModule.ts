import Person from './validation'

// 如果有 export 被ts认为是一个module

console.log(123)

// 如果文件不是一个module那么定义类型，全局可用
export type Student = {
  name: string
}

export interface Cat {
  name: string
  birth: string
  age: number
  color: string
}

export class Animal {}

// 默认导出的是一个类型
export default interface Book {
  name: string
  editor: string
}

//
export const createName = (name: string): string => {
  return name
}

// export {}

// 不能这样写，将默认导出重新命名
// import sayHello as localSayHello1 from './hello'

// 可以这样写
import { default as abc } from './hello'

abc()

// 这样是可以的，将默认导出重新命名
import localSayHello from './hello'

export * from './hello'

//
