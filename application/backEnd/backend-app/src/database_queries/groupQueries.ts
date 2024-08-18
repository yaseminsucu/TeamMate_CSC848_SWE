import databaseConnection from "./databaseConnection";
import { Groups } from "../controllers/models";

// {
//     groupID: number,
//     org: number,
//     sortOrder: number,
//     groupImage: string
// }
async function createGroupQuery(group: Groups): Promise<any> {
    return new Promise((resolve, reject) => {
        console.log('Executing createGroupQuery with group:', group);
        databaseConnection.query(
            'INSERT INTO `Groups` (`groupID`, `org`, `groupName`, `sortOrder`, `groupImage`) VALUES (?, ?, ?, ?, ?)',
            [group.groupID, group.org, group.groupName, group.sortOrder, group.groupImage],
            (err, results) => {
                if (err) {
                    console.error('Error executing createGroupQuery:', err);
                    reject(err);
                } else {
                    console.log('Successfully executed createGroupQuery:', results);
                    resolve(results);
                }
            }
        );
    });
}


async function getAllGroupsFromOrgQuery(orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT * FROM `Groups` WHERE org = ?',
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

async function getGroupFromOrgQuery(groupID: number, orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT * FROM `Groups` WHERE groupID = ? AND org = ?',
            [groupID, orgID],
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

export { createGroupQuery, getAllGroupsFromOrgQuery, getGroupFromOrgQuery };