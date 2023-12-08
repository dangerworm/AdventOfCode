const fs = require('fs')

const getData = (fileName) =>
  fs
    .readFileSync(fileName, 'utf8')
    .split(/\r?\n/)
    .filter((line) => line !== '')

const parseNodes = (data) => {
  const regex = /(\w{3}) = \((\w{3}), (\w{3})\)/
  return data.reduce((dict, node) => {
    const [_, name, L, R] = node.match(regex)
    dict[name] = { L, R }
    return dict
  }, {})
}

const getDirectionsAndNodes = (fileName) => {
  const data = getData(fileName)
  return [data[0].split(''), parseNodes(data.slice(1))]
}

const part1 = (directions, nodes, currentNode, endNodeCase) => {
  let steps = 0
  while (!endNodeCase(currentNode)) {
    const direction = directions[steps % directions.length]
    currentNode = nodes[currentNode][direction]
    steps++
  }

  return steps
}

const part2 = (directions, nodes) =>
  Object
    .keys(nodes)
    .filter(n => n.endsWith('A'))
    .reduce((nodeSteps, node) =>
      [...nodeSteps, part1(directions, nodes, node, (node) => node.endsWith('Z'))]
      , [])

const greatestCommonFactor = (x, y) => {
  while (y) {
    const newX = y
    y = x % y
    x = newX
  }
  return x
}

const lowestCommonFactor = (x, y) => (x * y) / greatestCommonFactor(x, y)

const [directions, nodes] = getDirectionsAndNodes('day8.txt')
console.log("Part 1:", part1(directions, nodes, 'AAA', (node) => node === 'ZZZ'))
console.log("Part 2:", part2(directions, nodes).reduce(lowestCommonFactor))