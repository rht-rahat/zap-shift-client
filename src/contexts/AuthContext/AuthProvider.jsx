import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../../firebase/firebase.init';

const AuthProvider = ({children}) => {
const [loading, setLoading] = useState(false)
const [user, setUser] = useState(null)

const googleProvider = useMemo(() => new GoogleAuthProvider(), []);


const googleLogin = useCallback(async () => {
  setLoading(false)
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return result
  } finally {
    setLoading(false)
  }
}, [googleProvider])


  // const createUserEmailAndPassword = useCallback(async(email, password) => {})(email, password) => {
  //   setLoading(true)
  //   return createUserWithEmailAndPassword(auth, email, password)
  // }

  const createUserEmailAndPassword = useCallback(async(email, password) => {
    try {
      setLoading(true)
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } finally {
      setLoading(false)
    }
  }, [])

  const signInUser = useCallback(async(email, password) => {
    try {
      setLoading(true)
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result;
    } finally  {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    return signOut(auth)
  }, [])



  const authInfo = useMemo(() => ({
   createUserEmailAndPassword,
   signInUser,
   googleLogin,
   logout,
   user,
   loading
}), [createUserEmailAndPassword, signInUser, googleLogin, loading, logout, user])


 useEffect(() =>{
  const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  return () => {
    unSubscribe()
  }
 },[])


  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;