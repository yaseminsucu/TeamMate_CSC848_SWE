import databaseConnection from "./databaseConnection";
import { AwardInstance, AwardType } from "../controllers/models";

async function createAwardInstanceQuery(awardInstance: AwardInstance): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'INSERT INTO `Award Instance` (`awardInstanceID`, `issuedBy`, `recievedBy`, `awardType`, `nominationStatus`, `dateGiven`, `citation`) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [awardInstance.awardInstanceID, awardInstance.issuedBy, awardInstance.recievedBy, awardInstance.awardType, awardInstance.nominationStatus, awardInstance.dateGiven, awardInstance.citation],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        );
    });
}

async function getUserAwardInstancesQuery(memberID: number, orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT ai.*
            FROM \`Award Instance\` ai
            JOIN \`Award Type\` at ON ai.awardType = at.awardID
            WHERE ai.recievedBy = ? AND at.org = ?
        `;
        databaseConnection.query(
            query,
            [memberID, orgID],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        );
    });
}

async function createAwardTypeQuery(awardType: AwardType): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'INSERT INTO `Award Type` (`awardID`, `awardDescription`, `awardImage`, `awardTitle`,`org`) VALUES (?, ?, ?, ?, ?)',
            [awardType.awardID, awardType.awardDescription, awardType.awardImage, awardType.awardTitle, awardType.org],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        );
    });
}

async function getAwardTypeQuery(orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT * FROM `Award Type` WHERE org = ?',
            [orgID],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        );
    });
}

async function getUserAwardsFromOrgQuery(userID: number, orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        let query: string =
            `SELECT 
                at.awardTitle,
                a.awardInstanceID,
                a.recievedBy,
                a.awardType,
                at.awardID,
                at.org
            FROM \`Award Instance\` a
            INNER JOIN 
                \`Award Type\` at ON a.awardType = at.awardID
            WHERE 
                a.recievedBy = ? AND at.org = ?`;
        databaseConnection.query(
            query,
            [userID, orgID],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        )
    })
}

async function getAwardInstancesFromOrgQuery(orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        let query: string =
            `SELECT 
                at.awardTitle,
                ai.awardInstanceID,
                ai.recievedBy,
                ai.awardType,
                at.awardID,
                at.org
            FROM \`Award Instance\` qi
            INNER JOIN 
                \`Award Type\` at ON ai.qualificationType = at.qualificationID
            WHERE 
                at.org = ?`;
        databaseConnection.query(
            query,
            [orgID],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        )
    })
}

export { createAwardInstanceQuery, createAwardTypeQuery, getAwardTypeQuery, getUserAwardInstancesQuery, getAwardInstancesFromOrgQuery, getUserAwardsFromOrgQuery };