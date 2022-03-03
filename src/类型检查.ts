/**
 * 类型检查
 * */
type Unit = "cm " | "px" | "%";
type Width = {
  unit: Unit;
  value: number;
};

function parseWidth(width: number | string | null | undefined): Width | null {
  if (width === null || width === undefined) {
    return null;
  }
  if (typeof width === "number") {
    return {
      unit: "px",
      value: width,
    };
  }
  return null;
}

// 怎么判断一个数据结构的类型是联合类型中的哪一种，
// 当多种类型当中都有同一个属性，并且属性类型是有关系的，比如是超类型，或者子类型
type UserTextEvent = {
  value: string;
  target: HTMLInputElement;
  type: "TextEvent";
};

type UserMouseEvent = {
  value: [number, number];
  target: HTMLElement;
  type: "MouseEvent";
};

type UserEvent = UserTextEvent | UserMouseEvent;

let event: UserEvent = {
  value: [232, 233],
  target: document.createElement("input"),
  type: "MouseEvent",
  // input元素的确切类型是 HTMLInputElement
  // 但是这里是没有问题的
  // type: "MouseEvent",
};

let event2: UserEvent = {
  value: "12",
  target: document.createElement("input"), // 这里一定要是 HTMLInputElement 类型的元素
  type: "TextEvent",
};
function handleEvent(event: UserEvent) {
  if (typeof event.value === "string") {
    console.log(event);
    console.log(event.target); // HTMLElement | HTMLInputElement
  }
}
handleEvent(event);
handleEvent(event2);

function handle(event: UserEvent) {
  if (event.type === "MouseEvent") {
    console.log(event.target); // HTMLElement
  }
}
handle(event);
handle(event2);

export default UserEvent;
