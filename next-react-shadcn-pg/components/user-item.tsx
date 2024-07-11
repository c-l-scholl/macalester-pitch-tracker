"use client";

import { auth, googleProvider } from "@/firebase/clientApp";
import { useLayoutEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserItem() {
	const { toast } = useToast();

	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
	const [username, setUsername] = useState<string>("");
	const [pfp, setPfp] = useState<string>("");
	const [email, setEmail] = useState<string>("");

	const handleUserItemClick = () => {
		if (!isSignedIn) {
			handleSignInWithGoogle();
		} else {
			handleLogout();
		}
	};

	const handleSignInWithGoogle = async () => {
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
		}
	};

	const handleLogout = async () => {
		try {
			await signOut(auth);
			toast({
				description: "You have successfully logged out.",
			});
		} catch (err) {
			toast({
				title: "Uh oh! Something went wrong",
				description: "Your logout attempt failed. Please try again.",
				variant: "destructive",
			});
		}
	};

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setIsSignedIn(true);
			if (user.displayName) {
				setUsername(user.displayName);
			}

			if (user.photoURL) {
				setPfp(user.photoURL);
			}

			if (user.email) {
				setEmail(user.email);
			}
		} else {
			setIsSignedIn(false);
			setUsername("");
			setEmail("");
			setPfp("");
		}
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="flex items-center justify-between gap-2 border rounded-[8px] p-2 hover:bg-primary/10 transition duration-200 cursor-pointer">
					<Avatar>
						<AvatarImage src={pfp} />
						<AvatarFallback>?</AvatarFallback>
					</Avatar>
					<div className="grow">
						<p className="text-[16px] font-bold text-left">
							{isSignedIn ? username : "Please log in"}
						</p>
						<p className="text-[12px] text-neutral-500 text-left">
							{isSignedIn ? email : ""}
						</p>
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleUserItemClick}>
					{isSignedIn ? "Logout" : "Sign In"}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
