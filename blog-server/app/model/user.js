'use strict';
const moment = require('moment')

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const schemaConfig = {
    minimize: false,
    versionKey: false,
    timestamps: {
      createdAt: 'createdTime',
      updatedAt: 'updatedTime'
    },
    toObject: {
      transform(doc, ret, options) {
        delete ret.password;
        ret.createdTime = moment(ret.createdTime).format('YYYY-MM-DD hh:mm:ss')
        ret.updatedTime = moment(ret.updatedTime).format('YYYY-MM-DD hh:mm:ss')
      }
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