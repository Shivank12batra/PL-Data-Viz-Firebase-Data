dotenv = require('dotenv');
dotenv.config();
const shotsData = require('./data/shots');
const playersData = require('./data/players')
const { doc, setDoc } = require('firebase/firestore');
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
  };
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const teams = ['Arsenal', 'Manchester City', 'Manchester United',
               'Chelsea', 'Liverpool', 'Tottenham']

const createDoc = (teamData, collection, team, id) => {
    const docRef = doc(db, collection, team)
    setDoc(docRef, {id: id, name: team, data: teamData.data[team]})
    .then(() => console.log(`document successfully created for team ${team}, collection: ${collection}`))
    .catch(error => console.error('Error writing document:', error))
}

const seedData = () => {
    teams.map((team, idx) => {
        createDoc(shotsData, 'teamShotsData', team, idx + 1)
        createDoc(playersData, 'teamPlayersData', team, idx + 1)
    })
}

seedData();