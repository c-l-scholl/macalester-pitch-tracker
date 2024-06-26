"use client";

import { auth, googleProvider } from "@/firebase/clientApp";
import { signInWithPopup, signOut } from "firebase/auth";
import { Button } from "./ui/button";

export const Auth = () => {

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }

	return (
    <div className="flex flex-row p-4 w-[200px] items-right gap-2">
      <Button onClick={signInWithGoogle}>Sign In With Google</Button>
      <Button onClick={logout}>Logout</Button>
    </div>
		
	)
}