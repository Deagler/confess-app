## Getting Started

1. Download the Firebase Tools CLI https://firebase.google.com/docs/cli#install_the_firebase_cli

2. Download your firebase credentials (serviceAccountKey.json) and define the path with the `GOOGLE_APPLICATION_CREDENTIALS` environment variable in `functions\.env`
See: https://firebase.google.com/docs/admin/setup?authuser=1#initialize-sdk

3. `npm run start` in the `functions` directory to emulate Firebase Functions locally (note it is communicating with the prod db, careful.)

4. Navigate to `http://localhost:5001/confess-api/us-central1/graph` to access the GraphQL Playground