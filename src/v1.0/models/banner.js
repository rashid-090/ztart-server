module.exports = (mongoose, collectionName) => {
    const schema = mongoose.Schema(
      {
        status: {
          type: Boolean,
          required: true,
          default: true,
        },
        imageURL: {
          type: String,
          required: true, // Optional field
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // Assuming 'User' is the name of the user model
          required: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
      {
        timestamps: true, // Adds `createdAt` and `updatedAt` timestamps
      }
    );
  
    return  mongoose.model('Banner', schema, collectionName);
  };
