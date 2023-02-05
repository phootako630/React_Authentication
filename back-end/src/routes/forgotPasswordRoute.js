import {v4 as uuid} from 'uuid';
import{ getDbConnection } from "../db";
import {sendEmail} from "../util/sendEmail";

export const forgotPasswordRoute = {
    path: '/api/forgot-password/:email',
    method: 'put',
    handler: async (req, res) => {
        const {email} = req.params;
        const db = getDbConnection('react-auth-db');
        const passwordResetString = uuid();
        const { result } = await db.collection('users').updateOne({ email }, {
            $set: {
                passwordResetString,
            }
        });
        if (result.nModified > 0) {
            try {
                await sendEmail({
                    to: email,
                    from: 'ivanzhang220820@gmail.com',
                    subject: 'Reset Password',
                    //text: `Please click the following link to reset your password: http://localhost:3000/reset-password/${passwordResetString}`,
                    html: `<p>Please click the following link to reset your password: <a href="http://localhost:3000/reset-password/${passwordResetString}">Reset Password</a></p>`
                })

            } catch (e) {
                console.log(e);
                res.status(500).json({message: 'Unable to send email.'});

            }

        }
        res.status(200).json({message: 'Email sent.'});

 }

}