const _ = require('lodash');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);
const { todoJoiSchema } = require('../models/Todo');

module.exports = function (req, res, next) {
  const body = req.body;
  const id = req.params.id;
  const isBodyEmpty = _.isEmpty(body);

  let joiSchema = todoJoiSchema;
  if (isBodyEmpty && id) {
    body = { id: id };
    joiSchema = { id: Joi.objectid() };
  } else if (!isBodyEmpty && id) {
    body.id = id;
    joiSchema.id = Joi.objectid();
  }

  const schema = Joi.object(joiSchema);
  const { value, error } = schema.validate(body);

  if (error) return res.status(400).send(error.details[0].message);

  req.params.id = value.id;
  req.body = _.omit(value, [id]);
  next();
};
