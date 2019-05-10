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
    mobile: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    nickname: {
      type: String,
    }
  }
  const UserSchema = new Schema(schemaFields, schemaConfig);
  return mongoose.model('User', UserSchema);
};