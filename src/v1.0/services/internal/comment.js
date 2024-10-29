const mongoose = require("mongoose");
const { Comment } = require("../../models");

const createComment = async (data) => {
  const comment = await new Comment(data).save();
  return comment;
};

const deleteCommentById = async (commentId) => {
  const id = mongoose.Types.ObjectId(commentId);
  return await Comment.deleteOne({ _id: id });
};

const updateComment = async (commentId, data) => {
  const id = mongoose.Types.ObjectId(commentId);
  return await Comment.updateOne({ _id: id }, { $set: data });
};

const getCommentById=async(commentId)=>{
    const id = mongoose.Types.ObjectId(commentId); 
    return await Comment.findById(id)
}

const getAllComment = async (queryBuilder, condition) => {
    let [comments, total] = await Promise.all([
        Comment.find(queryBuilder.getFindQuery(condition))
            .select(queryBuilder.getSelectFields())
            .sort(queryBuilder.getSortQuery())
            .limit(queryBuilder.getPagination()?.limit)
            .skip(queryBuilder.getPagination()?.skip),
        Comment.countDocuments(queryBuilder.getFindQuery(condition)),
    ]);
    return { comments, total };
};

module.exports = {
  createComment,
  deleteCommentById,
  updateComment,
  getAllComment,
  getCommentById
};
