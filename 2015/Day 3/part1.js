import fs from "fs"

const input = fs.readFileSync("./data.txt", "utf8")
    .split('')

const deltas = {
    '^': [0, 1],
    'v': [0, -1],
    '<': [-1, 0],
    '>': [1, 0]
}
    
let x = 0, y = 0, houses = { '0.0': 0 }, location = ''

for (let direction of input) {
    let [dx, dy] = deltas[direction]
    x += dx
    y += dy
    location = `${x}.${y}`

    if (!houses[location]) {
        houses[location] = 0
    }
    houses[location]++
}

console.log(Object.keys(houses).length)
