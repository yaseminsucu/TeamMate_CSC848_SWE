// REINFORCE THESE INTERFACES BELOW FOR CONTROLLERS
interface Organization {
    orgID: number,
    orgName: string,
    orgOwner: number,
    orgDescription: string
}

interface RegisterUser {
    userID : number,
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    profilePicture ?: string,
    description ?: string
}

interface Member {
    memberID: number,
    orgPerms: number,
    firstName: string,
    lastName: string, 
    lastLogin: Date,
    org: number,
    group ?: number,
    user: number,
    activeMember: number,
    sortOrder: number
}

interface Search {
    searchQuery: string,
    searchType: string,
}

interface Cookie {
    userID: number,
    token: string
}

interface Event {
    eventID: number,
    org:  number,
    eventTitle: string,
    eventDescription: string,
    eventDate: Date,
    eventType: string,
    eventPrereqs: string
}

interface EventReminder {
    eventReminderID: number,
    event: number,
    member: number,
    eventAttended: number
}

interface Groups {
    groupID: number,
    org: number,
    groupName: string,
    sortOrder: number,
    groupImage: string
}

interface Comments {
    commendID: string
    userID: number,
    pageType: string,
    pageKey: number,
    comment: string,
    commentDate: Date
}

interface Qualifications {
    qualInstanceID: number,
    issuedBy: number,
    recievedBy: number, 
    qualificationType: number,
    nominationStatus: number,
    dateGiven: Date,
    citation: string
}

interface QualificationType {
    qualificationID: number,
    qualificationDescription: string,
    qualificationImage: string,
    qualificationTitle: string,
    org: number
}

interface CustomSection {
    customSec_ID: number,
    accessLevel: number,
    plainText: string,
    thirdParty: string,
    docCreator: number,
    org: number,
    title: string,
    type: number
}

interface AwardType {
    awardID: number,
    awardDescription: string,
    awardImage: string,
    awardTitle: string,
    org: number
}

interface AwardInstance {
    awardInstanceID: number,
    issuedBy: number,
    recievedBy: number,
    awardType: number,
    nominationStatus: number,
    dateGiven: Date,
    citation: string,
}

const JWT_SECRET_KEY = "this_is_a_secret_key";

export { Organization, RegisterUser, Member, Search, Cookie, Event, EventReminder, 
    Groups, Comments, QualificationType, Qualifications, CustomSection, AwardInstance, AwardType, JWT_SECRET_KEY};