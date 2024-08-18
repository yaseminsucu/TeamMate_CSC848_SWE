import databaseConnection from "./databaseConnection";
import { Member } from '../controllers/models';
import { RowDataPacket } from "mysql2";

// NEEDS TO RETURN A LIST OF PROMISES FROM A SPECIFIC ORGANIZATION
async function getMembersFromOrganizationQuery(orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT * FROM Member WHERE org = ?',
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

async function insertMemberIntoOrganizationQuery(member: Member): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'INSERT INTO Member (memberID, orgPerms, firstName, lastName, lastLogin, org, `group`, user, activeMember, sortOrder ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [member.memberID, member.orgPerms, member.firstName, member.lastName, member.lastLogin, member.org, member.group, member.user, member.activeMember, member.sortOrder],
            (err, results) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        )
    })
}


async function getNumberOfMembersTotalQuery(): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT COUNT(*) as rowCount FROM Member',
            (err, results: RowDataPacket[]) => {
                if (err) {
                    reject(err);
                } else {
                    // Extract rowCount from results
                    const rowCount = results[0].rowCount;
                    resolve(rowCount);
                }
            }
        )
    });
}

async function getMemberIDQuery(memberID: number, orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'DELETE FROM Member WHERE memberID = ? AND org = ?',
            [memberID, orgID],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        )
    });
}

async function removeMemberFromOrganizationQuery(memberID: number, orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'DELETE FROM Member WHERE memberID = ? AND org = ?',
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

async function getMemberByUserIDQuery(userID: number, orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT * FROM Member WHERE user = ? AND org = ?',
            [userID, orgID],
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
    getMembersFromOrganizationQuery, insertMemberIntoOrganizationQuery,
    removeMemberFromOrganizationQuery, getMemberIDQuery, getNumberOfMembersTotalQuery,
    getMemberByUserIDQuery
};