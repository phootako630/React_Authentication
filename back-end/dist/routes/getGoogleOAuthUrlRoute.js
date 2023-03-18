"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGoogleOAuthUrlRoute = void 0;

var _getGoogleOAuthUrl = require("../util/getGoogleOAuthUrl");

var getGoogleOAuthUrlRoute = {
  path: "/auth/google/url",
  method: "get",
  handler: function handler(req, res) {
    var url = (0, _getGoogleOAuthUrl.getGoogleOAuthUrl)();
    res.status(200).json({
      url: url
    });
  }
};
exports.getGoogleOAuthUrlRoute = getGoogleOAuthUrlRoute;