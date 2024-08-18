import bycript from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
    return await bycript.hash(password,8);
}

async function verifyPassword(password: string, hashPassword: string): Promise<boolean> {
    return await bycript.compare(password, hashPassword);
}

function createOrganizationID(): Int16Array {
    let orgID = new Int16Array(10);
    for (let i = 0; i < orgID.length; i++) {
        orgID[i] = Math.floor(Math.random() * 10);
    }
     return orgID;
}

function CreateMemberID(): Int32Array {
    let memberID = new Int32Array(10);

    for (let i = 0; i < memberID.length; i++) {
        memberID[i] = Math.floor(Math.random() * 10);

    }
    return memberID;

}

function GetLastLoginDateTime(): Date {
    return new Date();
}



export { hashPassword, verifyPassword, createOrganizationID, CreateMemberID, GetLastLoginDateTime };