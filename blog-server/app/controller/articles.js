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
      title,
      userId
    } = ctx.request.body;
    const res = await ctx.service.article.findAll(pageNum, pageSize, title, userId);
    ctx.body = res;
  }

  async findById() {
    const {
      ctx,
    } = this;
    const {
      id,
      userId
    } = ctx.request.body;
    const res = await ctx.service.article.findById(id, userId);
    ctx.body = res;
  }

  async collect() {
    const {
      ctx,
    } = this;
    const {
      userId,
      articleId,
      collectFlag
    } = ctx.request.body;
    const res = await ctx.service.article.collect(userId, articleId, collectFlag);
    ctx.body = res;
  }

  async like() {
    const {
      ctx,
    } = this;
    const {
      userId,
      articleId,
      likeFlag
    } = ctx.request.body;
    const res = await ctx.service.article.like(userId, articleId, likeFlag);
    ctx.body = res;
  }

  async comment() {
    const {
      ctx,
    } = this;
    const {
      userId,
      articleId,
      commentId,
      content
    } = ctx.request.body;
    const res = await ctx.service.article.comment(userId, articleId, commentId, content);
    ctx.body = res;
  }
}

module.exports = ArticleController;