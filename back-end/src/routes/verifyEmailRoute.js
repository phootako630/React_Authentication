import { ObjectID } from "mongodb";
import { getDbConnection } from "../db";
import jwt from "jsonwebtoken";

export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {
        const { verificationString } = req.body;
        const db = getDbConnection('react-auth-db');
        const result = await db.collection('users').findOne({
            verificationString,
        });
        if (!result) {
            return res.status(401).json({message: 'The email verification code is invalid'});
        }
        const { _id: id, email, info, } = result;
        await db.collection('users').updateOne({_id: ObjectID(id)}, {$set: {isVerified: true}});
        jwt.sign({id, email, info, isVerified: true}, process.env.JWT_SECRET, {expiresIn: '2d'}, (err, token) => {
            if (err) {
                return res.sendStatus(500);
            } else {
                return res.status(200).json({token});
            }
        });
    }
}