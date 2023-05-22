const Joi = require('@hapi/joi')

const reserveSchema = Joi.object({
  restaurant: Joi.string().required(),
  type: Joi.string().required(),
  adults: Joi.number().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phonenumber: Joi.string().required(),
  date: Joi.string().required(),
})

const infoSchema = Joi.object({
  restaurant: Joi.string().required(),
})

const inittalizeSchema = Joi.object({
  restaurant: Joi.string().required(),
  tables: Joi.number().required(),
})

const cancelSchema = Joi.object({
  restaurant: Joi.string().required(),
  bookId: Joi.string().required(),
})

module.exports = {
  reserveSchema,
  infoSchema,
  inittalizeSchema,
  cancelSchema,
}
