"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = void 0;

var _amazonCognitoIdentityJs = require("amazon-cognito-identity-js");

var _awsUserPool = require("../util/awsUserPool");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var resetPassword = {
  path: "/api/users/:passwordResetCode/reset-password",
  method: "put",
  handler: function () {
    var _handler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var passwordResetCode, _req$body, email, newPassword;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              passwordResetCode = req.params.passwordResetCode;
              _req$body = req.body, email = _req$body.email, newPassword = _req$body.newPassword;
              new _amazonCognitoIdentityJs.CognitoUser({
                Username: email,
                Pool: _awsUserPool.awsUserPool
              }).confirmPassword(passwordResetCode, newPassword, {
                onSuccess: function onSuccess() {
                  res.sendStatus(200);
                },
                onFailure: function onFailure(err) {
                  res.status(401).send(err.message);
                }
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }

    return handler;
  }()
};
exports.resetPassword = resetPassword;