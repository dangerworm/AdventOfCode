const fs = require('fs')

const regex = /[a-zA-Z]/ig

const part1 = () => {
  return fs
    .readFileSync('day1.txt', 'utf8')
    .split(/\r?\n/)
    .map(line => line.replace(regex, ''))
    .map(line => `${line.split('')[0]}${line.split('')[line.length - 1]}`)
    .map(line => Number(line))
    .reduce((acc, curr) => acc + curr, 0)
}

const part2 = () => {
  const wordNumberMap = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
  }

  String.prototype.mapWordsToNumbers = function (map) {
    return this.split('').reduce((newString, current, index) =>
      newString + (isNaN(Number(current))
        ? Object.keys(map)
          .filter(key => this.substring(index, index + key.length) === key)
          .map(key => map[key])
          .join('')
        : current)
      , '')
  }

  return fs
    .readFileSync('day1.txt', 'utf8')
    .split(/\r?\n/)
    .map(line => line.mapWordsToNumbers(wordNumberMap)) // checked
    .map(line => line.replace(regex, ''))
    .map(line => `${line.split('')[0]}${line.split('')[line.length - 1]}`)
    .map(line => Number(line))
    .reduce((acc, curr) => acc + curr, 0)
}

console.log(part1())
console.log(part2())