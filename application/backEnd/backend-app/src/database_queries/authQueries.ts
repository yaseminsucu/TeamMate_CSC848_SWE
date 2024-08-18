import databaseConnection from "./databaseConnection";
import { RegisterUser } from '../controllers/models';

async function getRegisteredUserByEmailQuery(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT * FROM `Registered Users` WHERE email = ?',
            [email],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        )
    })
}

async function insertRegisterUserQuery(user: RegisterUser): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'INSERT INTO `Registered Users` (userID, email, username, password, profilePicture, firstName, lastName) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [user.userID, user.email, user.username, user.password, user.profilePicture, user.firstName, user.lastName],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        )
    })
}

async function getRegisteredUserByIDQuery(userID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT * FROM `Registered Users` WHERE userID = ?',
            [userID],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        )
    })
}

export { getRegisteredUserByEmailQuery, insertRegisterUserQuery, getRegisteredUserByIDQuery };