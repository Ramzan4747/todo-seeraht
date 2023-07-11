import React, {createContext, useState, useEffect, useContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firbase';

export const AuthContext = createContext();

export default function AuthContextProvider(props) {

const [user, setUser]= useState({})
const [isAuthenticated, setIsAuthenticated]= useState(false)

useEffect(()=>{

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(user)
        setIsAuthenticated(true)
        const uid = user.uid;
        console.log("user in logged in");
        // ...
      } else {
        console.log("user in not logged in");
        // User is signed out
        // ...
      }
    });
    
  },[])

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user}}>
        {props.children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () =>{
    return useContext(AuthContext)
}