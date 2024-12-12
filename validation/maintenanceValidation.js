import Joi from 'joi';

const maintenanceValidationSchema = Joi.object({
  car_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Car ID should be a number.',
    'number.integer': 'Car ID should be an integer.',
    'number.positive': 'Car ID should be a positive number.',
    'any.required': 'Car ID is required.'
  }),

  date: Joi.date().required().messages({
    'date.base': 'Date should be a valid date format.',
    'any.required': 'Date is required.'
  }),

  chassis_no: Joi.string().optional().messages({
    'string.base': 'Chassis number should be a string.'
  }),

  engine: Joi.string().optional().messages({
    'string.base': 'Engine should be a string.'
  }),

  reg_no: Joi.string().optional().messages({
    'string.base': 'Registration number should be a string.'
  }),

  cell: Joi.string().optional().messages({
    'string.base': 'Cell should be a string.'
  }),

  type: Joi.string().optional().messages({
    'string.base': 'Type should be a string.'
  }),

  labour: Joi.array().items(
    Joi.object({
      description: Joi.string().required(),
      cost: Joi.number().precision(2).required().messages({
        'number.base': 'Labour cost should be a number.',
        'number.precision': 'Labour cost should have up to two decimal places.'
      })
    })
  ).optional().messages({
    'array.base': 'Labour should be an array of objects.'
  }),

  total_labour_cost: Joi.number().precision(2).required().messages({
    'number.base': 'Total labour cost should be a number.',
    'number.precision': 'Total labour cost should have up to two decimal places.',
    'any.required': 'Total labour cost is required.'
  }),

  total_parts_cost: Joi.number().precision(2).required().messages({
    'number.base': 'Total parts cost should be a number.',
    'number.precision': 'Total parts cost should have up to two decimal places.',
    'any.required': 'Total parts cost is required.'
  }),

  grand_total: Joi.number().precision(2).required().messages({
    'number.base': 'Grand total should be a number.',
    'number.precision': 'Grand total should have up to two decimal places.',
    'any.required': 'Grand total is required.'
  })
});

export default maintenanceValidationSchema;
