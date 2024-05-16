import fs from "fs"

const lines = fs.readFileSync("./data.txt", "utf8").split('\n')
const strings = lines.map(line => `"${line.replace(/\\/g, `\\\\`).replace(/\"/g, `\\"`)}"`)

let total = strings.reduce((acc, val) => acc + val.length, 0) - lines.reduce((acc, val) => acc + val.length, 0)
console.log(total)
