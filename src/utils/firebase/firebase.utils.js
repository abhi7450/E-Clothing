import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Firebase Config from the site
const firebaseConfig = {
    apiKey: "AIzaSyDLVSvIQfPiT8YLgqqHiBMkQnQ_q8ePXXQ",
    authDomain: "e-clothing-db-5aa75.firebaseapp.com",
    projectId: "e-clothing-db-5aa75",
    storageBucket: "e-clothing-db-5aa75.appspot.com",
    messagingSenderId: "51544833816",
    appId: "1:51544833816:web:e982fc02165c83cc55286d",
};

// initialize
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth(firebaseApp);

// Google
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const signInWithFacebookRedirect = () => signInWithRedirect(auth, facebookProvider);

// Connecting the Firestore
const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;

    // Receive Documents Reference
    const userDocRef = doc(db, "users", userAuth.uid);

    // fetch the data
    const userSnapshot = await getDoc(userDocRef); // allows the instance exists and also allows to access the data

    // if user data doesnot exists
    // create  / set the document with the data from the userAuth in my Collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo,
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }
    // if user data exists
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};
