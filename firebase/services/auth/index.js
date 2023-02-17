import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const sessionChange = (saveUserData) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //   const normalizedUser = mapUserFromFirebaseAuthToUser(user);
      saveUserData(user);
    } else {
      saveUserData(null);
    }
  });
};

export const Login = (data, callback) => {
  const { email, password } = data;
  if ((email, password)) {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      switch (error.code) {
        case "auth/wrong-password":
          callback("Email/Contraseña incorrectos");
          break;
        case "auth/user-not-found":
          callback("Email/Contraseña incorrectos");
        default:
          callback("Hay un error, intente mas tarde");
      }

      setTimeout(() => {
        callback("");
      }, 3000);
    });
  }
};

export const logOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};
