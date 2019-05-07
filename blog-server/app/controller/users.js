'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {
  async index() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.model.User.create({
      userName: 'admin',
      password: '123',
    });
  }
}

module.exports = UsersController;
