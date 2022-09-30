
const insertServiceQuery = require("../../db/serviceQueries/insertServiceQuery");

const { generateError, saveFile } = require("../../helpers");

const newService = async (req, res, next) => {

    try {

        const { title, description, category } = req.body;

        if (!title || !description || !category) {
            throw generateError(`There are still fields to cover`, 400);
        }

        // Variable donde almacenaremos el nombre del archivo
        let file;

        if (req.files?.file) {

            file = await saveFile(req.files.file)

        }

        const service = await insertServiceQuery(req.user.id, title, description, file, category);

        res.send({
            status: 'ok',
            data: {
                service
            },
        });

    } catch (err) {
        next(err);
    }
}

module.exports = newService;