// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle = require('../../../app/service/article');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    article: ExportArticle;
    user: ExportUser;
  }
}
