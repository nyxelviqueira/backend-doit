const insertReplyQuery = require('../../db/serviceQueries/insertReplyQuery');
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



        console.log("finalfile", finalFile);
        console.log(observations);


        const reply = await insertReplyQuery(req.user.id, idService, finalFile, observations);


        res.send({
            status: 'ok',
            reply: {
                idUser: req.user.id, idService, finalFile, observations
            }
        })



    } catch (err) {
        next(err);
    }
}

module.exports = replyService; 