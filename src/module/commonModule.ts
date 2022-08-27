let commonModule = {}

export = {
  add(a: string, b: string) {
    console.log(a + b)
    return a + b
  },
}

module.exports = {
  addString(a: string, b: string) {
    console.log(a + b)
    return a + b
  },
}
type Car = {
  color: string
  name: string
}

// export = Car
