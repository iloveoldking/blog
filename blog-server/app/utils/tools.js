module.exports = {
  isEmptyArray(target) {
    if (Object.prototype.toString.apply(target) === '[object Array]' && target.length > 0) {
      return false;
    } else {
      return true;
    }
  },
  isCorrectMobile(mobile) {
    if (!mobile) return false;
    return /^1\d{10}$/.test(mobile);
  },
  isCorrectPassword(password) {
    if (!password) return false;
    return /^[a-zA-Z0-9]{6,20}$/.test(password);
  }
}