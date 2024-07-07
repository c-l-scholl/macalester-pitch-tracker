"use client";

import { Auth } from "@/components/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/firebase/clientApp";
import { useState, useEffect } from "react";

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>();

  useEffect(() => {

  }, [isSignedIn]);

	return (
		<>
			<div className="flex flex-col min-h-screen min-w-screen justify-center items-center">
				<Auth/>
				<Button variant="link" size="lg">
					<Link href="/pitch-data">Pitch Tracker</Link>
				</Button>
			</div>
		</>
	);
}
