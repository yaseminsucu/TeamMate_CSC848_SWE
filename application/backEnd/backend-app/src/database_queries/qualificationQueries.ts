import { Request, Response } from "express";
import { QualificationType, Qualifications } from "../controllers/models";
import databaseConnection from "./databaseConnection";

async function createQualificationTypeQuery(qualificationType: QualificationType): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'INSERT INTO `Qualification Type` (`qualificationID`, `qualificationDescription`, `qualificationImage`, `qualificationTitle`, `org`) VALUES (?, ?, ?, ?, ?)',
            [qualificationType.qualificationID, qualificationType.qualificationDescription, qualificationType.qualificationImage, qualificationType.qualificationTitle, qualificationType.org],
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

async function deleteQualificationTypeQuery(qualificationID: number, memberID: number, deleterID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'DELETE FROM `Qualification Type` WHERE qualificationID = ? AND memberID = ? AND deleterID = ?',
            [qualificationID, memberID, deleterID],
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

async function createQualificationQuery(qualification: Qualifications): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'INSERT INTO `Qualification Instance` (`qualInstanceID`, `issuedBy`, `recievedBy`, `qualificationType`, `nominationStatus`, `dateGiven`, `citation`) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [qualification.qualInstanceID, qualification.issuedBy, qualification.recievedBy, qualification.qualificationType, qualification.nominationStatus, qualification.dateGiven, qualification.citation],
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

async function deleteQualificationQuery(qualInstanceID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'DELETE FROM `Qualification Instance` WHERE qualInstanceID = ?',
            [qualInstanceID],
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

async function getUserQualificationFromOrgQuery(userID: number, orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        let query: string =
            `SELECT 
                qt.qualificationTitle,
                q.qualInstanceID,
                q.recievedBy,
                q.qualificationType,
                qt.qualificationID,
                qt.org
            FROM \`Qualification Instance\` q
            INNER JOIN 
                \`Qualification Type\` qt ON q.qualificationType = qt.qualificationID
            WHERE 
                q.recievedBy = ? AND qt.org = ?`;
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

async function getQualificationFromOrgQuery(orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        let query: string =
            `SELECT 
                qt.qualificationTitle,
                qi.qualInstanceID,
                qi.recievedBy,
                qi.qualificationType,
                qt.qualificationID,
                qt.org
            FROM \`Qualification Instance\` qi
            INNER JOIN 
                \`Qualification Type\` qt ON qi.qualificationType = qt.qualificationID
            WHERE 
                qt.org = ?`;
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

async function getQualificationTypesFromOrgQuery(orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT * FROM `Qualification Type` WHERE org = ?',
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

export {
    createQualificationTypeQuery, deleteQualificationTypeQuery, createQualificationQuery, deleteQualificationQuery, getUserQualificationFromOrgQuery, getQualificationFromOrgQuery,
    getQualificationTypesFromOrgQuery
};