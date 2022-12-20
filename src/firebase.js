// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'XXXXXXXXXXXXXX',
  authDomain: 'nft-trading-market-7e98b.firebaseapp.com',
  projectId: 'nft-trading-market-7e98b',
  storageBucket: 'nft-trading-market-7e98b.appspot.com',
  messagingSenderId: 'XXXXXXXXXXXXXX',
  appId: 'XXXXXXXXXXXXXX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
