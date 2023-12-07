const fs = require('fs')

const lines = fs
  .readFileSync('day7.txt', 'utf8')
  .split(/\r?\n/)
  .map((line) => {
    const [hand, bid] = line.split(' ')
    return {
      bid: bid,
      hand: hand
        .split('')
        .reduce((dict, card) => {
          if (dict[card]) {
            dict[card]++
          } else {
            dict[card] = 1
          }
        }, {})
    }
  })

console.log(lines)