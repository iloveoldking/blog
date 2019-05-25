'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const schemaConfig = {
    versionKey: false,
    timestamps: false
  }

  const schemaFields = {
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    article: {
      type: Schema.ObjectId,
      ref: 'Article'
    },
    likeFlag: {
      type: Boolean
    }
  }

  const LikeSchema = new Schema(schemaFields, schemaConfig);
  return mongoose.model('Like', LikeSchema);
};