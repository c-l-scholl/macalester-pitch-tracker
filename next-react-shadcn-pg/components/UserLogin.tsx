"use client";

import Link from "next/link";

import { HomePageAuth } from "./HomePageAuth";
import { Button } from "./ui/button";
import { auth } from "@/firebase/clientApp";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

const UserLogin = () => {
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setIsSignedIn(true);
		} else {
			setIsSignedIn(false);
		}
	});

	return (
		<>
			<div className="flex flex-col min-h-screen min-w-screen justify-center items-center gap-2">
        <div>
          <HomePageAuth isSignedIn={isSignedIn} />
        </div>
				
				{isSignedIn && (
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
