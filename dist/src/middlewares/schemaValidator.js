export function schemaValidator(schema) {
    return function (req, res, next) {
        var error = schema.validate(req.body).error;
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        next();
    };
}
