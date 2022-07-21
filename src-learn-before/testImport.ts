import { Computer, House } from "./testExport";

// 将整个模块导入到一个变量，并且通过它来访问模块的导出部分

import * as testExport from "./testExport";
console.log(testExport);
let ZipCodeValidator = testExport.ZipCodeValidator;
let a = new ZipCodeValidator();
let numberRegexp = testExport.numberRegexp;
// 通过这种方式导入的声明，不可以访问类型，只能访问的到值

class Xiaomi implements Computer {
  // color: string;
  // price: number;
  // constructor(color: string, price: number) {
  //   this.color = color;
  //   this.price = price;
  // }

  // 这样写法上很简便
  // 声明属性并初始化
  // 和上面 注释一样的效果
  constructor(public color: string, public price: number) {}
}

let myComputer = new Xiaomi("red", 10000);

function getHouse(house: House): void {}
