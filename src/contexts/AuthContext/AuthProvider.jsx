import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const googleProvider = new GoogleAuthProvider();

  const googleLogin = useCallback(async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } finally {
      setLoading(false);
    }
  }, [googleProvider]);

  // const createUserEmailAndPassword = useCallback(async(email, password) => {})(email, password) => {
  //   setLoading(true)
  //   return createUserWithEmailAndPassword(auth, email, password)
  // }

  const createUserEmailAndPassword = useCallback(async (email, password) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return result;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (profile) => {
    try {
      const result = await updateProfile(auth.currentUser, profile)
      return result
    } catch (error) {
      return error
    }
  }, [])

  const signInUser = useCallback(async (email, password) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  }, []);

  const authInfo = useMemo(
    () => ({
      createUserEmailAndPassword,
      signInUser,
      googleLogin,
      updateUser,
      logout,
      user,
      loading,
    }),
    [
      createUserEmailAndPassword,
      signInUser,
      googleLogin,
      updateUser,
      logout,
      loading,
      user,
    ],
  );

  useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);

    // 🔥 Important: auth check complete
    setLoading(false);
  });

  return () => {
    unSubscribe();
  };
}, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
