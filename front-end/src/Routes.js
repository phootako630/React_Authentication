import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import {LoginPage} from "./pages/LoginPage";
import {SignUpPage} from "./pages/SignUpPage";
import {PrivateRoute} from "./auth/PrivateRoute";
import {PleaseVerifyEmailPage} from "./pages/PleaseVerifyEmailPage";
import {EmailVerificationLandingPage} from "./pages/EmailVerificationLandingPage";
import {ForgotPasswordPage} from "./pages/ForgotPasswordPage";
import {PasswordResetLandingPage} from "./pages/PasswordResetLandingPage";
import {EmailVerificationCodePage} from "./pages/EmailVerificationCodePage";

export const Routes = () => {
    console.log('Rendering Routes');
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/" exact>
                    <UserInfoPage />
                </PrivateRoute>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/signup">
                    <SignUpPage />
                </Route>
                <Route path="/please-verify">
                    <PleaseVerifyEmailPage />
                </Route>
                <Route path="/verify-email/:verificationString">
                    <EmailVerificationLandingPage />
                </Route>
                <Route path="/forgot-password">
                    <ForgotPasswordPage />
                </Route>
                <Route path="/reset-password">
                    <PasswordResetLandingPage />
                </Route>
                <Route path="/verify-email" exact>
                    <EmailVerificationCodePage />
                </Route>

            </Switch>
        </Router>
    );
}