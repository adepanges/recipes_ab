const ENV = process.env.NODE_ENV || "development";
let BASE_URL = "http://localhost:3000";
let FIREBASE_CONFIG = {
    apiKey: "AIzaSyCmP2x2FKrOeGJan4_ra-ve2pXr9kKa6NM",
    authDomain: "develop-batik-giri-alam.firebaseapp.com",
    databaseURL: "https://develop-batik-giri-alam.firebaseio.com",
    projectId: "develop-batik-giri-alam",
    storageBucket: "develop-batik-giri-alam.appspot.com",
    messagingSenderId: "443045681683",
    appId: "1:443045681683:web:5233cf95d8706a5225fde6",
    measurementId: "G-9SR8L0881E"
}

if (ENV == "production"){
    BASE_URL = "https://recipes-ab.herokuapp.com";
}

export {
    BASE_URL,
    FIREBASE_CONFIG
};
export default ENV;