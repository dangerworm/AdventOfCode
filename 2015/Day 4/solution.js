import CryptoJS from "crypto-js"

const input = "bgvyzdsv"

const findNonce = (prefix) => {
    let counter = 1
    while (!CryptoJS.MD5(`${input}${counter}`).toString().startsWith(prefix)) {
        counter++

        if (counter % 100000 === 0) {
            console.log(`${counter}...`)
        }
    }

    return counter
}

console.log("Part 1: ", findNonce("00000"))
console.log("Part 2: ", findNonce("000000"))

import CryptoJS from "crypto-js"
CryptoJS.MD5("input text").toString()