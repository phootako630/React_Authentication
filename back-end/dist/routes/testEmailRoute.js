"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testEmailRoute = void 0;

var _sendEmail = require("../util/sendEmail");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: function () {
    var _handler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _sendEmail.sendEmail)({
                to: 'ivanzhang220820+test1@gmail.com',
                from: 'ivanzhang220820@gmail.com',
                subject: 'Capital one interview invitation',
                text: 'Hello Yifan, you have been invited to a Capital One interview. Please check your email for more details.'
              });

            case 3:
              res.status(200).json({
                message: 'Email sent'
              });
              _context.next = 9;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              res.status(500).json({
                message: 'Error sending email'
              });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 6]]);
    }));

    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }

    return handler;
  }()
};
exports.testEmailRoute = testEmailRoute;