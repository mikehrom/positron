import Joi from 'api/lib/joi.coffee'
const { API_MAX, API_PAGE_SIZE } = process.env

const unitSchema = Joi.object().keys({
  assets: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().allow(''),
      slug: Joi.string()
    })
  ),
  body: Joi.string(),
  disclaimer: Joi.string(),
  headline: Joi.string(),
  layout: Joi.string(),
  link: Joi.object().keys({
    text: Joi.string(),
    url: Joi.string()
  }),
  logo: Joi.string(),
  name: Joi.string()
})

const schema = Joi.object().keys({
  canvas: unitSchema,
  end_date: Joi.date(),
  panel: unitSchema,
  name: Joi.string(),
  sov: Joi.number(),
  start_date: Joi.date()
})

const querySchema = {
  layout: Joi.string(),
  limit: Joi.number().max(Number(API_MAX)).default(Number(API_PAGE_SIZE)),
  name: Joi.string(),
  q: Joi.string().allow('')
}

export default { schema, querySchema }
