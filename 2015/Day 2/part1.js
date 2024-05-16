import fs from "fs"

const input = fs.readFileSync("./data.txt", "utf8").split('\n')

let totalArea = 0
for (let line of input) {
    const [l, w, h] = line.split("x").map(Number)
    const areas = [l*w, w*h, h*l]
    const minArea = Math.min(...areas)

    totalArea += areas.reduce((acc, area) => acc + 2*area, 0) + minArea
}

console.log(totalArea)