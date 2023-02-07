
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDngdgi6upssRMLsC_XYhDNRlpw-oUorgY",
    authDomain: "myblog-1b73b.firebaseapp.com",
    projectId: "myblog-1b73b",
    storageBucket: "myblog-1b73b.appspot.com",
    messagingSenderId: "237533500489",
    appId: "1:237533500489:web:cefed5f7b802ff8e4d9b98"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider();
export default app
