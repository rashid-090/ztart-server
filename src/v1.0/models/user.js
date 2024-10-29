const {
    STATUS_ACTIVE,
    STATUS_INACTIVE,
    STATUS_SUSPENDED,
    NO,
    ROLE_SUPERADMIN,
    ROLE_ADMIN,
    ROLE_STAFF,
    ROLE_CLIENT,
} = require("../../config/constants");
const uniqueValidator = require("mongoose-unique-validator");
const messages = require("../../config/messages");

module.exports = (mongoose, collectionName) => {
    const schema = mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
                unique: true,
                sparse: true,
                uniqueCaseInsensitive: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
                sparse: true,
                uniqueCaseInsensitive: true,
            },
            phoneNumber: {
                type: String,
                unique: true,
                sparse: true,
                uniqueCaseInsensitive: true,
            },
            password: {
                type: String,
                default: "",
            },
            resetPasswordToken: {
                type: String,
                default: "",
            },
            status: {
                type: String,
                required: true,
                enum: [STATUS_ACTIVE, STATUS_INACTIVE, STATUS_SUSPENDED],
                default: STATUS_ACTIVE,
            },
            role:{
                type: String,
                default: "",
            },
            isArchived: {
                type: Boolean,
                default: NO,
            },
        },
        {
            timestamps: true,
        }
    );

    schema.plugin(uniqueValidator, { message: messages?.fieldIsUnique });

    return mongoose.model("User", schema, collectionName);
};
