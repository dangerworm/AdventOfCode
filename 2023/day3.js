const fs = require('fs')

const data = fs
  .readFileSync('./day3.txt', 'utf8')
  .split(/\r?\n/)

const getNumberLocations = (data) => {
  let minX = 0
  return data.map((line) => line.replace(/[^0-9]/g, '.'))
    .reduce((numberLocations, line, y) => {
      const characters = line.split('')
      let storingNumber = false
      characters.forEach((character, x) => {
        if (!storingNumber && character !== '.') {
          storingNumber = true
          minX = x
        }
        else if (storingNumber && character === '.') {
          storingNumber = false
          numberLocations.push({ number: Number(line.substring(minX, x)), start: minX, end: x - 1, y })
        }
      })

      if (storingNumber) {
        storingNumber = false
        numberLocations.push({ number: Number(line.substring(minX)), start: minX, end: line.length - 1, y })
      }

      return numberLocations
    }, [])
}

const getSymbolLocations = (data) => {
  return data.map((line) => line.replace(/\d/g, '.'))
    .reduce((symbolLocations, line, y) => {
      const characters = line.split('')
      characters.forEach((character, x) => {
        if (character !== '.') {
          symbolLocations.push({ symbol: character, x, y })
        }
      })
      return symbolLocations
    }, [])
}

const isAdjacent = (numberLocation, x, y) => {
  const { start, end, y: row } = numberLocation
  return (end === x - 1 || (start <= x && end >= x) || start === x + 1) &&
    (row === y - 1 || row === y || row === y + 1)
}

const numberLocations = getNumberLocations(data)
const symbolLocations = getSymbolLocations(data)

const partNumbers = []
const gearPartNumbers = []
symbolLocations.forEach((symbolLocation) => {
  const { x, y } = symbolLocation
  const adjacentNumberLocations = numberLocations.filter((numberLocation) =>
    isAdjacent(numberLocation, x, y)
  )
  adjacentNumberLocations.forEach((numberLocation) => {
    if (adjacentNumberLocations.length === 2) {
      gearPartNumbers.push(numberLocation.number)
    }
    partNumbers.push(numberLocation.number)
    numberLocations.splice(numberLocations.indexOf(numberLocation), 1)
  })

})

const part1 = partNumbers.reduce((acc, number) => acc + number, 0)
console.log('Part 1:', part1)

let part2 = 0
for (let i = 0; i < gearPartNumbers.length; i += 2) {
  const [gearPart1, gearPart2] = gearPartNumbers.slice(i, i + 2)
  part2 += gearPart1 * gearPart2
}
console.log('Part 2:', part2)