// 如果用export 导出这个类型别名，那么想用Vue类型别名的文件 就要先导入才可以用

// 不写 declare 也可以 ？ 为什么呢 ？
export declare type Vue = {
  data(): object
  components: object
  methods: {
    [key: string]: (...args: any[]) => void | any
  }
}
