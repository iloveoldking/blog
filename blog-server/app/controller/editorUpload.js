'use strict';
const Controller = require('egg').Controller;
const upload = require('../utils/upload');
class EditorUploadController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    const uploadRes = await upload(this);
    ctx.body = {
      url: `http://47.107.55.244:7001${uploadRes.path}`,
      uploaded: true
    };
  }
}

module.exports = EditorUploadController;