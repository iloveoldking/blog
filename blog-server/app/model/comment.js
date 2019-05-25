'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const schemaConfig = {
    versionKey: false,
    timestamps: true
  }

  const schemaFields = {
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    articleId: {
      type: Schema.ObjectId,
      ref: 'Article'
    },
    content: {
      type: String,
    }
  }


  const CommentSchema = new Schema(schemaFields, schemaConfig);
  return mongoose.model('Comment', CommentSchema);
};