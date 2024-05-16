import fs from "fs"
const data = fs.readFileSync("data.txt", "utf8")

const ups = data.split('').filter(c => c === '(').length
const downs = data.split('').filter(c => c === ')').length

console.log(ups - downs)