"use client";

import Link from "next/link";

import { Auth } from "./auth";
import { Button, buttonVariants } from "./ui/button";
import { auth } from "@/firebase/clientApp";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

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
          <Auth isSignedIn={isSignedIn} />
        </div>
				
				{isSignedIn && (
					<div>
						<Button variant="link" size="lg">
							<Link href="/pitch-data">
                To Pitch Tracker
              </Link>
              <ArrowRight />
						</Button>
					</div>
				)}
			</div>
		</>
	);
};

export default UserLogin;
