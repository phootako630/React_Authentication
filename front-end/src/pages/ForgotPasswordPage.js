import {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

export const ForgotPasswordPage = () => {
    const [emailValue, setEmailValue] = useState('');
    const [errorMessage, setErrorMessage] = useState([]);
    const [success, setSuccess] = useState(false);
    const history = useHistory();

    const onSubmitClicked = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/forgot-password/${emailValue}`);
            setSuccess(true);
            setTimeout(() => history.push(`/reset-password?email=${encodeURIComponent(emailValue)}`), 3000);
        } catch (e) {
            setErrorMessage(e.response.data.message);
        }
    }

    return success ? (
        <div className="content-container">
            <h1>Success!</h1>
            <p>Check your email for a link to reset your password.</p>
        </div>
    ) : (
        <div className="content-container">
            <h1>Forgot Password</h1>
            <p>Enter your email address and we'll send you a link to reset your password.</p>
            {errorMessage && <div>{errorMessage}</div>}

            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="Please enter your Email"
            />
            <button
                disabled={!emailValue}
                onClick={onSubmitClicked}>Send Reset Link</button>

        </div>
    )
}