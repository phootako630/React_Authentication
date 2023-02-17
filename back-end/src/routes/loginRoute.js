import {getDbConnection} from "../db";
import jwt from "jsonwebtoken";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import {awsUserPool} from "../util/awsUserPool";

export const loginRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        new CognitoUser({ Username: email, Pool: awsUserPool })
            .authenticateUser(new AuthenticationDetails({ Username: email, Password: password }), {
                onSuccess: async result => {
                    const db = getDbConnection('react-auth-db');
                    const user = await db.collection('users').findOne({ email });

                    const {_id: id, isVerified, info } = user;

                        jwt.sign({ id, isVerified, email, info }, process.env.JWT_SECRET,
                            { expiresIn: '2d'}, (err, token) => {
                                if(err) {
                                    res.status(500).json(err);
                                }
                                res.status(200).json({ token })
                            });
                },
                onFailure: err => {
                    res.status(401).json(err);

                }
            });


    },
}