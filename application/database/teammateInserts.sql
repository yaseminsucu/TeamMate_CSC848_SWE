USE `TeammateDB`;
-- will be deleting from tables to clear any info held previously, and then the tables will be populated with inserts

-- this is okay to use according to professor discord message
SET SQL_SAFE_UPDATES = 0;

-- Delete from child tables first then delete parent tables last in order
DELETE FROM `Award Instance`;
DELETE FROM `Qualification Instance`;
DELETE FROM `Event Reminder`;

DELETE FROM `Award Type`;
DELETE FROM `Qualification Type`;
DELETE FROM `Events`;
DELETE FROM `Custom section`;
DELETE FROM `Comments`;

DELETE FROM `Member`;

DELETE FROM `Groups`;
DELETE FROM `Organizations`;

DELETE FROM `Registered Users`;

-- Insert into Registered Users table
INSERT INTO `Registered Users` (`userID`, `email`, `username`, `password`, `profilePicture`, `firstName`, `lastName`)
VALUES
    (1, 'user1@example.com', 'user1', 'password1', 'profile1.jpg', 'John', 'Doe'),
    (2, 'user2@example.com', 'user2', 'password2', 'profile2.jpg', 'Jane', 'Soe'),
    (3, 'user3@example.com', 'user3', 'password3', 'profile3.jpg', 'Karl', 'Koy'),
    (4, 'user4@example.com', 'user4', 'password4', 'profile4.jpg', 'Mila', 'Ava');

-- Insert into Organizations table
INSERT INTO `Organizations` (`orgID`, `orgName`, `orgOwner`, `orgDescription`)
VALUES
    (1, 'Organization 1', 1, 'Description for Organization 1'),
    (2, 'Organization 2', 2, 'Description for Organization 2');

-- Insert into Groups table
INSERT INTO `Groups` (`groupID`, `org`, `groupName`, `sortOrder`, `groupImage`)
VALUES
    (1, 1, 'Group 1', 1, 'group1.jpg'),
    (2, 2, 'Group 2', 1, 'group2.jpg');

-- Insert into Member table
INSERT INTO `Member` (`memberID`, `orgPerms`, `firstName`, `lastName`, `lastLogin`, `org`, `group`, `user`, `activeMember`, `sortOrder`)
VALUES
    (1, 1, 'John', 'Doe', NOW(), 1, 1, 1, 1, 1),
    (2, 1, 'Jane', 'Soe', NOW(), 2, 2, 2, 1, 1),
    (3, 2, 'Karl', 'Koy', NOW(), 1, 1, 3, 1, 2),
    (4, 2, 'Mila', 'Ava', NOW(), 2, 2, 4, 1, 2);

-- Insert into Award Type table
INSERT INTO `Award Type` (`awardID`, `awardDescription`, `awardImage`, `awardTitle`,`org`)
VALUES
    (1, 'Award Description 1', 'award1.jpg', 'Award 1', 1),
    (2, 'Award Description 2', 'award2.jpg', 'Award 2', 1);

-- Insert into Award Instance table
INSERT INTO `Award Instance` (`awardInstanceID`, `issuedBy`, `recievedBy`, `awardType`, `nominationStatus`, `dateGiven`, `citation`)
VALUES
    (1, 1, 3, 1, 1, NOW(), 'Citation for Award 1'),
    (2, 2, 4, 2, 1, NOW(), 'Citation for Award 2');

-- Insert into Qualification Type table
INSERT INTO `Qualification Type` (`qualificationID`, `qualificationDescription`, `qualificationImage`, `qualificationTitle`, `org`)
VALUES
    (1, 'Qualification Description 1', 'qualification1.jpg', 'Qualification title 1', 1),
    (2, 'Qualification Description 2', 'qualification2.jpg', 'Qualification title 2', 1);

-- Insert into Qualification Instance table
INSERT INTO `Qualification Instance` (`qualInstanceID`, `issuedBy`, `recievedBy`, `qualificationType`, `nominationStatus`, `dateGiven`, `citation`)
VALUES
    (1, 1, 3, 1, 1, NOW(), 'Citation for Qualification 1'),
    (2, 2, 4, 2, 1, NOW(), 'Citation for Qualification 2');

-- Insert into Events table
INSERT INTO `Events` (`eventID`, `org`, `eventTitle`, `eventDescription`, `eventDate`, `eventType`, `eventPrereqs`)
VALUES
    (1, 1, 'Event 1', 'Description for Event 1', NOW(), 'Type A', 'Prerequisites for Event 1'),
    (2, 2, 'Event 2', 'Description for Event 2', NOW(), 'Type B', 'Prerequisites for Event 2');

-- Insert into Custom section table
INSERT INTO `Custom section` (`customSec_ID`, `accessLevel`, `plainText`, `thirdParty`, `docCreator`, `org`, `title`, `type`)
VALUES
    (1, 1, 'Plain Text 1', 'Third Party 1', 1, 1, 'Title 1', 1),
    (2, 2, 'Plain Text 2', 'Third Party 2', 2, 2, 'Title 2', 1);

-- Insert into Comments table
INSERT INTO `Comments` (`commentID`, `userID`, `pageType`, `pageKey`, `comment`, `commentDate`)
VALUES
    ('comment1', 1, 'Page Type A', 1, 'Comment 1', NOW()),
    ('comment2', 2, 'Page Type B', 2, 'Comment 2', NOW());

-- Insert into Event Reminder table
INSERT INTO `Event Reminder` (`eventReminderID`, `event`, `member`, `eventAttended`)
VALUES
    (1, 1, 1, 1),
    (2, 2, 2, 1),
    (3, 1, 3, 1),
    (4, 2, 4, 1);


SET SQL_SAFE_UPDATES = 1;