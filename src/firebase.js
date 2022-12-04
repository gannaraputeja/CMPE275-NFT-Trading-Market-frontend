// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyABrPRnRZwP1xdaTlhxDSgX8d97vf63jFk',
  authDomain: 'nft-trading-market-7e98b.firebaseapp.com',
  projectId: 'nft-trading-market-7e98b',
  storageBucket: 'nft-trading-market-7e98b.appspot.com',
  messagingSenderId: '2694610353',
  appId: '1:2694610353:web:2cf0f6914751d2bd3f1190',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
