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
  async findAll(pageNum = 1, pageSize = 0, title = '', userId = null) {
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
    await Article.populate(articles, {
      path: 'user',
      select: 'nickname photo'
    })
    for (let i = 0; i < articles.length; i++) {
      let item = articles[i];
      const collectCount = await ctx.model.Collect.countDocuments({
        article: item._id,
        collectFlag: true
      });
      const likeCount = await ctx.model.Like.countDocuments({
        article: item._id,
        likeFlag: true
      });
      const commentCount = await ctx.model.Comment.countDocuments({
        articleId: item._id
      });
      item.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
      item.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      item.collectCount = collectCount
      item.likeCount = likeCount
      item.commentCount = commentCount
      if (userId) {
        const likeRes = await ctx.model.Like.findOne({
          article: item._id,
          user: userId
        });
        if (likeRes && likeRes.likeFlag === true) {
          item.like = true
        } else {
          item.like = false
        }
        const collectRes = await ctx.model.Collect.findOne({
          article: item._id,
          user: userId
        });
        if (collectRes && collectRes.collectFlag === true) {
          item.collect = true
        } else {
          item.collect = false
        }
      }
    }
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
  async findById(id, userId = null) {
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
      // TODO 查询一片文章是否被当前用户收藏或者点赞，这里可以抽取出来做一个公用方法
      if (article) {
        let resData = article.toObject()
        const collectCount = await ctx.model.Collect.countDocuments({
          article: id,
          collectFlag: true
        });
        const likeCount = await ctx.model.Like.countDocuments({
          article: id,
          likeFlag: true
        });
        resData.collectCount = collectCount;
        resData.likeCount = likeCount;
        if (userId) {
          const likeRes = await ctx.model.Like.findOne({
            article: id,
            user: userId
          });
          if (likeRes && likeRes.likeFlag === true) {
            resData.like = true
          } else {
            resData.like = false
          }
          const collectRes = await ctx.model.Collect.findOne({
            article: id,
            user: userId
          });
          if (collectRes && collectRes.collectFlag === true) {
            resData.collect = true
          } else {
            resData.collect = false
          }
        }
        let commentArray = await ctx.model.Comment.find({
          articleId: id
        }, null, {
          sort: 'createdAt',
          lean: true,
        })
        await ctx.model.Comment.populate(commentArray, {
          path: 'user',
          select: 'nickname photo'
        })
        commentArray.forEach(item => {
          item.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        })
        resData = {
          ...resData,
          commentArray
        }
        return successResponse({
          data: resData
        })
      } else {
        return dataAbsenceError();
      }
    } catch (error) {
      return paramsValueError('id')
    }
  }


  /**
   * @description 收藏文章
   * @param {String} userId 用户id
   * @param {String} articleId 文章id
   * @param {Boolean} collectFlag 是否收藏
   */
  async collect(userId, articleId, collectFlag) {
    const {
      ctx,
    } = this;
    if (!userId) return paramsAbsenceError('userId')
    if (!articleId) return paramsAbsenceError('articleId')
    if (collectFlag === undefined) return paramsAbsenceError('collectFlag')
    try {
      const user = await ctx.model.User.findById(userId);
      const article = await ctx.model.Article.findById(articleId);
      if (user && article) {
        if (collectFlag === true || collectFlag === false) {
          const collection = await ctx.model.Collect.findOne({
            user: userId,
            article: articleId
          });
          if (!collection) {
            await ctx.model.Collect.create({
              user: userId,
              article: articleId,
              collectFlag
            });
          } else {
            await ctx.model.Collect.update({
              user: userId,
              article: articleId
            }, {
              collectFlag
            });
          }
          return successResponse()
        }
      }
    } catch (error) {
      return paramsValueError('userId || articleId')
    }
  }

  /**
   * @description 点赞文章
   * @param {String} userId 用户id
   * @param {String} articleId 文章id
   * @param {Boolean} likeFlag 是否点赞
   */
  async like(userId, articleId, likeFlag) {
    const {
      ctx,
    } = this;
    if (!userId) return paramsAbsenceError('userId')
    if (!articleId) return paramsAbsenceError('articleId')
    if (likeFlag === undefined) return paramsAbsenceError('likeFlag')
    try {
      const user = await ctx.model.User.findById(userId);
      const article = await ctx.model.Article.findById(articleId);
      if (user && article) {
        if (likeFlag === true || likeFlag === false) {
          const like = await ctx.model.Like.findOne({
            user: userId,
            article: articleId
          });
          if (!like) {
            await ctx.model.Like.create({
              user: userId,
              article: articleId,
              likeFlag
            });
          } else {
            await ctx.model.Like.update({
              user: userId,
              article: articleId
            }, {
              likeFlag
            });
          }
          return successResponse()
        }
      }
    } catch (error) {
      return paramsValueError('userId || articleId')
    }
  }

  /**
   * @description 评论文章
   * @param {String} userId 用户id
   * @param {String} articleId 文章id
   * @param {Boolean} content 评论内容
   */
  async comment(userId, articleId, content) {
    const {
      ctx,
    } = this;
    if (!userId) return paramsAbsenceError('userId');
    if (!articleId) return paramsAbsenceError('articleId');
    if (!content) return paramsAbsenceError('content');
    try {
      await ctx.model.Comment.create({
        user: userId,
        articleId,
        content
      })
      return successResponse()
    } catch (error) {
      return paramsValueError('userId || articleId')
    }
  }
}

module.exports = ArticleService;