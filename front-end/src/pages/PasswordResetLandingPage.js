import {useState} from "react";
import {PasswordResetFail} from "./PasswordResetFail";
import {PasswordResetSuccess} from "./PasswordResetSuccess";
import axios from "axios";
import {useQueryParams} from "../util/useQueryParams";

export const PasswordResetLandingPage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordConfirmValue, setPasswordConfirmValue] = useState('');
   // const {passwordResetCode} = useParams();
    const [passwordResetCode, setPasswordResetCode] = useState('');
    const { email } = useQueryParams();

   const onResetClicked = async () => {
       try {
           await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/users/${passwordResetCode}/reset-password`, { email, newPassword: passwordValue });
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
            <input
                value={passwordResetCode}
                onChange={(e) => setPasswordResetCode(e.target.value)}
                placeholder={"Password Reset Code"}
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