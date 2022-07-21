/**
 * 什么是抽象类
 * 我的理解：用abstract关键字修饰的类就是抽象类
 * 用abstract关键字修饰的方法就是抽象方法
 *
 * 为什么要用抽象类
 * 
 *
 * 怎么用抽象类
 * 用 abstract关键字来修饰类
 *
 * 注意点：
 * 1.抽象类不能被实例化，为什么不能被实例化，我看网上说，因为它不是具体的类，
 * 或者这个类还不够完善，所以不能被实例化，
 * 2.在抽象类中可以声明具体实现的成员方法
 * 3.抽象方法不包含具体实现细节，但是必须在子类中实现细节
 * */

abstract class Person {
  abstract eat(): void;
  walk() {
    console.log("我今天走了很多的路");
  }
}

class Child extends Person {
  eat(): void {
    console.log("我今天吃了很多饭");
  }
}
// 抽象类不能被实例化
new Person();
//
new Child();

abstract class Department {
  departCode = 1000;
  constructor(public name: string) {}
  abstract departmentName: string; // 抽象属性？？？
  abstract getName(): string;
}

class AccountingDepartment extends Department {
  departmentName: string;
  constructor(departmentName: string) {
    super(departmentName);
    this.departmentName = departmentName;
  }

  getName(): string {
    console.log(this.departCode);
    return this.departmentName;
  }
}
// 抽象类不能被实例化
new Department();
new AccountingDepartment("caiwubu");
