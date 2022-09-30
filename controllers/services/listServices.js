const selectAllServicesQuery = require("../../db/serviceQueries/selectAllServicesQuery");

const listServices = async (req, res, next) => {

    try {

        const { keyword } = req.query
         
        const services = await selectAllServicesQuery(keyword);

        res.send({
            status: 'ok',
            data: {
                services,
            },
        });
    } catch (err) {
        next(err);
    }
}
module.exports = listServices;