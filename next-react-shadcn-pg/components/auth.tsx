"use client";

import { auth, googleProvider } from "@/firebase/clientApp";
import { signInWithPopup, signOut } from "firebase/auth";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SetStateAction, Dispatch } from "react";

interface AuthProps {
  isSignedIn: boolean;
}

export const Auth = ({ isSignedIn }: AuthProps) => {
	const { toast } = useToast();

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
			toast({
				description: "Your sign-in was successful.",
			});
		} catch (err) {
			toast({
				title: "Uh oh! Something went wrong",
				description:
					"There was a problem with your sign-in attempt. Please try again.",
				variant: "destructive",
			});
			console.error(err);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			{!isSignedIn && (
				<div className="flex flex-col m-3 justify-center gap-5">
					<p>Please sign in before entering Pitch Tracker.</p>
          <Button onClick={signInWithGoogle}>Sign In With Google</Button>
				</div>
			)}
      {isSignedIn　&& <Button onClick={logout}>Logout</Button>}
		</>
	);
};
