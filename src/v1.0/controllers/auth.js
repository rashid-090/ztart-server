const messages = require("../../config/messages");
const { ROLE_USER } = require("../../config/constants");

const {
    handleAuthenticate,
    handleForgotPassword,
    handleResetPassword,
    handleRefreshToken,
    handleLogout,
} = require("../services/internal/auth");
const { createUser } = require("../services/internal/user");

const login = async (req) => {
    // console.log(req?.body?.email);
    
    const { headers, data } = await handleAuthenticate(req?.body, req?.headers);
    return { message: messages?.loggedIn, headers, data };
};



const forgotPassword = async (req) => {
    await handleForgotPassword(req?.body);
    return { message: messages?.resetPasswordMailSent };
};

const resetPassword = async (req) => {
    await handleResetPassword(req?.body);
    return { message: messages?.passwordResetSuccess };
};

const refreshToken = async (req) => {
    const { headers, data } = await handleRefreshToken(req?.body, req?.headers);
    return { headers, data };
};

const logout = async (req) => {
    await handleLogout(req?.user, req?.headers);
    return { message: messages?.logoutSuccess };
};

const signUp = async (req) => {
    const data = req?.body;
    data.role = ROLE_USER;
    await createUser(data);
    return {
      message: messages?.signUpSuccess,
    };
  };

module.exports = {
    login,
    forgotPassword,
    resetPassword,
    refreshToken,
    logout,
    signUp
};
