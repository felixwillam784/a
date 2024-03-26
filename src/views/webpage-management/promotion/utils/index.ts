export const tableRowClassName = ({
  rowIndex,
}: {
  rowIndex: number
}) => {
  if (rowIndex % 2 === 1) {
    return 'warning-row'
  } else {
    return 'success-row'
  }
}

export const FeedbackOption = [
  {
    id: 0,
    label: '无响应',
    value: 0
  },
  {
    id: 1,
    label: '打开弹窗',
    value: 1
  },
  {
    id: 2,
    label: '打开客服',
    value: 2
  },
  {
    id: 3,
    label: '下载APP',
    value: 3
  },
  {
    id: 4,
    label: '打开客服列表',
    value: 4
  },
  {
    id: 5,
    label: '站内页面',
    value: 5
  },
  {
    id: 6,
    label: '站外链接',
    value: 6
  },
  {
    id: 7,
    label: '游戏分类',
    value: 7
  },
  {
    id: 8,
    label: '具体游戏',
    value: 8
  },
  {
    id: 9,
    label: '打开活动广告页面',
    value: 9
  },
]