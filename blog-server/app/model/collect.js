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
    collectFlag: {
      type: Boolean
    }
  }

  const CollectSchema = new Schema(schemaFields, schemaConfig);
  return mongoose.model('Collect', CollectSchema);
};