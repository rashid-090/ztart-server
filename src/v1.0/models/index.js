const mongoose = require("mongoose");
const collectionNames = require("../../config/collectionNames");

module.exports = {
    Migration: require("./migration")(mongoose, collectionNames?.MIGRATION),
    RoleMaster: require("./roleMaster")(mongoose, collectionNames?.ROLE_MASTER),
    User: require("./user")(mongoose, collectionNames?.USER),
    UserRole: require("./userRole")(mongoose, collectionNames?.USER_ROLE),
    UserDevice: require("./userDevice")(mongoose, collectionNames?.USER_DEVICE),
    Comment: require("./comment")(mongoose, collectionNames?.COMMENT),
    Product: require("./product")(mongoose, collectionNames?.PRODUCT),
    Cart: require("./cart")(mongoose, collectionNames?.CART),
    WishList: require("./wishlist")(mongoose, collectionNames?.WISHLIST),
    Testimonial: require("./testimonial")(mongoose, collectionNames?.TESTIMONIAL),
    FAQ: require("./FAQ")(mongoose, collectionNames?.FAQ),
    Banner: require("./banner")(mongoose, collectionNames?.FAQ)
};
