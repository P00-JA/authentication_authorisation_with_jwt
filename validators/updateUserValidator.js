const { body, validationResult, param } = require("express-validator");
// Validation middleware function
const updateUserValidator = [
  param("id").not().isEmpty().isInt(),
  body("firstName").isString().isLength({ min: 3 }).optional(),
  body("lastName").isString().isLength({ min: 2 }).optional(),
  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = updateUserValidator;
