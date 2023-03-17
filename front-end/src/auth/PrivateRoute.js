import {Redirect, Route} from 'react-router-dom';
import {useUser} from './useUser';

export const PrivateRoute = props => {
    const user = useUser();
    console.log('User:', user)

    if (!user || user.id === null) return <Redirect to="/login" />;

    return <Route {...props} />
}