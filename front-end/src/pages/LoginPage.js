import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {useToken} from "../auth/useToken";
import GoogleButton from 'react-google-button'
import {useQueryParams} from "../util/useQueryParams";

export const LoginPage = () => {
    const [, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [googleOAuthUrl, setGoogleOAuthUrl] = useState('');
    const { token: oauthToken } = useQueryParams();
    const history = useHistory();

    useEffect(() => {
        if (oauthToken) {
            setToken(oauthToken);
            history.push('/');

        }
    }, [oauthToken, setToken, history]);

    useEffect(() => {
        const loadGoogleOAuthUrl = async () => {
            try {
                const response = await axios.get('/auth/google/url');
                const { url } = response.data;
                setGoogleOAuthUrl(url);
            } catch (e) {
                console.log(e);
            }
        }
            loadGoogleOAuthUrl();
    }, []);


    const onLogInClicked = async () => {
        const response = await axios.post('/api/login', {
            email: emailValue,
            password: passwordValue,
        });
        const { token } = response.data;
        setToken(token);
        history.push('/');
    }

    return (
            <div className="content-container">
            <h1>Log In</h1>
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
                <hr />
            <button
                disabled={!emailValue || !passwordValue}
                onClick={onLogInClicked}>Log In</button>
            <button
                onClick={() => history.push('/forgot-password')}
            >Forget my password</button>
            <button
                onClick={() => history.push('/signup')}
            >Don't have an account? Sign Up</button>
             <GoogleButton
                 type="dark"
                 disabled={!googleOAuthUrl}
                 onClick={() => window.location.href = googleOAuthUrl}
             />
              <button>Log in with Linkedin</button>
            </div>


    )
}