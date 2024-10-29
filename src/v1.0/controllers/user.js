const { ROLE_USER } = require("../../config/constants");
const messages = require("../../config/messages");
const { makeQueryBuilder } = require("../services/internal/queryBuilder");
const {
    getUserById,
    getUsers,
} = require("../services/internal/user");

const getUser = async (req) => {
    const user = await getUserById(req?.params.id);
    return {
        message: messages?.success,
        data: user,
    };
};

const getUsersList = async (req) => {
    const queryBuilder = makeQueryBuilder(req);
    const condition ={role:ROLE_USER}
    const admins = await getUsers(queryBuilder,condition);
    return { message: messages?.success, data: admins };
};

module.exports = {

    getUser,
    getUsersList,
};
