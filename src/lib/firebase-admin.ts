
import * as admin from 'firebase-admin';

let serviceAccount: admin.ServiceAccount | undefined;

try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY && process.env.FIREBASE_SERVICE_ACCOUNT_KEY !== '<YOUR_FIREBASE_SERVICE_ACCOUNT_KEY_JSON>') {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    } else {
        console.warn("Firebase Admin SDK service account key is not set or is a placeholder. Server-side auth will not work.");
    }
} catch(e) {
    console.error("Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:", e);
}


if (!admin.apps.length && serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else if (!admin.apps.length) {
    console.warn("Firebase Admin SDK not initialized. No service account provided.");
}

function getAuth() {
    if (!admin.apps.length) {
        return null;
    }
    return admin.auth();
}

function getDb() {
    if (!admin.apps.length) {
        return null;
    }
    return admin.firestore();
}

export const auth = getAuth();
export const db = getDb();
