const lookAndSay = (input, iterations) => {
    let nextLine = ""
    let window

    for (let i = 0; i < iterations; i++) {
        let startIndex = 0
        while (window = input.substring(startIndex, startIndex + 3)) {
            if (window.length > 2 && /(.)\1\1.*/.test(window)) {
                nextLine += `3${window[0]}`
                startIndex += 3
            }
            else if (window.length > 1 && /^(.)\1.*/.test(window)) {
                nextLine += `2${window[0]}`
                startIndex += 2
            }
            else {
                nextLine += `1${window[0]}`
                startIndex++
            }
        }

        input = nextLine
        nextLine = ""
    }

    return input.length
}

console.log("Part 1: ", lookAndSay("1113122113", 40))
console.log("Part 2: ", lookAndSay("1113122113", 50))