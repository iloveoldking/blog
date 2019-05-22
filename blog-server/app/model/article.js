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
        ret.createdAt = moment(ret.createdAt).format('YYYY-MM-DD hh:mm:ss')
        ret.updatedAt = moment(ret.updatedAt).format('YYYY-MM-DD hh:mm:ss')
      }
    }
  }

  const schemaFields = {
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    collectCount: {
      type: Number,
      default: 0
    },
    likeCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
    }
  }

  const ArticleSchema = new Schema(schemaFields, schemaConfig);
  return mongoose.model('Article', ArticleSchema);
};