import databaseConnection from "./databaseConnection";
import { CustomSection } from '../controllers/models';

async function getCustomSectionQuery(orgID: number, accessLevel: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT * FROM `Custom section` WHERE org = ? AND accessLevel = ?',
            [orgID, accessLevel],
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

async function createCustomSectionQuery(customSection: CustomSection): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'INSERT INTO `Custom section` (customSec_ID, accessLevel, plainText, thirdParty, docCreator, org, title, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [customSection.customSec_ID, customSection.accessLevel, customSection.plainText, customSection.thirdParty, customSection.docCreator, customSection.org, customSection.title, customSection.type],
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


async function getCustomSectionsFromOrgQuery(orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT * FROM `Custom section` WHERE org = ?',
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

async function getCustomSectionByIDQuery(customSec_ID: number, orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT * FROM `Custom section` WHERE customSec_ID = ? AND org = ?',
            [customSec_ID, orgID],
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

export { getCustomSectionQuery, createCustomSectionQuery, getCustomSectionsFromOrgQuery, getCustomSectionByIDQuery };