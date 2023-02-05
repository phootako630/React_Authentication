import {useHistory} from "react-router-dom";

export const PasswordResetFail = () => {
    const history = useHistory();

    return (
        <div className="content-container">
            <h1>Oh no...</h1>
            <p>Something went wrong while trying to reset your email. Please contact Yifan.</p>
            <button onClick={() => history.push('/login')}>Back to Sign-up</button>
        </div>
    )

}