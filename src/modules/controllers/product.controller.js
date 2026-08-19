const addProduct = (req, res, next) => {
    try {
        const body = req.body;

        console.log(body);
    } catch (err) {
        next(err);
    };
};

module.exports = {
    addProduct,
};