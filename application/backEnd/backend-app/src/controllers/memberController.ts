// IMPORTS FROM CODEBASE
import { Member, JWT_SECRET_KEY, RegisterUser } from './models';
import {
    insertMemberIntoOrganizationQuery, getMembersFromOrganizationQuery, getMemberIDQuery,
    removeMemberFromOrganizationQuery, getNumberOfMembersTotalQuery, getMemberByUserIDQuery
} from '../database_queries/memberQueries';
// EXTERNAL IMPORTS
import { Request, Response } from 'express';
import jwt, { verify } from 'jsonwebtoken';
import { verifyToken } from './authController';
import { getRegisteredUserByIDQuery } from '../database_queries/authQueries';

// interface Member {
//     memberID: number,
//     orgPerms: number,
//     firstName: string,
//     lastName: string, 
//     lastLogin: Date,
//     org: number,
//     group: number,
//     user: number,
//     activateMember: number
// }

// Request Body:
// {
//     "user": "some userID",
//     "orgPerms": "some orgPerms",
//     "group": "some group",
// }
export const addMemberToOrganization = async (req: Request, res: Response) => {
    try {
        let token = req.cookies.token;
        let userID = req.cookies.userID;

        //when testing i had to set the cookie with the orgID as i was only using postman
        let currOrg = req.cookies.orgID;

        let verify = await verifyToken(token)

        if (verify === null) {
            return res.status(401).json({
                message: "Unauthorized User"
            })
        }
        try {
            let admin: Member = await getMemberByUserIDQuery(userID, currOrg)
            if (!currOrg) {
                throw new Error("Organization ID cannot be null");
            }
            if (admin.orgPerms === 1) {
                console.log('authorized')
            }
        } catch (Error) {
            console.error("Error fetching admin:", Error)
            console.error("Error fetching admin:", Error)
            return res.status(401).json({
                message: "Only Admins can add users"
            })
        }
        const newMember = req.body;
        newMember.userID = req.body.user;
        newMember.lastLogin = await generateLastLogin();
        newMember.memberID = await generateMemberID();
        newMember.org = currOrg;
        newMember.activeMember = 1;
        if (!req.body.orgPerms) {
            newMember.orgPerms = 3;
        } else {
            newMember.orgPerms = req.body.orgPerms;
        }
        if (!req.body.group) {
            newMember.group = 1;
        } else {
            newMember.group = req.body.group;
        }
        let counter: number;
        let user: RegisterUser[];
        try {
            user = await getRegisteredUserByIDQuery(newMember.userID);
        } catch (Error) {
            return res.status(500).json({
                error: "Internal server error"
            })
        }
        newMember.firstName = user[0].firstName;
        newMember.lastName = user[0].lastName;
        try {
            counter = await getNumberOfMembersTotalQuery();
        } catch (Error) {
            return res.status(500).json({
                error: "Internal server error"
            })
        }

        newMember.sortOrder = counter + 1;

        // NULL GROUP HOTFIX (ERROR WHILE ADDING TO ORG)
        if (newMember.group === 1) {
            newMember.group = null;
        }

        try {
            await insertMemberIntoOrganizationQuery(newMember);
        } catch (Error) {
            return res.status(500).json({
                error: "Unable to do query to insert member into organization"
            })
        }
        return res.status(200).json({
            message: "Member added to organization successfully"
        })
    } catch (Error) {
        console.error("Error adding member to organization:", Error)
        return res.status(400).json({
            error: 'Error adding member to organization'
        });
    }
}

// Request Body:
// {
//     "memberID": "some memberID",
//     "orgID": "some orgID"
// }
export const removeMemberFromOrganization = async (req: Request, res: Response) => {
    try {
        let token = req.cookies.token;
        let verify = await verifyToken(token)
        if (verify === null) {
            return res.status(401).json({
                message: "Unauthorized User"
            })
        }
        let userID = req.cookies.userID;
        let currOrg = req.cookies.orgID;
        try {
            let admin: Member = await getMemberByUserIDQuery(userID, currOrg)
            if (admin.orgPerms !== 3) {
                console.log('authorized')
            }
        } catch (Error) {
            return res.status(401).json({
                message: "Only Admins can remove Users"
            })
        }
        const memberToRemove = req.body;
        try {
            await removeMemberFromOrganizationQuery(memberToRemove.memberID, currOrg)
        } catch (Error) {
            return res.status(500).json({
                error: 'Unable to do query to remove member from organization'
            })
        }
        return res.status(200).json({
            message: "Member removed successfully from organization"
        })
    } catch (Error) {
        return res.status(400).json({
            error: 'Error removing member from organization'
        });
    }
}

// Request Body:
// {
//     "orgID": "some orgID"
// }
export const getMembersFromOrganization = async (req: Request, res: Response) => {
    try {
        let token = req.cookies.token;
        let verify = await verifyToken(token);
        if (verify === null) {
            return res.status(401).json({
                error: "Unauthorized user"
            })
        }
        let orgID = req.cookies.orgID;
        let members;
        try {
            members = await getMembersFromOrganizationQuery(orgID)
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying members from organization"
            })
        }
        return res.status(200).json({
            message: "Members queried successfully",
            members: members
        })
    } catch (Error) {
        return res.status(400).json({
            error: 'Error fetching members from organization'
        });
    }
}

export async function generateMemberID(): Promise<number> {
    return Math.floor(Math.random() * 1000000);
}

export async function generateLastLogin(): Promise<Date> {
    return new Date();
}