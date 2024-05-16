import fs from "fs"

const input = fs.readFileSync("./data.txt", "utf8").split('\n')

let niceStrings = 0
for (let line of input) {
    const hasThreeVowels = /(\w*[aeiou]\w*){3,}/.test(line)
    const hasDoubleLetter = /(.)\1/.test(line)
    const hasDisallowedStrings = /.*(ab|cd|pq|xy).*/g.test(line)
    
    if (hasThreeVowels && hasDoubleLetter && !hasDisallowedStrings) {
        niceStrings++
    }
}

console.log(niceStrings, "nice strings")