import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import {useQueryParams} from "../util/useQueryParams";

export const PleaseVerifyEmailPage = () => {

  const history = useHistory();
  const { email } = useQueryParams();

    useEffect(() => {
        setTimeout(() => {
            history.push(`/verify-email?email=${encodeURI(email)}`);
        }, 3000);
    }, [history, email]);


  return (
    <div className="content-container">
        <h1>Please verify your email</h1>
        <p>
            An email has been sent to your email address.
            Please click the link in the email to verify your email address.
        </p>
    </div>
  )
}