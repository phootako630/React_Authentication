import bcrypt from "bcrypt";
import { getDbConnection } from "../db";
import {v4 as uuid} from "uuid";

export const resetPassword =  {
    path: "/api/users/:passwordResetCode/reset-password",
    method: "put",
    handler: async (req, res) => {
        const { passwordResetCode } = req.params;
        const { newPassword } = req.body;

        const db = getDbConnection("react-auth-db");

        const newSalt = uuid();
        const pepper = process.env.PEPPER_STRING;


        const newPasswordHash = await bcrypt.hash(salt + newPassword + pepper, 10);

        const result = await db.collection("users")
            .findOneAndUpdate({ passwordResetCode }, {
            $set: { passwordHash: newPasswordHash, salt: newSalt },
            $unset: { passwordResetCode: '' },
        });

        if (result.lastErrorObject.n === 0) {
            return res.sendStatus(404);
        }
        res.sendStatus(200);
    }
}