const Service = require('egg').Service;
const {
  successResponse,
  paramsAbsenceError,
  dataAbsenceError,
  operateError,
  batchOperateError,
  paramsValueError,
  dataConfictError,
  loginError
} = require('../utils/createResponse');
const {
  isEmptyArray,
  isCorrectMobile,
  isCorrectPassword
} = require('../utils/tools');

class UserService extends Service {

  /**
   * @description 新增用户
   * @param {*} mobile 手机号 唯一
   * @param {*} password 密码 6-20位数字字母
   * @param {*} nickname 昵称 唯一
   */
  async create(mobile, password, nickname) {
    const {
      ctx,
    } = this;
    if (!mobile) return paramsAbsenceError('mobile');
    if (!password) return paramsAbsenceError('password');
    if (!nickname) return paramsAbsenceError('nickname');
    // 检测手机号、密码、昵称是否符合格式
    if (!isCorrectMobile(mobile)) return paramsValueError('mobile');
    if (!isCorrectPassword(password)) return paramsValueError('password');
    if (!/^[\u4e00-\u9fa5a-zA-Z0-9]{2,10}$/.test(nickname)) return paramsValueError('nickname');
    // 检测手机号和昵称是否唯一
    const mobileExist = await ctx.model.User.findOne({
      mobile
    })
    if (mobileExist) return dataConfictError('手机号已被注册')
    const nicknameExist = await ctx.model.User.findOne({
      nickname
    })
    if (nicknameExist) return dataConfictError('用户名已被注册')

    const user = await ctx.model.User.create({
      mobile,
      password,
      nickname
    });
    return successResponse({
      data: user
    });
  }

  /**
   * @description 批量删除用户
   * @param {Array} userIds 用户id数组
   */
  async delete(userIds) {
    const {
      ctx,
    } = this;
    if (isEmptyArray(userIds)) return paramsAbsenceError('userIds')
    try {
      const {
        deletedCount
      } = await ctx.model.User.deleteMany({
        _id: {
          $in: userIds
        }
      });
      const allLength = userIds.length;
      if (allLength === deletedCount) {
        return successResponse({
          msg: 'success'
        })
      } else {
        return batchOperateError({
          success: deletedCount,
          fail: userIds.length - deletedCount
        })
      }
    } catch (error) {
      return paramsValueError('userIds')
    }
  }

  /**
   * @description 修改用户
   * @param {Array} userId 用户id
   */
  async update(userId, password) {
    const {
      ctx,
    } = this;
    if (!userId) return paramsAbsenceError('userId')
    if (!password) return paramsAbsenceError('password')
    if (!isCorrectPassword(password)) return paramsValueError('password');
    try {
      const res = await ctx.model.User.update({
        _id: userId
      }, {
        password
      })
      if (res.ok === 1 && res.n === 1) {
        return successResponse({
          data: res
        });
      } else {
        return operateError('修改失败');
      }
    } catch (error) {
      return paramsValueError('userIds')
    }
  }

  /**
   * @description 按条件分页查询用户列表
   * @param {Number} pageNum 页码
   * @param {Number} pageSize 每页数量
   * @param {String} mobile 手机号
   * @param {String} nickname 昵称
   */
  async findAll(pageNum = 1, pageSize = 0, mobile = '', nickname = '') {
    const {
      ctx,
    } = this;
    pageNum = parseInt(pageNum);
    pageSize = parseInt(pageSize);
    const query = {
      mobile: new RegExp(`${mobile}`, "i"),
      nickname: new RegExp(`${nickname}`, "i")
    };
    const users = await ctx.model.User.find(query, null, {
      skip: (pageNum - 1) * pageSize,
      limit: pageSize
    })
    const total = await ctx.model.User.count(query);
    return successResponse({
      data: {
        list: users,
        pageNum,
        pageSize,
        total
      }
    })
  }

  /**
   * @description 按用户id查询用户
   * @param {String} id 用户id
   */
  async findById(id) {
    const {
      ctx,
    } = this;
    if (!id) return paramsAbsenceError('id')
    try {
      const user = await ctx.model.User.findById(id);
      if (user) {
        return successResponse({
          data: user
        })
      } else {
        return dataAbsenceError();
      }
    } catch (error) {
      return paramsValueError('id')
    }
  }

  /**
   * @description 用户登录
   * @param {String} account 帐号
   * @param {String} password 密码
   */
  async login(account, password) {
    const {
      ctx,
    } = this;
    if (!account) return paramsAbsenceError('account')
    if (!password) return paramsAbsenceError('password')
    const user = await ctx.model.User.findOne({
      mobile: account,
      password
    },'mobile nickname createdTime updatedTime');
    if (user) {
      return successResponse({
        data: user
      })
    } else {
      return loginError();
    }
  }
}

module.exports = UserService;