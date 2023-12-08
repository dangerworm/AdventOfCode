const fs = require('fs')

const CARD_ORDER = 'AKQJT98765432'
const CARD_ORDER_WITH_JOKERS = 'AKQT98765432J'

const FIVE_OF_A_KIND = 1
const FOUR_OF_A_KIND = 2
const FULL_HOUSE = 3
const THREE_OF_A_KIND = 4
const TWO_PAIR = 5
const ONE_PAIR = 6
const HIGH_CARD = 7

const getType = (hand) => {
  const maxCount = Math.max(...Object.values(hand))
  const minCount = Math.min(...Object.values(hand))

  if (maxCount === 5) return FIVE_OF_A_KIND
  if (maxCount === 4) return FOUR_OF_A_KIND
  if (maxCount === 3 && minCount === 2) return FULL_HOUSE
  if (maxCount === 3) return THREE_OF_A_KIND
  if (maxCount === 2 && Object.values(hand).length === 3) return TWO_PAIR
  if (maxCount === 2) return ONE_PAIR
  return HIGH_CARD
}

const getTypeWithJokers = (hand) => {
  const type = getType(hand)

  if (type === FOUR_OF_A_KIND && hand['J']) return FIVE_OF_A_KIND
  if (type === FULL_HOUSE && hand['J']) return FIVE_OF_A_KIND
  if (type === THREE_OF_A_KIND && hand['J']) return FOUR_OF_A_KIND
  if (type === TWO_PAIR && hand['J'] === 2) return FOUR_OF_A_KIND
  if (type === TWO_PAIR && hand['J'] === 1) return FULL_HOUSE
  if (type === ONE_PAIR && hand['J']) return THREE_OF_A_KIND
  if (type === HIGH_CARD && hand['J'] === 1) return ONE_PAIR
  return type
}

const sortPlayers = (player1, player2, cardOrder) => {
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

      if (cardOrder.indexOf(player1Card) > cardOrder.indexOf(player2Card)) {
        return -1
      }
      else if (cardOrder.indexOf(player1Card) < cardOrder.indexOf(player2Card)) {
        return 1
      }
    }
  }
  return 0
}

const parse = (fileName) =>
  fs.readFileSync(fileName, 'utf8')
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

const part1 = (data) =>
  data
    .map((player) => ({
      ...player,
      type: getType(player.hand)
    }))
    .sort((p1, p2) => sortPlayers(p1, p2, CARD_ORDER))

const part2 = (data) =>
  data
    .map((player) => ({
      ...player,
      type: getTypeWithJokers(player.hand)
    }))
    .sort((p1, p2) => sortPlayers(p1, p2, CARD_ORDER_WITH_JOKERS))

const getSum = (players) =>
  players
    .reduce((sum, player, index) =>
      sum + player.bid * (index + 1)
      , 0)

const data = parse('day7.txt')
console.log("Part 1:", getSum(part1(data)))
console.log("Part 2:", getSum(part2(data)))