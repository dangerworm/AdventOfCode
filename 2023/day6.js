const test = [
  { time: 7, distance: 9 },
  { time: 15, distance: 40 },
  { time: 30, distance: 200 }
]

const part1 = [
  { time: 56, distance: 499 },
  { time: 97, distance: 2210 },
  { time: 77, distance: 1097 },
  { time: 93, distance: 1440 }
]

const part2 = [
  { time: 56977793, distance: 499221010971440 },
]

//*
const getProduct = (races) =>
  races.reduce((product, { time, distance }) => {
    let waysBeaten = 0
    for (let i = 0; i < Math.floor((time + 1) / 2); i++) {
      waysBeaten += (i * time - (i * i) > distance)
    }

    return product * (waysBeaten * 2 + (time + 1) % 2)
  }, 1)

console.log("Test:", getProduct(test))
console.log("Part 1:", getProduct(part1))
console.log("Part 2:", getProduct(part2))

/*/
const product = (races) => races
  .reduce((product, { time, distance }) =>
    product * ([...Array(Math.floor((time + 1) / 2))]
      .filter((_, i) => i * (time - i) > distance)
      .length * 2 + (time + 1) % 2)
    , 1)

console.log("Test:", product(test))
console.log("Part 1:", product(part1))
console.log("Part 2:", product(part2))
//*/
