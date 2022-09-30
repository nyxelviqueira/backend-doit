const getRepliesQuery = require("../../db/repliesQueries/getRepliesQuery");

const getReplies = async (req, res, next) => {

    try {

        const { idService } = req.params;

        const replies = await getRepliesQuery(idService);

        res.send({
            status: 'ok',
            data: {
                replies
            },
        });

    } catch (err) {
        next(err);
    }
};

module.exports = getReplies;