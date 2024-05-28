import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';



import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from '../Hooks/useAxiosPublic';
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (curUser) => {
            
                const userEmail = curUser?.email || user?.email;
                const loggedEmail = {email: userEmail}
                setUser(curUser)
                // setLoading(false);

                if(curUser) {
                
                    axiosPublic.post('/jwt', loggedEmail, {withCredentials:true})
                    .then(res => {
                        // console.log('auth response = ', res.data);
                        if(res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                            setLoading(false);
                        }
                    })
                }
                else {
                    // axios.post('http://localhost:5000/logout', loggedEmail, {withCredentials:true})
                    // .then(res => {
                    //     console.log('logout user = ', res.data)
                    // })

                    localStorage.removeItem('access-token')
                    setLoading(false);
                }
             
        });

        return () => {
            unsubscribe();
          };
    }, [axiosPublic])



    const signUp = (email, pass) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const logIn = (email, pass) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, pass)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const googleSingIn = () => {
        setLoading(true);
        signInWithPopup(auth,provider);
    }

    const data = { signUp, logIn, loading, logOut, user, googleSingIn }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;