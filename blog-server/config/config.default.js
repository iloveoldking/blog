/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555991542847_3006';

  // add your middleware config here
  config.middleware = [];

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/blog',
      options: {
        // autoIndex: false 
      },
    },
  };

  config.security= {
    csrf: {
      enable: false
    }
  }

  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
