'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const schemaConfig = {
    minimize: false,
    versionKey: false,
    timestamps: {
      createdAt: 'createdTime',
      updatedAt: 'updatedTime'
    }
  }

  const schemaFields = {
    userId: {
      type: String
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    commentCount: {
      type: Number,
    }
  }

  const ArticleSchema = new Schema(schemaFields, schemaConfig);
  return mongoose.model('Article', ArticleSchema);
};