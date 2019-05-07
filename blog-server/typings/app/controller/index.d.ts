// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUsers = require('../../../app/controller/users');

declare module 'egg' {
  interface IController {
    users: ExportUsers;
  }
}
