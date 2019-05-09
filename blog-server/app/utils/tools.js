module.exports = {
  isEmptyArray(target) {
    if (Object.prototype.toString.apply(target) === '[object Array]' && target.length > 0) {
      return false;
    } else {
      return true;
    }
  }
}