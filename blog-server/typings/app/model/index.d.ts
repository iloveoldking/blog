// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle = require('../../../app/model/article');
import ExportComment = require('../../../app/model/comment');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Article: ReturnType<typeof ExportArticle>;
    Comment: ReturnType<typeof ExportComment>;
    User: ReturnType<typeof ExportUser>;
  }
}
