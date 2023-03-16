import {useState} from "react";
import {useQueryParams} from "../util/useQueryParams";
import {useToken} from "../auth/useToken";
import {EmailVerificationSuccess} from "./EmailVerificationSuccess";
import {EmailVerificationFailed} from "./EmailVerificationFailed";
import axios from "axios";

export const EmailVerificationCodePage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);

    const [verificationString, setVerificationString] = useState("");
    const { email } = useQueryParams();
    const [, setToken] = useToken();

    const onSubmitVerificationString = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/verify-email`, {email, verificationString});
            const { token } = response.data;
            setToken(token);
            setIsSuccess(true);
        } catch (e) {
            setIsFailure(true);
        }
    }

    if (isSuccess) return <EmailVerificationSuccess />;
    if (isFailure) return <EmailVerificationFailed />;
    return (
        <div className= "content-container">
            <h1>Verify your email</h1>
            <p>You have been sent an email to {email}. Please enter the verification code below.</p>
            <input
                placeholder="Verification code"
                value={verificationString}
                onChange={e => setVerificationString(e.target.value)} />
            <button onClick={onSubmitVerificationString}>Submit</button>

        </div>
    )




}