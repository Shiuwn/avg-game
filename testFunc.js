const { random, randomTake } = require('./initNPC')

const count = random({ min: 10, max: 20 })
console.log(count)
console.log(100 * 0.14)
const r = randomTake([1, 2, 3, 4], 1)
console.log(r)
/**
 * 

 */