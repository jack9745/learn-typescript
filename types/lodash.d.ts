// 这里为什么不需要用export来导出，我的理解是 自己文件用就不需要导出，

// 如果用了 export语法，那么这个文件就是一个模块了，每个模块都有自己的作用域，声明的东西只能在这个文件内部有效，在外部是不可见的，

// 所以 如果加上export 在 object-type.ts中是找不到lodash的
declare module "lodash" {
  export function isEmpty(object: any): boolean;
}
// 为什么用export就报错呢？把export去掉就可以了
// declare class OldPeople {
//   name: string;
//   age: number;
//   rich: boolean;
//   weight: number;
//   constructor(name: string, age: number);
// }
