import { Member, Groups, Cookie } from './models';
import { getCookies, verifyToken } from './authController';
import { getMemberByUserIDQuery } from '../database_queries/memberQueries';
import { createGroupQuery, getAllGroupsFromOrgQuery, getGroupFromOrgQuery } from '../database_queries/groupQueries';

import { Request, Response } from 'express';

// Request Body:
// {
//     org: number,
//     groupName: string,
//     sortOrder: number,
//     groupImage: string
// }

//endpoints
// /group/create
export const createGroup = async (req: Request, res: Response) => {
    try {
        let cookie: Cookie = await getCookies(req);
        let verify = await verifyToken(cookie.token);
        if (verify === null) {
            return res.status(401).json({
                error: 'Unauthorized User'
            });
        }
        let userID = req.cookies.userID;
        let orgID = req.cookies.orgID;
        let admin: Member[];
        try {
            admin = await getMemberByUserIDQuery(userID, orgID);
        } catch (Error) {
            return res.status(500).json({
                error: 'Error fetching admin'
            });
        }
        let newGroup: Groups = req.body;
        newGroup.org = orgID;
        if (admin[0].orgPerms === 3) {
            return res.status(401).json({
                error: 'Unauthorized to create group'
            });
        }
        newGroup.groupID = await generateGroupID();
        let allGroups: Groups[];
        try {
            allGroups = await getAllGroupsFromOrgQuery(orgID);

        } catch (Error) {
            return res.status(500).json({
                error: 'Error fetching groups'
            });
        }
        newGroup.sortOrder = allGroups.length + 1;
        try {
            await createGroupQuery(newGroup);
        } catch (Error) {
            return res.status(400).json({
                error: 'Error creating group'
            });
        }
        return res.status(200).json({
            message: 'Created group successfully'
        });
    } catch (Error) {
        console.error("Error creating group:", Error)
        return res.status(400).json({
            error: 'Error creating group'
        });
    }
}

// endpoint
// /group/get
// No Request Body
export const getOrgGroups = async (req: Request, res: Response) => {
    try {
        let cookie: Cookie = await getCookies(req);
        let verify = await verifyToken(cookie.token);
        if (verify === null) {
            return res.status(401).json({
                error: 'Unauthorized User'
            });
        }
        let orgID = req.cookies.orgID;
        let groups: Groups[];
        try {
            groups = await getAllGroupsFromOrgQuery(orgID);
        } catch (Error) {
            return res.status(500).json({
                error: 'Error fetching groups'
            });
        }
        return res.status(200).json({
            message: 'Fetched groups successfully',
            groups: groups
        });
    } catch (Error) {
        return res.status(400).json({
            error: 'Error fetching groups'
        });
    }
}

export const getGroupDetails = async (req: Request, res: Response) => {
    try {
        let cookie: Cookie = await getCookies(req);
        let verify = await verifyToken(cookie.token);
        if (verify === null) {
            return res.status(401).json({
                error: 'Unauthorized User'
            });
        }
        let orgID = req.cookies.orgID;
        let groupID = req.body.groupID;
        let group: Groups;
        try {
            group = await getGroupFromOrgQuery(groupID, orgID);
        } catch (Error) {
            return res.status(500).json({
                error: 'Error fetching groups'
            });
        }
        return res.status(200).json({
            message: 'Fetched group successfully',
            group: group
        });
    } catch (Error) {
        return res.status(400).json({
            error: 'Error fetching group'
        });
    }
}

// Helper Functions
async function generateGroupID(): Promise<number> {
    return Math.floor(Math.random() * 100);
}