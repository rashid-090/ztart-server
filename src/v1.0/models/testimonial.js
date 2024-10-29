module.exports = (mongoose, collectionName) => {
  // Define the question and answer schema
  const QuestionSchema = new mongoose.Schema({
    question: {
      type: String,
      required: false,
    },
    answer: {
      type: String,
      required: false,
    },
  });

  // Main schema definition
  const schema = mongoose.Schema(
    {

      status: {
        type: Boolean,
        required: false,
        default: false,
      },
      description: {
        type: String,
        required: false,
      },
      title: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        required: false,
      },
      slug: {
        unique:true,
        type: String,
        required: false,
      },
      about: {
        type: String,
        required: false, // Optional field
      },
      imageURL: {
        type: String,
        required: false,
        default: '',
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming 'User' is the name of the user model
        required: false,
      },
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming 'User' is the name of the user model
        required: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      // New fields for questions and FAQs
      questions: {
        type: [QuestionSchema], // Array of questions
        required: false,
      },
      faqs: {
        type: [QuestionSchema], // Array of FAQs
        required: false,
      },
    },
    {
      timestamps: true, // Adds `createdAt` and `updatedAt` timestamps
    }
  );

  return mongoose.model('Testimonial', schema, collectionName);
};
