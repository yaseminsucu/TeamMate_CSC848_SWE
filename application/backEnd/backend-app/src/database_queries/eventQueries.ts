import databaseConnection from "./databaseConnection";
import { Event, EventReminder } from '../controllers/models';

// TO DO: Implement the insertOrganization function
async function insertEventQuery(event: Event): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'INSERT INTO Events (eventID, org, eventTitle, eventDescription, eventDate, eventType, eventPrereqs) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [event.eventID, event.org, event.eventTitle, event.eventDescription, event.eventDate, event.eventType, event.eventPrereqs],
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

// This query gets an event with eventID from the Events table in the database
async function getEventQuery(eventID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT * FROM `Events` WHERE eventID = ?',
            [eventID],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        )
    })
}

// This query inserts an event reminder into the EventReminder table in the database
async function insertEventReminderQuery(eventReminder: EventReminder): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'INSERT INTO `Event Reminder` (eventReminderID, event, member, eventAttended) VALUES (?,?,?,?)',
            [eventReminder.eventReminderID, eventReminder.event, eventReminder.member, eventReminder.eventAttended],
            (err, results) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            }
        )
    })
}

async function getEventByIDQuery(eventID: number, orgID: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT * FROM Events WHERE eventID = ? AND org = ?',
            [eventID, orgID],
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

async function updateEvent(event: Event): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        databaseConnection.query(
            'UPDATE Events SET eventTitle = ?, eventDescription = ?, eventDate = ?, eventType = ?, eventPrereqs = ? WHERE eventID = ? AND org = ?',
            [event.eventTitle, event.eventDescription, event.eventDate, event.eventType, event.eventPrereqs, event.eventID, event.org],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

async function getAllEventsFromOrg(org: number): Promise<any> {
    return new Promise((resolve, reject) => {
        databaseConnection.query(
            'SELECT * FROM Events WHERE org = ?',
            [org],
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

export { insertEventQuery, getEventQuery, insertEventReminderQuery, getEventByIDQuery, updateEvent, getAllEventsFromOrg };