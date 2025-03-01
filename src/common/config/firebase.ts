import admin from "firebase-admin";

const firebaseConfig = {
  apiKey: "AIzaSyCSIYvT2cl-Z8iw1OK5ktaplGrsLhxu8gU",
  authDomain: "phantomsecondline-9e67b.firebaseapp.com",
  projectId: "phantomsecondline-9e67b",
  storageBucket: "phantomsecondline-9e67b.firebasestorage.app",
  messagingSenderId: "981791670919",
  appId: "1:981791670919:web:becdfbc155b3d1b515ae22",
  measurementId: "G-B3XC87JQM9"
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

export const messaging = admin.messaging();
