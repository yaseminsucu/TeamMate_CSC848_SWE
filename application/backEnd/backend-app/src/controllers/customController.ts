import { CustomSection, Cookie, Member } from "./models";
import { getCookies, verifyToken } from "./authController";
import { getCustomSectionQuery, getCustomSectionsFromOrgQuery, createCustomSectionQuery, getCustomSectionByIDQuery } from "../database_queries/customSection";
import { Request, Response } from "express";
import { getMemberByUserIDQuery } from "../database_queries/memberQueries";

export const createCustomSection = async function (req: Request, res: Response) {
    try {
        let cookie: Cookie = await getCookies(req)
        let verified = await verifyToken(cookie.token)
        if (verified === null) {
            return res.status(401).json({
                error: "Unauthorized user"
            })
        }
        let userID = req.cookies.userID;
        let adminMember: Member[];
        let org = req.cookies.orgID;

        console.log("UserID: ", userID, "OrgID: ", org);

        try {
            adminMember = await getMemberByUserIDQuery(userID, org);
            //console.log("Admin Member: ", adminMember);
        } catch (Error) {
            return res.status(501).json({
                error: "Unable to query user"
            })
        }
        if (adminMember[0].orgPerms === 3) {
            return res.status(401).json({
                error: "Not an admin for this organization"
            })
        }
        let newCustomSection: CustomSection = req.body;
        newCustomSection.org = org;
        console.log("Admin Member: ", adminMember);
        newCustomSection.docCreator = adminMember[0].memberID;
        newCustomSection.customSec_ID = await createCustomID();
        console.log("New custom section: ", newCustomSection);

        try {
            await createCustomSectionQuery(newCustomSection);
        } catch (Error) {
            return res.status(502).json({
                error: "Error querying creating custom section"
            })
        }
        return res.status(200).json({
            message: "Successfuilly created new custom section"
        })
    } catch (Error) {
        return res.status(503).json({
            error: "Error querying user"
        })
    }
}

export const getAllcustomSection = async function (req: Request, res: Response) {
    try {
        let cookies: Cookie = await getCookies(req);
        let verified = await verifyToken(cookies.token);
        if (verified === null) {
            return res.status(401).json({
                error: "Unauthorized user"
            })
        }
        let userID = req.cookies.userID;
        let members: Member[];
        let org = req.cookies.orgID;

        console.log("UserID: ", userID, "OrgID: ", org);

        try {
            members = await getMemberByUserIDQuery(userID, org);
        } catch (Error) {
            return res.status(500).json({
                error: "Unable to query user"
            })
        }
        if (members.length === 0) {
            return res.status(404).json({
                error: "No members found for this user and organization"
            })
        }
        let accessLevel = members[0].orgPerms;
        let customSections: CustomSection[];
        try {
            customSections = await getCustomSectionsFromOrgQuery(org);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying custom sections"
            })
        }
        return res.status(200).json({
            message: "Successfully retrieved all custom sections",
            customSections: customSections
        })
    } catch (Error) {
        return res.status(400).json({
            error: "Could not retrieve all custom sections"
        })
    }
}

export const getCustomSection = async function (req: Request, res: Response) {
    try {
        let cookies: Cookie;
        try {
            cookies = await getCookies(req);
        } catch (Error) {
            return res.status(401).json({
                error: "No cookies found"
            })
        }
        let verified = await verifyToken(cookies.token);
        if (verified === null) {
            return res.status(401).json({
                error: "Unauthorized user"
            })
        }
        let userID = req.cookies.userID;
        let customSection: CustomSection;
        let org = req.cookies.orgID;
        let customSec_ID = req.body.customSec_ID;
        try {
            customSection = await getCustomSectionByIDQuery(customSec_ID, org);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying user"
            })
        }

        return res.status(200).json({
            message: "Successfully retrieved custom section",
            customSection: customSection
        })

    } catch (Error) {
        return res.status(400).json({
            error: "Could not retrieve custom section"
        })
    }
}
// HELPER FUNCTIONS
async function createCustomID() {
    return Math.floor(1000 + Math.random() * 9000);
}