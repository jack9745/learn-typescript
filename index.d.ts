/// <reference path='./types/custom.d.ts'>

// 这里定义的是给别人用的，不是给自己用的

// 这里有export 和没有export 有什么区别
// 现象 ,没有export 在 object-type.ts中，OldPeople 可以获取到，如果加上export
// 在文件中就获取不到，

// 经过测试发现，我的理解 如果带有export 那么就要 import {}，
// 如果没有 export 就不需要 import {} 就可以直接用
declare class OldPeople {
  name: string
  age: number
  rich: boolean
  weight: number
  constructor(name: string, age: number)
}
