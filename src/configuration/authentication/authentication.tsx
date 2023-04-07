import {
  User,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { app, database } from "../firebaseConfig";

interface AuthCtxType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

function Authenticate() {
  const auth = getAuth(app);
  const dbInstances = collection(database, "instances");


  const [user, setUser] = useState<User | null>(auth.currentUser);


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  async function signUp(email: string, password: string) {
    if (email === "" || password === "")
      throw new Error("Please provide email and password");
    const user = await createUserWithEmailAndPassword(auth, email, password);
    sendEmailVerification(user.user);
    await setDoc(doc(dbInstances, user.user.uid), {
      instances: []
    })
    setUser(user.user);
  }

  async function login(email: string, password: string) {
    if (email === "" || password === "")
      throw new Error("Please provide email and password");
    const user = await signInWithEmailAndPassword(auth, email, password);
    setUser(user.user);
  }

  async function logout() {
    if (auth.currentUser !== null) {
      await signOut(auth);
      setUser(null);
    }
  }

  async function deleteAccount() {
    if (auth.currentUser !== null) {
      await deleteDoc(doc(dbInstances, auth.currentUser.uid));
      await deleteUser(auth.currentUser);
      setUser(null);
    }
  }

  return { signUp, login, user, logout, deleteAccount };
}

const AuthCtx = createContext<AuthCtxType | undefined>(undefined);

export function useAuth() {
  return useContext(AuthCtx);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthCtx.Provider value={Authenticate()}>{children}</AuthCtx.Provider>;
}
