const Service = require('egg').Service;

class UserService extends Service {
  async find() {
    const {
      ctx,
    } = this;
    const user = await ctx.model.User.find({}, 'account')
    return user;
  }

  async create(params) {
    const {
      ctx,
    } = this;
    const user = await ctx.model.User.create(params)
    return user;
  }
}

module.exports = UserService;