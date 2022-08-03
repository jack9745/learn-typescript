class Greeter {
  constructor(customGreeting) {
    this.customGreeting = customGreeting;
  }
  greet() {
    console.log("hello,world");
  }

  myMethod({ width, height }) {
    return 123;
  }
}
