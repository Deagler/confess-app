# Confess

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
![confess-ci](https://github.com/Deagler/confess-app/workflows/confess-ci/badge.svg)

Confess is a web application for sharing and consuming high-quality thoughts, feelings, and memes with your peers anonymously and exclusively.

## Screenshots

### Desktop View

![Confess LandingPage](confessPreview/landingPage.png?raw=true 'landing')
![Confess PostPage](confessPreview/postPage.png?raw=true 'post')

### Mobile View

![Confess RegisterPage](confessPreview/mobileOverview.png?raw=true 'register')
![Confess CommentPage](confessPreview/mobileComment.png?raw=true 'comment')

## Core Features

- Passwordless signup with university email address.
- Anonymously create confessions with image support.
- Like, comment and share posts.
- Like and reply to comments.
- View and interact with confessions from other communities.
- Filter confessions by category.
- Sort confessions by likes, comments or creation date.
- Original Posters can star comments that are helpful.

## Setup Instructions

Due to Confess' integration with several third party cloud services (Firebase suite, SendGrid), the application cannot be developed on a purely local environment. Steps must be taken to setup each third party platform for integration with the local code.

### Firebase and SendGrid
1. Setup a firebase account
2. Setup a firebase project (React web app)
3. Update firebaseConfig with your credentials in `app\src\services\firebase\index.ts`
4. Specify the path to `GOOGLE_APPLICATION_CREDENTIALS` in `api\functions\.env` (see `api\functions\.env.example`)
5. You may need to set `GOOGLE_APPLICATION_CREDENTIALS` as an OS Environment Variable as well - as described [here](https://firebase.google.com/docs/admin/setup#initialize-sdk)
6. Setup `api\functions\.runtimeconfig.json` using `api\functions\.runtimeconfig.example.json`. Make sure you use the appropriate localhost URL here when running locally. (You will need a [SendGrid Account](https://sendgrid.com/)), You will also need to create and retrieve an [API key](https://sendgrid.com/docs/ui/account-and-settings/api-keys/#creating-an-api-key).
7. You will need to manually deploy the firebase functions config using the instructions [here](https://firebase.google.com/docs/functions/config-env#set_environment_configuration_for_your_project) 
e.g:
```
firebase functions:config:set confess.appurl="App URL/Domain e.g: https://confess.co.nz" sendgrid.apikey="Send Grid API Key"
```

8. Activate a Firestore database and update the URL in `api\functions\src\firebase.ts`
9. Update `api\.firebaserc` with your Firebase project id
10. Enable Passwordless Login on your project in the Auth section of the Firebase console.
11. Create the following three DB collections on your project `communities`, `landingPosts` and `users`
12. Contact us if you need help.

### Local

1. Clone the repository to your computer.

```
git clone https://github.com/Deagler/confess-app.git
```

2. Change directory into the cloned repository.

```
cd confess-app
```

3. Install the projects dependencies. As the project is managed with Lerna, simply install from the root package and all child packages will be installed automatically (from the root directory).

```
npm install
```

4. (Optional) Run the React Component tests.

```
cd app && npm test
```

5. Create a .env file for the `app` package. The provided default values should suffice.

```
cp app/.env.example app/.env
```

6. Create a .env file for the `api/functions` package. Start by copying the provided default values. The `GOOGLE_APPLICATION_CREDENTIALS` field should be modified to contain a path pointing to the credentials file downloaded earlier from the Firebase console.

```
cp api/functions/.env.example api/functions/.env
```

7. Create a .runtime.json file for the `api/functions` package. Start by copying the provided default values. The `sendgrid.apikey` field should be modified to contain the API identified earlier from the SendGrid console.

```
cp api/functions/.runtimeconfig.example.json api/functions/.runtimeconfig.json
```

8. Start the client and server together (from the root directory). Confess should open on http://localhost:3000.

```
npm start
```

## Technology Overview

### Lerna

Lerna is used to manage multiple packages (`app`, `api/functions`) in a mono repository. With Lerna, installing and running the app can be done with a single command. [Lerna Documentation](https://github.com/lerna/lerna)

### Ionic React

The Ionic React framework is used to build a progressive web app (PWA) with a single code base. The Ionic component library is also used extensively to provide native appearances across multiple devices. [Ionic Documentation](https://ionicframework.com/docs/react)

### Firebase

Firebase is a simple cloud hosting service that allows rapid development of web applications due to its powerful suite of tools. Firestore is a highly scalable NoSQL database with real time semantics. Firebase Authentication manages users and provides the mechanism for our passwordless authentication flow. Firebase Storage provides blob storage for our image uploads. Firebase Functions trigger on request to the Confess API and provide a serverless compute environment. Firebase Analytics are used to analyse user activity and to log errors. [Firebase Documentation](https://firebase.google.com/)

### GraphQL

GraphQL is a query language for APIs that allow the client to specify the exact data that they need. It prevents underfetching and overfetching, which are common limitations of RESTful APIs. [GraphQL Documentation](https://graphql.org/learn/)

### Apollo

Apollo Server integrates with Express.js and allows GraphQL queries to be run against a defined GraphQL schema. Apollo Client is used to make requests to the server, as well as for local state management. [Apollo Documentation](https://graphql.org/learn/)

## Documentation

For further documentation (including meeting minutes), please refer to the [Wiki](https://github.com/Deagler/confess-app/wiki)
