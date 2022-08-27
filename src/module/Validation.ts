export interface StringValidator {
  isAcceptable(s: string): boolean
}

type Person = {
  name: string
  age: number
}

export default Person
