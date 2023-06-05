// 封装函数，获取早中晚
export const getTime = (): string => {
  let message: string
  const hours: number = new Date().getHours()
  if (hours > 5 && hours < 9) {
    message = '早上'
  } else if (9 < hours && hours <= 12) {
    message = '上午'
  } else if (12 < hours && hours <= 14) {
    message = '中午'
  } else if (14 < hours && hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}
