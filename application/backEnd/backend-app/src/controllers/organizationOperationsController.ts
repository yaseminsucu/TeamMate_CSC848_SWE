// IMPORTS FROM CODEBASE
import { Organization, Member, JWT_SECRET_KEY, RegisterUser } from './models';
import { getOrganizationsQuery, insertOrganizationQuery, userOrganizationsQuery, deleteOrganizationQuery } from '../database_queries/organizationQueries';
import { addCookies, verifyToken } from './authController';
import { generateMemberID } from './memberController';
import { insertMemberIntoOrganizationQuery, getNumberOfMembersTotalQuery } from '../database_queries/memberQueries';
import { getRegisteredUserByIDQuery } from '../database_queries/authQueries';

// EXTERNAL IMPORTS
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// interface Organization {
//     orgID: number,
//     orgName: string,
//     orgOwner: number,
//     orgDescription: number
// }
export const getAllOrganizations = async (req: Request, res: Response) => {
    try {
        let token;
        try {
            token = req.cookies.token;
        } catch (Error) {
            return res.status(401).json({
                error: 'No tokens'
            })
        }
        let userID = req.cookies.userID;
        let verify = verifyToken(token);
        if (verify === null) {
            return res.status(401).json({
                error: 'Unauthorized user'
            })
        }
        const queryResult: Organization[] = await getOrganizationsQuery();
        return res.status(200).json({
            message: "All Organizations Request Successful",
            queryResult: queryResult
        })
    } catch (Error) {
        return res.status(400).json({
            error: 'Error fetching all organizations'
        });
    }
}

// NO REQUEST BODY
export const getUserOrganizations = async (req: Request, res: Response) => {
    try {
        let token = req.cookies.token;
        let userID = req.cookies.userID;
        let verify = verifyToken(token);
        if (verify === null) {
            return res.status(401).json({
                error: 'Unauthorized user'
            })
        }
        let queryResult: Organization[];
        try {
            queryResult = await userOrganizationsQuery(userID);
        } catch(Error) {
            return res.status(500).json({
                error: 'Error getting all user organizations'
            })
        }
        return res.status(200).json({
            message: "User Organizations Request Successful",
            queryResult: queryResult
        })
    } catch (Error) {
        return res.status(400).json({
            error: 'Error fetching user associated organizations'
        });
    }
}

// REQUEST BODY:
// {
//     "orgName": "some orgName",
//     "orgDescription": "some orgDescription"
// }
export const createOrganization = async (req: Request, res: Response) => {
    try {
        let newOrganization: Organization = req.body;
        let token = req.cookies.token;
        let userID = req.cookies.userID;
        let verify = await verifyToken(token)
        if (verify === null) {
            return res.status(401).json({
                error: 'Unauthorized user'
            })
        }
        newOrganization.orgID = await generateOrganizationID()
        newOrganization.orgOwner = userID;
        let user: RegisterUser[];
        try {
            user = await getRegisteredUserByIDQuery(userID);
        } catch (Error) {
            return res.status(500).json({
                error: 'Error retrieving user data'
            })
        }

        const { firstName, lastName } = user[0];

        let total;
        try {
            total = await getNumberOfMembersTotalQuery();
        } catch (Error) {
            return res.status(500).json({
                error: 'Error retrieving member count'
            })
        }
        let totalString:string = total.toString();
        total = parseInt(totalString);
        let orgOwner: Member = {
            memberID: await generateMemberID(),
            orgPerms: 1,
            firstName: firstName,
            lastName: lastName,
            lastLogin: new Date(),
            org: newOrganization.orgID,
            user: userID,
            activeMember: 1,
            sortOrder: total + 1
        }
        try {
            await insertOrganizationQuery(newOrganization);
        } catch {
            return res.status(500).json({
                error: 'Error inserting organization query'
            })
        }
        try {
            await insertMemberIntoOrganizationQuery(orgOwner);
        } catch (Error) {
            return res.status(500).json({
                error: 'Error inserting owner query'
            })
        }
        return res.status(200).json({
            message: "User Organization created successfully, refresh page",
        })
    } catch (Error) {
        return res.status(400).json({
            error: 'Error creating organization'
        });
    }
}

// // REQUEST BODY:
// {
//     orgID: number
// }
export const deleteOrganization = async (req: Request, res: Response) => {
    try {
        let organization: Organization = req.body;
        organization.orgOwner = req.cookies.userID;
        let token = req.cookies.token;
        let verify = await verifyToken(token)
        if (verify === null) {
            return res.status(401).json({
                error: 'Unauthorized user'
            })
        }
        try {
            await deleteOrganizationQuery(organization.orgID);
        } catch (Error) {
            return res.status(500).json({
                error: "Error deleting organization query"
            })
        }
        return res.status(200).json({
            message: "User Organization dleted successfullly"
        })
    } catch (Error) {
        return res.status(400).json({
            error: "Error deleting organization"
        })
    }
}

async function generateOrganizationID(): Promise<number> {
    return Math.floor(Math.random() * 1000000);
}