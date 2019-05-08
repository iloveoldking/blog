'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  static: {
    enable: true,
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
