const fs = require('fs')

const regex = /Card ([ \d]+): ([\d ]+)\|([\d ]+)/

const cards = fs
  .readFileSync('./day4.txt', 'utf8')
  .split(/\r?\n/)
  .map((line) => line.match(regex))
  .map(group => ({
    card: Number(group[1].trim()),
    winningNumbers: group[2].trim().split(' ').filter(x => !!x).map(Number),
    playerNumbers: group[3].trim().split(' ').filter(x => !!x).map(Number)
  }))
  .map(({ card, winningNumbers, playerNumbers }) => {
    const winningSet = [...new Set(winningNumbers)]
    const playerSet = [...new Set(playerNumbers)]
    const intersection = winningSet.filter(n => playerSet.includes(n))
    const points = intersection.length === 0 ? 0 : Math.pow(2, intersection.length - 1)
    return {
      card,
      winningNumbers,
      playerNumbers,
      wins: intersection.length,
      points
    }
  })

//console.log('Part 1:', cards.reduce((acc, { points }) => acc + points, 0)) 

const cardCopies = [...cards]
let index = -1
while (++index < cardCopies.length) {
  const card = cardCopies[index]
  if (!card) {
    continue
  }

  for (let i = card.card; i < card.card + card.wins; i++) {
    cardCopies.push(cards[i])
  }
}

cardCopies.sort((a, b) => a.card < b.card ? -1 : 1)

console.log(cardCopies.length)