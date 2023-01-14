import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import {LoginPage} from "./pages/LoginPage";
import {SignUpPage} from "./pages/SignUpPage";

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <UserInfoPage />
                </Route>
                <Route path="/login">
                    <LoginPage></LoginPage>
                </Route>
                <Route path="/signup">
                    <SignUpPage></SignUpPage>
                </Route>
            </Switch>
        </Router>
    );
}