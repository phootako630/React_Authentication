import {useState} from "react";
import {useHistory} from "react-router-dom";

export const SignUpPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmedPasswordValue, setConfirmedPasswordValue] = useState('');

    const history = useHistory();

    const onSignUpClicked = async () => {
        alert('Sign Up UNDER BUILDING')
    }

    return (
        <div className="content-container">
            <h1>Sign Up</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="Someone@gmail.com"/>
            <input
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                type="password"
                placeholder="Please enter password"/>
            <input
                value={confirmedPasswordValue}
                onChange={e => setConfirmedPasswordValue(e.target.value)}
                type="password"
                placeholder="Please re-enter the password"/>
            <hr />
            <button
                disabled={!emailValue || !passwordValue || passwordValue !== confirmedPasswordValue}
                onClick={onSignUpClicked}>Sign Up</button>
            <button
                onClick={() => history.push('/login')}
            >Already have an account? Log In</button>
        </div>


    )
}