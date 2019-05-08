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
    account: {
      type: String,
      unique: true
    },
    nickName: {
      type: String,
    },
    mobile: {
      type: String,
    }
  }

  const UserSchema = new Schema(schemaFields, schemaConfig);
  UserSchema.set('toObject', { virtuals: true })
  return mongoose.model('User', UserSchema);
};