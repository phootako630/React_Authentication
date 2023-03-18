"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGoogleOAuthUrl = void 0;

var _OAuthClient = require("./OAuthClient");

var getGoogleOAuthUrl = function getGoogleOAuthUrl() {
  var scopes = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'];
  return _OAuthClient.OAuthClient.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes
  });
};

exports.getGoogleOAuthUrl = getGoogleOAuthUrl;