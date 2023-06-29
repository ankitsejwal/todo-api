const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

module.exports = function (paramsSchema) {
  return function (req, res, next) {
    const schema = Joi.object(paramsSchema);
    const { value, error } = schema.validate(req.params);
    if (error) return res.status(400).send(error.details[0].message);
    req.params = value;
    next();
  };
};
