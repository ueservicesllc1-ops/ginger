import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getAuth, Auth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBhx4Wh_SirZNp-N7lYwec94PVEzw6btYw',
  authDomain: 'ginger-6dba3.firebaseapp.com',
  projectId: 'ginger-6dba3',
  storageBucket: 'ginger-6dba3.firebasestorage.app',
  messagingSenderId: '62997665531',
  appId: '1:62997665531:web:18ae79c8aa5cd9a913825e',
  measurementId: 'G-MJT26GG2W2',
};

// Initialize Firebase
let app: FirebaseApp;
let db: Firestore;
let auth: Auth | null = null;
let analytics: Analytics | null = null;

if (typeof window !== 'undefined') {
  // Solo en el cliente
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  
  db = getFirestore(app);
  auth = getAuth(app);
  
  // Analytics solo funciona en el navegador
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} else {
  // En el servidor, necesitamos inicializar de forma diferente
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  db = getFirestore(app);
  // Auth no se inicializa en el servidor
}

export { app, db, auth, analytics };
export default app;


