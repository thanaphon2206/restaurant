const helper = require('../services/helper');

class Reservation {

  constructor() {
    this.restaurant = new Array()
  }

  create(restaurant, tables) {
    if (this.restaurant.length && this.restaurant.find((v) => v.restaurant === restaurant)) {
      return 'This restaurant has already created'
    }
    const data = {
      restaurant,
      tables: new Array(tables).fill('available'),
    }
    this.restaurant.push(data)
    const [response] = this.restaurant.filter((v) => v.restaurant === restaurant)
    return {
      restaurant: response.restaurant,
      tables: response.tables.length,
    }
  }

  getInfo(restaurant) {
    // check name restaurant || rest = restaurant
    const [rest] = this.restaurant.filter((v) => v.restaurant === restaurant)
    if (!rest) return 'Not found Restaurant'
    const availableSlots = rest.tables.filter((v) => v === 'available').length
    return {
      restaurant: rest.restaurant,
      totalTable: rest.tables.length,
      totalAvaliable: availableSlots,
    }
  }

  getAvailable(restaurant) {
    // check name restaurant || rest = restaurant
    const [rest] = this.restaurant.filter((v) => v.restaurant === restaurant)
    if (!rest) return 'Not found Restaurant'
    const availableSlots = rest.tables.filter((v) => v === 'available').length
    return availableSlots
  }

  fetchTableAvailable(restaurant) {
    // check index table in restaurant.
    const [rest] = this.restaurant.filter((v) => v.restaurant === restaurant)
    if (!rest) return 'Not found Restaurant'
    const availableSlots = rest.tables.filter((v) => v === 'available').map((v, index) => {
      return index
    })
    return availableSlots
  }

  fetchBooking(restaurant) {
    // check index table in restaurant.
    const [rest] = this.restaurant.filter((v) => v.restaurant === restaurant)
    if (!rest) return 'Not found Restaurant'
    const availableSlots = rest.tables.filter((v) => v !== 'available')
    return availableSlots
  }

  reserve(
    restaurant,
    type,
    adults,
    name,
    email,
    phonenumber,
    date,
  ) {
    // check name restaurant || rest = restaurant || phonenumber is unique
    const [rest] = this.restaurant.filter((v) => v.restaurant === restaurant)
    if (!rest) return 'Not found Restaurant'
    const availableSlots = rest.tables.filter((v) => v === 'available').length
    if (rest) {
      // check restaurant is available.
      if (availableSlots > 0 && availableSlots * 4 >= adults) {
        const bookingID = `${rest.restaurant}-${Date.now()}-${name}`
        for (let i = 0; i < rest.tables.length; i++) {
          // check one table can be 1-4 people.
          if (rest.tables[i] === 'available' && adults <= 4) {
            rest.tables[i] = {
              bookingID,
              type,
              name,
              email,
              phonenumber,
              adults,
              date,
            }
            const response = {
              bookingID,
              restaurant: rest.restaurant,
              name,
              adults,
              tables: 2,
              date: helper.getDate('display'),
            }
            return response
          } else if ((rest.tables[i] === 'available' && rest.tables[i + 1] === 'available') && (adults > 4 && adults <= 8)) {
            // check one table for 4 people and another one for the rest.
            const seat = 4
            const total = adults
            while (adults > seat) {
              rest.tables[i] = {
                bookingID,
                type,
                name,
                email,
                phonenumber,
                adults: seat,
                date,
              }
              adults = adults - seat
              i = i + 1
            }
            rest.tables[i] = rest.tables[i] === 'available'
              ? rest.tables[i] = {
                bookingID,
                type,
                name,
                email,
                phonenumber,
                adults,
                date,
              } : 'Is not available'
            const response = {
              bookingID,
              restaurant: rest.restaurant,
              name,
              adults: total,
              tables: 2,
              date: helper.getDate('display'),
            }
            return response
          } else if ((rest.tables[i] === 'available' && rest.tables[i + 1] !== 'available') && (adults > 4 && adults <= 8)) {
            return 'Table is not available'
          } else if (rest.tables[i] === 'available' & adults > 8) {
            // check for a large group of people with multiple tables being reserved rule people more than 8.          
            const seat = 4
            const total = adults
            let count = 0

            while (adults > seat) {
              rest.tables[i] = {
                bookingID,
                type,
                name,
                email,
                phonenumber,
                adults: seat,
                date,
              }
              adults = adults - seat
              count = count + 1
              i = i + 1
            }

            rest.tables[i] = rest.tables[i] === 'available'
              ? rest.tables[i] = {
                bookingID,
                type,
                name,
                email,
                phonenumber,
                adults,
                date,
              } : 'Table Is not available'

            const response = {
              bookingID,
              restaurant: rest.restaurant,
              name,
              adults: total,
              tables: count + 1,
              date: helper.getDate('display'),
            }
            return response
          }
        }
      } else {
        // let pop = this.restaurant.filter((v) => v.restaurant === restaurant)[0].date.filter((v) => v !== date)
        // this.restaurant.filter((v) => v.restaurant === restaurant)[0].date = []
        // this.restaurant.filter((v) => v.restaurant === restaurant)[0].date = pop
        // this.restaurant.filter((v) => v.restaurant === restaurant)[0].unavailableDate.push(date)
        return 'Table is not enough for customers.'
      }
    } else {
      return 'Not found Restaurant.'
    }
  }

  cancelReserve(restaurant, bookId) {
    const [rest] = this.restaurant.filter((v) => v.restaurant === restaurant)
    if (!rest) return 'Not found Restaurant'
    for (let i = 0; i < rest.tables.length; i++) {
      if (rest.tables[i].bookingID === bookId) {
        rest.tables[i] = 'available'
      }
    }
    return 'Already cancel booking'
  }
}

module.exports = Reservation