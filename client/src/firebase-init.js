// Import FirebaseAuth and firebase.
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

// Configure Firebase.
const config = {
    apiKey: "AIzaSyAeImqKSwBwjyE-Kn7q2orAj1hznMzvIQM",
    authDomain: "strawberry-170e8.firebaseapp.com",
    databaseURL: "https://strawberry-170e8.firebaseio.com",
    projectId: "strawberry-170e8",
    storageBucket: "strawberry-170e8.appspot.com",
    messagingSenderId: "956863983339",
    appId: "1:956863983339:web:b7b28d56094028603818ae",
    measurementId: "G-J4HM7TWS8F",
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/signedIn",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
};

class SignInScreen extends React.Component {
    render() {
        return (
            <div>
                <h1>Foodies Project</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
        );
    }
}

export default SignInScreen;
