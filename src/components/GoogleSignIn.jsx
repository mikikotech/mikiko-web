import React from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithCredential,
  signInWithCustomToken,
  FacebookAuthProvider,
} from "firebase/auth";
import { Button } from "@mui/material";
const GoogleSignIn = () => {
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    const auth = getAuth();

    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;

      console.log(user);
      //   const q = query(collection(db, "users"), where("uid", "==", user.uid));
      //   const docs = await getDocs(q);
      //   if (docs.docs.length === 0) {
      //     await addDoc(collection(db, "users"), {
      //       uid: user.uid,
      //       name: user.displayName,
      //       authProvider: "google",
      //       email: user.email,
      //     });
      //   }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          signInWithGoogle();
        }}
      >
        google
      </Button>
    </div>
  );
};

export default GoogleSignIn;
