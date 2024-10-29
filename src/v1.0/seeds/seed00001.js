const { ROLE_SUPERADMIN, ROLE_ADMIN,  ROLE_USER } = require("../../config/constants");

module.exports = [
    {
        name: ROLE_SUPERADMIN,
        label: "Super Administrator",
        description: "Super Administrator role",
    },
    {
        name: ROLE_ADMIN,
        label: "Administrator",
        description: "Administrator role",
    },
    {
        name: ROLE_USER,
        label: "User",
        description: "User role",
        allowSignup: true,
    },
];
