import { Member, Cookie, Qualifications, QualificationType, AwardInstance } from './models';
import { getCookies, verifyToken } from './authController';
import { getMemberByUserIDQuery, getMemberIDQuery } from '../database_queries/memberQueries';
import { getUserQualificationFromOrgQuery } from '../database_queries/qualificationQueries';
import { getUserAwardsFromOrgQuery } from '../database_queries/awardQueries';
import { Request, Response } from 'express';

// Request Body:
// {
//     memberID: number
// }
export const generateUserProfile = async (req: Request, res: Response) => {
    try {
        let cookie: Cookie = await getCookies(req);
        let verify = await verifyToken(cookie.token);
        if (verify === null) {
            return res.status(401).json({
                error: "Unauthorized User"
            })
        }
        let org = req.cookies.orgID;
        let viewedMember: Member;
        let viewedQualifications: any[];
        let viewedAwards: any[];
        try {
            viewedMember = await getMemberByUserIDQuery(req.body.memberID, org);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying member"
            })
        }
        try {
            viewedQualifications = await getUserQualificationFromOrgQuery(req.body.memberID, org);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying qualifications"
            })
        }
        try {
            viewedAwards = await getUserAwardsFromOrgQuery(req.body.memberID, org);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying awards"
            })
        }
        return res.status(200).json({
            message: "Generated user profile",
            member: viewedMember,
            qualifications: viewedQualifications,
            awards: viewedAwards
        })
    } catch (Error) {
        return res.status(400).json({
            error: "Error generating user profile"
        })
    }
}

export const getUserID = async (req: Request, res: Response) => {
    try {
        const cookies = await getCookies(req);
        const userID = cookies.userID;

        if (!userID) {
            return res.status(404).json({ error: "User ID not found" });
        }

        return res.status(200).json({ userID });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};