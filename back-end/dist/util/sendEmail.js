"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = void 0;

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_mail["default"].setApiKey(process.env.SENDGRID_API_KEY);

var sendEmail = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var to, from, subject, text, html, msg;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            to = _ref.to, from = _ref.from, subject = _ref.subject, text = _ref.text, html = _ref.html;
            msg = {
              to: to,
              from: from,
              subject: subject,
              text: text,
              html: html
            };
            return _context.abrupt("return", _mail["default"].send(msg));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendEmail(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.sendEmail = sendEmail;