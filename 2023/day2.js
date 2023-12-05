const fs = require('fs');

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const parseCubes = (cubeData) => {
  const redRegex = /(\d+) red/;
  const greenRegex = /(\d+) green/;
  const blueRegex = /(\d+) blue/;

  const red = cubeData.match(redRegex);
  const green = cubeData.match(greenRegex);
  const blue = cubeData.match(blueRegex);

  const result = {
    red: red === null ? 0 : parseInt(red[1]),
    green: green === null ? 0 : parseInt(green[1]),
    blue: blue === null ? 0 : parseInt(blue[1]),
  }

  result.isPossible = result.red <= MAX_RED &&
    result.green <= MAX_GREEN &&
    result.blue <= MAX_BLUE;

  return result;
}

const parseLine = (line) => {
  const gameRegex = /Game (\d+): (.*)/;

  const match = line.match(gameRegex);
  const gameId = parseInt(match[1]);
  const cubeData = match[2]
    .split(';')
    .map(d => d.trim())
    .map(parseCubes)

  return {
    gameId,
    cubeData,
    allPossible: cubeData.every(d => d.isPossible),
  }
}

const data = fs
  .readFileSync('./day2.txt', 'utf8')
  .split(/\r?\n/)
  .map(parseLine)

const part1 = data
  .filter(d => d.allPossible)
  .reduce((acc, d) => acc + d.gameId, 0)

console.log(part1)

const getMaxData = (data) => {
  return {
    maxRed: Math.max(...data.cubeData.map(cd => cd.red)),
    maxGreen: Math.max(...data.cubeData.map(cd => cd.green)),
    maxBlue: Math.max(...data.cubeData.map(cd => cd.blue)),
  }
}

const part2 = data
  .map(getMaxData)
  .map(d => d.maxRed * d.maxGreen * d.maxBlue)
  .reduce((acc, d) => acc + d, 0)

console.log(part2)
