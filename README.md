# confess-app

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
![confess-ci](https://github.com/Deagler/confess-app/workflows/confess-ci/badge.svg)

## Confess Overview
Confess is a web application for sharing and consuming high-quality thoughts, feelings, and memes with your peers anonymously and exclusively.
 
 Desktop and Mobile View:
![Confess LandingPage](confessPreview/landingPage.png?raw=true "landing")
![Confess PostPage](confessPreview/postPage.png?raw=true "post")
 
![Confess RegisterPage](confessPreview/mobileOverview.png?raw=true "register")
![Confess CommentPage](confessPreview/mobileComment.png?raw=true "comment")

## Features

  * Sign up with email address
  * Write new posts with upload image options
  * Comment new posts
  * Like posts
  * Share posts
  * View posts across different communities
  * Filter posts by channels under a community
  * Sort posts by popularity, most recent, and controversy 

## Quick Start
### Clone the repository
```bash
$ git clone https://github.com/Deagler/confess-app.git
```

### Install dependencies
```bash
$ npm install
```
### Configuration
Environment files `app/.env`, `api/functions/.env` and `api/functions/.runtimeconfig.json` need to be created, following their examples in the same folder.
  
Note: `GOOGLE_APPLICATION_CREDENTIALS` refers to a JSON credentials file that needs to be downloaded from the Firebase console.

### Start the server
```bash
npm run start
```

## Test
```bash
cd app && npm test --watchAll
```
# Environment Setup

## Firebase

1. Setup a firebase account
2. Setup a firebase project (React web app)
3. Update firebaseConfig with your credentials in `app\src\services\firebase\index.ts`
4. Specify the path to `GOOGLE_APPLICATION_CREDENTIALS` in `api\functions\.env` (see `api\functions\.env.example`)
5. You may need to set `GOOGLE_APPLICATION_CREDENTIALS` as an OS Environment Variable as well - as described [here](https://firebase.google.com/docs/admin/setup#initialize-sdk)
6. Setup `api\functions\.runtimeconfig.json` using `api\functions\.runtimeconfig.example.json`. Make sure you use the appropriate localhost URL here when running locally. (You will need a [SendGrid Account](https://sendgrid.com/)) 
7. You will need to manually deploy the firebase functions config using the instructions [here](https://firebase.google.com/docs/functions/config-env#set_environment_configuration_for_your_project) 
e.g:

 `firebase functions:config:set confess.appurl="App URL/Domain e.g: https://confess.co.nz" sendgrid.apikey="Send Grid API Key"`

 8. Activate a Firestore database and update the URL in `api\functions\src\firebase.ts`
 9. Update `api\.firebaserc` with your Firebase project id
 10. Enable Passwordless Login on your project in the Auth section of the Firebase console.
 11. Create the following three DB collections on your project `communities`, `landingPosts` and `users`
 12. Contact us if you need help 


# Technology Overview

### Lerna
Lerna manages multiple packages (`app`, `api`) in a mono repository. Lerna simplifies installing dependencies and starting applications across multiple local packages. [Lerna](https://lerna.js.org/)

### Ionic-react and material UI
Ionic and Material-UI are used as external component libraries to create a cross-platform mobile and desktop compatiable website. - [Ionic Docs](https://ionicframework.com/docs)

### Typescript
Typescript offers static typing on top of traditional Javascript. Simple errors can be caught earlier in the development process.

### React hook 
Hooks allow to reuse stateful logic without changing component hierarchy.

### Firebase
Firebase is a simple cloud hosting service.

Firestore is a highly scalable, NoSQL database with real time semantics.

Firebase Authentication provides the mechanism for email based, passwordless authentication.

Firebase Storage provides a platform where user image uploads can be stored and served.

Firebase Functions trigger on requests to the Confess API and spin up an Express.js server.

Firebase Analytics are used to analyse user activity and to log errors. 

[Firebase Docs](https://firebase.google.com)

### Express and Node.js
An express server is executed serverlessly using Firebase Functions, providing scalability and a pay-as-you-use structure.

### Apollo client, Apollo server, GraphQL
Apollo client is used for local state and cache management; it provides consistent API across the platform for all clients. On the client, caching can prevent redundant queries by serving the result from the cache instead of from the server.

Apollo-server integrates with express to support our GraphQL schema - [Apollo_Docs](https://www.apollographql.com/docs)

GraphQL provides a query layer and that simplifies and provides customisability to query clients.

A GraphQL query is used to read or fetch values while a mutation is used to write or post values. GraphQL queries can be tailored to only request the exact data needed. GraphQL is strongly typed, useful for catching errors early in the development process.

[GraphQL Docs](https://graphql.org/learn/)

### Jest
The Jest testing framework is used to test the functionality and presentation of React components. - [Jest_Docs](https://jestjs.io/en/)

### CSS-in-JS
Glamor shares most common attributes of other inline style / css-in-js systems - [Glamor docs](https://www.gatsbyjs.org/docs/glamor/)

## Documentation
For further documentation, please refer to the [Wiki](https://github.com/Deagler/confess-app/wiki)
