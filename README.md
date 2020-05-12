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
   Create the app:
```bash
$ git clone https://github.com/Deagler/confess-app.git
```
  Install dependencies:
```bash
$ npm install
```
  Config:

  copy content inside .env.example file to .env file under api and app directory, please notice that ``GOOGLE_APPLICATION_CREDENTIALS``needs to be    downloaded to local machine.

  copy content inside .runtimeconfig.example.json to .runtimeconfig.json


  Start the server:

```bash
npm run start
```

## Test

  Run tests. The tests cover initial rendering of components, new component created on submission, component state change, page loading test, login and logout workflow test etc.

```bash
npm test --watchAll
```

## Technology Overview

### Lerna

Lerna allows to build libraries and apps in a single repo without forcing us to publish to npm or other registries. They can find package dependencies by analyzing package. json files located at each project's root folder.

### Ionic-react and material UI
Ionic and Material-UI are used as external component libraries to create a cross-platform mobile and desktop compatiable website. - [Ionic Docs](https://ionicframework.com/docs)

### Typescript
TypeScript is a transpiled language. It simplifies JavaScript code, making it easier to read and debug. 

### React hook 
Hooks allow to reuse stateful logic without changing component hierarchy.

### Firebase, Firestore and cloud function
Firebase is a cloud-based database hosting service. It is to store and retrieve data in real time.

Firebase Authentication provides an easy way to authenicate sign in users, confess uses email link to authenticate users.

Firebase cloud-storage allows image uploaded by users to be stored on the server side.

Firebase cloud functions triggers when the event provider generates an event that matches the function's conditions. For instance, a new user attempts to sign in with email link then the cloud function will call onCreate() to register that user for the first time. 

Analytics is deployed to watch event log.- [Firebase Docs](https://firebase.google.com)

### Express and node.js
Express on node.js build API, combining the library with cloud functions we have deployed a severless platform. (a serverless vendor is charged based on usage).

### Apollo client, Apollo server, GraphQL
Apollo client is used for state and cache management, it provides consistent API across the platform for all clients. On the client, caches can prevent multiple queries from being called when not necessary. If the request is in the cache for that client, the request does not need to be called.

Apollo server can integrate with Express so that we can build our own schema. - [Apollo_Docs](https://www.apollographql.com/docs)

GraphQL provides a query layer and can simplify fetching operations for Firebase clients. 

Using GraphQL, the page can obtain all of this data with a single query to a single endpoint. 
A GraphQL query is used to read or fetch values while a mutation is used to write or post values. GraphQL query will get exactly what you want and not addtional attributes on the object. Therefore, we can restrict data that should be fetched from the server. GraphQL is strongly typed and the queries are based on fields and their associated data types. This type system catches many errors and requires no manual checks.

Resolves will return GraphQL queries into data. For example, in order to query all the posts(feed) under a community, we define a community object with a ``PostConnection`` property and it will return an array of posts. Because ``PostConnection`` is a child of community, we can use the parent community to then query the posts collection for all the posts with that community ID. - [GraphQL Docs](https://graphql.org/learn/)

### Jest

Using Jest for testing purpose. - [Jest_Docs](https://jestjs.io/en/)

### CSS-in-JS
Glamor shares most common attributes of other inline style / css-in-js systems - [Galmor docs](https://www.gatsbyjs.org/docs/glamor/)

