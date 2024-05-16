import fs from "fs"

const parseNumbers = (object) => {
    switch (typeof object) {
        case "string": return []
        case "number": return [object]
    }
    
    if (Array.isArray(object)) {
        return object.reduce((acc, val) => [...acc, ...parseNumbers(val)] ,[])
    }

    return !Object.values(object).includes("red")
        ? Object.keys(object).reduce((acc, val) => [...acc, ...parseNumbers(object[val])] ,[])
        : []
}

const input = JSON.parse(fs.readFileSync("./data.json", "utf8"))
const sum = parseNumbers(input).reduce((acc, val) => acc + val, 0)

console.log(sum)