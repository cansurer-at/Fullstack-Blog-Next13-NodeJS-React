import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "blog-react-cb00d.firebaseapp.com",
  projectId: "blog-react-cb00d",
  storageBucket: "blog-react-cb00d.appspot.com",
  messagingSenderId: "135938982436",
  appId: "1:135938982436:web:6318bf56571aa07e47ceb1",
  measurementId: "G-N4Z1KXJBV3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };
