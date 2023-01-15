import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import {LoginPage} from "./pages/LoginPage";
import {SignUpPage} from "./pages/SignUpPage";
import {PrivateRoute} from "./auth/PrivateRoute";

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/" exact>
                    <UserInfoPage />
                </PrivateRoute>
                <PrivateRoute path="/login">
                    <LoginPage></LoginPage>
                </PrivateRoute>
                <Route path="/signup">
                    <SignUpPage></SignUpPage>
                </Route>
            </Switch>
        </Router>
    );
}