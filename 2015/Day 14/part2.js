import fs from "fs"

const input = fs.readFileSync("./data.txt", "utf8")
    .split("\n")
    .map(line => line.match(/(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./))

const reindeer = {}
input.forEach(([_, reindeerName, speed, duration, restTime]) => {
    reindeer[reindeerName] = ({ speed: Number(speed), duration: Number(duration), restTime: Number(restTime), distance: 0, points: 0 })
    reindeer[reindeerName].mod = reindeer[reindeerName].duration + reindeer[reindeerName].restTime
})

const reindeerNames = Object.keys(reindeer)

let t = 0
let maxDistance = 0
let maxPoints = 0
while (t <= 2503) {
    reindeerNames.forEach((reindeerName) => {
        const stats = reindeer[reindeerName]
        const moving = t % stats.mod < stats.duration

        reindeer[reindeerName].distance += moving ? stats.speed : 0
        if (reindeer[reindeerName].distance > maxDistance) {
            maxDistance = reindeer[reindeerName].distance
        }
    })

    const winningReindeer = reindeerNames
        .filter(reindeerName => reindeer[reindeerName].distance === maxDistance)

    winningReindeer.forEach(reindeerName => {
        reindeer[reindeerName].points++
        if (reindeer[reindeerName].points > maxPoints) {
            maxPoints = reindeer[reindeerName].points
        }
    })

    t++
}

console.log(maxPoints)