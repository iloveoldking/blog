// TODO 文章支持付文本编辑，接口筛选出文本中的图片用作前台展示

const Service = require('egg').Service;
const moment = require('moment')
const {
  successResponse,
  paramsAbsenceError,
  dataAbsenceError,
  operateError,
  batchOperateError,
  paramsValueError
} = require('../utils/createResponse');
const {
  isEmptyArray
} = require('../utils/tools');

class ArticleService extends Service {

  /**
   * @description 新增文章
   * @param {String} userId 发表者
   * @param {String} title 文章标题
   * @param {String} content 文章内容
   */
  async create(userId, title, content) {
    const {
      ctx,
    } = this;
    if (!userId) return paramsAbsenceError('userId')
    if (!title) return paramsAbsenceError('title')
    if (!content) return paramsAbsenceError('content')
    const article = await ctx.model.Article.create({
      user: userId,
      title,
      content
    })
    return successResponse({
      data: article.toObject()
    })
  }

  /**
   * @description 批量删除文章
   * @param {Array} articleIds 文章id数组
   */
  async delete(articleIds) {
    const {
      ctx,
    } = this;
    if (isEmptyArray(articleIds)) return paramsAbsenceError('articleIds')
    try {
      const {
        ok,
        deletedCount
      } = await ctx.model.Article.deleteMany({
        _id: {
          $in: articleIds
        }
      });
      const allLength = articleIds.length;
      if (allLength === deletedCount) {
        return successResponse({
          msg: 'success'
        })
      } else {
        return batchOperateError({
          success: deletedCount,
          fail: articleIds.length - deletedCount
        })
      }
    } catch (error) {
      return paramsValueError('articleIds')
    }
  }

  /**
   * @description 按条件分页查询文章列表
   * @param {Number} pageNum 页码
   * @param {Number} pageSize 每页数量
   * @param {String} title 文章标题
   */
  async findAll(pageNum = 1, pageSize = 0, title = '') {
    const {
      ctx,
    } = this;
    const Article = ctx.model.Article;
    pageNum = parseInt(pageNum);
    pageSize = parseInt(pageSize);
    const query = {
      title: new RegExp(`${title}`, "i")
    };
    const articles = await Article.find(query, null, {
      skip: (pageNum - 1) * pageSize,
      limit: pageSize,
      sort: '-createdAt',
      lean: true,
    })
    // TODO 这里的关联查询偶尔不能生效，导致前台得不到用户信息
    // 已经在关键查询时增加await操作，目前测试问题已经解决
    await Article.populate(articles, {
      path: 'user',
      select: 'nickname photo'
    })
    articles.forEach(item => {
      item.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
      item.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    })
    const total = await Article.countDocuments(query);
    return successResponse({
      data: {
        list: articles,
        pageNum,
        pageSize,
        total
      }
    })
  }

  /**
   * @description 按文章id查询文章
   * @param {String} id 文章id
   */
  async findById(id) {
    const {
      ctx,
    } = this;
    if (!id) return paramsAbsenceError('id')
    try {
      const article = await ctx.model.Article.findById(id);
      await ctx.model.Article.populate(article, {
        path: 'user',
        select: 'nickname photo'
      })
      if (article) {
        return successResponse({
          data: article.toObject()
        })
      } else {
        return dataAbsenceError();
      }
    } catch (error) {
      return paramsValueError('id')
    }
  }
}

module.exports = ArticleService;