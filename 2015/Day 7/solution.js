import fs from "fs"

const expressions = {
    "INPUT": /(\w+) -> (\w+)/,
    "AND": /(\w+) AND (\w+) -> (\w+)/,
    "OR": /(\w+) OR (\w+) -> (\w+)/,
    "LSHIFT": /(\w+) LSHIFT (\w+) -> (\w+)/,
    "RSHIFT": /(\w+) RSHIFT (\w+) -> (\w+)/,
    "NOT": /NOT (\w+) -> (\w+)/
}

const functions = {
    "INPUT": (x) => x,
    "AND": (a, b) => a & b,
    "OR": (a, b) => a | b,
    "LSHIFT": (a, b) => a << b,
    "RSHIFT": (a, b) => a >> b,
    "NOT": (x) => ~x < 0 ? 65536 + ~x : ~x
}

const getValue = (x, wires) => {
    if (!isNaN(x)) {
        return Number(x)
    }
    if (typeof(x) === undefined || (wires[x] !== 0 && !wires[x])) {
        return null
    }
    return getValue(wires[x], wires)
}

const getWireAValue = (filename) => {
    const lines = fs.readFileSync(filename, "utf8").split('\n')

    const wires = {}
    lines.forEach(line => {
        Object.keys(expressions).forEach(key => {
            if (expressions[key].test(line)) {
                const matches = line.match(expressions[key])
                wires[matches.slice(-1)] = [key, ...matches.slice(1, -1)]
            }
        })
    })

    const keys = Object.keys(wires)
    let counter = 0
    let passes = 0
    let processed = 0

    while (keys.length !== processed) {
        if (counter >= keys.length) {
            counter = 0
            passes++
        }

        const wire = keys[counter]
        const instruction = wires[wire]
        
        if (!isNaN(instruction)) {
            counter++
            continue
        }
        
        const [opCode, a, b] = instruction
        const aValue = getValue(a, wires)
        const bValue = getValue(b, wires)
        
        let newValue
        if (typeof (b) === 'undefined') {
            if (aValue !== null && !isNaN(aValue)) {
                newValue = functions[opCode](aValue)
            }
        }
        else {
            if (aValue !== null && !isNaN(aValue) && bValue !== null && !isNaN(bValue)) {
                newValue = functions[opCode](aValue, bValue)
            }
        }

        if (!isNaN(newValue) && newValue !== null) {
            wires[wire] = newValue
            processed++
        }

        counter++
    }

    return wires['a']
}

console.log("Part 1: ", getWireAValue("./data1.txt"))
console.log("Part 2: ", getWireAValue("./data2.txt"))