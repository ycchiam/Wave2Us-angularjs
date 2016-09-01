// Firebase Config
var config = {
	apiKey : "AIzaSyA7uEQKxfRbiwMuX7GkLWB01mwtP_IBiAw",
	authDomain : "wave-2-us.firebaseapp.com",
	databaseURL : "https://wave-2-us.firebaseio.com",
	storageBucket : "wave-2-us.appspot.com",
};

// Initialize Firebase
firebase.initializeApp(config); 
var db = firebase.database();
var auth = firebase.auth();

// Shared
var email = null;
var displayName = null;

