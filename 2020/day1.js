function part1(data) {
  let size = data.length;

  for (var i = 0; i < size; i++) {
    for (var j = i + 1; j < size; j++) {
      if (data[i] + data[j] == 2020) {
        return data[i] * data[j];
      }
    }
  }
}

function part2(data) {
  let size = data.length;

  for (var i = 0; i < size; i++) {
    for (var j = i + 1; j < size; j++) {
      for (var k = j + 1; k < size; k++) {
        if (data[i] + data[j] + data[k] == 2020) {
          return data[i] * data[j] * data[k];
        }
      }
    }
  }
}

const fs = require('fs');

let data = fs
  .readFileSync('data.txt', 'utf8')
  .split('\n')
  .map(function (x) { return parseInt(x) });

console.log(part1(data));
console.log(part2(data));