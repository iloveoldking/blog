'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    const {
      userId,
      title,
      content
    } = ctx.request.body;
    const res = await ctx.service.article.create(userId, title, content)
    ctx.body = res;
  }

  async delete() {
    const {
      ctx,
    } = this;
    const {
      articleIds
    } = ctx.request.body;
    const res = await ctx.service.article.delete(articleIds);
    ctx.body = res;
  }

  async findAll() {
    const {
      ctx,
    } = this;
    const {
      pageNum,
      pageSize,
      title
    } = ctx.request.body;
    const res = await ctx.service.article.findAll(pageNum, pageSize, title);
    ctx.body = res;
  }

  async findById() {
    const {
      ctx,
    } = this;
    const {
      id
    } = ctx.request.body;
    const res = await ctx.service.article.findById(id);
    ctx.body = res;
  }
}

module.exports = ArticleController;