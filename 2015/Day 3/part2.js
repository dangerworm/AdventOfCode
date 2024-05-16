import fs from "fs"

const input = fs.readFileSync("./data.txt", "utf8")
    .split('')

const directions = {
    '^': [0, 1],
    'v': [0, -1],
    '<': [-1, 0],
    '>': [1, 0]
}
    
let santaX = 0, santaY = 0
let roboSantaX = 0, roboSantaY = 0
let dx = 0, dy = 0, houses = { '0.0': 0 }, location = ''

for (let i = 0; i < input.length; i++) {
    [dx, dy] = directions[input[i]]
    
    if (i % 2 === 0) {
        santaX += dx
        santaY += dy
        location = `${santaX}.${santaY}`
    } else {
        roboSantaX += dx
        roboSantaY += dy
        location = `${roboSantaX}.${roboSantaY}`
    }

    if (!houses[location]) {
        houses[location] = 0
    }
    houses[location]++
}

console.log(Object.keys(houses).length)
