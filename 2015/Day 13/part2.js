import fs from "fs"
import { totalmem } from "os"

const getCombinations = (currentList, nameOptions) => {
    if (nameOptions.length === 1) return [...currentList, nameOptions[0]]

    let combinations = []
    for (let personName of nameOptions) {
        const otherNames = nameOptions.filter(o => !currentList.includes(o) && o !== personName)
        combinations.push(getCombinations([...currentList, personName], otherNames))
    }

    return typeof (combinations[0][0]) !== 'string'
        ? combinations.reduce((acc, val) => [...acc, ...val], [])
        : combinations
}

const input = fs.readFileSync("./data.txt", "utf8")
    .split("\n")
    .map(line => line.match(/(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)/))

const happinessValues = {}
input.forEach(([_, name1, gainLose, value, name2]) => {
    happinessValues[`${name1} ${name2}`] = value * (gainLose === "gain" ? 1 : -1)
    happinessValues[`${name1} Me`] = 0
    happinessValues[`${name2} Me`] = 0
    happinessValues[`Me ${name1}`] = 0
    happinessValues[`Me ${name2}`] = 0
})

const names = input
    .map(([_, name1, gainLose, value, name2]) => name1)
    .filter((value, index, array) => array.indexOf(value) === index)

const combinations = getCombinations([names[0]], names.slice(1))

let maxHappiness = 0

for (let combination of combinations) {
    const totalHappiness = combination.reduce((total, name1, index, array) => {
        const name2 = index === combination.length - 1 ? 'Me' : array[index+1]
        return total + happinessValues[`${name1} ${name2}`] + happinessValues[`${name2} ${name1}`]
    }, 0)

    if (totalHappiness > maxHappiness) {
        maxHappiness = totalHappiness
    }
}

console.log(maxHappiness)