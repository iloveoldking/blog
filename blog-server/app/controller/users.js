'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    const {
      mobile,
      password,
      nickname,
      photo
    } = ctx.request.body;
    const res = await ctx.service.user.create(mobile, password, nickname, photo)
    ctx.body = res;
  }

  async delete() {
    const {
      ctx,
    } = this;
    const {
      userIds
    } = ctx.request.body;
    const res = await ctx.service.user.delete(userIds);
    ctx.body = res;
  }

  async update() {
    const {
      ctx,
    } = this;
    const {
      userId,
      password
    } = ctx.request.body;
    const res = await ctx.service.user.update(userId, password);
    ctx.body = res;
  }

  async findAll() {
    const {
      ctx,
    } = this;
    const {
      pageNum,
      pageSize,
      mobile,
      nickname
    } = ctx.request.body;
    const res = await ctx.service.user.findAll(pageNum, pageSize, mobile, nickname);
    ctx.body = res;
  }

  async findById() {
    const {
      ctx,
    } = this;
    const {
      id
    } = ctx.request.body;
    const res = await ctx.service.user.findById(id);
    ctx.body = res;
  }

  async login() {
    const {
      ctx,
    } = this;
    const {
      account,
      password
    } = ctx.request.body;
    const res = await ctx.service.user.login(account, password);
    ctx.body = res;
  }
}

module.exports = UsersController;