import fs from "fs"

const input = fs.readFileSync("./data.txt", "utf8").split('\n')

let totalRibbon = 0
for (let line of input) {
    const dimensions = line.split('x').map(Number)
    dimensions.sort((a, b) => a < b ? -1 : 1)
    
    const smallestPerimeter = dimensions
        .slice(0, 2)
        .reduce((acc, val) => acc + 2*val, 0)

    const bowLength = dimensions.reduce((acc, val) => acc * val, 1)
    totalRibbon += smallestPerimeter + bowLength
}

console.log(totalRibbon)