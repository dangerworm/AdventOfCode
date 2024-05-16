import fs from "fs"

const factorial = (n) =>
    n > 1 ? n * factorial(n - 1) : 1

const getRoutes = (existingRoute, locationOptions) => {
    if (locationOptions.length === 1) {
        return [...existingRoute, locationOptions[0]]
    }
    
    let routes = []
    for (let location of locationOptions) {
        const otherLocations = locationOptions.filter(o => !existingRoute.includes(o) && o !== location)
        routes.push(getRoutes([...existingRoute, location], otherLocations))
    }
    
    return typeof(routes[0][0]) !== 'string' 
        ? routes.reduce((acc, val) => [...acc, ...val] ,[])
        : routes
}

const map = {}
fs.readFileSync("./data.txt", "utf8")
    .split('\n')
    .map(line => line.match(/(\w+) to (\w+) = (\d+)/))
    .forEach(matches => {
        const [location1, location2, distance] = matches.slice(1)
        if (!Object.keys(map).includes(location1)) {
            map[location1] = {}
        }

        if (!Object.keys(map).includes(location2)) {
            map[location2] = {}
        }

        map[location1][location2] = parseInt(distance)
        map[location2][location1] = parseInt(distance)
    })

const locations = Object.keys(map)
const routes = getRoutes([], locations)

const distances = routes.map(route =>
    route.reduce((acc, location, i, route) =>
        i > 0 ? acc + map[route[i-1]][location] : 0, 0)
)

console.log("Part 1: ", Math.min(...distances))
console.log("Part 2: ", Math.max(...distances))