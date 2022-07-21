// 导出一个接口
export interface Computer {
  color: string;
  price: number;
}

// 导出一个类型别名
export type House = number;

// 任何声明，比如变量，函数，类，类型别名，接口 都可以导出
// 都可以通过添加export关键字来导出

export interface StringValidator {
  isString(s: string): boolean;
}

export const numberRegexp = /^[0-9]+s/;

export class ZipCodeValidator implements StringValidator {
  isString(s: string): boolean {
    return s.length === 5 && numberRegexp.test(s);
  }
}
