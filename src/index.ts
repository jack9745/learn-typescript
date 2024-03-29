// 类型也可以引入的
import { Book } from './basic-type'
import './basic-type'
import './object-type'
import './class-type'
import './class-type-two'
import './parent-and-child'
import './advanced'
import './type-operater'
import './conditional'
import './declare'
import './Compatibility'
import './mixins'
import './tsModule'
import './tsModule2'
// import { Earth } from "../types/custom"; // 还可以引入类型声明文件 ？？
// import * as SomeModule from "./SomeModule";
import { fn } from './someModule'

fn()
// 配置allowJS true 下面的一行才不会报错
// import { addString } from './test/add' // 如果是个包的名字，而不是路径，是会从node_modules中查找的

// 这样也是可以的  .d.ts文件也是可以import的
// import { type Vue } from '../types/vue'
// const vueInstance: Vue = {
//   data() {
//     return {
//       name: 'jack',
//     }
//   },
//   components: {},
//   methods: {
//     // a: function () {},
//   },
// }
// console.log('vueInstance', vueInstance)
// SomeModule.fn();
let book: Book = {
  author: 'huangtao',
  published: '深圳出版社',
  page: 900,
}
console.log(book)
let userName: string
userName = 'jack huangtao'
console.log(userName)
let dom = document.getElementById('text') as HTMLInputElement
// 肯定它是HTML元素，并且是存在的可以用类型断言
let box = document.getElementById('box') as HTMLElement
console.log(box.innerHTML)
console.log(dom.value)
let nameList: string[]
nameList = ['huangtao', 'jack', 'rose']
nameList.forEach((item) => {
  console.log(item.toUpperCase())
})

type myBool = false | true
let bool: myBool = false

interface Circle {
  type: 'circle'
  radius: number
}
interface Square {
  type: 'square'
  size: number
}

interface Rectangle {
  type: 'rectangle'
  height: number
  width: number
}

// 什么是类型别名 ，我的理解是自己定义某种类型，然后取个语义化的名字，
// 为什么要这样做，有什么场景 ，语义化，好理解  定义之后可以到处引用
type Shape = Rectangle | Circle | Square
let shape: Shape = {
  type: 'rectangle',
  height: 900,
  width: 900,
}

const computedArea = (shape: Shape): number => {
  if (shape.type === 'circle') {
    return Math.PI * shape.radius ** 2
  } else if (shape.type === 'rectangle') {
    return shape.height * shape.width
  } else if (shape.type === 'square') {
    return shape.size ** 2
  }

  // 缺少这行代码
  return 0
}
let area = computedArea(shape)
console.log(area)

type A = keyof Rectangle //  'type' | 'width' | 'height'
let a: A = 'type' // ???
let b: Rectangle['width'] // number
b = 90

function liveDangerously(x?: number | null) {
  // No error
  // !.是非空断言语法  表示这个值一定不是空的，
  // 就是在编译时告诉typescript，这个变量或者属性的值不是空的，
  // 让typescript 不在编译时报错，告诉typescript，这里是非空值，让编译通过
  console.log(x!.toFixed())
}

// 如果不传入值 在运行时还是会报错的，
// liveDangerously();

const printName = ({ first, last }: { first: string; last?: string }) => {
  console.log(last)
  if (last) {
    return first + last
  }
  return first
}

// 下面两种传参情况都可以
printName({ first: 'huangtao' }) // undefined
printName({ first: 'huangtao', last: 'jack' })

// 加个declare表示啥意思呢
export class OldPeople {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.age = age
    this.name = name
  }
}

// 如果把上面的 export class OldPeople 注释掉，并且 ts.config中的编译选项 include 不包含index.d.ts,
// 那么将不识别  OldPeople 类型 会报错
let userB: OldPeople = {
  name: 'jack',
  age: 10,
}

// 什么是类型断言 what how when
// TypeScript only allows type assertions which convert to a more specific or less specific version of a type.
//  This rule prevents “impossible” coercions like:

const x = 'hello' as string

const getLength = (something: string | number): void => {
  // 如果实际传入的是一个数字，依然会报错
  let length = (something as string).length
  console.log(length)

  // 这样是错误的，我的理解是不能将断言作为判断一个值的类型的条件语句
  // if (something as string) {
  //   return something.length;
  // }

  // 验证声明文件中定义的全局类型
  // class A extends Earth {
  //   // constructor() {
  //   //   super();
  //   // }
  // }
  // let earth: Earth = new A();
}

// 在 add.d.ts中声明了函数 addString的类型 这里生效了  addString
// 不会报语法错误了
// 但是运行时会报错，因为addString函数没有定义，我们只是声明了类型，但是定义这个函数

// addString('abc', 'ddd')    //没有定义先注释 不然运行时报错了

// 下面也不会报语法错误 因为在 add.d.ts中声明了localLib的类型
// const obj = localLib.assign({}, {})     //没有定义先注释 不然运行时报错了

// 自己定义了一个文件类型的模块

// 如果include中  没有包含 定义 .text 后缀名的文件，那么将报错
// 报错： 找不到 .text的类型声明
import textContent from './test/abc.text'
console.log('textContent', textContent)

//

// import { Url } from 'coustomURL'
// import { isPrime } from 'mathLib'

// 在ts中怎么导入node模块

import URL = require('url')

let myUrl = URL.parse('https://www.typescriptlang.org')
