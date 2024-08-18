// INTERNAL IMPORTS    
import { getCookies } from "./authController";
import { Qualifications, QualificationType, Cookie, Member } from "./models";
import { verifyToken } from "./authController";
import { createQualificationTypeQuery, createQualificationQuery, getQualificationFromOrgQuery, getQualificationTypesFromOrgQuery } from "../database_queries/qualificationQueries";
import { getMemberByUserIDQuery } from "../database_queries/memberQueries";

//EXTERNAL IMPORTS
import { Request, Response } from 'express';

// interface Qualifications {
//     qualInstanceID: number,
//     issuedBy: number,
//     recievedBy: number, 
//     qualificationType: number,
//     nominationStatus: number,
//     dateGiven: Date,
//     citation: string
// }

// interface QualificationType {
//     qualificationID: number,
//     qualificationDescription: string,
//     qualificationImage: string,
//     qualificationTitle: string
// }


// REQUEST BODY:
// {
//     "issuedBy": "some issuedBy",
//     "recievedBy": "some recievedBy",
//     "qualificationType": "some qualificationType",
//     "nominationStatus": "some nominationStatus",
//     "dateGiven": "some dateGiven",
//     "citation": "some citation
// }
//endpoint
// /qualification/createQualification 

//might need to edit this controller to check for member perms to
//see if they have the ability to create qual/qual Instances
const createQualification = async (req: Request, res: Response) => {
    try {
        let cookie: Cookie = await getCookies(req);
        let verify = await verifyToken(cookie.token);
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
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying admin"
            })
        }
        if (admin.orgPerms === 3) {
            return res.status(401).json({
                error: "Unauthorized to create qualification"
            })
        }
        let newQualification: Qualifications = req.body;
        newQualification.qualInstanceID = await createQualInstanceID();
        try {
            await createQualificationQuery(newQualification);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying and creating the new qualification"
            })
        }
        return res.status(200).json({
            message: "Created qualification"
        })
    } catch (Error) {
        return res.status(400).json({
            error: "Error creating qualification"
        })
    }
}


const getAllQualifications = async (req: Request, res: Response) => {
    try {
        let cookie: Cookie = await getCookies(req);
        let verify = await verifyToken(cookie.token);
        if (verify === null) {
            return res.status(401).json({
                error: "Unauthorized User"
            })
        }
        let orgID = req.cookies.orgID;
        let qualifications: any[];
        try {
            qualifications = await getQualificationFromOrgQuery(orgID);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying qualifications"
            })
        }
        return res.status(200).json({
            message: "Got all qualifications",
            qualifications: qualifications
        })
    } catch (Error) {
        return res.status(400).json({
            error: "Error getting all qualifications"
        })
    }
}

const getAllQualificationTypes = async (req: Request, res: Response) => {
    try {
        let cookie: Cookie = await getCookies(req);
        let verify = await verifyToken(cookie.token);
        if (verify === null) {
            return res.status(401).json({
                error: "Unauthorized User"
            })
        }
        let orgID = req.cookies.orgID;
        let qualifications: any[];
        try {
            qualifications = await getQualificationTypesFromOrgQuery(orgID);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying qualifications"
            })
        }
        return res.status(200).json({
            message: "Got all qualifications",
            qualifications: qualifications
        })
    } catch (Error) {
        return res.status(400).json({
            error: "Error getting all qualifications"
        })
    }
}
// REQUEST BODY:
// {
//     qualificationID: number
//     recievedBY: number,
//     qualificationType: number,
// }
//endpoint
// /qualification/deleteQualification

const deleteQualification = async (req: Request, res: Response) => {
    try {
        let cookie: Cookie = await getCookies(req);
        let verify = await verifyToken(cookie.token);
        if (verify === null) {
            return res.status(401).json({
                error: "Unauthorized User"
            })
        }
        let qualification = req.body.qualificationID;
        let recievedBy = req.body.recievedBy;
        let deleter = verify.userID;
        let orgID = req.cookies.orgID;
        let user: Member;
        try {
            user = await getMemberByUserIDQuery(deleter, orgID);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying user"
            })
        }
        try {
            // await deleteQualificationQuery(qualification, recievedBy, deleter);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying and deleting qualification"
            })
        }
        return res.status(200).json({
            message: "Deleted qualification " + qualification + " recieved by " + recievedBy + ", deleted by " + deleter
        });
    } catch (Error) {
        return res.status(400).json({
            error: "Error deleting qualification"
        })
    }
}

// REQUEST BODY:
// {
//     qualificationDescription: string,
//     qualificationImage: string,
//     qualificationTitle: string
// }
//endpoint
// /qualification/createQualificationType

const createQualificationType = async (req: Request, res: Response) => { //works
    try {
        let cookie: Cookie = await getCookies(req);
        let verify = await verifyToken(cookie.token);
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
        let newQualificationType: QualificationType = req.body;
        newQualificationType.qualificationID = createQualificationID();
        newQualificationType.org = org;
        console.log(newQualificationType);
        try {
            await createQualificationTypeQuery(newQualificationType);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying creating qualification type"
            })
        }
        return res.status(200).json({
            message: "Created qualification type"
        })
    } catch (Error) {
        return res.status(400).json({
            error: "Error creating qualification type"
        })
    }
}

// REQUEST BODY: 
// // interface QualificationType 
// {
//     qualificationID: number,
// }
//endpoint
// /qualification/deleteQualificationType

const deletequalificationType = async (req: Request, res: Response) => {
    try {
        let cookie: Cookie = await getCookies(req);
        let verify = await verifyToken(cookie.token);
        if (verify === null) {
            return res.status(401).json({
                error: "Unauthorized User"
            })
        }
        let org = req.cookies.orgID;
        let user: Member;
        try {
            user = await getMemberByUserIDQuery(verify.userID, org);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying user"
            })
        }
        try {
            if (user.orgPerms === 3) {
                return res.status(401).json({
                    error: "Not an admin or leader of organization"
                })
            }
        } catch (Error) {
            return res.status(500).json({
                error: "Error checking user permissions"
            })
        }
        try {
            // await deleteQualificationTypeQuery(req.body.qualificationID, user.memberID, verify.userID);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying and deleting qualification type"
            })
        }
        return res.status(200).json({
            message: "Deleted qualification type"
        })
    } catch (Error) {
        return res.status(400).json({
            error: "Error deleting qualification type"
        })
    }
}

export const getQualification = async (req: Request, res: Response) => {
    try {

    } catch (Error) {
        return res.status(400).json({
            error: "Error getting qualification"
        })
    }
}
export { createQualification, createQualificationType, getAllQualifications, deleteQualification, deletequalificationType, getAllQualificationTypes }

async function createQualInstanceID() {
    return Math.floor(Math.random() * 1000000);
}

function createQualificationID() {
    return Math.floor(Math.random() * 1000000);
}