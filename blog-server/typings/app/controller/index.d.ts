// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticles = require('../../../app/controller/articles');
import ExportUsers = require('../../../app/controller/users');

declare module 'egg' {
  interface IController {
    articles: ExportArticles;
    users: ExportUsers;
  }
}
