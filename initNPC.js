const noop = () => { }
// 遍历数组或对象
function each(map, fn) {
  if (typeof fn !== 'function') return
  for (var key in map) {
    fn(key, map[key])
  }
}

function map2Array(mapData, fromProp, toProp) {
  let res = [],
    i = 0
  each(mapData, (key, val) => {
    const o = {}
    res[i] = o
    o.type = key
    if (!toProp) {
      o[fromProp] = val
    } else {
      o[toProp] = val[fromProp]
    }
    i++
  })
  return res
}
const random = ({ min, max }) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const randomUpdate = (ratio, update) => {
  return Math.random() <= ratio ? update() : null
}

const randomCallback = (arr, cb) => {
  let sum = 0
  const random = Math.random()
  for (let i in arr) {
    sum += arr[i].ratio
    if (random < sum) {
      cb(arr[i], i)
      return
    }
  }
}

const randomTake = (range, count) => {
  range = range.slice()
  const result = []
  while (count > 0 && range.length) {
    const index = random({ min: 0, max: range.length - 1 })
    const [el] = range.splice(index, 1)
    result.push(el)
    count--
  }
  return result
}

const contains = (arr, el) => arr.indexOf(el) > -1

const templateParse = (str, data = {}) =>
  str.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, group) => {
    return data[group] || ''
  })

const TimelineTemplates = [
  '{{年龄}}年前的{{生日}}，{{姓名}}出生了。',
  '{{姓名}}在抓周仪式中抓住了{{道具名}}，想必将来一定能在此有所成就吧!',
  '{{姓名}}发奋刻苦，终于在学术上有所突破，获得特质{{教育特质}}',
  '{{姓名}}爱上了{{爱人}}。',
]

/**
 *
 * @param {Array} data [{type: '赋闲', ratio: 0.3}]
 * @param {Array} defaultData [{type: '赋闲', ratio: 0.3}]
 *
 */
const bindRatio = (data, defaultData) => {
  const remainder = defaultData.reduce((r, n) => r - n.ratio, 1)
  const average = remainder / (data.length - defaultData.length)
  each(data, (_, d) => {
    each(defaultData, (_, o) => {
      if (o.type === d.type) {
        d.ratio = o.ratio
        return
      }
      d.ratio = average
    })
  })
  return data
}

const isPassed = (num) => Math.random() <= num

const Names = ["博", "风", "云", "空", "知", "了", "参", "灵", "诺", "梦", "雾", "雨", "秋", "理", "夕", "乐", "夕", "以", "一", "闲", "白", "子", "幽", "音", "华", "因", "辉", "叶", "苗", "仪", "觉", "心", "星", "水", "枫", "自", "千", "之", "长", "三", "久", "于", "上", "小", "央", "和", "未", "永", "远", "玉", "冉", "光", "君", "见", "言", "修", "秀", "初", "季", "念", "东", "玖", "直", "竹", "竺", "咏", "弦", "青", "佩", "明", "牧", "沐", "清”,“晴", "遥", "瑾", "瑜", "九", "璃", "嘉", "景", "洛", "慕", "昭", "若", "凌", "熙", "逸", "凝", "宁", "元", "天"]
const BaseInfo = {
  家名: ['自强', '厚德', '博学', '审问', '慎思', '明辨', '兼容', '笃志', '求是', '笃行', '俭朴', '苦尚', '拓新', '弘毅', '精勤', '求学', '敦笃', '果毅', '忠恕', '至善', '明德', '厚学', '致新', '崇德', '远志', '知行', '养气', '乐群', '敏行', '尚美', '仁爱', '兼爱', '尚同'],
  姓氏: ["赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许", "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", "陶", "姜", "戚", "谢", "喻", "柏", "水", "章", "云", "苏", "奚", "范", "郎", "鲁", "韦", "凤", "花", "方", "俞", "任", "袁", "柳", "史", "唐", "费", "岑", "薛", "贺", "殷", "安", "乐", "于", "时", "傅", "齐", "余", "元", "卜", "顾", "孟", "穆", "萧", "尹", "狄", "米", "贝", "明", "臧", "伏", "宋", "熊", "纪", "屈", "项", "祝", "杜", "阮", "蓝", "闵", "席", "季", "贾", "路", "江", "童", "颜", "郭", "梅", "盛", "林", "钟", "徐", "邱", "骆", "高", "夏", "蔡", "胡", "凌", "霍", "虞", "万", "柯", "卢", "莫", "房", "裘", "缪", "解", "应", "宗", "宣", "诸", "左", "石", "崔", "程", "嵇", "裴", "陆", "羊", "於", "靳", "牧", "秋", "仲", "伊", "宫", "宁", "仇", "刘", "景", "詹", "束", "龙", "叶", "幸", "司", "黎", "薄", "宿", "白", "怀", "蒲", "索", "咸", "籍", "卓", "蔺", "池", "乔", "胥", "苍", "闻", "翟", "姬", "冉", "濮", "边", "燕", "温", "庄", "晏", "瞿", "慕", "容", "向", "古", "易", "步", "文", "寇", "东", "师", "晁", "敖", "冷", "辛", "简", "空", "曾", "沙", "鞠", "须", "关", "蒯", "相", "查", "红", "游", "竺", "盖", "桓", "公", "万俟", "司马", "上官", "欧阳", "夏侯", "诸葛", "闻人", "东方", "赫连", "皇甫", "尉迟", "公冶", "宗政", "濮阳", "淳于", "公孙", "仲孙", "轩辕", "令狐", "钟离", "宇文", "长孙", "慕容", "鲜于", "闾丘", "司徒", "司空", "司寇", "颛孙", "端木", "乐正", "拓跋", "楚", "闫", "法", "百里", "东郭", "南门", "呼延", "归", "海", "羊舌", "微生", "岳", "梁丘", "左丘", "东门", "西门", "商", "南宫", "墨", "爱", "阳", "言"],
  行字: Names,
  名字: Names,
}

const getParents = (/**@type {NPC} */ npc) => npc.关系.亲属.血缘亲属.父母辈
const getCouple = (/**@type {NPC} */ npc) => npc.关系.恋人.配偶

const genId = (start) => () => start++
const genNPCId = genId(100)
// 性别匹配
/**
 *
 * @param {NPC} npc1
 * @param {NPC} npc2
 * @returns
 */
const matchGender = (npc1, npc2) => {
  if (
    npc1.性别 === npc2.性别 &&
    npc1.性取向 !== '异性恋' &&
    npc2.性取向 !== '异性恋'
  )
    return true
  if (
    npc1.性别 !== npc2.性别 &&
    npc1.性取向 !== '同性恋' &&
    npc2.性取向 !== '同性恋'
  )
    return true
  return false
}
/**
 * 判断是否为儿童
 * @param {NPC} npc
 */
const isChild = (npc) => npc.年龄 < 14
// 性取向
let genderPrefer = false

const getRandomDate = () => {
  const months = Array(12)
    .fill(0)
    .map((_, i) => i + 1)
  const smallMonths = [2, 4, 6, 9, 11]
  const days = Array(31)
    .fill(0)
    .map((_, i) => i + 1)

  const rMonth = randomTake(months, 1)[0]
  const subDays =
    rMonth === 2
      ? days.slice(0, 28)
      : smallMonths.indexOf(rMonth) > -1
        ? days.slice(0, 30)
        : days
  const rDay = randomTake(subDays, 1)[0]

  // return [rMonth, rDay]
  return `${(rMonth + '').length < 2 ? 0 : ''}${rMonth} 月${(rDay + '').length < 2 ? '0' : ''
    }${rDay} 日`
}

const giveBirthday = (npc) => {
  npc.生日 = getRandomDate()
}

// 年龄赋值
const giveAge = (npcs) => {

  // <14 为儿童 男女各占 7%
  // 14<= 年龄<18 男女各占10% 青少年
  // 18<= 年龄 <60 成年人 占比 30%
  // >=60 老年人 各占比 3%
  const nums = [14, 20, 60, 6]
  const ranges = [[0, 13], [14, 17], [18, 59], [60, 70]]

  let index = 0
  while (nums.length) {
    let num = nums.pop()
    let range = ranges.pop()
    while (num > 0) {
      npcs[index].年龄 = random({ min: range[0], max: range[1] })
      num--
      index++
    }
  }


}

/**
 *
 * @param {Array} arr
 */
const randomPickByRatio = (arr) => {
  let sum = 0,
    index = -1
  const randomNum = Math.random()
  arr.some((val, i) => {
    sum += val.ratio
    if (randomNum <= sum) {
      index = i
      return true
    }
  })

  if (index > -1) {
    return arr[index]
  }
  return null
}

/**
 *
 * @param {Array} arr
 * @param {number} count
 * @returns
 */
function discard(arr, count) {
  return arr.splice(0, count)
}

/**
 *
 * @param {Array<NPC>} npcs
 * @returns
 */
const getMaleNPC = (npcs) => npcs.filter((d) => d.性别 === '男')
/**
 *
 * @param {Array<NPC>} npcs
 * @returns
 */
const getFemaleNPC = (npcs) => npcs.filter((d) => d.性别 === '女')

/**
 * 分配喜好
 * @param {NPC} npc
 * @returns
 */
const giveHabit = (npc) => {
  npc.喜好 = randomTake(Habits, 1)[0]
}

/**
 *
 * @param {NPC} npc
 * @returns
 */
const giveAmbition = (npc) => {
  if (!npc.性格特质.length) return
  const ambitionNames = []
  each(Ambitions, (type, ambition) => {
    if (ambition.support(npc)) {
      ambitionNames.push(type)
    }
  })
  if (!ambitionNames.length) return
  const type = randomTake(ambitionNames, 1)[0]

  npc.夙愿 = {
    name: type,
    meet: Ambitions[type].meet,
  }
}

function initNPCs() {
  const countNPC = 100
  const npcs = []
  // 男女性别对半
  const countMale = countNPC * 0.5
  for (let i = 0, m = 0; i < countNPC; i++, m++) {
    const npc = new NPC({
      id: genNPCId(),
      姓氏: randomTake(BaseInfo.姓氏, 1)[0],
      行字: randomTake(BaseInfo.行字, 1)[0],
      名字: randomTake(BaseInfo.名字, 1)[0],
    })
    if (m < countMale) {
      npc.性别 = '男'
    } else {
      npc.性别 = '女'
      // 性取向开关打开女性5%概率同性恋或双性恋
      if (genderPrefer) {
        const random = Math.random()
        if (random < 0.05) {
          npc.性取向 = '同性恋'
        } else if (random < 0.1) {
          npc.性取向 = '双性恋'
        }
      }
    }
    npcs.push(npc)
  }

  // 随机排列
  npcs.sort(() => {
    const r = Math.random()
    if (r < 0.3333) return -1
    if (r < 0.6666) return 0
    return 1
  })
  // 赋值年龄
  giveAge(npcs)

  // 关系生成
  // 生成夫妻关系 30%概率
  const adults = npcs.filter((npc) => npc.年龄 >= 18)
  {
    // 生成朋友 50% 概率
    each(adults.slice(), (key, npc) => {
      /**@type {NPC} */
      const currentNpc = npc
      each(Looks, (key) => {
        giveLook(npc, key)
      })
      each(adults.slice(), (key, /**@type {NPC} */ npc) => {
        let passed
        // 生成夫妻关系 30%概率
        if (
          !currentNpc.关系.恋人.配偶 &&
          !npc.关系.恋人.配偶 &&
          matchGender(currentNpc, npc)
        ) {
          passed = Math.random() < 0.3
          if (passed && Math.abs(currentNpc.年龄 - npc.年龄) <= 5) {
            currentNpc.关系.恋人.配偶 = npc
            npc.关系.恋人.配偶 = currentNpc
            const date = getRandomDate()
            npc.结婚日 = date
            currentNpc.结婚日 = date
          }
        }

        passed = Math.random() < 0.5
        if (passed && npc != currentNpc) {
          currentNpc.关系.友人.朋友.push(npc)
          npc.基准友好度 += 60
          currentNpc.基准友好度 += 60
        }

        // 10% 挚友
        if (!currentNpc.关系.友人.挚友) {
          passed = Math.random() < 0.1
          if (passed && npc != currentNpc) {
            currentNpc.关系.友人.挚友 = npc
            npc.基准友好度 += 200
            currentNpc.基准友好度 += 200
          }
        }

        // 30% 恋人或单恋或暗恋
        passed = Math.random() < 0.3

        if (passed && npc !== currentNpc && matchGender(currentNpc, npc)) {
          if (!currentNpc.关系.恋人.单恋) {
            currentNpc.关系.恋人.单恋 = npc
          } else if (!currentNpc.关系.恋人.暗恋) {
            currentNpc.关系.恋人.暗恋 = npc
          } else {
            currentNpc.关系.恋人.恋人.push(npc)
            npc.关系.恋人.恋人.push(npc)
            currentNpc.爱慕值 += 60
            npc.爱慕值 += 60
          }
        }

        if (!currentNpc.关系.恋人.挚爱 && matchGender(currentNpc, npc)) {
          // 10% 成为挚爱
          passed = Math.random() < 0.1
          if (passed && npc !== currentNpc && matchGender(npc, currentNpc)) {
            currentNpc.关系.恋人.挚爱 = npc
            currentNpc.爱慕值 += 200
            npc.爱慕值 += 200
          }
        }

        // 仇人 20%
        passed = Math.random() < 0.2

        if (passed) {
          currentNpc.关系.仇人.仇人.push(npc)
        }

        if (!currentNpc.关系.仇人.死仇) {
          // 死敌 10%
          passed = Math.random() < 0.1
          if (passed) {
            currentNpc.关系.仇人.死仇 = npc
          }
        }
      })
    })

    const children = npcs.filter((npc) => npc.年龄 < 14)

    const maleAdults = adults.filter((npc) => npc.性别 === '男')
    const fPAdults = maleAdults.filter((npc) => npc.性取向 === '异性恋')

    each(children, (_, /**@type {NPC} */ currentNpc) => {
      each(adults, (_, /**@type {NPC} */ npc) => {
        // 5% 孤儿
        let passed = Math.random() < 0.05
        if (passed) {
          currentNpc.关系.亲属.血缘亲属.父母辈 = []
          return
        }

        const hasAgeGap = (npc1, npc2) => Math.abs(npc1.年龄, npc2.年龄) >= 20

        if (
          npc.性别 === '女' &&
          npc.性取向 === '异性恋' &&
          !npc.关系.恋人.配偶 &&
          hasAgeGap(npc, currentNpc)
        ) {
          // 10% 私生子
          passed = Math.random() < 0.1
          if (passed) {
            currentNpc.关系.亲属.血缘亲属.父母辈.push(npc)
            const len = fPAdults.length
            const index = random({ min: 0, max: len - 1 })
            fPAdults[index].关系.恋人.恋人.push(npc)
            currentNpc.关系.友人.先生 = currentNpc
            npc.秘密.push('私生子')
            return
          }
        }
        if (
          npc.性取向 === '异性恋' &&
          npc.关系.恋人.配偶 &&
          npc.关系.亲属.血缘亲属.亲子.length < 3 &&
          hasAgeGap(npc, currentNpc) &&
          hasAgeGap(currentNpc, npc.关系.恋人.配偶)
        ) {
          const part = npc.关系.恋人.配偶
          npc.关系.亲属.血缘亲属.亲子.indexOf(currentNpc) < 0 &&
            npc.关系.亲属.血缘亲属.亲子.push(currentNpc)
          part &&
            part.关系.亲属.血缘亲属.亲子.indexOf(currentNpc) < 0 &&
            part.关系.亲属.血缘亲属.亲子.push(currentNpc)
          currentNpc.关系.亲属.血缘亲属.父母辈.push(npc)
          part && currentNpc.关系.亲属.血缘亲属.父母辈.push(part)
          if (npc.属性.智略 > part.属性.智略) {
            currentNpc.关系.友人.先生 = npc
          } else {
            currentNpc.关系.友人.先生 = part
          }
          currentNpc.基准友好度 += 50
          npc.基准友好度 += 50
          part.基准友好度 += 50
        }
      })
      each(Looks, (key) => {
        giveLook(currentNpc, key)
      })
    })
  }
  {
    const genFId = genId(0)
    const FDis = {}
    each(Families, (key) => {
      FDis[key] = Families[key].ratio * countNPC
      // FDis.push({type: key, count: Families[key].ratio * countNPC})
    })
    const getCouple = (npc) => npc.关系.恋人.配偶
    const getChildren = (npc) => npc.关系.亲属.血缘亲属.亲子
    const currentFamily = {
      key: '',
      count: 0,
    }
    /**
     * 生成先天特质
     * @param {NPC} npc
     */
    const giveTalent = (npc) => {
      if (npc.家族.家世 === '皇族') return
      each(TalentGroup, (key, group) => {
        if (key === '人神') return
        randomCallback(group, (talent) => {
          talent.give(npc)
          npc.先天特质.push(talent.key)
        })
      })
    }
    /**
     * 生成童年特质
     * @param {NPC} npc
     * @returns
     */

    const giveChildhood = (npc) => {
      if (!isChild(npc)) return
      const ch = CharacterGroup.童年特质
      randomCallback(ch, (character, key) => {
        character.give(npc)
        npc.童年特质 = key
      })
    }

    const skillGroup = groupBy(CharacterGroup.天赋特质, 'type', true)

    const natureGroup = groupBy(CharacterGroup.性格特质, 'type', true)

    /**
     * 生成天赋特质
     * @param {NPC} npc
     */

    const giveSkill = (npc) => {
      if (npc.年龄 < 16) return
      const keys = Object.keys(skillGroup)
      const count = keys.length
      const index = random({ min: 0, max: count - 1 })
      const group = skillGroup[keys[index]]
      randomCallback(group, (skill) => {
        skill.give(npc)
        npc.天赋特质 = skill.key
      })
    }

    /**
     * 赋予性格特质
     * @param {NPC} npc
     * @returns
     */

    const giveNature = (npc) => {
      let keys, count
      // 小于7岁没有性格特质
      if (npc.年龄 < 7) return
      keys = Object.keys(natureGroup)
      count = keys.length
      if (npc.年龄 >= 7 && npc.年龄 < 16) {
        // 一个童年特质 一个性格特质
        const index = random({ min: 0, max: count - 1 })
        const group = natureGroup[keys[index]]
        const passed = Math.random() < 0.5
        const nature = passed ? group[0] : group[1]
        nature.give(npc)
        npc.性格特质.push(nature.key)
        giveChildhood(npc)
        return
      }
      // >16 随机给3个性格特质
      const randomKey = randomTake(keys, 3)
      npc.性格特质.length = 0
      randomKey.forEach((key) => {
        const group = natureGroup[key]
        const passed = Math.random() < 0.5
        const nature = passed ? group[0] : group[1]
        nature.give(npc)
        npc.性格特质.push(nature.key)
      })
      giveSkill(npc)
    }

    // 生成家世和特质
    each(npcs, (_, /**@type {NPC} */ npc) => {
      giveNature(npc)
      giveHabit(npc)
      giveAmbition(npc)
      npc.updateHealth(true)
      npc.updateBirth()
      if (npc.家族) return
      // 皇族 王族
      if (
        (FDis.皇族 || FDis.王族) &&
        npc.年龄 >= 18 &&
        npc.年龄 < 30 &&
        !npc.关系.恋人.配偶 &&
        !npc.家族
      ) {
        const key = FDis.皇族 ? '皇族' : '王族'
        npc.家族 = new Family(genFId(), randomTake(BaseInfo.家名, 1)[0])
        npc.家族.家世 = key
        npc.家族.members.push(npc)
        Families[key].give(npc, key)
        delete FDis[key]
        giveTalent(npc)
        return
      }

      if (!currentFamily || currentFamily.count <= 0) {
        for (const key in FDis) {
          if (FDis[key] > 0) {
            currentFamily.key = key
            currentFamily.count += FDis[key]
            break
          }
        }
      }

      const fKey = currentFamily.key
      const family = new Family(genFId(), randomTake(BaseInfo.家名, 1)[0])
      family.家世 = fKey
      currentFamily.count--
      npc.家族 = family
      family.add(npc)
      const give = Families[fKey].give
      const couple = getCouple(npc)
      if (couple) {
        couple.家族 = family
        give(couple, fKey)
        giveTalent(couple)
        currentFamily.count -= 1
        family.add(couple)
      }
      const children = getChildren(npc)
      children &&
        children.forEach((/**@type {NPC} */ child) => {
          child.家族 = family
          family.add(child)
          give(child, fKey)
          giveTalent(child)
          if (npc.性别 === '男') {
            child.姓氏 = npc.姓氏
          } else {
            child.姓氏 = couple.姓氏
          }
          currentFamily.count -= 1
        })

      FDis[fKey] = currentFamily.count
    })

    // 家世生成之后才可以订婚
    const teenagers = npcs.filter((npc) => npc.年龄 >= 14 && npc.年龄 < 18)
    each(teenagers, (_, /** @type {NPC}*/ currentNpc) => {
      each([].concat(teenagers, adults), (_, /** @type {NPC}*/ npc) => {
        let passed
        if (
          matchGender(npc, currentNpc) &&
          !npc.关系.恋人.配偶 &&
          !npc.关系.恋人.订婚
        ) {
          // 30%概率
          passed = Math.random() < 0.3
          if (passed && Math.abs(currentNpc.家族.家阶 - npc.家族.家阶) <= 2) {
            npc.关系.恋人.订婚 = currentNpc
            currentNpc.关系.恋人.订婚 = npc
          }
        }

        if (npc.年龄 >= 14 && npc.年龄 < 18) {
          // 20%概率青梅竹马
          passed = Math.random() < 0.2
          passed && currentNpc.关系.恋人.青梅竹马.push(npc)

          passed = Math.random() < 0.5
          passed && currentNpc.关系.友人.朋友.push(npc)
        }
      })
      each(Looks, (key) => {
        giveLook(currentNpc, key)
      })
    })

    each(FamilyList, (_, /**@type {Family} */ family) => {
      family.members.sort((a, b) => b.影响力 - a.影响力)
      family.members[0] && (family.家主 = family.members[0])

      Families[family.家世].give(family.家主, family.家世)

      each(FamilyList, (_, /**@type {Family} */ otherFamily) => {
        if (otherFamily != family) {
          if (isPassed(0.2)) {
            family.世仇.push(otherFamily)
            return
          }
          // 0.8 * 0.25 = 0.2
          if (isPassed(0.25)) {
            family.世交.push(otherFamily)
          }
        }
      })
    })
  }

  return npcs
}

function isType(type, target) {
  return (
    Object.prototype.toString.call(target).slice(8, -1).toLowerCase() === type
  )
}

const isFunction = (target) => isType('function', target)

const isString = (target) => isType('string', target)

const isArray = (target) => isType('array', target)

const Emitter = {
  on(eventName, fn) {
    const event = (this.events[eventName] = this.events[eventName] || [])
    isFunction(fn) && event.push(fn)
  },
  trigger(eventName, data) {
    const event = this.events[eventName]
    event &&
      isArray(event) &&
      event.forEach((fn) => {
        fn(data)
      })
  },
  off(eventName, fn) {
    const event = this.events[eventName]
    if (event && isArray(event)) {
      const index = event.indexOf(fn)
      if (index > -1) {
        event.splice(index, 1)
      }
    }
  },
  clear(eventName) {
    if (!eventName) {
      this.events = {}
      return
    }
    const event = this.events[eventName]
    if (event && isArray(event)) {
      event.length = 0
      delete this.events[eventName]
    }
  },
  init() {
    this.events = {}
  }
}

// 生成的所有的家族
const FamilyList = []
class Family {
  constructor(id, name) {
    this['家族ID'] = id
    this['家名'] = name
    this['家阶'] = 0
    this['家族收入'] = 0
    this['家世'] = ''
    this['家族资产'] = 0
    this['家主'] = null
    this['世仇'] = []
    this['世交'] = []
    this.members = []
    FamilyList.push(this)
  }
  add(npc) {
    if (this.members.indexOf(npc) < 0) this.members.push(npc)
  }
  remove(npc) {
    const index = this.members.indexOf(npc)
    if (index > -1) {
      this.members.splice(index, 1)
    }
  }
}

const JobRankValue = [
  500, 1000, 1600, 2400, 3200, 4000, 6000, 8000, 1e4, 1.5e4, 2e4, 2.5e4, 3e4,
  4e4, 4.5e4, 5e4,
]

class NPC {
  constructor(option) {
    option = option || {}
    this.id = option.id || genNPCId()
    this['家族'] = null
    this['外貌'] = {}
    this['角色ID'] = ''
    // 姓
    this['姓氏'] = option['姓氏']
    // 行字
    this['行字'] = option['行字']
    // 名
    this['名字'] = option['名字']
    // 年龄
    this['年龄'] = 0
    // 性别
    this['性别'] = ''
    this['健康'] = 0
    this['生日'] = ''
    this['种族'] = ''
    this['职业'] = ''
    // 功勋
    this['职业功勋'] = 0
    // 等级
    this['职业等级'] = 1
    this['先天特质'] = []
    this['家族特质'] = ''
    this['童年特质'] = ''
    this['教育特质'] = ''
    this['天赋特质'] = ''
    this['身份特质'] = ''
    this['性格特质'] = []
    this['疾病特质'] = ''
    this._birthPercent = 0
    this['喜好'] = ''
    this['场所'] = ''
    this['结婚日'] = ''
    this['祭日'] = ''
    this['外貌偏好'] = ''
    this['性取向'] = '异性恋'
    this['嫉妒值'] = 0
    this['友情值'] = 0
    this['爱慕值'] = 0
    this['仇恨值'] = 0
    this['关系'] = {
      亲属: {
        血缘亲属: {
          父母辈: [],
          祖孙: [],
          亲子: [],
          子侄: [],
          同辈: [],
          异父母同辈: [],
        },
        非血缘亲属: {
          岳父母: [],
          姻亲兄弟姐妹: [],
        },
      },
      友人: {
        先生: null,
        弟子: [],
        朋友: [],
        世交: [],
        挚友: null,
        知己: null,
      },
      恋人: {
        配偶: null,
        单恋: null,
        暗恋: null,
        恋人: [],
        挚爱: null,
        本命: null,
        青梅竹马: [],
        订婚: null,
      },
      仇人: {
        仇人: [],
        死仇: null,
        世仇: [],
      },
    }
    this['外貌'] = {}
    this['青睐'] = {}
    this['属性'] = {
      魅力: 0,
      统率: 0,
      敏锐: 0,
      经营: 0,
      智略: 0,
    }
    this['技能'] = {
      礼仪: 0,
      口才: 0,
      医术: 0,
      武艺: 0,
      厨艺: 0,
      种植: 0,
      乐器: 0,
      锻造: 0,
      谋略: 0,
      绘画: 0,
      写作: 0,
      酿酒: 0,
      道术: 0,
    }
    this['社交需求'] = ''
    this['相思需求'] = ''
    this['爱情衰减度'] = ''
    this['基准友好度'] = 0
    this['友好吸引力'] = 0
    this['爱情吸引力'] = 0
    this['倾向'] = {
      忠贞: 0,
      宽恕: 0,
      野心: 0,
      胆量: 0,
      名誉: 0,
      理性: 0,
      社交: 0,
      报复: 0,
      贪婪: 0,
      占有欲: 0,
      迟钝: 0,
    }
    this['影响力'] = 0
    this['秘密'] = []
    this['生平'] = ''
    this['疾病特质'] = ''
    this['疾病抵御'] = 0
    this['夙愿'] = null
    // 健康恶化概率
    this.healthWorse = 0
    // 武艺恶化概率
    this.offenseWorse = 0
    // 猝死概率
    this.death = 0
    // 定时更新身份
    this.updateIdentityInner = () => { }
    const emitter = this.emitter = Object.create(Emitter)
    this.emitter.init()

    emitter.on('更新年龄', () => {
      this.updateHealth()
    })

    emitter.on('更新年龄', () => {
      this.updateOffense()
    })

    emitter.on('更新健康', () => {
      this.updateDeath()
    })

    emitter.on('更新生育率', () => {
      this.updateBirth()
    })
    giveBirthday(this)
  }
  get 生育概率() {
    return this._birthPercent
  }
  set 生育概率(val) {
    this._birthPercent = Math.max(0, Math.min(1, val))
  }
  get 姓名() {
    return this.姓氏 + this.行字 + this.名字
  }

  // 性别更新
  updateGender() {
    this.性别 = Math.random() > 0.5 ? '男' : '女'
    return this
  }

  // 健康更新
  updateHealth(init = false) {
    // init 表示是否初始化
    if (init) {
      const health = random(
        this.性别 === '男' ? { min: 90, max: 98 } : { min: 100, max: 108 }
      )
      this.健康 = health
    } else {
      // 大于25 7.5%的概率 -3，概率每年增加2.2%
      if (this.年龄 >= 25) {
        if (!this.healthWorse) {
          this.healthWorse = 0.075
        }
        this.healthWorse += 0.022 * (this.年龄 - 25)

        randomUpdate(this.healthWorse, () => {
          this.健康 += -3
        })
      }
    }
    this.emitter.trigger('更新健康')
    return this
  }

  // 武艺更新
  updateOffense() {
    if (this.年龄 >= 45) {
      if (!this.offenseWorse) {
        this.offenseWorse = 0.1
      } else {
        this.offenseWorse += 0.015 * (this.年龄 - 45)
      }
      randomUpdate(this.offenseWorse, () => {
        this.武艺 += -5
      })
    }
    return this
  }

  // 更新猝死概率
  updateDeath() {
    if (this.健康 < 60) {
      if (!this.death) {
        this.death = 0.1
      }
      this.death += Math.floor((60 - this.健康) / 10) * 0.15
      this.death = +this.death.toFixed(2)
    }
  }

  updateAge() {
    this.年龄 += 1
    Emitter.trigger('更新年龄')
  }
  updateBirth() {
    const age = this.年龄
    if (this.性别 === '男') {
      if (age >= 18 && age <= 35) {
        this._birthPercent = 1
      }
      if (age >= 36 && age <= 40) {
        this._birthPercent = 0.9
      }
      if (age >= 41 && age <= 50) {
        this._birthPercent = 0.8
      }
      if (age >= 51 && age <= 60) {
        this._birthPercent = 0.7
      }
      if (age >= 61 && age <= 70) {
        this._birthPercent = 0.6
      }
      if (age > 70) {
        this._birthPercent = 0.5
      }
    } else {
      const cCount = this.关系.亲属.血缘亲属.亲子.length
      if (age >= 18 && age <= 25) {
        this._birthPercent = 1 - cCount * 0.15
      }
      if (age >= 26 && age <= 30) {
        this._birthPercent = 0.9 - cCount * 0.15
      }
      if (age >= 31 && age <= 35) {
        this._birthPercent = 0.7 - cCount * 0.15
      }
      if (age >= 36 && age <= 40) {
        this._birthPercent = 0.5 - cCount * 0.15
      }
      if (age >= 41 && age <= 45) {
        this._birthPercent = 0.33 - cCount * 0.15
      }
      if (age > 45) {
        this._birthPercent = 0
      }
    }
  }

  // 更新先天特质
  updateTalent() {
    each(TalentGroup, (key, val) => {
      if (key != '人神') {
        const res = randomPickByRatio(val)
        if (res) {
          res.give(this, key)
          this.先天特质.push(key)
        }
      }
    })
  }

  // 更新身份特质
  updateIdentity() {
    this.updateIdentityInner(this)
  }
  // 职业等级
  updateJobRank() {
    const value = this.职业功勋
    for (let i = 0; i < JobRankValue.length; i++) {
      if (value < JobRankValue[i]) {
        this.职业等级 = i + 1
        break
      }
      if (i >= JobRankValue.length) {
        this.职业等级 = JobRankValue.length + 1
      }
    }
  }
}

// 分组数据
const groupBy = (map, prop, withKey) => {
  const group = {}
  each(map, function (key, val) {
    const groupedVal = val[prop]
    if (!group[groupedVal]) group[groupedVal] = []
    const cloned = Object.assign({}, val)
    if (withKey) {
      cloned.key = key
    }
    group[groupedVal].push(cloned)
  })
  return group
}

const CharacterGroup = {
  先天特质: {
    强壮: {
      type: '强壮系',
      ratio: 0.05,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.技能.武艺 += 10
        npc.友好吸引力 += 5
        npc.爱情吸引力 += 5
        npc.健康 += 1.25
      },
    },
    怪力: {
      type: '强壮系',
      ratio: 0.025,
      give(npc) {
        npc.技能.武艺 += 20
        npc.友好吸引力 += 10
        npc.爱情吸引力 += 10
        npc.健康 += 2.5
      },
    },
    麒麟儿: {
      type: '强壮系',
      ratio: 0.05,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.技能.武艺 += 40
        npc.友好吸引力 += 15
        npc.爱情吸引力 += 15
        npc.健康 += 5
      },
    },
    机敏: {
      type: '聪慧系',
      ratio: 0.05,
      /**
       *
       * @param {NPC} npc
       */
      give(npc) {
        each(npc.属性, (key) => {
          npc['属性'][key] += 5
        })
      },
    } /*  */,
    奇葩: {
      type: '聪慧系',
      ratio: 0.025,
      give(npc) {
        each(npc.属性, (key) => {
          npc['属性'][key] += 10
        })
      },
    },
    天才: {
      type: '聪慧系',
      ratio: 0.05,
      give(npc) {
        each(npc.属性, (key) => {
          npc['属性'][key] += 15
        })
      },
    },
    美人: {
      type: '美貌系',
      ratio: 0.05,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.魅力 += 5
        npc.友好吸引力 += 10
        npc.爱情吸引力 += 10
        npc.生育概率 += 0.1
      },
    },
    倾国: {
      type: '美貌系',
      ratio: 0.025,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.魅力 += 10
        npc.友好吸引力 += 20
        npc.爱情吸引力 += 20
        npc.生育概率 += 0.2
      },
    },
    谪仙人: {
      type: '美貌系',
      ratio: 0.05,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.魅力 += 15
        npc.友好吸引力 += 30
        npc.爱情吸引力 += 30
        npc.生育概率 += 0.3
      },
    },
    人神: {
      type: '人神',
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.敏锐 += 100
        npc.健康 += -20
        npc.生育概率 += 0.1
      },
    },
  },
  童年特质: {
    求真: {
      ratio: 0.2,
      /**
       *
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.理性 += 50
      },
    },
    友善: {
      ratio: 0.2,
      /**
       *
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.社交 += 50
      },
    },
    活泼: {
      ratio: 0.2,
      /**
       *
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += 50
      },
    },
    细腻: {
      ratio: 0.2,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.宽恕 += 50
      },
    },
    笃学: {
      ratio: 0.2,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.名誉 += 50
      },
    },
  },
  教育特质: {
    白丁: {},
    粗通文墨: {
      /**
       *
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.经营 += 2.5
        npc.属性.智略 += 10
        npc.属性.魅力 += 15
        npc.属性.统率 += 5
      },
    },
    熟读经书: {
      /**
       *
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.经营 += 5
        npc.属性.智略 += 15
        npc.属性.魅力 += 20
        npc.属性.统率 += 10
      },
    },
    出口成章: {
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.经营 += 15
        npc.属性.智略 += 15
        npc.属性.魅力 += 20
        npc.属性.统率 += 15
        npc.家族收入 *= 1.04
      },
    },
  },
  身份特质: {
    // TODO: 每月执行一次
    秀才: {
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.影响力 += 0.5
        npc.家族.家族收入 += 1
      },
    },
    举人: {
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.影响力 += 1
        npc.家族.家族收入 += 2
      },
    },
    进士: {
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.影响力 += 2
      },
    },
    监生: {
      // 如果是once 不需要每月都调用
      once: true,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.经营 += 10
        npc.属性.智略 += 15
        npc.属性.魅力 += 15
        npc.属性.统率 += 10
        npc.家族.家族收入 *= 1.6
        npc.生育概率 *= 1.2
      },
    },
    探花: {
      /**
       *
       * @param {NPC} npc
       */
      give(npc) {
        npc.职业功勋 *= 1.05
        npc.影响力 += 2.5
      },
    },
    榜眼: {
      /**
       *
       * @param {NPC} npc
       */
      give(npc) {
        npc.职业功勋 *= 1.07
        npc.影响力 += 3
      },
    },
    状元: {
      /**
       *
       * @param {NPC} npc
       */
      give(npc) {
        npc.职业功勋 *= 1.1
        npc.影响力 += 4
      },
    },
  },
  天赋特质: {
    说客: {
      type: '魅力系',
      ratio: 0.55,
      /**
       *
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.魅力 += 10
        npc.属性.统率 -= 5
      },
    },
    说士: {
      type: '魅力系',
      ratio: 0.3,
      /**
       *
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.魅力 += 20
        npc.属性.统率 -= 5
      },
    },
    雄辩家: {
      type: '魅力系',
      ratio: 0.1,
      /**
       *
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.魅力 += 30
        npc.属性.统率 -= 5
      },
    },
    纵横家: {
      type: '魅力系',
      ratio: 0.05,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.魅力 += 40
        npc.属性.统率 -= 5
      },
    },
    门客: {
      type: '敏锐系',
      ratio: 0.55,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.敏锐 += 10
        npc.属性.经营 -= 5
      },
    },
    暗忍: {
      type: '敏锐系',
      ratio: 0.3,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.敏锐 += 20
        npc.属性.经营 -= 5
      },
    },
    厂卫: {
      type: '敏锐系',
      ratio: 0.1,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.敏锐 += 30
        npc.属性.经营 -= 5
      },
    },
    神算子: {
      type: '敏锐系',
      ratio: 0.05,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.敏锐 += 40
        npc.属性.经营 -= 5
      },
    },
    武人: {
      type: '统率系',
      ratio: 0.55,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.统率 += 10
        npc.属性.智略 -= 5
      },
    },
    武士: {
      type: '统率系',
      ratio: 0.3,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.统率 += 20
        npc.属性.智略 -= 5
      },
    },
    武圣: {
      type: '统率系',
      ratio: 0.1,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.统率 += 30
        npc.属性.智略 -= 5
      },
    },
    武神: {
      type: '统率系',
      ratio: 0.05,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.统率 += 40
        npc.属性.智略 -= 5
      },
    },
    幕僚: {
      type: '智略系',
      ratio: 0.55,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.智略 += 10
        npc.属性.敏锐 -= 5
      },
    },
    策士: {
      type: '智略系',
      ratio: 0.3,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.智略 += 20
        npc.属性.敏锐 -= 5
      },
    },
    智多星: {
      type: '智略系',
      ratio: 0.1,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.智略 += 30
        npc.属性.敏锐 -= 5
      },
    },
    诸葛再世: {
      type: '智略系',
      ratio: 0.05,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.智略 += 40
        npc.属性.敏锐 -= 5
      },
    },
    能官: {
      type: '经营系',
      ratio: 0.55,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.经营 += 10
        npc.属性.魅力 -= 5
      },
    },
    贤臣: {
      type: '经营系',
      ratio: 0.3,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.经营 += 20
        npc.属性.魅力 -= 5
      },
    },
    治世能臣: {
      type: '经营系',
      ratio: 0.1,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.经营 += 30
        npc.属性.魅力 -= 5
      },
    },
    千古一相: {
      type: '经营系',
      ratio: 0.05,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.属性.经营 += 40
        npc.属性.魅力 -= 5
      },
    },
  },
  性格特质: {
    浑身是胆: {
      type: 0,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += 200
        npc.倾向.野心 += 20
        npc.倾向.理性 += -20
        npc.倾向.社交 += 20
      },
    },
    优柔寡断: {
      type: 0,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += -200
        npc.倾向.野心 += -20
        npc.倾向.理性 += 10
        npc.倾向.社交 += -20
      },
    },
    高岭之花: {
      type: 1,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += -20
        npc.倾向.野心 += -10
        npc.倾向.理性 += 75
        npc.倾向.报复 += -10
      },
    },
    灿烈夏阳: {
      type: 1,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += 100
        npc.倾向.宽恕 += -20
        npc.倾向.野心 += 10
        npc.倾向.理性 += -35
        npc.倾向.社交 += 50
      },
    },
    身心不二: {
      type: 2,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.忠贞 += 200
        npc.倾向.野心 += 10
        npc.倾向.贪婪 += -20
        npc.倾向.名誉 += 20
        npc.倾向.社交 += -20
        npc.倾向.占有欲 += 10
      },
    },
    风流恣意: {
      type: 2,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.忠贞 += -200
        npc.倾向.野心 += 10
        npc.倾向.贪婪 += 20
        npc.倾向.名誉 += -10
        npc.倾向.社交 += 35
        npc.倾向.占有欲 += -10
      },
    },
    不思进取: {
      type: 3,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += -50
        npc.倾向.野心 += -50
        npc.倾向.贪婪 += -75
        npc.倾向.名誉 += 10
        npc.倾向.社交 += -10
        npc.倾向.报复 += -10
        npc.倾向.占有欲 += -10
      },
    },
    雄心壮志: {
      type: 3,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += 50
        npc.倾向.野心 += 75
        npc.倾向.贪婪 += 75
        npc.倾向.名誉 += -20
        npc.倾向.社交 += 20
        npc.倾向.占有欲 += 10
      },
    },
    兢兢业业: {
      type: 4,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += 35
        npc.倾向.野心 += 75
        npc.倾向.理性 += 20
        npc.倾向.报复 += 10
      },
    },
    生性疏懒: {
      type: 4,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += -20
        npc.倾向.宽恕 += -10
        npc.倾向.野心 += -50
        npc.倾向.贪婪 += 10
        npc.倾向.社交 += -10
        npc.倾向.报复 += -10
      },
    },
    诡谲多变: {
      type: 5,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += 20
        npc.倾向.名誉 += -20
        npc.倾向.理性 += 20
        npc.倾向.报复 += 20
      },
    },
    自行其是: {
      type: 5,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.名誉 += 50
        npc.倾向.理性 += -10
        npc.倾向.报复 += 50
      },
    },
    宽宏大量: {
      type: 6,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.宽恕 += 50
        npc.倾向.野心 += -10
        npc.倾向.名誉 += 20
        npc.倾向.理性 += 10
        npc.倾向.报复 += -200
      },
    },
    睚眦必报: {
      type: 6,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.宽恕 += -20
        npc.倾向.野心 += 10
        npc.倾向.名誉 += -10
        npc.倾向.理性 += -10
        npc.倾向.报复 += 200
      },
    },
    豪爽仗义: {
      type: 7,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.宽恕 += 35
        npc.倾向.贪婪 += -200
        npc.倾向.名誉 += 20
        npc.倾向.社交 += 10
      },
    },
    贪得无厌: {
      type: 7,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.宽恕 += -20
        npc.倾向.贪婪 += 200
        npc.倾向.名誉 += -10
      },
    },
    长袖善舞: {
      type: 8,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += 20
        npc.倾向.宽恕 += 35
        npc.倾向.社交 += 200
      },
    },
    畏羞忸怩: {
      type: 8,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += -20
        npc.倾向.社交 += -200
        npc.倾向.报复 += -10
        npc.倾向.占有欲 += -10
      },
    },
    直率坦荡: {
      type: 9,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += 10
        npc.倾向.宽恕 += 10
        npc.倾向.名誉 += 50
        npc.倾向.社交 += 20
      },
    },
    心机深沉: {
      type: 9,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += -10
        npc.倾向.宽恕 += -10
        npc.倾向.名誉 += -50
        npc.倾向.理性 += 10
      },
    },
    谦谦君子: {
      type: 10,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.宽恕 += 20
        npc.倾向.野心 += -10
        npc.倾向.贪婪 += -50
        npc.倾向.名誉 += 20
      },
    },
    傲慢少礼: {
      type: 10,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += 35
        npc.倾向.宽恕 += -20
        npc.倾向.野心 += 10
        npc.倾向.贪婪 += 20
        npc.倾向.名誉 += -20
        npc.倾向.理性 += -20
        npc.倾向.社交 += 20
      },
    },
    清风高节: {
      type: 11,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.名誉 += 200
        npc.倾向.理性 += 20
        npc.倾向.报复 += 10
        npc.倾向.占有欲 += -10
      },
    },
    唯我主义: {
      type: 11,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += 10
        npc.倾向.宽恕 += -10
        npc.倾向.名誉 += -200
        npc.倾向.理性 += -20
        npc.倾向.占有欲 += 10
      },
    },
    持之以恒: {
      type: 12,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += -20
        npc.倾向.野心 += -10
        npc.倾向.理性 += 35
        npc.倾向.报复 += 10
      },
    },
    心浮气躁: {
      type: 12,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.胆量 += 20
        npc.倾向.野心 += 10
        npc.倾向.理性 += -35
        npc.倾向.报复 += -10
      },
    },
    鲜衣怒马: {
      type: 13,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.野心 += 10
        npc.倾向.贪婪 += -35
        npc.倾向.报复 += -10
      },
    },
    才高八斗: {
      type: 13,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.野心 += -10
        npc.倾向.贪婪 += 35
        npc.倾向.名誉 += 20
      },
    },
    毫不设防: {
      type: 14,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.宽恕 += 20
        npc.倾向.名誉 += 50
        npc.倾向.理性 += -20
        npc.倾向.社交 += 50
        npc.倾向.报复 += -20
      },
    },
    疑神疑鬼: {
      type: 14,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.宽恕 += -10
        npc.倾向.名誉 += -20
        npc.倾向.理性 += -20
        npc.倾向.社交 += -50
        npc.倾向.报复 += 20
      },
    },
    济贫扶弱: {
      type: 15,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.宽恕 += 200
        npc.倾向.贪婪 += -20
        npc.倾向.名誉 += 50
        npc.倾向.社交 += 50
      },
    },
    无情无义: {
      type: 15,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.宽恕 += -200
        npc.倾向.名誉 += -50
        npc.倾向.理性 += 10
        npc.倾向.社交 += -10
      },
    },
    不识红尘: {
      type: 16,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.迟钝 += 200
        npc.倾向.占有欲 += -20
      },
    },
    风花雪月: {
      type: 16,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.迟钝 += -200
        npc.倾向.社交 += 50
      },
    },
    不容染指: {
      type: 17,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.占有欲 += 200
        npc.倾向.名誉 += -50
        npc.倾向.理性 += -20
        npc.倾向.社交 += -20
      },
    },
    舍得同一: {
      type: 17,
      /**
       * @param {NPC} npc
       */
      give(npc) {
        npc.倾向.占有欲 += -200
        npc.倾向.理性 += 20
        npc.倾向.社交 += 20
        npc.倾向.报复 += -50
      },
    },
  },
  事件特质: {
    宿命之吻: {
      /**
       *
       * @param {NPC} npc
       */
      give(npc) {
        npc.健康 += 5
        npc.友好吸引力 += 10
        npc.爱情吸引力 += 10
        npc.爱慕值 += 50
      },
    },
    命运之握: {
      /**
       *
       * @param {NPC} npc
       */
      give(npc) {
        npc.健康 += 5
        npc.爱慕值 += 50
        npc.疾病抵御 += -0.1
      },
    },
  },
}

const Jobs = (function () {
  const jobList = [
    '苦工',
    '医生',
    '商人',
    '刺客',
    '官吏',
    '军人',
    '乐师',
    '厨师',
    '铁匠',
    '艺匠',
    '画师',
    '道士',
    '自由职业',
    '皇帝',
    '君王',
    '赋闲',
  ]
  let job = {}
  let truthy = () => true
  jobList.forEach((key) => {
    job[key] = truthy
  })
  let rankGreaterThan = (rank) => (npc) => npc.家族.家阶 > rank
  let rank2 = rankGreaterThan(2)
  let rank3 = rankGreaterThan(3)
  const bookRead = (npc) => (npc.教育特质 === '熟读经书' ? true : false)

  job['医生'] = (npc) => bookRead(npc) && rank2(npc)
  job['商人'] = (npc) => bookRead(npc) && rank2(npc)
  job['官吏'] = (npc) =>
    (npc.教育特质 === '出口成章' ? true : false) && rank3(npc)

  job['画师'] = (npc) => bookRead(npc) && rank2(npc)
  job['道士'] = bookRead
  job['皇帝'] = (npc) => (npc.家族 === '皇族' ? true : false)
  job['郡王'] = (npc) => (npc.家族 === '王族' ? true : false)

  return job
})()

const TalentGroup = groupBy(CharacterGroup.先天特质, 'type', true)
// 健康
const Health = {
  /**
   *
   * @param {NPC} npc
   */
  give(npc) {
    const health = random(
      npc.性别 === '男' ? { min: 90, max: 98 } : { min: 100, max: 108 }
    )
    npc.健康 = health
  },
}
const familyBaseGive = (npc, type) => {
  const f = Families[type]
  npc.家族.家世 = type
  npc.家族.家阶 = f.rank
  npc.家族.家族收入 = f.income
  npc.家族.家族资产 = f.asset
}

const randomGiveJob = (npc, defaultRatio) => {
  const validJobs = []
  each(Jobs, (key, validate) => {
    if (validate(npc)) {
      validJobs.push({ type: key, ratio: 0 })
    }
  })

  bindRatio(validJobs, defaultRatio)

  const job = randomPickByRatio(validJobs)
  if (job) {
    npc.职业 = job.type
    const rank = random({ min: 1, max: 2 })
    npc.职业等级 = rank
    let min, max
    if (rank <= 1) {
      min = 0
      max = JobRankValue[0]
    } else {
      min = JobRankValue[rank - 2]
      max = JobRankValue[rank - 1]
    }
    npc.职业功勋 = random({ min, max })
  }
}
// 家族
const Families = {
  皇族: {
    /**
     * @param {NPC} npc
     * @param {string} type
     */
    give(npc, type) {
      familyBaseGive(npc, type)
      npc.职业 = '皇帝'
      npc.先天特质.push('人神')
      each(npc.技能, function (key) {
        npc['技能'][key] = random({ min: 40, max: 80 })
      })
      npc.技能.礼仪 = 100
      npc.技能.口才 = 100
      npc.基准友好度 += 20
      npc.影响力 = 1500
    },
    ratio: 0.01,
    rank: 9,
    income: 1000,
    asset: 5000,
  },
  王族: {
    ratio: 0.01,
    rank: 8,
    income: 750,
    asset: 3000,
    give(npc, type) {
      familyBaseGive(npc, type)
      npc.职业 = '郡王'
      each(npc.技能, function (key) {
        npc['技能'][key] = random({ min: 40, max: 80 })
      })
      npc.技能.礼仪 = 100
      npc.技能.口才 = 100
      npc.基准友好度 += 15
      npc.影响力 = 1000
    },
  },
  士族: {
    rank: 7,
    ratio: 0.05,
    income: 400,
    asset: 1500,
    /**
     *
     * @param {NPC} npc
     */
    giveJob(npc) {
      if (!npc.家族 || npc.家族.家主 != npc) {
        randomGiveJob(npc, [{ type: '赋闲', ratio: 0.4 }])
        return
      }
      // 家主赋值能力
      npc.职业 = '官吏'
      if (npc.职业等级 < 9) {
        const min = JobRankValue[7]
        const max = JobRankValue[8] - 1
        npc.职业功勋 = random({ min, max })
        npc.updateJobRank()
      }
    },
    /**
     *
     * @param {NPC} npc
     * @param {string} type
     */
    give(npc, type) {
      familyBaseGive(npc, type)
      npc.教育特质 = '出口成章'
      CharacterGroup.教育特质.出口成章.give(npc)
      each(npc.技能, (key) => {
        npc['技能'][key] = random({ min: 20, max: 60 })
      })
      npc.技能.礼仪 = random({ min: 70, max: 80 })
      npc.技能.口才 = random({ min: 70, max: 80 })
      npc.身份特质 = '监生'
      if (CharacterGroup.身份特质.监生.once) {
        CharacterGroup.身份特质.监生.give(npc)
      } else {
        npc.updateIdentityInner = CharacterGroup.身份特质.监生.give
      }
      Families[type].giveJob(npc)
    },
  },
  望族: {
    rank: 6,
    ratio: 0.1,
    income: 200,
    asset: 800,
    giveJob(npc) {
      if (!npc.家族 || npc.家族.家主 != npc) {
        randomGiveJob(npc, [{ type: '赋闲', ratio: 0.4 }])
        return
      }
      // 家主赋值能力
      const job = isPassed(0.5) ? '官吏' : '军人'
      npc.职业 = job
      const rank = 7
      if (npc.职业等级 < rank) {
        const min = JobRankValue[rank - 2]
        const max = JobRankValue[rank - 1] - 1
        npc.职业功勋 = random({ min, max })
        npc.updateJobRank()
      }
    },
    /**
     *
     * @param {NPC} npc
     * @param {string} type
     */
    give(npc, type) {
      familyBaseGive(npc, type)
      npc.教育特质 = '出口成章'
      CharacterGroup.教育特质.出口成章.give(npc)
      each(npc.技能, (key) => {
        npc['技能'][key] = random({ min: 20, max: 60 })
      })
      npc.技能.礼仪 = random({ min: 70, max: 80 })
      npc.技能.口才 = random({ min: 70, max: 80 })
      npc.身份特质 = '监生'
      if (CharacterGroup.身份特质.监生.once) {
        CharacterGroup.身份特质.监生.give(npc)
      } else {
        npc.updateIdentityInner = CharacterGroup.身份特质.监生.give
      }
      Families[type].giveJob(npc)
    },
  },
  名门: {
    rank: 5,
    ratio: 0.15,
    income: 100,
    asset: 400,
    giveJob(npc) {
      randomGiveJob(npc, [{ type: '赋闲', ratio: 0.3 }])
      if (!npc.家族 || npc.家族.家主 != npc) return

      // 家主赋值能力
      const rank = 5
      if (npc.职业等级 < rank) {
        const min = JobRankValue[rank - 2]
        const max = JobRankValue[rank - 1] - 1
        npc.职业功勋 = random({ min, max })
        npc.updateJobRank()
      }
    },
    /**
     *
     * @param {NPC} npc
     * @param {string} type
     */
    give(npc, type) {
      familyBaseGive(npc, type)
      npc.教育特质 = '熟读经书'
      CharacterGroup.教育特质.熟读经书.give(npc)
      each(npc.技能, (key) => {
        npc['技能'][key] = random({ min: 10, max: 50 })
      })
      npc.技能.乐器 = random({ min: 70, max: 80 })
      npc.技能.绘画 = random({ min: 70, max: 80 })
      npc.技能.写作 = random({ min: 70, max: 80 })
      Families[type].giveJob(npc)
    },
  },

  庶族: {
    rank: 4,
    ratio: 0.15,
    income: 50,
    asset: 200,
    giveJob(npc) {
      randomGiveJob(npc, [{ type: '赋闲', ratio: 0.3 }])
      if (!npc.家族 || npc.家族.家主 != npc) return

      // 家主赋值能力
      const rank = random({ min: 3, max: 5 })
      if (npc.职业等级 < rank) {
        const min = JobRankValue[rank - 2]
        const max = JobRankValue[rank - 1] - 1
        npc.职业功勋 = random({ min, max })
        npc.updateJobRank()
      }
    },
    /**
     *
     * @param {NPC} npc
     * @param {string} type
     */
    give(npc, type) {
      familyBaseGive(npc, type)
      npc.教育特质 = '熟读经书'
      CharacterGroup.教育特质.熟读经书.give(npc)
      each(npc.技能, (key) => {
        npc['技能'][key] = random({ min: 10, max: 50 })
      })
      npc.技能.乐器 = random({ min: 70, max: 80 })
      npc.技能.绘画 = random({ min: 70, max: 80 })
      npc.技能.写作 = random({ min: 70, max: 80 })
      Families[type].giveJob(npc)
    },
  },
  寒门: {
    ratio: 0.3,
    rank: 3,
    income: 20,
    asset: 100,
    giveJob(npc) {
      randomGiveJob(npc, [
        { type: '赋闲', ratio: 0.2 },
        { type: '商人', ratio: 0.03 },
        { type: '医生', ratio: 0.03 },
        { type: '画师', ratio: 0.03 },
      ])
      if (!npc.家族 || npc.家族.家主 != npc) return

      // 家主赋值能力
      const rank = random({ min: 2, max: 4 })
      if (npc.职业等级 < rank) {
        const min = JobRankValue[rank - 2]
        const max = JobRankValue[rank - 1] - 1
        npc.职业功勋 = random({ min, max })
        npc.updateJobRank()
      }
    },
    /**
     *
     * @param {NPC} npc
     * @param {string} type
     */
    give(npc, type) {
      familyBaseGive(npc, type)
      npc.教育特质 = '粗通文墨'
      CharacterGroup.教育特质.粗通文墨.give(npc)
      each(npc.技能, (key) => {
        npc['技能'][key] = random({ min: 0, max: 40 })
      })
      npc.技能.道术 = random({ min: 70, max: 80 })
      npc.技能.绘画 = random({ min: 70, max: 80 })
      Families[type].giveJob(npc)
    },
  },
  贱民: {
    ratio: 0.18,
    rank: 2,
    income: 5,
    asset: 50,
    giveJob(npc) {
      randomGiveJob(npc, [{ type: '赋闲', ratio: 0.1 }])
    },
    /**
     *
     * @param {NPC} npc
     * @param {string} type
     */
    give(npc, type) {
      familyBaseGive(npc, type)
      npc.教育特质 = '白丁'
      // 不能生成官吏商人画师医生
      // 赋闲 10%
      each(npc.技能, (key) => {
        npc['技能'][key] = random({ min: 0, max: 30 })
      })
      npc.技能.厨艺 = random({ min: 70, max: 80 })
      npc.技能.种植 = random({ min: 70, max: 80 })
      Families[type].giveJob(npc)
    },
  },
  奴隶: {
    ratio: 0.05,
    rank: 1,
    income: 1,
    asset: 0,
    giveJob(npc) {
      randomGiveJob(npc, [{ type: '赋闲', ratio: 0.1 }])
    },
    /**
     *
     * @param {NPC} npc
     * @param {string} type
     */
    give(npc, type) {
      familyBaseGive(npc, type)
      npc.教育特质 = '白丁'
      // 不能生成官吏商人画师医生
      // 赋闲 10%
      npc.职业 = '苦工'
      each(npc.技能, (key) => {
        npc['技能'][key] = random({ min: 0, max: 30 })
      })
      npc.技能.厨艺 = random({ min: 70, max: 80 })
      npc.技能.种植 = random({ min: 70, max: 80 })
      Families[type].giveJob(npc)
    },
  },
}

// 秘密

const Secrets = {
  私生子: {
    give(npc) {
      npc.影响力 -= 200
    },
  },
  禁忌之恋: {
    // 世仇家族生成恋慕
    give(npc) {
      npc.家族.家主.影响力 -= 200
    },
  },
  暗恋: {
    give(/**@type {NPC}*/ npc) {
      const part = npc.关系.恋人.暗恋
      let index,
        friends = npc.关系.友人.朋友
      if (part.关系.恋人.暗恋 === npc) {
        npc.关系.恋人.恋人 = part
        part.关系.恋人.恋人 = npc
        part.关系.恋人.暗恋 = null
        npc.关系.恋人.暗恋 = null
      } else if ((index = friends.indexOf(part)) > -1) {
        // 友情值触发挚友
      } else {
        // 触发无望之恋
        npc.关系.恋人.暗恋 = null
        npc.关系.恋人.单恋 = part
      }
    },
  },
}

const giveLook = (npc, type) => {
  const gender = npc.性别
  const keys = Looks[type].keys

  const styles = Looks[type].style
  const inherit = Looks[type].inherit

  if (inherit) {
    const parents = getParents(npc)
    const styles = parents.map((p) => p.外貌[type])
    npc.外貌[type] = randomTake(styles)[0]
    return
  }

  let key
  if (keys) {
    key = keys[gender]
  }

  let style,
    suffix = ''
  if (isChild(npc)) {
    suffix = '童'
  }
  if (key === undefined) {
    style = styles[gender + suffix]
  } else {
    style = styles[gender + suffix][key]
  }
  if (isArray(style)) {
    npc.外貌[type] = randomTake(style)[0]
  } else {
    npc.外貌[type] = style
  }
}

const Looks = {
  前发: {
    inherit: false,
    keys: {
      男: '刘海2',
      女: '自然2',
    },
    style: {
      男: {
        刘海2: ['发型1', '发型2'],
        自然2: ['发型1', '发型2'],
      },
      女: {
        自然1: [],
        自然2: [],
      },
      男童: {
        发型1: ['发型1', '发型2'],
      },
      女童: {
        发型1: ['发型1', '发型2'],
      },
    },
  },
  中发: {
    inherit: false,
    style: {
      男: {
        自然1: ['发型1', '发型2'],
        自然2: ['发型1', '发型2'],
      },
      女: {
        自然1: [],
        自然2: [],
      },
    },
  },
  发色: {
    inherit: false,
    style: {
      男: '红色',
      女: '紫色',
    }
  },
  眉毛: {
    inherit: true,
    style: {
      男: ['一字眉', '剑眉'],
      女: ['一字眉', '剑眉'],
    }
  },
  瞳色: {
    inherit: true,
    style: {
      男: ['绿色', '蓝色'],
      女: ['绿色', '蓝色'],
    }
  },
}

const Ambitions = {
  光宗耀祖: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return contains(npc.性格特质, '雄心壮志')
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      return npc.家族.家阶 > 7
    },
  },
  出将入相: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        !contains(npc.性格特质, '不思进取') &&
        (contains(npc.性格特质, '雄心壮志') ||
          contains(npc.性格特质, '心机深沉') ||
          contains(npc.性格特质, '高岭之花') ||
          contains(npc.性格特质, '诡谲多变'))
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      return npc.属性.魅力 >= 90 && npc.属性.智略 >= 90
    },
  },
  一人之下: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '雄心壮志') ||
        contains(npc.性格特质, '心机深沉') ||
        contains(npc.性格特质, '独断专行') ||
        contains(npc.性格特质, '诡谲多变') ||
        contains(npc.性格特质, '固执己见') ||
        contains(npc.性格特质, '傲慢少礼')
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // 摄政王
      const /**@type {Family} */ family = npc.家族
      const header = family.members[0]
      // TODO: 满足晋级王族条件
      return family.家世 === '王族' && npc === header
    },
  },
  重兵在握: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '浑身是胆') || contains(npc.性格特质, '暴躁如雷')
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // 大将军
      return npc.职业 === '军人' && npc.职业等级 >= 18
    },
  },
  白衣卿相: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '高岭之花') ||
        contains(npc.性格特质, '持之以恒') ||
        contains(npc.性格特质, '雄心壮志') ||
        contains(npc.性格特质, '诡谲多变')
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      return npc.职业 === '官吏' && npc.职业等级 >= 18
    },
  },
  悬壶济世: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '济贫扶弱') ||
        contains(npc.性格特质, '谦谦君子') ||
        contains(npc.性格特质, '宽宏大量')
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      return npc.职业等级 >= 10 && npc.技能.医术 >= 90
    },
  },
  富埒陶白: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '不思进取') ||
        contains(npc.性格特质, '暴饮暴食') ||
        contains(npc.性格特质, '生性疏懒') ||
        contains(npc.性格特质, '心浮气躁') ||
        contains(npc.性格特质, '贪得无厌')
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      return npc.家族.家族资产 >= 1e6
    },
  },
  胜友如云: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        !contains(npc.性格特质, '畏羞忸怩') &&
        (contains(npc.性格特质, '长袖善舞') ||
          contains(npc.性格特质, '直率坦荡') ||
          contains(npc.性格特质, '毫不设防') ||
          contains(npc.性格特质, '宽宏大量'))
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      return npc.关系.友人.朋友.length >= 5
    },
  },
  一生一世: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        !contains(npc.性格特质, '风流恣意') &&
        (contains(npc.性格特质, '身心不二') ||
          contains(npc.性格特质, '高岭之花') ||
          contains(npc.性格特质, '怯声怯气') ||
          contains(npc.性格特质, '不容染指') ||
          contains(npc.性格特质, '畏羞忸怩'))
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // 与本命或挚爱结婚
      return (
        (npc.关系.恋人.挚爱 && npc.关系.恋人.挚爱 == npc.关系.恋人.配偶) ||
        (npc.关系.恋人.本命 && npc.关系.恋人.本命 == npc.关系.恋人.配偶)
      )
    },
  },
  薄幸多情: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        !contains(npc.性格特质, '身心不二') &&
        (contains(npc.性格特质, '风流恣意') ||
          contains(npc.性格特质, '心机深沉') ||
          contains(npc.性格特质, '独断专行') ||
          contains(npc.性格特质, '疑神疑鬼') ||
          contains(npc.性格特质, '毫不设防') ||
          contains(npc.性格特质, '无情无义'))
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // 与本命或挚爱结婚
      return npc.关系.恋人.恋人.length >= 5
    },
  },
  愤世嫉俗: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        !contains(npc.性格特质, '宽宏大量') &&
        (contains(npc.性格特质, '疑神疑鬼') ||
          contains(npc.性格特质, '睚眦必报') ||
          contains(npc.性格特质, '无情无义'))
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // 与本命或挚爱结婚
      return npc.关系.仇人.仇人.length >= 5
    },
  },
  满腹经纶: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '兢兢业业') ||
        contains(npc.性格特质, '黑白分明') ||
        contains(npc.性格特质, '克己奉礼') ||
        npc.喜好 === '读书'
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // TODO: 成为三甲
    },
  },
  武艺绝伦: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '浑身是胆') ||
        contains(npc.性格特质, '暴躁如雷') ||
        npc.喜好 === '习武'
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // TODO: 比武大会第一
    },
  },
  梦笔生花: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '怯声怯气') ||
        contains(npc.性格特质, '高岭之花') ||
        npc.喜好 === '读书'
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // TODO: 诗文大会第一
    },
  },
  再世神农: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '怯声怯气') ||
        contains(npc.性格特质, '持之以恒') ||
        npc.喜好 === '园艺'
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // TODO: 园艺大会第一
    },
  },
  天籁之音: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '长袖善舞') ||
        contains(npc.性格特质, '持之以恒') ||
        npc.喜好 === '吟唱'
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // TODO: 吟唱大会第一
    },
  },
  玉盘珍馐: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '怯声怯气') ||
        contains(npc.性格特质, '贪得无厌') ||
        npc.喜好 === '下厨'
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // TODO: 厨艺大会第一
    },
  },
  神兵利器: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '怯声怯气') ||
        contains(npc.性格特质, '持之以恒') ||
        npc.喜好 === '锻造'
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // TODO: 锻造大会第一
    },
  },
  金玉锦绣: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '怯声怯气') ||
        contains(npc.性格特质, '高岭之花') ||
        npc.喜好 === '雕饰'
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // TODO: 饰品大会第一
    },
  },
  栩栩如生: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '怯声怯气') ||
        contains(npc.性格特质, '高岭之花') ||
        npc.喜好 === '绘画'
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // TODO: 丹青大会第一
    },
  },
  道法自然: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '直率坦荡') ||
        contains(npc.性格特质, '毫不设防') ||
        contains(npc.性格特质, '舍得同一') ||
        npc.喜好 === '道术'
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // TODO: 道术大会第一
    },
  },
  琼浆金液: {
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    support(npc) {
      return (
        contains(npc.性格特质, '暴躁如雷') ||
        contains(npc.性格特质, '暴饮暴食') ||
        contains(npc.性格特质, '豪爽仗义') ||
        contains(npc.性格特质, '心浮气躁') ||
        npc.喜好 === '饮玖'
      )
    },
    /**
     *
     * @param {NPC} npc
     * @returns
     */
    meet(npc) {
      // TODO: 玖品大会第一
    },
  },
}

const Habits = [
  '读书',
  '习武',
  '园艺',
  '吟唱',
  '下厨',
  '铸造',
  '雕饰',
  '绘画',
  '饮玖',
]

module.exports = {
  initNPCs,
  random,
  randomTake,
  Families,
}