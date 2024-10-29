module.exports = (mongoose, collectionName) => {
    const schema = mongoose.Schema(
        {
            userId: {
                type: String,
                default: "",
            },
            productId: {
                type: String,
                default: "",
            },
            label:{
                type:String,
                default:""
            }
        },
        {
            timestamps: true,
        }
    );

    return mongoose.model("Comment", schema, collectionName);
};
