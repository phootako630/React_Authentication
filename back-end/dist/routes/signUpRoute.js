"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUpRoute = void 0;

var _db = require("../db");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _amazonCognitoIdentityJs = require("amazon-cognito-identity-js");

var _awsUserPool = require("../util/awsUserPool");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUpRoute = {
  path: '/api/signup',
  method: 'post',
  handler: function () {
    var _handler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var _req$body, email, password, attributes;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              attributes = [new _amazonCognitoIdentityJs.CognitoUserAttribute({
                Name: 'email',
                Value: email
              })];

              _awsUserPool.awsUserPool.signUp(email, password, attributes, null, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, awsResult) {
                  var db, startingInfo, result, insertedId;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!err) {
                            _context.next = 3;
                            break;
                          }

                          console.log(err);
                          return _context.abrupt("return", res.status(500).json({
                            err: err
                          }));

                        case 3:
                          db = (0, _db.getDbConnection)('react-auth-db');
                          startingInfo = {
                            hairColor: '',
                            favoriteFood: '',
                            bio: ''
                          };
                          _context.next = 7;
                          return db.collection('users').insertOne({
                            email: email,
                            info: startingInfo
                          });

                        case 7:
                          result = _context.sent;
                          insertedId = result.insertedId;

                          _jsonwebtoken["default"].sign({
                            id: insertedId,
                            isVerified: false,
                            email: email,
                            info: startingInfo
                          }, process.env.JWT_SECRET, {
                            expiresIn: '2d'
                          }, function (err, token) {
                            if (err) return res.status(500).json({
                              err: err
                            });
                            res.status(200).json({
                              token: token
                            });
                          });

                        case 10:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x3, _x4) {
                  return _ref.apply(this, arguments);
                };
              }());

            case 3:
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
exports.signUpRoute = signUpRoute;