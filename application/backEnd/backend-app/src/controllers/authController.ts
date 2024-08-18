// IMPORTS FROM CODE BASE
import { RegisterUser, Cookie, JWT_SECRET_KEY } from './models';
import { hashPassword, verifyPassword } from '../dev_tools/hash';
import { getRegisteredUserByEmailQuery, insertRegisterUserQuery } from '../database_queries/authQueries';

// EXTERNAL IMPORTS
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Next } from 'mysql2/typings/mysql/lib/parsers/typeCast';

// Request Body:
// {
//     "firstName": "some first name",
//     "lastName": "some last name",
//     "email": "some email",
//     "password": "some password"
// }
export const register = async (req: Request, res: Response) => {
    try {
        clearCookies(req, res)
        let registerUser: RegisterUser = req.body;
        registerUser.username = registerUser.firstName + registerUser.lastName;
        const alreadyRegistered = await getRegisteredUserByEmailQuery(registerUser.email);
        if (alreadyRegistered.length >= 1) {
            return res.status(400).json({
                error: 'Email is already registered'
            });
        }
        const hashedPassword: string = await hashPassword(registerUser.password);
        const verify = verifyPassword(registerUser.password, hashedPassword);
        if (!verify) {
            return res.status(400).json({
                error: 'Password Hashing unsuccessful'
            });
        }
        registerUser.password = hashedPassword;
        let userIDVerification = await generateUserID();
        registerUser.userID = userIDVerification;
        insertRegisterUserQuery(registerUser);
        let token = await generateToken(registerUser.email)
        addCookies(res, registerUser.userID, token)
        return res.status(200).json({
            message: 'User Registered successfully',
            token: token
        });
    } catch (Error) {
        return res.status(400).json({
            error: 'Error Registering user'
        });
    }
}

// Request Body:
// {
//     "email" : "some email",
//     "password" : "some password"
// }
export const login = async (req: Request, res: Response) => {
    try {
        clearCookies(req, res);
        const loginUser: RegisterUser = req.body;
        const registeredDao = await getRegisteredUserByEmailQuery(loginUser.email);
        if (!(registeredDao.length == 1)) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        const userDto: RegisterUser = registeredDao[0]
        let checkPassword = await verifyPassword(loginUser.password, userDto["password"])
        if (!checkPassword) {
            return res.status(400).json({
                error: 'Invalid Password'
            })
        }
        const token: string = await generateToken(userDto.email)
        addCookies(res, userDto.userID, token)
        return res.status(200).json({
            message: "User logged in Successfully",
        });
    } catch (Error) {
        return res.status(400).json({
            error: 'Error Logging in user'
        });
    }
}

export const refreshToken = async (req: Request, res: Response) => {
    try {
        let cookie: Cookie;
        try {
            cookie = await getCookies(req);
        } catch (Error) {
            return res.status(401).json({
                error: 'No cookies found'
            });
        }
        let verify = await verifyToken(cookie.token);
        if (verify === null) {
            return res.status(401).json({
                error: 'Unauthorized User'
            });
        }
        res.clearCookie('token');
        let token = await generateToken(verify.username);
        addCookies(res, cookie.userID, token);
        return res.status(200).json({
            message: 'Token Refreshed',
        });
    } catch (Error) {
        return res.status(400).json({
            error: 'Error refreshing token'
        });
    }
}

// HELPER FUNCTIONS
async function clearCookies(req: Request, res: Response): Promise<any> {
    if (req.cookies.userID !== undefined || req.cookies.token !== undefined) {
        res.clearCookie('userID');
        res.clearCookie('token');
    }
}

async function addCookies(res: Response, userID: number, token: string): Promise<void> {
    res.cookie('userID', userID, { httpOnly: true });
    res.cookie('token', token, { httpOnly: true });
}

async function getCookies(req: Request): Promise<Cookie> {
    const cookie: Cookie = {
        userID: req.cookies.userID,
        token: req.cookies.token
    }
    return cookie
}

async function generateToken(email: string): Promise<string> {
    const token = jwt.sign(
        { username: email },
        JWT_SECRET_KEY,
        { expiresIn: '1d' }
    );
    return token;
}

async function generateUserID(): Promise<number> {
    return Math.floor(1000 + Math.random() * 9000);
}

async function verifyToken(token: string): Promise<any> {
    return jwt.verify(token, JWT_SECRET_KEY);
}

export { clearCookies, addCookies, generateToken, verifyToken, getCookies };
