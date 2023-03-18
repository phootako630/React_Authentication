"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _signUpRoute = require("./signUpRoute");

var _testRoute = require("./testRoute");

var _loginRoute = require("./loginRoute");

var _updateUserInfoRoute = require("./updateUserInfoRoute");

var _verifyEmailRoute = require("./verifyEmailRoute");

var _forgotPasswordRoute = require("./forgotPasswordRoute");

var _resetPasswordRoute = require("./resetPasswordRoute");

var _getGoogleOAuthUrlRoute = require("./getGoogleOAuthUrlRoute");

var _googleOAuthCallbackRoute = require("./googleOAuthCallbackRoute");

//import {testEmailRoute} from "./testEmailRoute";
var routes = [_signUpRoute.signUpRoute, _testRoute.testRoute, _loginRoute.loginRoute, _updateUserInfoRoute.updateUserInfoRoute, _verifyEmailRoute.verifyEmailRoute, _forgotPasswordRoute.forgotPasswordRoute, _resetPasswordRoute.resetPassword, _getGoogleOAuthUrlRoute.getGoogleOAuthUrlRoute, _googleOAuthCallbackRoute.googleOAuthCallbackRoute //testEmailRoute
];
exports.routes = routes;