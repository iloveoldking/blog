'use strict';

const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const md5 = require('md5');

module.exports = async function (_this) {
  const {
    ctx
  } = _this;
  const stream = await ctx.getFileStream();
  const filename = md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase();
  const target = path.join(_this.config.baseDir, 'app/public/uploads', filename);
  const writeStream = fs.createWriteStream(target);
  try {
    await awaitWriteStream(stream.pipe(writeStream));
    return {
      ...stream.fields,
      path: `/public/uploads/${filename}`
    }
  } catch (err) {
    await sendToWormhole(stream);
    return 'upload error'
  }
}