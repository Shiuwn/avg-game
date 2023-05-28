const { random, randomTake, initNPCs, TalentGroup } = require('./initNPC')

// const count = random({ min: 10, max: 20 })
// console.log(count)
// console.log(100 * 0.14)
// const r = randomTake([1, 2, 3, 4], 1)
// console.log(r)

const { createWriteStream } = require('node:fs')
const { format } = require('node:util')

const logFile = createWriteStream('./npcs.txt', { flags: 'w' })

const log = (d) => {
  logFile.write(format(d) + '\n')
  // logStdOut.write(format(d) + '\n')
}

const npcs = initNPCs()

const children = npcs.filter(npc => npc.年龄 < 18)
children.forEach((child) => {
  // console.log(child.关系.亲属.血缘亲属.父母辈)
  // const logFile = createWriteStream('./children.txt', { flags: 'w' })
  // const log = (d) => logFile.write(format(d) + '\n')
  // log(`${child.姓名}的父母\n` + child.关系.亲属.血缘亲属.父母辈.map((d) => `**${d.姓名}: ${d.年龄}**\n`).join(''))
  if (child.关系.亲属.血缘亲属.父母辈.length >= 2) {
    console.log(child.姓名, '\n')
    console.log(child.关系.亲属.血缘亲属.父母辈.length)
  }
})

log(npcs)

