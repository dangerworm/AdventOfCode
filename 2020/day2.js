function part1(data) {
  let validPasswords = 0;
  data.forEach(function (record) {
    let totalChars = 0;
    record['password'].split('').forEach(function (character) {
      if (character == record['letter']) {
        totalChars++;
      }
    });

    if (totalChars >= record['num1'] &&
      totalChars <= record['num2']) {
      validPasswords++;
    }
  });

  return validPasswords;
}

function part2(data) {
  let validPasswords = 0;
  data.forEach(function (record) {
    valid1 = record['password'][record['num1'] - 1] == record['letter'];
    valid2 = record['password'][record['num2'] - 1] == record['letter'];

    if ((valid1 || valid2) && !(valid1 && valid2)) {
      validPasswords++;
    }
  });

  return validPasswords;
}

const fs = require('fs');

let input = fs
  .readFileSync('data.txt', 'utf8')
  .split('\n');

let data = [];
let regex = /(\d+)-(\d+) ([a-z]): ([a-z]+)/;

for (var i = 0; i < input.length; i++) {
  let parsed = regex.exec(input[i]);
  data.push({
    'num1': parseInt(parsed[1]),
    'num2': parseInt(parsed[2]),
    'letter': parsed[3],
    'password': parsed[4]
  });
}

console.log(part1(data));
console.log(part2(data));