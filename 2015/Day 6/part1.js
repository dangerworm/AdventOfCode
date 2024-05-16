import fs from "fs"

const regex = /(turn on|toggle|turn off) (\d+),(\d+) through (\d+),(\d+)/
const instructions = fs.readFileSync("./data.txt", "utf8")
    .split('\n')
    .map(line => line.match(regex))

const lights = Array.from(new Array(1000))
    .map(x => Array.from(new Array(1000))
        .map(x => 0))

for (let instruction of instructions) {
    const command = instruction[1]
    const [x1, y1, x2, y2] = [...instruction].slice(2).map(Number)
    
    let func = () => {}
    switch (command) {
        case "turn on":
            func = (currentState) => 1
            break
        case "toggle":
            func = (currentState) => 1 - currentState
            break
        case "turn off":
            func = (currentState) => 0
            break
    }

    for (let y = y1; y <= y2; y++) {
        for (let x = x1; x <= x2; x++) {
            lights[x][y] = func(lights[x][y])
        }
    }
}

const total = lights.reduce((total, row) =>
    total + row.reduce((acc, light) => acc + light, 0), 0)

console.log(total)