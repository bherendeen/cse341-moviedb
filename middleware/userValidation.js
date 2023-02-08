const validator = require('../helper/validate');

exports.createUserValidate = async (req, res, next) => {
    const validationRule = {
        "firstName": ["required", "regex:/^[A-Za-z]+$/"],
        "lastName": ["required", "regex:/^[A-Za-z]+$/"],
        "username": ["required", "regex:/^[A-Za-z]+$/"],
        "email": "required|string|email",
        "password": ["required", "regex:/^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\\D*\\d)(?=[^!@#$%^&*]*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,32}$/"],
        "profileImg": "required|string",
        "isAdmin": "required|boolean"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}