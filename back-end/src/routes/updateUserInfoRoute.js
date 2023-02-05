import jwt from "jsonwebtoken";
import {getDbConnection} from "../db";
import {ObjectID} from "mongodb";

export const updateUserInfoRoute = {
    path: '/api/user/:userId',
    method: 'put',
    handler: async (req, res) => {
        const {authorization} = req.headers;
        const {userId} = req.params;
        const updates = (({
                             favoriteFood,
                             hairColor,
                             bio,
                         }) => ({
            favoriteFood,
            hairColor,
            bio,
        }))(req.body);

        if (!authorization) {
            return res.status(401).json({message: 'No authorization header sent'});
        }
        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({message: 'Invalid token'});

            const { id, isVerified } = decoded;

            if (id !== userId) {
                return res.status(403).json({message: 'Unauthorized to update this user'});

            }
            if (!isVerified) {
                return res.status(403).json({message: 'User is not verified'});
            }
            const db = getDbConnection('react-auth-db');
            const result = await db.collection('users').findOneAndUpdate(
                {_id: ObjectID(id)},
                {$set: {info: updates}},
                {returnOriginal: false}
            );
            const {email, info} = result.value;

            jwt.sign({id, email, info, isVerified}, process.env.JWT_SECRET, {expiresIn: '2d'}, (err, token) => {
                if (err) {
                    return res.status(500).json(err);
                }
               return res.status(200).json({token});
            })

        })
    }
}