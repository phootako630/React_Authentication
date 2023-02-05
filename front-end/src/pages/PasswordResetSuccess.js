import {useHistory} from "react-router-dom";

export const PasswordResetSuccess = () => {
    const history = useHistory();

    return (
        <div className="content-container">
            <h1>Success!</h1>
            <p>Your password reset request is completed.</p>
            <button onClick={() => history.push('/login')}>Back to Log in page</button>
        </div>
    )
}