const validateBody = (schema) => {
    return (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            const e = new Error('Missing fields');
            e.status = 400;
            return next(e);
        }

        const { error } = schema.validate(req.body);
        if (error) {
            const e = new Error(error.message);
            e.status = 400;
            return next(e);
        }
        return next();
    }
}

module.exports = {
    validateBody
}