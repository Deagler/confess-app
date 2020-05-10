# confess-app

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
![confess-ci](https://github.com/Deagler/confess-app/workflows/confess-ci/badge.svg)

## Confess Overview
Confess is a web application for sharing and consuming high-quality thoughts, feelings, and memes with your peers anonymously and exclusively.
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

  Run tests

```bash
npm test
```


## Technology Overview

Lerna allows to build libraries and apps in a single repo without forcing us to publish to npm or other registries. They can find package dependencies by analyzing package. json files located at each project's root folder.

Ionic and Material-UI are used as we developed a cross-platform mobile and desktop compatiable website. - [Ionic Docs](https://ionicframework.com/docs)

Firebase is a cloud-based database hosting service. It is to store and retrieve data in real time. - [Firebase Docs](https://firebase.google.com)

Apollo is used for state and cache management, it provides consistent API across the platform for all clients. - [Apollo_Docs](https://www.apollographql.com/docs)

Using GraphQL, the page can obtain all of this data with a single query to a single endpoint.

Using Jest for testing purpose. - [Jest_Docs](https://jestjs.io/en/)



