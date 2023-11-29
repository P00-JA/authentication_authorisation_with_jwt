const { body, validationResult } = require("express-validator");
// Validation middleware function
const validateUserLogin = [
  body("email").isEmail(),
  body("password")
    .isLength({ min: 5, max: 8 })
    .withMessage("Must be 5-8 characters long")
    .matches(/\d/)
    .withMessage("Must contain a number"),
  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
module.exports = validateUserLogin;
