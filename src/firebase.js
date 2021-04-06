import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBhlO_ndcMjcYa2AT1fCSiVE2dZQp9o1OU',
	authDomain: 'mulyamitra-app.firebaseapp.com',
	projectId: 'mulyamitra-app',
	storageBucket: 'mulyamitra-app.appspot.com',
	messagingSenderId: '33043588810',
	appId: '1:33043588810:web:2ed593140792f9baec3633',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
