import fs from "fs"

const input = fs.readFileSync("./data.txt", "utf8").split('\n')

let niceStrings = 0
for (let line of input) {
    const hasRepeatingPair = /(.*(..).*\2.*)/.test(line)
    const hasSeparatedRepeatedLetter = /(.).\1/.test(line)
    
    if (hasRepeatingPair && hasSeparatedRepeatedLetter) {
        niceStrings++
    }
}

console.log(niceStrings, "nice strings") 