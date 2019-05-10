const Service = require('egg').Service;
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
      userId,
      title,
      content,
      commentCount: 0
    })
    return successResponse({
      data: article
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
    pageNum = parseInt(pageNum);
    pageSize = parseInt(pageSize);
    const query = {
      title: new RegExp(`${title}`, "i")
    };
    const articles = await ctx.model.Article.find(query, null, {
      skip: (pageNum - 1) * pageSize,
      limit: pageSize
    })
    const total = await ctx.model.Article.count(query);
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
      if (article) {
        return successResponse({
          data: article
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