// UMD modules

// Some libraries are designed to be used in many module loaders, or with no module loading (global variables). These are known as UMD modules. These libraries can be accessed through either an import or a global variable. For example:

// UMD 模块怎么写文件声明  怎么写
// 如下所示
export function isPrime(x: number): boolean
export as namespace mathLib

// 在ts中怎么用 UMD 模块  怎么用
// 分两种情况 一种是模块中使用  一种是脚本中使用

// 在模块中这样使用
//import { isPrime } from "math-lib";
// isPrime(2);

// 这种不能在模块中使用
// mathLib.isPrime(2); // ERROR: can't use the global definition from inside a module

//
// 在脚本中使用
// It can also be used as a global variable, but only inside of a script. (A script is a file with no imports or exports.)

// mathLib.isPrime(2);
