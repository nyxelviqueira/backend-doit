/* - PUT [/users] - Editar el nombre de usuario, el email o el avatar. TOKEN */

const selectUserByIdQuery = require("../../db/userQueries/selectUserByIdQuery");
const updateUserQuery = require("../../db/userQueries/updateUserQuery");
const { generateError, deletePhoto, savePhoto } = require("../../helpers");
const userSchema = require("../../schema");


const editUser = async (req, res, next) => {
    try {

        let { biography } = req.body;


        if (!biography && !req.files?.avatar) {
            throw generateError('Faltan campos', 400);
        }

        const user = await selectUserByIdQuery(req.user.id);

        let avatar;

        if (req.files?.avatar) {

            if (user.avatar) {

                await deletePhoto(user.avatar);
            }

            avatar = await savePhoto(req.files.avatar);

            console.log(req.files);

        }


        biography = biography || user.biography;

        avatar = avatar || user.avatar;

        await updateUserQuery(biography, avatar, req.user.id);

        res.send({
            status: 'ok',
            message: 'Updated user!!!!!!'
        });

    } catch (err) {
        next(err)
    }
};

module.exports = editUser;