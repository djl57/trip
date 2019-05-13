const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = formatNumber(date.getMonth() + 1)
  const day = formatNumber(date.getDate())

  return year + '年' + month + '月' + day + '日'
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const moveZero = n => {
  n = n.toString()
  return n[1] ? n[1] : n
}

const getDayNum = (start, end, type) => {
  const startYear = start.slice(0, 4)
  const startMonth = moveZero(start.slice(5, 7)-1)
  const startDay = start.slice(8, 10)

  const endYear = end.slice(0, 4)
  const endMonth = moveZero(end.slice(5, 7)-1)
  const endDay = end.slice(8, 10)

  const startDate = new Date(startYear, startMonth, startDay)
  const endDate = new Date(endYear, endMonth, endDay)
  const differ = endDate.getTime() - startDate.getTime()
  const dayNum = differ / (24 * 60 * 60 * 1000) + 1
  
  if (type) {
    const res = []
    for(let i=0; i<dayNum; i++) {
      let date = new Date(startDate.getTime() + (24*60*60*1000) * i)
      let day = formatNumber((date.getMonth() + 1)) + '月' + formatNumber((date.getDate())) + '日'
      res.push({
        date: day
      })
    }
    return res
  } else {
    return dayNum
  }
}

module.exports = {
  formatTime: formatTime,
  formatDate,
  getDayNum
}
