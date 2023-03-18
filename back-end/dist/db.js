"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDbConnection = exports.initializeDbConnection = void 0;

var _mongodb = require("mongodb");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var client;

var initializeDbConnection = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var connectionString;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017';
            _context.next = 3;
            return _mongodb.MongoClient.connect(connectionString, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 3:
            client = _context.sent;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initializeDbConnection() {
    return _ref.apply(this, arguments);
  };
}();

exports.initializeDbConnection = initializeDbConnection;

var getDbConnection = function getDbConnection(dbName) {
  var db = client.db(dbName);
  return db;
};

exports.getDbConnection = getDbConnection;