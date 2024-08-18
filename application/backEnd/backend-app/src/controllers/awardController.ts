// IMPORTS FROM CODEBASE
import { Member, AwardInstance, AwardType, Cookie } from "./models";
import { getCookies, verifyToken } from "./authController";
import { getRegisteredUserByIDQuery } from "../database_queries/authQueries";
import { getMemberByUserIDQuery } from "../database_queries/memberQueries";
import { createAwardInstanceQuery, createAwardTypeQuery, getAwardTypeQuery, getUserAwardInstancesQuery } from "../database_queries/awardQueries";

// EXTERNAL IMPORTS
import { Request, Response } from 'express';

// Request Body:
// {
//     recievedBy: number,
//     awardType: number,
//     nominationStatus: number,
//     citation: string,
// }
//endpoints
// /award/createAwardInstance

async function createAwardInstance(req: Request, res: Response) {
    try {
        let cookies: Cookie = await getCookies(req);
        let verify = await verifyToken(cookies.token);
        if (verify === null) {
            return res.status(401).json({
                error: "Unauthorized User"
            })
        }
        let userID = req.cookies.userID;
        let org = req.cookies.orgID;
        let admin: Member[];
        try {
            admin = await getMemberByUserIDQuery(userID, org);
        } catch {
            return res.status(500).json({
                error: "User not a part of this organization"
            })
        }
        if (admin[0].orgPerms === 3) {
            return res.status(401).json({
                error: "Not an admin for this organization"
            })
        }
        let newAwardInstance: AwardInstance = req.body;
        newAwardInstance.awardInstanceID = generateAwardInstanceID();
        newAwardInstance.issuedBy = admin[0].memberID;
        newAwardInstance.dateGiven = generateDate();

        //console.log("New Award Instance:", newAwardInstance);

        try {
            await createAwardInstanceQuery(newAwardInstance);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying creating award instance"
            })
        }
        return res.status(200).json({
            message: "Successfully created award instance"
        })
    } catch (Error) {
        res.status(400).json({
            error: 'Error creating award instance'
        })
    }
}

// /award/getAwardInstancesForUser
async function getAllAwardInstancesForUser(req: Request, res: Response) {
    try {
        let cookies: Cookie = await getCookies(req)
        let verify = await verifyToken(cookies.token)
        if (verify === null) {
            return res.status(401).json({
                error: "Unauthorized user"
            })
        }
        let userID = req.cookies.userID;
        let org = req.cookies.orgID;
        let member: Member[];
        try {
            member = await getMemberByUserIDQuery(userID, org);
        } catch (Error) {
            return res.status(500).json({
                error: "User is not a part of this organization"
            })
        }
        let awardInstances: AwardInstance; //this was type but changed to instance
        try {
            awardInstances = await getUserAwardInstancesQuery(member[0].memberID, org);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying award types"
            })
        }
        return res.status(200).json({
            message: "Successfully got all award instances for user",
            awardInstances: awardInstances
        })
    } catch (Error) {
        return res.status(400).json({
            error: 'Error getting all award instances for user'
        })
    }
}

// Request Body:
//{
//     awardDescription: string,
//     awardImage: string,
//     awardTitle: string,
//}
// endpoint
// /award/createAwardType

async function createAwardType(req: Request, res: Response) {
    try {
        let cookies: Cookie = await getCookies(req);
        let verify = await verifyToken(cookies.token);
        if (verify === null) {
            return res.status(401).json({
                error: "Unauthorized User"
            })
        }
        let userID = req.cookies.userID;
        let org = req.cookies.orgID;
        let admin: Member;
        try {
            admin = await getMemberByUserIDQuery(userID, org);
        } catch {
            return res.status(500).json({
                error: "User not a part of this organization"
            })
        }
        if (admin.orgPerms === 3) {
            return res.status(401).json({
                error: "Not an admin for this organization"
            })
        }
        let newAwardType: AwardType = req.body;
        newAwardType.awardID = generateAwardTypeID();
        newAwardType.org = org;
        try {
            await createAwardTypeQuery(newAwardType);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying creating award type"
            })
        }
        return res.status(200).json({
            message: "Successfully created award type"
        })
    } catch (Error) {
        res.status(400).json({
            error: 'Error creating award type'
        })
    }
}

// /award/getAwardTypes
async function getAllAwardTypes(req: Request, res: Response) {
    try {
        let cookies: Cookie = await getCookies(req)
        let verify = await verifyToken(cookies.token)
        if (verify === null) {
            return res.status(401).json({
                error: "Unauthorized user"
            })
        }
        let userID = req.cookies.userID;
        let org = req.cookies.orgID;
        let member: Member;
        try {
            member = await getMemberByUserIDQuery(userID, org);
        } catch (Error) {
            return res.status(500).json({
                error: "User is not a part of this organization"
            })
        }
        let awardTypes: AwardType[];
        try {
            awardTypes = await getAwardTypeQuery(org);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying award types"
            })
        }
        return res.status(200).json({
            message: "Successfully got all award types",
            awardTypes: awardTypes
        })
    } catch (Error) {
        return res.status(400).json({
            error: 'Error getting all award types'
        })
    }
}

export { createAwardInstance, createAwardType, getAllAwardTypes, getAllAwardInstancesForUser }

function generateAwardInstanceID() {
    return Math.floor(Math.random() * 1000000);
}

function generateAwardTypeID() {
    return Math.floor(Math.random() * 100);
}

function generateDate(): Date {
    return new Date();
}