'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const schemaConfig = {
    minimize: false,
    versionKey: false,
    timestamps: {
      createdAt: 'createdTime'
    }
  }

  const schemaFields = {
    userId: {
      type: String,
      unique: true
    },
    articleId: {
      type: String,
    },
    commentId: {
      type: String,
    },
    content: {
      type: String,
    }
  }


  const CommentSchema = new Schema(schemaFields, schemaConfig);
  CommentSchema.set('toObject', {
    virtuals: true
  })
  return mongoose.model('Comment', CommentSchema);
};