"use client";

import { auth } from "@/firebase/clientApp";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";

export default function UserItem() {	
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [pfp, setPfp] = useState<string>("");
  const [email, setEmail] = useState<string>("");

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
    }
  })

	return (
		<div className="flex items-center justify-between gap-2 border rounded-[8px] p-2">
			{!isSignedIn && <div className="avatar rounded-full min-h-10 min-w-10 bg-emerald-500 text-white font-[700] flex items-center justify-center">
				<p>?</p>
			</div>}
      {isSignedIn && <Image src={pfp} alt="?" width={40} height={40} className="rounded-full"/>}
			<div className="grow">
				<p className="text-[16px] font-bold">
					{isSignedIn ? username : "Please log in"}
				</p>
				<p className="text-[12px] text-neutral-500">
					{isSignedIn ? email : ""}
				</p>
			</div>
		</div>
	)
}