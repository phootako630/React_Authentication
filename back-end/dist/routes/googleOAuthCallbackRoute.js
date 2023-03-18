"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googleOAuthCallbackRoute = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _getGoogleUser = require("../util/getGoogleUser");

var _updateOrCreateUserFromOAuth = require("../util/updateOrCreateUserFromOAuth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var googleOAuthCallbackRoute = {
  path: '/auth/google/callback',
  method: 'get',
  handler: function () {
    var _handler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var code, oauthUserInfo, updatedUser, id, email, isVerified, info;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              code = req.query.code;
              _context.next = 3;
              return (0, _getGoogleUser.getGoogleUser)({
                code: code
              });

            case 3:
              oauthUserInfo = _context.sent;
              _context.next = 6;
              return (0, _updateOrCreateUserFromOAuth.updateOrCreateUserFromOAuth)({
                oauthUserInfo: oauthUserInfo
              });

            case 6:
              updatedUser = _context.sent;
              id = updatedUser._id, email = updatedUser.email, isVerified = updatedUser.isVerified, info = updatedUser.info;

              _jsonwebtoken["default"].sign({
                id: id,
                email: email,
                isVerified: isVerified,
                info: info
              }, process.env.JWT_SECRET, function (err, token) {
                if (err) return res.status(500).json({
                  err: err
                });
                res.redirect("http://localhost:3000/login?token=".concat(token, ")"));
              });

            case 9:
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
exports.googleOAuthCallbackRoute = googleOAuthCallbackRoute;