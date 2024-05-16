import fs from "fs"
const data = fs.readFileSync("data.txt", "utf8")

let floor = 0, position = 0
while (floor >= 0) {
    floor += data[position++] === '(' ? 1 : -1
}

console.log(position)