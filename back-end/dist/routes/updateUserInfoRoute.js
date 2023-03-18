"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserInfoRoute = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = require("../db");

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var updateUserInfoRoute = {
  path: '/api/user/:userId',
  method: 'put',
  handler: function () {
    var _handler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var authorization, userId, updates, token;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              authorization = req.headers.authorization;
              userId = req.params.userId;

              updates = function (_ref) {
                var favoriteFood = _ref.favoriteFood,
                    hairColor = _ref.hairColor,
                    bio = _ref.bio;
                return {
                  favoriteFood: favoriteFood,
                  hairColor: hairColor,
                  bio: bio
                };
              }(req.body);

              if (authorization) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.status(401).json({
                message: 'No authorization header sent'
              }));

            case 5:
              token = authorization.split(' ')[1];

              _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, decoded) {
                  var id, isVerified, db, result, _result$value, email, info;

                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!err) {
                            _context.next = 2;
                            break;
                          }

                          return _context.abrupt("return", res.status(401).json({
                            message: 'Invalid token'
                          }));

                        case 2:
                          id = decoded.id, isVerified = decoded.isVerified;

                          if (!(id !== userId)) {
                            _context.next = 5;
                            break;
                          }

                          return _context.abrupt("return", res.status(403).json({
                            message: 'Unauthorized to update this user'
                          }));

                        case 5:
                          if (isVerified) {
                            _context.next = 7;
                            break;
                          }

                          return _context.abrupt("return", res.status(403).json({
                            message: 'User is not verified'
                          }));

                        case 7:
                          db = (0, _db.getDbConnection)('react-auth-db');
                          _context.next = 10;
                          return db.collection('users').findOneAndUpdate({
                            _id: (0, _mongodb.ObjectID)(id)
                          }, {
                            $set: {
                              info: updates
                            }
                          }, {
                            returnOriginal: false
                          });

                        case 10:
                          result = _context.sent;
                          _result$value = result.value, email = _result$value.email, info = _result$value.info;

                          _jsonwebtoken["default"].sign({
                            id: id,
                            email: email,
                            info: info,
                            isVerified: isVerified
                          }, process.env.JWT_SECRET, {
                            expiresIn: '2d'
                          }, function (err, token) {
                            if (err) {
                              return res.status(500).json(err);
                            }

                            return res.status(200).json({
                              token: token
                            });
                          });

                        case 13:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x3, _x4) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 7:
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
exports.updateUserInfoRoute = updateUserInfoRoute;