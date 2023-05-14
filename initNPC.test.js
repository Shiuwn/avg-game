
const { initNPCs, random, Families } = require('./initNPC.js')
const { createWriteStream } = require('node:fs')
const { format } = require('node:util')

const logFile = createWriteStream('./npcs.txt', { flags: 'w' })
// const logStdOut = process.stdout
console.time('gen')
const npcs = initNPCs()
console.timeEnd('gen')

const log = (d) => {
  logFile.write(format(d) + '\n')
  // logStdOut.write(format(d) + '\n')
}

const COUNT = 100

describe('生成npc', () => {
  it('random', () => {
    let round = 100
    while (round--) {

      const count = random({ min: 10, max: 20 })
      expect(count).toBeLessThanOrEqual(20)
      expect(count).toBeGreaterThanOrEqual(10)
    }
  })
  it('总数量', () => {
    expect(npcs.length).toEqual(COUNT)
  })
  it('性别数量', () => {
    const maleCount = npcs.filter((d) => d.性别 === '男')
    const femaleCount = npcs.filter((d) => d.性别 === '女')
    expect(maleCount.length).toEqual(COUNT * 0.5)
    expect(femaleCount.length).toEqual(COUNT * 0.5)
  })
  it('年龄层数量-青少年20%', () => {
    const age = npcs.filter((npc) => npc.年龄 >= 14 && npc.年龄 < 18)
    expect(age.length).toEqual(COUNT * 0.2)
  })
  it('年龄层数量-成年60%', () => {
    const age = npcs.filter((npc) => npc.年龄 >= 18 && npc.年龄 < 60)
    expect(age.length).toEqual(COUNT * 0.6)
  })
  it('年龄层数量-老年6%', () => {
    const age = npcs.filter((npc) => npc.年龄 >= 60)
    expect(age.length).toEqual(COUNT * 0.06)
  })
  it('年龄层数量-儿童14%', () => {
    const age = npcs.filter((npc) => npc.年龄 < 14)
    expect(age.length).toEqual(COUNT * 0.14 | 0)
  })
  /**for (const family in Families) {
    it(`家世分布-${family} ${Families[family].ratio * 100}%`, () => {
      const npcFamily = npcs.filter(npc => npc.家族.家世 === family)
      expect(npcFamily.length).toEqual(Families[family].ratio * COUNT | 0)
    })
  }**/
  it('家世总数', () => {

    let count = 0
    for (const family in Families) {

      const npcFamily = npcs.filter(npc => npc.家族.家世 === family)
      count += npcFamily.length
    }
    expect(count).toEqual(COUNT)
  })
  it('属性值大于0', () => {
    for (const npc of npcs) {
      const attr = npc.属性
      const keys = ['魅力', '统率', '敏锐', '经营', '智略']
      for(const key of keys) {
        expect(attr[key]).toBeGreaterThanOrEqual(0)
      }
    }
  })
})


// 14<= 年龄<18 男女各占10% 青少年

log(npcs)
