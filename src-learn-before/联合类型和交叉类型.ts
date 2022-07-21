type Dog = {
  name: string;
  color: string;
  wags: boolean;
}; // 对象结构的类型
type Cat = {
  name: string;
  sex: string;
};

type Fish = {
  swim: boolean;
  canBeEat: boolean;
};
// 联合类型 表示一个值的类型是几种类型之一 ，用一根竖线分隔每种类型。
// 下面是声明一个联合类型
type CatOrDogOrFish = Dog | Cat | Fish;

let oneAnimalLikeCatOrDog: CatOrDogOrFish = {
  name: "xiaomiao",
  color: "red",
  swim: false,
  canBeEat: false,
};

/**
 * 下面这样 也可以？前面两个属性是 Dog类型中的，而color属性是Cat类型中的
 *
 * 我的理解是要满足其中一种类型，然后可以加入另外一种类型中的属性
 * */
let anOtherAnimal: CatOrDogOrFish = {
  name: "xiaogou",
  sex: "F",
  color: "red",
};

// 交叉类型
/**
 * 交叉类型是将多个类型合并为一个类型。
 * 这个新的类型需要多个类型中的所有特性。
 */
type CatAndDog = Cat & Dog;

let oneAnimal: CatAndDog = {
  name: "xiaohua",
  sex: "F",
  wags: false,
  color: "red",
};

// 下面的赋值是错误的，因为缺少wags属性和color属性
let errorAnimal: CatAndDog = {
  name: "xxoss",
  sex: "M",
};
/**
 * 没有一个值即属于number类型，又属于string类型
 * 虽然可以这样定义类型别名，但是毫无意义
 * */
type CustomType = number & string;
let a: CustomType = 10; // 悬浮在a上，a的类型是never

// 联合类型的练习

const trueOrNull = (isTrue: boolean) => {
  if (isTrue) {
    return true;
  }
  return null;
};

type Returns = string | null;

// 没有显示注解函数返回的结果
function union(a: string, b: boolean) {
  return a || b;
}

// 没有显示的注解函数返回的结果
function intersection(a: string, b: boolean) {
  return a && b;
}

let result = union("hello", false);

let result1 = intersection("hello", false);

const parseParam = (value: number | string) => {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    return value;
  }
};

export default parseParam;
