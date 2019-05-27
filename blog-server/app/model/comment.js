'use strict';
const moment = require('moment')

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const schemaConfig = {
    versionKey: false,
    timestamps: true,
    toObject: {
      transform(doc, ret, options) {
        ret.createdAt = moment(ret.createdAt).format('YYYY-MM-DD HH:mm:ss')
      }
    }
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
    commentId: {
      type: Schema.ObjectId,
      ref: 'Comment'
    },
    content: {
      type: String,
    }
  }

  const CommentSchema = new Schema(schemaFields, schemaConfig);
  return mongoose.model('Comment', CommentSchema);
};