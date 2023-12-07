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
    const wins = winningSet.filter(n => playerSet.includes(n)).length
    const points = wins === 0 ? 0 : Math.pow(2, wins - 1)
    return {
      card,
      winningNumbers,
      playerNumbers,
      wins,
      points
    }
  })

console.log('Part 1:', cards.reduce((acc, { points }) => acc + points, 0)) 

const cardCopies = [...cards]
let index = -1
while (++index < cardCopies.length) {
  const { card, wins } = cardCopies[index]
  if (!card) {
    continue
  }
  
  cardCopies.push(...cards.slice(card, card + wins))
}

console.log('Part 2:', cardCopies.length)