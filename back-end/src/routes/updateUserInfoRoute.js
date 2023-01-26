import jwt from "jsonwebtoken";
import {getDbConnection} from "../db";
import {ObjectID} from "mongodb";

export const updateUserInfoRoute = {
    path: '/api/user/:userId',
    method: 'put',
}