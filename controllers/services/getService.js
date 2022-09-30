const selectServiceByIdQuery = require("../../db/serviceQueries/selectServiceByIdQuery");

const getService = async (req, res, next) => {

    try {

        const { idService } = req.params;

        const service = await selectServiceByIdQuery(idService);

        res.send({
            status: 'ok',
            data: {
                service,
            },
        });
        
    } catch (err) {
        next(err);
    }
}

module.exports = getService;