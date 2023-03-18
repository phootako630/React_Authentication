"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OAuthClient = void 0;

var _googleapis = require("googleapis");

var OAuthClient = new _googleapis.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'http://localhost:8080/auth/google/callback');
exports.OAuthClient = OAuthClient;