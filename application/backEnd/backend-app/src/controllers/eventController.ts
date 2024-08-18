import { Event, EventReminder, Member, Cookie } from "./models";
import { getCookies, verifyToken } from "./authController";
import { getEventQuery, insertEventQuery, getEventByIDQuery, updateEvent, insertEventReminderQuery, getAllEventsFromOrg } from "../database_queries/eventQueries";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getMemberByUserIDQuery } from "../database_queries/memberQueries";

// REQUEST BODY
// {
//     "evenTitle: "string"
//     "eventDescription: "string"
//     "eventType: public/private/invite",
//     "eventDate: Date,"
//     "eventPrereqs": string,
// }
export const createEvent = async (req: Request, res: Response) => {
    try {
        let cookie: Cookie;
        try {
            cookie = await getCookies(req)
        } catch (Error) {
            return res.status(400).json({
                error: "No cookies found"
            })
        }
        let verify = await verifyToken(cookie.token)
        if (verify === null) {
            return res.status(401).json({
                error: "Unauthorized User"
            })
        }
        let newEvent: Event = req.body;
        let userID = req.cookies.userID;
        let orgID = req.cookies.orgID;
        let userCreator: Member;
        try {
            userCreator = await getMemberByUserIDQuery(userID, orgID);
        } catch (Error) {
            return res.status(500).json({
                message: "Error querying user creator for event"
            })
        }
        if (userCreator.orgPerms === 3) {
            return res.status(401).json({
                message: "Unauthorized to create an event for this organization"
            })
        }
        newEvent.eventID = await generateEventID();
        newEvent.org = orgID;
        try {
            await insertEventQuery(newEvent);
        } catch (Error) {
            return res.status(500).json({
                error: "Error creating event query"
            })
        }
        return res.status(200).json({
            message: "Created event"
        })
    } catch (Error) {
        return res.status(400).json({
            error: "Error creating event"
        })
    }
}

// Request Body
//{
//     eventID: number,
//     org:  number,
//     eventTitle: string,
//     eventDescription: string,
//     eventDate: Date,
//     eventType: string,
//     eventPrereqs: string
// }
export const editEvent = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const userID = req.cookies.userID;
        const orgID = req.cookies.orgID;

        if (!token || !userID || !orgID) {
            return res.status(401).json({
                error: 'Unauthorized user'
            })
        }

        const verify = await verifyToken(token);
        if (!verify) {
            return res.status(401).json({
                error: 'Unauthorized user'
            })
        }

        const userEditor = await getMemberByUserIDQuery(userID, orgID);
        if (!userEditor || userEditor.orgPerms !== 1) {
            return res.status(401).json({
                message: 'Unauthorized to edit the events for this organization'
            })
        }

        const event: Event = req.body;
        const existingEvent = await getEventByIDQuery(event.eventID, orgID);
        if (!existingEvent) {
            return res.status(404).json({
                error: 'Event not found'
            })
        }

        await updateEvent(event);
        return res.status(200).json({
            message: 'Event updated successfully'
        })

    } catch (error) {
        console.error('Error editing event:', error);
        return res.status(500).json({
            error: 'Error editing the event'
        })
    }
}

// REQUEST BODY
// {
//     eventReminderID: number,
//     event: number,
//     member: number,
//     eventAttended: number
// }

export const createEventReminderMember = async (req: Request, res: Response) => {
    try {
        let cookie;
        try {
            cookie = await getCookies(req)
        } catch (Error) {
            return res.status(400).json({
                error: "No cookies found"
            })
        }
        let verify = await verifyToken(cookie.token)
        if (verify === null) {
            return res.status(401).json({
                error: "Unauthorized User"
            })
        }

        let newEventReminder: EventReminder = req.body;

        newEventReminder.eventReminderID = await generateEventReminderID();

        newEventReminder.eventAttended = 0;

        let eventID = req.cookies.eventID;
        let newEvent: Event;
        try {
            newEvent = await getEventQuery(eventID);
        } catch (Error) {
            return res.status(500).json({
                message: "Error event doesn not exist"
            })
        }

        try {
            await insertEventReminderQuery(newEventReminder);
        } catch (Error) {
            return res.status(500).json({
                error: "Unable to do query to insert event reminder into EventReminder table"
            })
        }

        return res.status(200).json({
            message: "Event reminder created successfully"
        })
    } catch (Error) {
        return res.status(400).json({
            error: "Error creating event reminder"
        })
    }
}

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        let cookie: Cookie = await getCookies(req);
        let verify = await verifyToken(cookie.token);
        if (verify === null) {
            return res.status(401).json({
                error: "Unauthorized User"
            })
        }
        let orgID = req.cookies.orgID;
        let events: Event[];
        try {
            events = await getAllEventsFromOrg(orgID);
        } catch (Error) {
            return res.status(500).json({
                error: "Error querying events"
            })
        }
        return res.status(200).json({
            message: "Successfully got all events",
            events: events
        })
    } catch (Error) {
        return res.status(400).json({
            error: "Error getting all events"
        });
    }
}

export const getEventDetails = async (req: Request, res: Response) => {
    try {
        let cookie: Cookie;
        try {
            cookie = await getCookies(req);
        } catch (Error) {
            return res.status(401).json({
                error: 'No cookies found'
            });
        }
        let verify = await verifyToken(cookie.token);
        if (verify === null) {
            return res.status(401).json({
                error: 'Unauthorized User'
            });
        }
        let orgID = req.cookies.orgID;
        let eventID = req.body.eventID;
        let event: Event;
        try {
            event = await getEventByIDQuery(eventID, orgID);
        } catch (Error) {
            return res.status(500).json({
                error: 'Error fetching event'
            });
        }
        return res.status(200).json({
            message: 'Fetched event successfully',
            event: event
        });
    } catch (Error) {
        return res.status(400).json({
            error: "Error getting event details"
        })
    }
}

async function generateEventID(): Promise<number> {
    let ID: number = Math.floor(1000 + Math.random() * 9000);
    return ID;
}

async function generateEventReminderID(): Promise<number> {
    let ID: number = Math.floor(1000 + Math.random() * 9000);
    return ID;
}