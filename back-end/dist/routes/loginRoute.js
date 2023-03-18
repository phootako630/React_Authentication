"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginRoute = void 0;

var _db = require("../db");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _amazonCognitoIdentityJs = require("amazon-cognito-identity-js");

var _awsUserPool = require("../util/awsUserPool");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var loginRoute = {
  path: '/api/login',
  method: 'post',
  handler: function () {
    var _handler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var _req$body, email, password;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              new _amazonCognitoIdentityJs.CognitoUser({
                Username: email,
                Pool: _awsUserPool.awsUserPool
              }).authenticateUser(new _amazonCognitoIdentityJs.AuthenticationDetails({
                Username: email,
                Password: password
              }), {
                onSuccess: function () {
                  var _onSuccess = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(result) {
                    var db, user, id, isVerified, info;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            db = (0, _db.getDbConnection)('react-auth-db');
                            _context.next = 3;
                            return db.collection('users').findOne({
                              email: email
                            });

                          case 3:
                            user = _context.sent;
                            id = user._id, isVerified = user.isVerified, info = user.info;

                            _jsonwebtoken["default"].sign({
                              id: id,
                              isVerified: isVerified,
                              email: email,
                              info: info
                            }, process.env.JWT_SECRET, {
                              expiresIn: '2d'
                            }, function (err, token) {
                              if (err) {
                                res.status(500).json(err);
                              }

                              res.status(200).json({
                                token: token
                              });
                            });

                          case 6:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  function onSuccess(_x3) {
                    return _onSuccess.apply(this, arguments);
                  }

                  return onSuccess;
                }(),
                onFailure: function onFailure(err) {
                  res.status(401).json(err);
                }
              });

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }

    return handler;
  }()
};
exports.loginRoute = loginRoute;