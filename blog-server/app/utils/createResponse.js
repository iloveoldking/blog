module.exports = {
  // 正确返回
  successResponse(data) {
    return {
      status: 200,
      ...data
    }
  },
  // 缺少必填参数
  paramsAbsenceError(field) {
    return {
      status: 400001,
      msg: `缺少${field}字段`
    }
  },
  // 数据不存在
  dataAbsenceError() {
    return {
      status: 400002,
      msg: `数据库中未查询到相应数据`
    }
  },
  // 操作失败
  operateError(msg) {
    return {
      status: 400003,
      msg
    }
  },
  // 批量操作部分成功
  batchOperateError(data) {
    return {
      status: 400004,
      data
    }
  },
  // 参数有误
  paramsValueError(field) {
    return {
      status: 400005,
      msg: `参数${field}错误`
    }
  },
  // 数据唯一性
  dataConfictError(msg) {
    return {
      status: 400006,
      msg
    }
  },
  // 登录验证失败
  loginError() {
    return {
      status: 400007,
      msg: '帐号或密码错误'
    }
  },
}