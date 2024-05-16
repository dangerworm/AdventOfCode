const incrementLetter = (letter) => String.fromCharCode(letter.charCodeAt(0) + 1)

const increment = (...password) => {
    password.splice(7, 1, incrementLetter(password[7]))

    let index = password.indexOf('{')
    while (index > -1) {
        password[index] = 'a'
        password[index - 1] = incrementLetter(password[index - 1])
        index = password.indexOf('{')
    }

    return password
}

const hasRun = (password) => /.*(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz).*/.test(password)
const hasIOL = (password) => password.split('').filter(x => ["i", "o", "l"].includes(x)).length > 0
const hasPairs = (password) => {
    const matches = password.match(/.*(\w)\1.*(\w)\2.*/)
    return matches !== null && matches[1] !== matches[2]
}

const findNextPassword = (password) => {
    while (true) {
        password = increment(...password).join('')
        if (hasRun(password) && !hasIOL(password) && hasPairs(password)) {
            break
        } 
    }

    return password
}
    
const newPassword = findNextPassword("hepxcrrq")
console.log("Part 1: ", newPassword)
console.log("Part 2: ", findNextPassword(newPassword))
