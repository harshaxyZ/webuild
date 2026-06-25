import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        // Replace escaped newline characters from the environment variables properly
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
          ?.replace(/^"|"$/g, "") // Strip literal wrapping double quotes if present
          ?.replace(/\\n/g, "\n"),
      }),
    });
  } catch (error) {
    console.error("Firebase admin initialization error", error);
  }
}

export const adminDb = admin.apps.length ? admin.firestore() : null;
