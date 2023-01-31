import {useHistory} from "react-router-dom";
import {useEffect} from "react";

export const PleaseVerifyEmailPage = () => {

  const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            history.push('/');
        }, 3000);
    }, [history]);


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