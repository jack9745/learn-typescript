// typescript中，函数通常是下面这样子的
function add(a: number, b: number): number {
  return a + b;
}

// 通常情况下我们要显示的注解函数的参数
// 函数的返回类型一般可以推导出来，不过也可以显示的注解出来
/**
 * 怎么显示的注解函数的返回值的类型
 * 就是在参数的（右括号结束）后面加冒号:,然后加上返回值的类型
 * */
function add(a: number, b: number, c: number): number {
  return a + b + c;
}
function log(message: string) {}
log("abc");

// 可选参数和参数的默认值
// 要点1
/**
 * 怎么标记一个参数是可选参数
 * 就是在一个参数名称的后面加上一个问号?就可以了
 *
 */
function logUser(message: string, userId?: string) {
  let time = new Date().toLocaleDateString();
  console.log(time, message, userId || "not signed in ");
}

// 要点2
// 这种写法是错误示例，可选的参数要放在最后面，必传的参数要在可选参数的前面
function errorLogUser(message?: string, userId: string) {
  return userId;
}

// 要点3
// 可以为参数提供默认值
function logDefault(message: string, userId = "1234556789") {
  console.log(message, userId);
}
logDefault("abc");
// 带有默认值的参数可以在其他参数前面
function logDefaultBefore(userId = "123456789", message: object) {
  console.log(message, userId);
}

// 带默认值的参数要是在前面的话，要传入 undefined
logDefaultBefore(undefined, {});

// 要点四
/**
 * 如果我们愿意，我们也可以显示的注解默认值参数的类型
 *
 */
type Context = {
  appId?: string;
  userId?: string;
};
function logContext(message: string, context: Context = { appId: "abc" }) {
  return context;
}
logContext("abc", {});

/**
 * 知识要点
 * 剩余参数
 *
 * 什么是剩余参数
 * 我的理解：将可变参数整体表示为一个数组类型的变量
 *
 * 为什么要用剩余参数
 *
 * 有时候函数需要接受的参数的数量不是固定的，
 * 怎么在函数内部方便的表示可变参数的整体性和安全性
 * 这就是剩余参数的优势
 *
 * 剩余参数怎么用
 * 在一个变量的前面加...
 * 一个函数最多有一个剩余参数，
 * 并且这个剩余参数只能在参数列表的最后
 * */

function sum(...number: number[]) {
  return number.reduce((pre, next) => {
    return pre + next;
  });
}

sum(1 + 2 + 3);

export default sum;
