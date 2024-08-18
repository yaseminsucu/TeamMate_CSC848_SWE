// INTERAL IMPORTS
import { RegisterUser } from './models';
import { getRegisteredUserByIDQuery } from '../database_queries/authQueries';
import { verifyToken } from './authController';

// EXTERNAL EXPORTS
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';


// interface RegisterUser { # THESE FIELDS CAN BE EMPTY
//     username: string,
//     firstName: string,
//     lastName: string,
//     profilePicture ?: string,
//     description ?: string
// }
export const editProfile = async (req: Request, res: Response) => {
    try {
        let token = req.cookies.token;
        let verify = verifyToken(token)
        if (verify === null) {
            return res.status(401).json({
                error: "Unauthorized user"
            })
        }
        let userID = req.cookies.userID;
        let updatedInformation: RegisterUser = req.body;
        let currInformation: RegisterUser;
        try {
            currInformation = await getRegisteredUserByIDQuery(userID)
        } catch (Error) {
            return res.status(500).json({
                error: "Internal Server Error: Retrieving User Error"
            })
        }
        const userWithUpdates: RegisterUser = updateUser(currInformation, updatedInformation);
        try {

        } catch (Error) {
            return res.status(500).json({
                error: "Interna Server Error: Updating User Error"
            })
        }
        return res.status(200).json({
            message: "User profile updated successfully"
        })
    } catch (Error) {
        return res.status(400).json({
            error: "Error editing user profile"
        })
    }
}

export const changeEmail = async function(req: Request, res: Response) {

}

export const changePassword = async function(req: Request, res: Response) {

}

// HELPER FUNCTIONS
function updateUser(currentInformation: RegisterUser, updatedInformation: RegisterUser): RegisterUser {
    if (updatedInformation.username !== null) {
        currentInformation.username = updatedInformation.username;
    } else if (updatedInformation.firstName !== null) {
        currentInformation.firstName = updatedInformation.firstName;
    } else if (updatedInformation.lastName !== null) {
        currentInformation.lastName = updatedInformation.lastName;
    } else if (updatedInformation.description !== null) {
        currentInformation.description = updatedInformation.description;
    } else if (updatedInformation.profilePicture !== null) {
        currentInformation.profilePicture = updatedInformation.profilePicture;
    } 
    return currentInformation;
}