const messages = require("../../config/messages");
const {
  getAllComment,
  getCommentById,
  deleteCommentById,
  createComment,
  updateComment,
} = require("../services/internal/comment");
const { makeQueryBuilder } = require("../services/internal/queryBuilder");

const listComments = async (req) => {
  // const condition = { userId: req?.user?._id };
  const queryBuilder = makeQueryBuilder(req);
  const comments = await getAllComment(queryBuilder, condition);
  return {
    message: messages?.success,
    data: comments,
  };
};

const viewComment = async (req) => {
  const comment = await getCommentById(req?.params.id);
  return {
    message: messages?.success,
    data: comment,
  };
};

const deleteComment = async (req) => {
  await deleteCommentById(req?.params.id);
  return {
    message: messages?.success,
  };
};

const addComment = async (req) => {
    const data = req?.body;
    data.userId = req?.user?._id;
    const comment = await createComment(data);
    return {
        message: messages?.success,
        data: comment,
    };
};

const updateComments=async(req)=>{
    const data=req?.body
    await updateComment(req?.params?._id,data)
    return{
        message:messages?.success
    }
}


module.exports = {
  listComments,
  viewComment,
  deleteComment,
  addComment,
  updateComments
};
