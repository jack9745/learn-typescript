export default function sayHello() {
  console.log('hello,world')
  return 'hello,world'
}

export function helloWorld(word: string): string {
  console.log(word)
  return word
}

export const userName = {
  name: 'jack',
}

// 导出的函数也可以在本文件中调用
console.log('初始化一些数据test')
helloWorld('调用函数，初始化一些数据')
