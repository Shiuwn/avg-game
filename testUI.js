// const { initNPCs } = require('./initNPC')


const npcs = initNPCs();
// 分页相关
const pagination = {
  pageSize: 10, // 页面数量
  pageNo: 1, // 当前页码
  total: 0, // 总数量
  totalPage: 0 // 总页数
}

// 初始化分页数据
const initPagination = (data) => {
  if (!Array.isArray(data)) {
    console.error('数据必须为数组')
    return
  }

  pagination.total = data.length
  pagination.totalPage = Math.ceil(pagination.total / pagination.pageSize)
}
// 变量展示表格生成
/**@type {ReturnType<typeof initNPCs>} */
let page = []
const updatePage = () => {
  page = npcs.slice((pagination.pageNo - 1) * pagination.pageSize, pagination.pageNo * pagination.pageSize)
  ac.updateNotification()
}

// 上一页
const prev = () => {
  if (pagination.pageNo <= 1) return
  pagination.pageNo -= 1
  updatePage()
}

const next = () => {
  if (pagination.pageNo >= pagination.totalPage) return
  pagination.pageNo += 1
  updatePage()
}

initPagination(npcs)

const makeOption = ({
  name,
  pos,
  size = {
    width: 176,
    height: 50,
  },
  bindFunc
}) => ({
  name,
  index: 0,
  inlayer: 'window',
  visible: true,
  bindFunc,
  pos, /*{
      x: 300,
      y: 572 + 50 * (i + 1),
    }*/
  size, /*{
      width: 70,
      height: 50,
    }*/
  direction: ac.TEXT_DIRECTION_TYPES.horizontal,
  halign: ac.HALIGN_TYPES.left,
  valign: ac.VALIGN_TYPES.center,
  spacing: 1,
  anchor: {
    x: 50,
    y: 50,
  },
  style: 'comStyle',
})

// 更新当页数据
updatePage()
await ac.createStyle({
  name: 'comStyle',
  font: '汉仪小隶书简',
  bold: false,
  italic: false,
  fontSize: 22,
  color: '#6c564e',
  speed: 9,
});
await ac.createStyle({
  name: 'nameStyle',
  font: '汉仪小隶书简',
  bold: false,
  italic: false,
  fontSize: 30,
  color: '#6c564e',
  speed: 9,
});




async function createMainView() {
  //背景
  await ac.createImage({
    name: 'background',
    index: 0,
    inlayer: 'window',
    resId: '$39599420',
    pos: {
      x: 640,
      y: 360,
    },
    anchor: {
      x: 50,
      y: 50,
    },
    opacity: 100,
    scale: 100,
    visible: true,
    verticalFlip: false,
    horizontalFlip: false,
  });
  async function uiClose() {
    await ac.removeCurrentUI();
  }
  // 返回按钮
  await ac.createOption({
    name: 'backButton',
    index: 0,
    inlayer: 'window',
    visible: true,
    nResId: '$39467435',
    sResId: '$39467434',
    content: ``,
    pos: {
      x: 71,
      y: 684,
    },
    anchor: {
      x: 50,
      y: 50,
    },
    onTouchEnded: uiClose,
  });
  // 金币组件
  await ac.createImage({
    name: 'coinbg',
    index: 0,
    inlayer: 'window',
    resId: '$39467450',
    pos: {
      x: 1150,
      y: 650,
    },
    anchor: {
      x: 50,
      y: 50,
    },
    opacity: 100,
    scale: 100,
    visible: true,
    verticalFlip: false,
    horizontalFlip: false,
  });
  await ac.createText({
    name: 'coin3text',
    index: 0,
    inlayer: 'window',
    visible: true,
    content: `${ac.var.金币1}`,
    pos: {
      x: 1160,
      y: 675,
    },
    size: {
      width: 40,
      height: 20,
    },
    direction: ac.TEXT_DIRECTION_TYPES.horizontal,
    halign: ac.HALIGN_TYPES.left,
    valign: ac.VALIGN_TYPES.center,
    anchor: {
      x: 50,
      y: 50,
    },
    style: 'comStyle',
  });
  await ac.createOption({
    name: 'pucharseButton',
    index: 0,
    inlayer: 'window',
    visible: true,
    nResId: '$39467396',
    sResId: '$39467395',
    content: ``,
    pos: {
      x: 1240,
      y: 680,
    },
    anchor: {
      x: 50,
      y: 50,
    },
  });

  await ac.createText({
    name: 'text18',
    index: 0,
    inlayer: 'window',
    visible: true,
    content: `信息总览`,
    pos: {
      x: 170,
      y: 399,
    },
    size: {
      width: 70,
      height: 190,
    },
    direction: ac.TEXT_DIRECTION_TYPES.vertical,
    halign: ac.HALIGN_TYPES.middle,
    valign: ac.VALIGN_TYPES.center,
    spacing: 1,
    anchor: {
      x: 50,
      y: 50,
    },
    style: 'nameStyle',
  });

  // 开始列1
  await ac.createText({
    name: 'text9',
    index: 0,
    inlayer: 'window',
    visible: true,
    content: `家世`,
    pos: {
      x: 300,
      y: 572,
    },
    size: {
      width: 70,
      height: 50,
    },
    direction: ac.TEXT_DIRECTION_TYPES.horizontal,
    halign: ac.HALIGN_TYPES.left,
    valign: ac.VALIGN_TYPES.center,
    spacing: 1,
    anchor: {
      x: 50,
      y: 50,
    },
    style: 'comStyle',
  });
  // 列2
  await ac.createText({
    name: 'text10',
    index: 0,
    inlayer: 'window',
    visible: true,
    content: `姓名`,
    pos: {
      x: 433,
      y: 572,
    },
    size: {
      width: 176,
      height: 50,
    },
    direction: ac.TEXT_DIRECTION_TYPES.horizontal,
    halign: ac.HALIGN_TYPES.left,
    valign: ac.VALIGN_TYPES.center,
    spacing: 1,
    anchor: {
      x: 50,
      y: 50,
    },
    style: 'comStyle',
  });
  // 列3
  await ac.createText({
    name: 'text11',
    index: 0,
    inlayer: 'window',
    visible: true,
    content: `年龄`,
    pos: {
      x: 520,
      y: 572,
    },
    size: {
      width: 176,
      height: 50,
    },
    direction: ac.TEXT_DIRECTION_TYPES.horizontal,
    halign: ac.HALIGN_TYPES.left,
    valign: ac.VALIGN_TYPES.center,
    spacing: 1,
    anchor: {
      x: 50,
      y: 50,
    },
    style: 'comStyle',
  });
  // 列4
  await ac.createText({
    name: 'text12',
    index: 0,
    inlayer: 'window',
    visible: true,
    content: `性别`,
    pos: {
      x: 580,
      y: 572,
    },
    size: {
      width: 176,
      height: 50,
    },
    direction: ac.TEXT_DIRECTION_TYPES.horizontal,
    halign: ac.HALIGN_TYPES.left,
    valign: ac.VALIGN_TYPES.center,
    spacing: 1,
    anchor: {
      x: 50,
      y: 50,
    },
    style: 'comStyle',
  });
  // 列5
  await ac.createText({
    name: 'text13',
    index: 0,
    inlayer: 'window',
    visible: true,
    content: `种族`,
    pos: {
      x: 640,
      y: 572,
    },
    size: {
      width: 176,
      height: 50,
    },
    direction: ac.TEXT_DIRECTION_TYPES.horizontal,
    halign: ac.HALIGN_TYPES.left,
    valign: ac.VALIGN_TYPES.center,
    spacing: 1,
    anchor: {
      x: 50,
      y: 50,
    },
    style: 'comStyle',
  });
  // 列6
  await ac.createText({
    name: 'text14',
    index: 0,
    inlayer: 'window',
    visible: true,
    content: `魅力`,
    pos: {
      x: 700,
      y: 572,
    },
    size: {
      width: 176,
      height: 50,
    },
    direction: ac.TEXT_DIRECTION_TYPES.horizontal,
    halign: ac.HALIGN_TYPES.left,
    valign: ac.VALIGN_TYPES.center,
    spacing: 1,
    anchor: {
      x: 50,
      y: 50,
    },
    style: 'comStyle',
  });
  // 列 7
  await ac.createText({
    name: 'text15',
    index: 0,
    inlayer: 'window',
    visible: true,
    content: `统率`,
    pos: {
      x: 760,
      y: 572,
    },
    size: {
      width: 176,
      height: 50,
    },
    direction: ac.TEXT_DIRECTION_TYPES.horizontal,
    halign: ac.HALIGN_TYPES.left,
    valign: ac.VALIGN_TYPES.center,
    spacing: 1,
    anchor: {
      x: 50,
      y: 50,
    },
    style: 'comStyle',
  });
  // 列8
  await ac.createText({
    name: 'text16',
    index: 0,
    inlayer: 'window',
    visible: true,
    content: `敏锐`,
    pos: {
      x: 820,
      y: 572,
    },
    size: {
      width: 176,
      height: 50,
    },
    direction: ac.TEXT_DIRECTION_TYPES.horizontal,
    halign: ac.HALIGN_TYPES.left,
    valign: ac.VALIGN_TYPES.center,
    spacing: 1,
    anchor: {
      x: 50,
      y: 50,
    },
    style: 'comStyle',
  });
  // 列9
  await ac.createText({
    name: 'text17',
    index: 0,
    inlayer: 'window',
    visible: true,
    content: `经营`,
    pos: {
      x: 880,
      y: 572,
    },
    size: {
      width: 176,
      height: 50,
    },
    direction: ac.TEXT_DIRECTION_TYPES.horizontal,
    halign: ac.HALIGN_TYPES.left,
    valign: ac.VALIGN_TYPES.center,
    spacing: 1,
    anchor: {
      x: 50,
      y: 50,
    },
    style: 'comStyle',
  });
  // 列10
  await ac.createText({
    name: 'text18',
    index: 0,
    inlayer: 'window',
    visible: true,
    content: `智略`,
    pos: {
      x: 940,
      y: 572,
    },
    size: {
      width: 176,
      height: 50,
    },
    direction: ac.TEXT_DIRECTION_TYPES.horizontal,
    halign: ac.HALIGN_TYPES.left,
    valign: ac.VALIGN_TYPES.center,
    spacing: 1,
    anchor: {
      x: 50,
      y: 50,
    },
    style: 'comStyle',
  });


  await ac.createOption({
    name: 'nextPage',
    index: 0,
    inlayer: 'window',
    visible: true,
    nResId: '$39539098',
    sResId: '$39539098',
    content: ``,
    pos: {
      x: 1082,
      y: 25,
    },
    anchor: {
      x: 50,
      y: 50,
    },
    onTouchBegan: next
  });
  await ac.createOption({
    name: 'lasePage',
    index: 0,
    inlayer: 'window',
    visible: true,
    nResId: '$39539097',
    sResId: '$39539097',
    content: ``,
    pos: {
      x: 954,
      y: 25,
    },
    anchor: {
      x: 50,
      y: 50,
    },
    onTouchBegan: prev
  });
  await ac.createImage({
    name: 'partline',
    index: 0,
    inlayer: 'window',
    resId: '$39599421',
    pos: {
      x: 332,
      y: 326,
    },
    anchor: {
      x: 50,
      y: 50,
    },
    opacity: 100,
    scale: 100,
    visible: true,
    verticalFlip: false,
    horizontalFlip: false,
  });



  for (let i = 0; i < page.length; i++) {
    await ac.createVarDisplay(makeOption({
      name: 'npc家世' + i,
      bindFunc: () => page[i].家族.家世,
      pos: {
        x: 300,
        y: 572 - 50 * (i + 1),
      },
      size: {
        width: 70,
        height: 50,
      },
    }))

    await ac.createVarDisplay(makeOption({
      name: 'npc姓名' + i,
      pos: {
        x: 433,
        y: 572 - 50 * (i + 1),
      },
      size: {
        width: 176,
        height: 50,
      },
      bindFunc: () => page[i].姓名
    }))

    await ac.createVarDisplay(makeOption({
      name: 'npc年龄' + i,
      pos: {
        x: 520,
        y: 572 - 50 * (i + 1),
      },
      bindFunc: () => page[i].年龄
    }))

    await ac.createVarDisplay(makeOption({
      name: 'npc性别' + i,
      pos: {
        x: 580,
        y: 572 - 50 * (i + 1),
      },
      size: {
        width: 176,
        height: 50,
      },
      bindFunc: () => page[i].性别
    }))

    await ac.createVarDisplay(makeOption({
      name: 'npc种族' + i,
      pos: {
        x: 640,
        y: 572 - 50 * (i + 1),
      },
      bindFunc: () => page[i].种族
    }))

    await ac.createVarDisplay(makeOption({
      name: 'npc魅力' + i,
      pos: {
        x: 700,
        y: 572 - 50 * (i + 1),
      },
      bindFunc: () => page[i].属性.魅力
    }))

    await ac.createVarDisplay(makeOption({
      name: 'npc统率' + i,
      pos: {
        x: 760,
        y: 572 - 50 * (i + 1),
      },
      bindFunc: () => page[i].属性.统率
    }))

    await ac.createVarDisplay(makeOption({
      name: '敏锐' + i,
      pos: {
        x: 820,
        y: 572 - 50 * (i + 1),
      },
      bindFunc: () => page[i].属性.敏锐
    }))

    await ac.createVarDisplay(makeOption({
      name: 'npc经营' + i,
      pos: {
        x: 880,
        y: 572 - 50 * (i + 1),
      },
      bindFunc: () => page[i].属性.经营
    }))

    await ac.createVarDisplay(makeOption({
      name: 'npc智略' + i,
      pos: {
        x: 940,
        y: 572 - 50 * (i + 1),
      },
      bindFunc: () => page[i].属性.智略
    }))
  }

}


await createMainView();

