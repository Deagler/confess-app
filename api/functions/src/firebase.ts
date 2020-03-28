import admin from 'firebase-admin';


export const firebaseApp = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: `https://confess-api.firebaseio.com`
});
