"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyEmailRoute = void 0;

var _mongodb = require("mongodb");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _amazonCognitoIdentityJs = require("amazon-cognito-identity-js");

var _db = require("../db");

var _awsUserPool = require("../util/awsUserPool");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyEmailRoute = {
  path: '/api/verify-email',
  method: 'put',
  handler: function () {
    var _handler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var _req$body, email, verificationString;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body = req.body, email = _req$body.email, verificationString = _req$body.verificationString;
              new _amazonCognitoIdentityJs.CognitoUser({
                Username: email,
                Pool: _awsUserPool.awsUserPool
              }).confirmRegistration(verificationString, true, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err) {
                  var db, result, _result$value, id, info;

                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!err) {
                            _context.next = 2;
                            break;
                          }

                          return _context.abrupt("return", res.status(401).json({
                            message: 'The email verfication code is incorrect'
                          }));

                        case 2:
                          db = (0, _db.getDbConnection)('react-auth-db');
                          _context.next = 5;
                          return db.collection('users').findOneAndUpdate({
                            email: email
                          }, {
                            $set: {
                              isVerified: true
                            }
                          }, {
                            returnOriginal: false
                          });

                        case 5:
                          result = _context.sent;
                          _result$value = result.value, id = _result$value._id, info = _result$value.info;

                          _jsonwebtoken["default"].sign({
                            id: id,
                            email: email,
                            isVerified: true,
                            info: info
                          }, process.env.JWT_SECRET, {
                            expiresIn: '2d'
                          }, function (err, token) {
                            if (err) return res.sendStatus(500);
                            res.status(200).json({
                              token: token
                            });
                          });

                        case 8:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x3) {
                  return _ref.apply(this, arguments);
                };
              }());

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
exports.verifyEmailRoute = verifyEmailRoute;