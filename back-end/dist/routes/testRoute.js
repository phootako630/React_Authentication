"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testRoute = void 0;
var testRoute = {
  path: '/api/test',
  method: 'get',
  handler: function handler(req, res) {
    res.status(200).send('It works!');
  }
};
exports.testRoute = testRoute;