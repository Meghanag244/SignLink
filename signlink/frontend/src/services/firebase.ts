import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAm8aeSjj_N4UCpCTbOHHPX_qFhi_MVzOA",
  authDomain: "signlinkappchat.firebaseapp.com",
  projectId: "signlinkappchat",
  storageBucket: "signlinkappchat.firebasestorage.app",
  messagingSenderId: "138033136650",
  appId: "1:138033136650:web:600941ee21f32c7899cbf3",
  measurementId: "G-MG1ZQBV2WJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage, analytics }; 