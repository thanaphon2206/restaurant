const moment = require('moment-timezone');
const generate = require('nanoid-generate');

exports.generateId = () => {
  return generate.english(10)
}

exports.getDaysInMonthUTC = (month, year) => {
  var date = new Date(Date.UTC(year, month, 1))
  var days = []
  while (date.getUTCMonth() === month) {
    days.push(new Date(date))
    date.setUTCDate(date.getUTCDate() + 1)
  }
  return days
}

exports.getDate = (type, date = new Date(), username) => {
  const today = moment(date).tz('Asia/Hong_Kong')
  const dateFormat = today.format().split('T')[0].split('-')
  switch (type) {
    case 'id':
      // Format: '20190624'
      return dateFormat[0] + dateFormat[1] + dateFormat[2]
    case 'idUser':
      // Format: '20190624aa001'
      return dateFormat[0] + dateFormat[1] + dateFormat[2] + username
    case 'display':
      // Format: '24-06-2019'
      return `${dateFormat[2]}-${dateFormat[1]}-${dateFormat[0]}`
    default:
      return today.format()
  }
}

exports.convertToDateId = (date) => {
  const _date = moment(date).tz('Asia/Hong_Kong')
  const dateFormat = _date.format().split('T')[0].split('-')
  return dateFormat[0] + dateFormat[1] + dateFormat[2]
}

exports.displayDateTime = (date) => {
  const dateTime = moment(date).tz('Asia/Hong_Kong')
  const _date = dateTime.format().split('T')[0]
  const _time = dateTime.format().split('T')[1]
  const splitDate = _date.split('-')
  const splitTime = _time.split('+')
  return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]} ${splitTime[0]}`
}

exports.getPeriodDatesUser = async (start, end, username) => {
  return this.getDates(new Date(start), new Date(end)).map(v => {
    return this.getDate('idUser', v, username)
  })
}

exports.getPeriodDates = async (start, end) => {
  return this.getDates(new Date(start), new Date(end)).map(v => {
    return this.getDate('id', v)
  })
}

exports.getDates = (start, end) => {
  for (var arr = [], date = start; date <= end; date.setDate(date.getDate() + 1)) {
    arr.push(new Date(date))
  }
  return arr
}

exports.getPreviousDate = (number) => {
  const date = new Date()
  let arr = []
  for (let i = 0; i < number; i++) {
    arr.push(this.getDate('id', new Date(date.getTime() - (i * 24 * 60 * 60 * 1000))))
  }
  return arr
}

exports.getPeriodFromDate = (timestamp) => {
  const dateAtStart = moment(timestamp).tz('Asia/Hong_Kong')
  let dateArray = []
  let currentDate = moment(dateAtStart.format().split('T')[0]).tz('Asia/Hong_Kong')
  let stopDate = moment(new Date()).tz('Asia/Hong_Kong')
  while (currentDate <= stopDate) {
    dateArray.push(this.getDate('id', currentDate))
    currentDate = moment(currentDate).add(1, 'days').tz('Asia/Hong_Kong')
  }
  return dateArray
}

exports.displayHour = (date) => {
  const currentTime = moment(date).tz('Asia/Hong_Kong')
  return currentTime.format().split('T')[1].split('+')[0]
}

exports.displayHourBangkok = (date) => {
  const currentTime = moment(date).tz('Asia/Bangkok')
  return currentTime.format().split('T')[1].split('+')[0]
}

exports.displayDate = (date) => {
  const currentTime = moment(date).tz('Asia/Hong_Kong')
  const currentDate = currentTime.format().split('T')[0]
  const splitCurrentDate = currentDate.split('-')
  return `${splitCurrentDate[2]}/${splitCurrentDate[1]}/${splitCurrentDate[0]}`
}
