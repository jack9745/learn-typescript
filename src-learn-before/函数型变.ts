/**
 *
 * 怎么判断函数A是函数B的子类型*/

// 函数的型变

class Animal {}

class Bird extends Animal {
  chirp() {}
}
class Crow extends Bird {
  caw() {
    console.log("caw");
  }
}
// 我们先约定一套句法，如果A是B的超类，或者A和B的类型一样，那么就表示为A>=B

// 所以三个类之前的关系是
// Animal > Bird > Crow

// 我们在定义一个函数 ，参数类型是Bird
// 之前的一个基本知识，class类既可以作为值使用，也可以作为类型使用
function chirp(bird: Bird): Bird {
  return bird;
}

chirp(new Animal());
let bird = chirp(new Bird());
let crow = chirp(new Crow());
crow.chirp();
crow.caw(); // 这里报错了，
// 所以再一次证明了在需要某预期类型的地方可以使用该类型，或者该类型的子类型
// 但是不能使用预期类型的父类型

export default Animal;

