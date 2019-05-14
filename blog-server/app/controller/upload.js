'use strict';
const Controller = require('egg').Controller;
const upload = require('../utils/upload');
class UploadController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    const uploadRes = await upload(this);
    ctx.body = {
      ...uploadRes
    };
  }
}

module.exports = UploadController;