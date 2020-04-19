import * as rawFirebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyDHHKY6qm3nAznBa8hj3XDqJGZXowu6rxU',
  authDomain: 'confess-api.firebaseapp.com',
  databaseURL: 'https://confess-api.firebaseio.com',
  projectId: 'confess-api',
  storageBucket: 'confess-api.appspot.com',
  messagingSenderId: '59473781138',
  appId: '1:59473781138:web:9351bf9cc86686186c614b',
  measurementId: 'G-8ZGSY3QL4B',
};

// Initialize Firebase
export const firebaseApp = rawFirebase.initializeApp(firebaseConfig);

export const firebaseAnalytics = firebaseApp.analytics();
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  firebaseAnalytics.setAnalyticsCollectionEnabled(false);
} else {
  firebaseAnalytics.setAnalyticsCollectionEnabled(true);
}
