# social-network-api

This is an API created for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```
## Tech
Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Screenshot
![image](https://github.com/AshtonJ7/social-network-api/assets/62944042/b6738296-76b3-4a1a-b5d2-b42b50fc6beb)

## Walkthrough

[Link] (https://drive.google.com/file/d/1-nae_OLsXWW0EF7IbsTd8blr5yr4BWvZ/view?usp=drive_link)

## Usage / Installation

- Git Clone Repo
- Open IDE
- ``npm start`` to start server on local host
- Test using API tester such as Insominia or Postman
