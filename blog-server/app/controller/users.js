'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    const {
      account,
      nickName,
      mobile,
    } = ctx.request.body;
    const res = await ctx.service.user.create({
      account,
      nickName,
      mobile,
    })
    ctx.body = res;
  }
  async find() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.user.find();
  }
}

module.exports = UsersController;