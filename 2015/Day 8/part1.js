import fs from "fs"

const lines = fs.readFileSync("./data.txt", "utf8").split('\n')
const strings = lines.map(l => l.match(/"(.*)"/)[1])
const shorts = strings.map(l => l.replace(/\\x[a-f0-9]{2}/g, "%").replace(/\\./g, "^"))

let total = lines.reduce((acc, val) => acc + val.length, 0) - shorts.reduce((acc, val) => acc + val.length, 0)
console.log(total)
