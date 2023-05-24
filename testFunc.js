const { random, randomTake, initNPCs, TalentGroup } = require('./initNPC')

const count = random({ min: 10, max: 20 })
console.log(count)
console.log(100 * 0.14)
const r = randomTake([1, 2, 3, 4], 1)
console.log(r)

const { createWriteStream } = require('node:fs')
const { format } = require('node:util')

const logFile = createWriteStream('./npcs.txt', { flags: 'w' })

const log = (d) => {
  logFile.write(format(d) + '\n')
  // logStdOut.write(format(d) + '\n')
}

const npcs = initNPCs()


log(npcs)

