"use client";

import Link from "next/link";

import { Button } from "./ui/button";
import { auth, googleProvider } from "@/firebase/clientApp";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "@/firebase/auth";
import { useToast } from "./ui/use-toast";

const UserLogin = () => {
	const { authUser } = useAuth();

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
	return (
		<>
			<div className="flex flex-col min-h-screen min-w-screen justify-center items-center gap-2">
				{!authUser && <div>
					<Button onClick={signInWithGoogle}>Sign In With Google</Button>
				</div>}
				
				{authUser && (
					<div className="">
						<Button variant="link" size="lg">
							<Link href="/pitch-data">
                To Pitch Tracker
              </Link>
						</Button>
					</div>
				)}
			</div>
		</>
	);
};

export default UserLogin;
