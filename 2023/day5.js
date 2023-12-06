const fs = require('fs')

String.prototype.parseMaps = function (sectionName) {
  const startIndex = this.indexOf(sectionName) + sectionName.length
  const endIndex = this.substring(startIndex).search(/\r?\n\r?\n/, startIndex)

  return this
    .substring(startIndex, startIndex + (endIndex === -1 ? this.length : endIndex))
    .trim()
    .split(/\r?\n/)
    .map(line => line.split(' ').map(Number))
}

const createRangeMaps = (ranges, mapLines) => {
  const rangeMaps = []

  while (ranges.length > 0) {
    const range = ranges.shift()
    let [rangeStart, rangeEnd] = range
    let mapAdded = false

    for (let mapLineIndex = 0; mapLineIndex < mapLines.length; mapLineIndex++) {
      const [destinationStart, mapStart, mapRange] = mapLines[mapLineIndex]
      const mapEnd = mapStart + mapRange - 1
      const difference = destinationStart - mapStart


      if (rangeStart >= mapStart && rangeStart <= mapEnd) {
        rangeMaps.push([rangeStart, rangeEnd <= mapEnd ? rangeEnd : mapEnd, difference])
        mapAdded = true

        if (rangeEnd > mapEnd) {
          ranges.push([mapEnd + 1, rangeEnd])
        }
      }
      else if (rangeEnd >= mapStart && rangeEnd <= mapEnd) {
        rangeMaps.push([rangeStart >= mapStart ? rangeStart : mapStart, rangeEnd, difference])
        mapAdded = true

        if (rangeStart < mapStart) {
          ranges.push([rangeStart, mapStart - 1])
        }
      }
    }

    if (!mapAdded) {
      rangeMaps.push([rangeStart, rangeEnd, 0])
    }
  }

  const newRangeMaps = rangeMaps
    .map(([start, end, difference]) => [start + difference, end + difference])

  return newRangeMaps
}

const getClosestLocation = (rangeMaps, mapsList) => {
  for (let mapLines of mapsList) {
    rangeMaps = createRangeMaps(rangeMaps, mapLines)
  }

  return rangeMaps
    .reduce((minimum, [start, _]) => Math.min(minimum, start), Number.MAX_SAFE_INTEGER)
}

const input = fs.readFileSync('./day5.txt', 'utf8')

const data = {
  seeds: input.parseMaps('seeds:')[0],
  mapsList: [
    input.parseMaps('seed-to-soil map:'),
    input.parseMaps('soil-to-fertilizer map:'),
    input.parseMaps('fertilizer-to-water map:'),
    input.parseMaps('water-to-light map:'),
    input.parseMaps('light-to-temperature map:'),
    input.parseMaps('temperature-to-humidity map:'),
    input.parseMaps('humidity-to-location map:'),
  ]
}

let rangeMaps = data.seeds.map(x => [x, x])

console.log("Part 1:", getClosestLocation(rangeMaps, data.mapsList))

rangeMaps = data.seeds
  .join(' ')
  .match(/(\d+ \d+)+/g)
  .map(x => x.split(' ').map(Number))
  .map(([start, range]) => [start, start + range - 1])

console.log("Part 2:", getClosestLocation(rangeMaps, data.mapsList))
