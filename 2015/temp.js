import fs from "fs"

const factorial = (n) => {
    if (n < 2) {
        return 1
    }

    return n * factorial(n - 1)
}

const getRoutes = (existingRoute, locationOptions) => {
    if (locationOptions.length === 1) {
        return [...existingRoute, locationOptions[0]]
    }
    
    let routes = []
    for (let location of locationOptions) {
        const otherLocations = locationOptions.filter(o => !existingRoute.includes(o) && o !== location)
        
        const route = getRoutes([...existingRoute, location], otherLocations)
        routes.push(route)
    }
    
    return typeof(routes[0][0]) === 'string' ? routes : routes.reduce((acc, val) => [...acc, ...val] ,[])
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
console.log(locations)
const routes = getRoutes([], locations)
console.log(routes)


const distances = routes.map(route =>
    route.reduce((acc, location, i, route) => {
        if (i === 0) {
            return 0
        }

        return acc + map[route[i-1]][location]
    }, 0)
)

console.log(Math.min(...distances))