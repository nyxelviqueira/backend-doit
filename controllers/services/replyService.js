const insertReplyQuery = require('../../db/serviceQueries/insertReplyQuery');
const selectUserByIdQuery = require('../../db/userQueries/selectUserByIdQuery');
const { generateError, saveFile } = require('../../helpers');

const replyService = async (req, res, next) => {
    try {
        const { idService } = req.params;
        let { observations } = req.body;
        if (!observations) {
            throw generateError('You must write any observation', 400);
        }

        let finalFile;

        if (req.files?.finalFile) {
            finalFile = await saveFile(req.files.finalFile);
        }

        console.log('finalfile', finalFile);
        console.log(observations);

        const replyId = await insertReplyQuery(
            req.user.id,
            idService,
            finalFile,
            observations
        );

        const user = await selectUserByIdQuery(req.user.id);

        res.send({
            status: 'ok',
            reply: {
                id: replyId,
                username: user.username,
                createdAt: new Date(),
                idUser: req.user.id,
                idService,
                finalFile,
                observations,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = replyService;
