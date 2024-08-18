import { Request, Response } from 'express';
import { Trie } from "../dev_tools/autoComplete";
import rankSearched from '../dev_tools/rankSearch';
import { Search, Cookie, Event, Groups, CustomSection } from './models';
import { Member, JWT_SECRET_KEY } from './models';
import { getMembersFromOrganizationQuery } from '../database_queries/memberQueries';
import { getQualificationFromOrgQuery, getQualificationTypesFromOrgQuery } from '../database_queries/qualificationQueries';
import { getCookies, verifyToken } from './authController';
import { getAllEventsFromOrg } from '../database_queries/eventQueries';
import { getAllGroupsFromOrgQuery } from '../database_queries/groupQueries';

import jwt, { verify } from 'jsonwebtoken';
import { getAwardInstancesFromOrgQuery, getAwardTypeQuery } from '../database_queries/awardQueries';
import { getCustomSectionQuery, getCustomSectionsFromOrgQuery } from '../database_queries/customSection';

// REQUEST BODY:
// {
//     "searchQuery": "some search query"
//     ""
// }
export const autoCompleteSearch = async (req: Request, res: Response) => {

    try {
        try {
            let token = req.cookies.token;
            let decoded = jwt.verify(token, JWT_SECRET_KEY);
            if (decoded === null) {
                throw new Error('Unauthorized User');
            }
        } catch (Error) {
            res.status(401).json({
                error: 'Unauthorized User'
            });
        }
        let searchQuery: string = req.body.searchQuery;
        // Query words from the database
        let members: Member[] = await getMembersFromOrganizationQuery(req.cookies.orgID);
        let queryWords: string[] = members.map((members) => members.firstName + " " + members.lastName);
        const completer = new Trie();
        for (const word of queryWords) {
            completer.insert(word);
        }
        const prefix: string = searchQuery;
        const result: string[] = completer.search(prefix);
        res.status(200).json({
            queryResults: result
        });
    } catch (Error) {
        res.status(400).json({
            error: 'Error searching for topic'
        });
    }
}

// interface Search 
//{
//     searchQuery: string,
//     searchType: string,
// }
export const rankedSearch = async (req: Request, res: Response) => {
    interface qual {
        qualificationTitle: string,
        qualificationInstanceID: number,
        recievedBy: number,
        qualificationType: number,
        nominationStatus: number,
        org: number,
    }

    interface award {
        awardTitle: string,
        awardInstanceID: number,
        recievedBy: number,
        awardType: number,
        awardID: number,
        org: number,
    }

    try {
        let cookie: Cookie = await getCookies(req);
        let verified = verifyToken(cookie.token);
        if (verified === null) {
            return res.status(401).json({
                error: "Unauthorized User"
            });
        }
        let searchQuery: Search = req.body;
        let org = req.cookies.orgID;
        if (searchQuery.searchType === "members") {
            let members: Member[] = await getMembersFromOrganizationQuery(org);
            let rankedMembers: any = rankSearched(searchQuery.searchQuery, members.map((member) => member.firstName + " " + member.lastName));
            let sortedMembers: Member[] = rankedMembers.map((rankedMember: { item: string, score: number }) => {
                return members.find(member => (member.firstName + " " + member.lastName) === rankedMember.item);
            }).filter((member: Member | undefined): member is Member => member !== undefined);
            return res.status(200).json({
                message: "Search for members",
                queryResult: sortedMembers
            });
        }
        else if (searchQuery.searchType === "qualifications") {
            let qualifications: qual[] = await getQualificationTypesFromOrgQuery(org);
            let rankedQualifications = rankSearched(searchQuery.searchQuery, qualifications.map((qualification) => qualification.qualificationTitle));
            let sortedQualifications: qual[] = rankedQualifications.map((rankedQualification: { item: string, score: number }) => {
                return qualifications.find(qualification => qualification.qualificationTitle === rankedQualification.item);
            }).filter((qualification: qual | undefined): qualification is qual => qualification !== undefined);
            return res.status(200).json({
                message: "Search for qualifications",
                queryResult: sortedQualifications
            });
        }
        else if (searchQuery.searchType === "awards") {
            let awards: award[] = await getAwardTypeQuery(org);
            let rankedAwards = rankSearched(searchQuery.searchQuery, awards.map((award) => award.awardTitle));
            let sortedAwards: award[] = rankedAwards.map((rankedAward: { item: string, score: number }) => {
                return awards.find(award => award.awardTitle === rankedAward.item);
            }).filter((award: award | undefined): award is award => award !== undefined);
            return res.status(200).json({
                message: "Search for awards",
                queryResult: sortedAwards
            });
        }
        else if (searchQuery.searchType === "events") {
            let events: Event[] = await getAllEventsFromOrg(org);
            let rankedEvents = rankSearched(searchQuery.searchQuery, events.map((event) => event.eventTitle));
            let sortedEvents: Event[] = rankedEvents.map((rankedEvent: { item: string, score: number }) => {
                return events.find(event => event.eventTitle === rankedEvent.item);
            }).filter((event: Event | undefined): event is Event => event !== undefined);
            return res.status(200).json({
                message: "Search for events",
                queryResult: sortedEvents
            });
        }
        else if (searchQuery.searchType === "groups") {
            let groups: Groups[] = await getAllGroupsFromOrgQuery(org);
            let rankedGroups = rankSearched(searchQuery.searchQuery, groups.map((group) => group.groupName));
            let sortedGroups: Groups[] = rankedGroups.map((rankedGroup: { item: string, score: number }) => {
                return groups.find(group => group.groupName === rankedGroup.item);
            }).filter((group: Groups | undefined): group is Groups => group !== undefined);
            return res.status(200).json({
                message: "Search for groups",
                queryResult: sortedGroups
            });
        }
        else if (searchQuery.searchType === "task") {
            let customs: CustomSection[] = await getCustomSectionsFromOrgQuery(org);
            let tasks = customs.filter(custom => custom.type === 1);
            let rankedCustoms = rankSearched(searchQuery.searchQuery, tasks.map((task) => task.title));
            let sortedCustoms: CustomSection[] = rankedCustoms.map((rankedCustom: { item: string, score: number }) => {
                return customs.find(custom => custom.title === rankedCustom.item);
            }).filter((custom: CustomSection | undefined): custom is CustomSection => custom !== undefined);
            return res.status(200).json({
                message: "Search for tasks sections",
                queryResult: sortedCustoms
            });
        }
        else if (searchQuery.searchType === "highlight") {
            let customs: CustomSection[] = await getCustomSectionsFromOrgQuery(org);
            let tasks = customs.filter(custom => custom.type === 2);
            let rankedCustoms = rankSearched(searchQuery.searchQuery, tasks.map((task) => task.title));
            let sortedCustoms: CustomSection[] = rankedCustoms.map((rankedCustom: { item: string, score: number }) => {
                return customs.find(custom => custom.title === rankedCustom.item);
            }).filter((custom: CustomSection | undefined): custom is CustomSection => custom !== undefined);
            return res.status(200).json({
                message: "Search for highlights sections",
                queryResult: sortedCustoms
            });
        }
    } catch (Error) {
        return res.status(400).json({
            error: 'Error searching for topic'
        });
    }
}

function filterByPermissions(orgPerms: number, members: Member[]): Member[] {
    return members.filter(member => member.orgPerms === orgPerms);
}