declare module "coustomURL" {
  export interface Url {
    protocol?: string;
    hostname?: string;
    pathname?: string;
  }
}

declare var myLib: {
  makeGreeting(s: string): string;
  numberOfGreetings: number;
};

export as namespace superGreeter;
// export = Greeter;

declare class Greeter {
  constructor(customGreeting?: string);
  greet: void;
  myMethod(opts: MyClass.MyClassMethodOptions): number;
}

declare namespace MyClass {
  export interface MyClassMethodOptions {
    width?: number;
    height?: number;
  }
}

// 为什么要定义声明文件

//我的理解就是声明文件预定义一些变量和函数的类型定义，如C,C++的.h 头文件
// 在typescript中 以.d.ts为扩展名的的文件是声明文件
// 然后在编译的时候不会报错

// 声明全局变量
// 一般使用declare关键字来定义全局变量或者全局类型，interface 和type 不需要添加declare关键字

declare const LIMIT_SIZE = 10;

// 声明一个全局类shixing
export class Earth {
  private weight: number;
  private rotate(): void;
}

// 什么时候需要使用三斜线语法
// 三斜线 表示啥意思，
//  /// <referenc path =''> 表示当前文件依赖某个文件

// declare 关键字是用来声明定义的，不能用来声明实现。
// declare 关键字到底是啥意思
// 用于类型声明，为其他地方不是用typescript编写的没有类型声明的变量，函数，类等 定义类型

// 声明文件中 export declare module  和 declare module  和 export module有啥区别

// 为什么需要声明文件
// 【TypeScript 作为 JavaScript 的超集，在开发过程中不可避免要引用其他第三方的 JavaScript 的库。虽然通过直接引用可以调用库的类和方法，但是却无法使用TypeScript 诸如类型检查等特性功能。为了解决这个问题，需要将这些库里的函数和方法体去掉后只保留导出类型声明，而产生了一个描述 JavaScript 库和模块信息的声明文件。通过引用这个声明文件，就可以借用 TypeScript 的各种特性来使用库文件了。】

//现在开发的时候大多需要引入第三方库，不管第三方库遵循什么格式的模块系统，或者只提供了一个全局变量，或者用什么js或者ts开发的，都需要声明文件，这样typescript检查我们的调用是否正确，
// 如果没有声明文件来定义API的类型，那么编译器将会检查错误，编译不过，因为我不知道这个API 是什么类型的
