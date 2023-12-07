const fs = require('fs')

const CARD_ORDER = 'AKQJT98765432'
const FIVE_OF_A_KIND = 1
const FOUR_OF_A_KIND = 2
const FULL_HOUSE = 3
const THREE_OF_A_KIND = 4
const TWO_PAIR = 5
const HIGH_CARD = 6

const getType = (hand) => {
  const maxCount = Math.max(...Object.values(hand))
  const minCount = Math.min(...Object.values(hand))

  if (maxCount === 5) {
    return FIVE_OF_A_KIND
  }
  if (maxCount === 4) {
    return FOUR_OF_A_KIND
  }
  if (maxCount === 3 && minCount === 2) {
    return FULL_HOUSE
  }
  if (maxCount === 3) {
    return THREE_OF_A_KIND
  }
  if (maxCount === 2 && Object.values(hand).length === 3) {
    return TWO_PAIR
  }
  return HIGH_CARD
}

const sortPlayers = (player1, player2) => {
  if (player1.type > player2.type) {
    return -1
  }
  if (player1.type < player2.type) {
    return 1
  }
  if (player1.type === player2.type) {
    for (let i = 0; i < 5; i++) {
      const player1Card = player1.line[i]
      const player2Card = player2.line[i]

      if (CARD_ORDER.indexOf(player1Card) > CARD_ORDER.indexOf(player2Card)) {
        return -1
      }
      else if (CARD_ORDER.indexOf(player1Card) < CARD_ORDER.indexOf(player2Card)) {
        return 1
      }
    }
  }
  return 0
}

let sum = 0

const data = fs
  .readFileSync('day7.txt', 'utf8')
  .split(/\r?\n/)
  .map((line) => {
    const [hand, bid] = line.split(' ')
    return {
      line: line,
      bid: Number(bid),
      hand: hand
        .split('')
        .reduce((dict, card) => {
          if (dict[card]) {
            dict[card]++
          } else {
            dict[card] = 1
          }
          return dict
        }, {})
    }
  })
  .map((player) => ({
    ...player,
    type: getType(player.hand)
  }))
  .sort(sortPlayers)

data
  .forEach((player, index) => {
    console.log(player, index + 1, sum + player.bid * (index + 1))
    sum += player.bid * (index + 1)
  })

console.log(data)
console.log(sum)