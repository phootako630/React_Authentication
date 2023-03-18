"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGoogleUser = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _OAuthClient = require("./OAuthClient");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAccessAndBearerTokenUrl = function getAccessAndBearerTokenUrl(_ref) {
  var accessToken = _ref.accessToken;
  return "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=".concat(accessToken);
};

var getGoogleUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var code, _yield$OAuthClient$ge, tokens, response;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            code = _ref2.code;
            _context.next = 3;
            return _OAuthClient.OAuthClient.getToken(code);

          case 3:
            _yield$OAuthClient$ge = _context.sent;
            tokens = _yield$OAuthClient$ge.tokens;
            _context.next = 7;
            return _axios["default"].get(getAccessAndBearerTokenUrl({
              accessToken: tokens.access_token
            }), {
              headers: {
                Authorization: "Bearer ".concat(tokens.id_token)
              }
            });

          case 7:
            response = _context.sent;
            return _context.abrupt("return", response.data);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getGoogleUser(_x) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getGoogleUser = getGoogleUser;