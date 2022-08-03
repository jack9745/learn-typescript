export const fn = function () {
  console.log("SomeModule");
  return "ssss";
};

//

// In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module. Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).

// 在一个文件中如果有顶层的import语法和export语法，那么这个文件被认为是一个模块，否则就被认为是一段脚本，在全局作用域都可以使用的

// Modules are executed within their own scope, not in the global scope; this means that variables, functions, classes, etc. declared in a module are not visible outside the module unless they are explicitly exported using one of the export forms. Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the import forms.

// 模块在他们自己的作用域里执行，里面声明的变量在模块外是不可见的，除非要显示的导出，然后显示的导入才可以

export interface StringValidator {
  //
  (a: string): boolean;
  (a: number): boolean;
}
let validator: StringValidator = function (a: string | number): boolean {
  return true;
};
// Any declaration (such as a variable, function, class, type alias, or interface) can be exported by adding the export keyword.

// 任何声明都可以导出，用export关键字

// import ZipCodeValidator = require("./module/validator");
// console.log("ZipCodeValidator", ZipCodeValidator);
// let user: ZipCodeValidator = {
//   name: "huangtao",
// };

// ????
let needZipValidation = true;
import { ZipCodeValidator } from "./module/ZipCodeValidator";
if (needZipValidation) {
  // 这样写 有什么意义？？？
  // let ZipCodeValidator: typeof Zip = require("./module/ZipCodeValidator");
  let validator = new ZipCodeValidator();
  if (validator.isAcceptable("...")) {
    /* ... */
  }
}

// Working with Other JavaScript Libraries
// To describe the shape of libraries not written in TypeScript, we need to declare the API that the library exposes.

// 为了描述不是用typescript编写的库，我们需要声明库暴露出来的 API
// 比如一个函数 参数的类型，返回值的类型，

// We call declarations that don’t define an implementation “ambient”. Typically, these are defined in .d.ts files.If you’re familiar with C/C++, you can think of these as .h files
// 我们将不定义实现的声明叫做环境声明

//
