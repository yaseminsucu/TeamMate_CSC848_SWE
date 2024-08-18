import databaseConnection from "./databaseConnection";
import { Organization } from '../controllers/models';


// TO DO: Implement the getOrganizations function
async function getOrganizationsQuery(): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query('SELECT * FROM Organizations', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}


// TO DO: Implement the insertOrganization function
async function insertOrganizationQuery(organization: Organization): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'INSERT INTO Organizations (orgName, orgOwner, orgDescription, orgID) VALUES (?, ?, ?, ?)',
            [organization.orgName, organization.orgOwner, organization.orgDescription, organization.orgID],
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

async function deleteOrganizationQuery(organizationID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'DELETE FROM Organizations WHERE orgID = ?',
            [organizationID],
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

async function userOrganizationsQuery(userID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT o.*
            FROM Organizations o
            JOIN Member m ON o.orgID = m.org
            WHERE m.user = ?
        `;
        databaseConnection.query(query, [userID], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}


// Check if the OrganizationID is taken already
async function checkOrgIDQuery(orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT * FROM organizations WHERE orgID = ?',
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

export { getOrganizationsQuery, insertOrganizationQuery, deleteOrganizationQuery, checkOrgIDQuery, userOrganizationsQuery };