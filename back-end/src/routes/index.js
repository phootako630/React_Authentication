import {signUpRoute} from "./signUpRoute";
import { testRoute } from './testRoute';
import {loginRoute} from "./loginRoute";
import {updateUserInfoRoute} from "./updateUserInfoRoute";
import {verifyEmailRoute} from "./verifyEmailRoute";
import {forgotPasswordRoute} from "./forgotPasswordRoute";
import {resetPassword} from "./resetPasswordRoute";
import {getGoogleOAuthUrlRoute} from "./getGoogleOAuthUrlRoute";
import {googleOAuthCallbackRoute} from "./googleOAuthCallbackRoute";

//import {testEmailRoute} from "./testEmailRoute";

export const routes = [
    signUpRoute,
    testRoute,
    loginRoute,
    updateUserInfoRoute,
    verifyEmailRoute,
    forgotPasswordRoute,
    resetPassword,
    getGoogleOAuthUrlRoute,
    googleOAuthCallbackRoute
    //testEmailRoute
];
