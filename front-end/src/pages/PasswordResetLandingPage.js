import {useState} from "react";
import {PasswordResetFail} from "./PasswordResetFail";
import {PasswordResetSuccess} from "./PasswordResetSuccess";
import axios from "axios";
import {useParams} from "react-router-dom";

export const PasswordResetLandingPage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordConfirmValue, setPasswordConfirmValue] = useState('');
    const {passwordResetCode} = useParams();
   const onResetClicked = async () => {
       try {
           await axios.put(`/api/users/${passwordResetCode}/reset-password`, { newPassword: passwordValue });
           setIsSuccess(true);
       } catch (e) {
           setIsFailure(true);
       }
   }

    if (isFailure) return <PasswordResetFail/>;
    if (isSuccess) return <PasswordResetSuccess/>;

    return (
        <div className="content-container">
            <h1>Reset Password</h1>
            <p>Please enter a new password</p>
            <input
                type="password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                placeholder={"New Password"}
            />
            <input
                type="password"
                value={passwordConfirmValue}
                onChange={(e) => setPasswordConfirmValue(e.target.value)}
                placeholder={"Confirm New Password"}
            />
            <button
                disabled={!passwordValue || !passwordConfirmValue || passwordValue !== passwordConfirmValue}
                onClick={onResetClicked}
            >
                Reset Password
            </button>
        </div>
)
}