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
        delete ret.password;
        ret.createdAt = moment(ret.createdAt).format('YYYY-MM-DD HH:mm:ss')
        ret.updatedAt = moment(ret.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }

  const schemaFields = {
    mobile: {
      type: String
    },
    password: {
      type: String
    },
    nickname: {
      type: String
    },
    photo: {
      type: String
    }
  }
  const UserSchema = new Schema(schemaFields, schemaConfig);
  return mongoose.model('User', UserSchema);
};