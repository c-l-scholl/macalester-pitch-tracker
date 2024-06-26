"use client";

import { Auth } from "./auth";


export default function Header() {
	return (
		<div className="flex items-right gap-2 min-w-[300px] p-2 border-b">
			<Auth/>
		</div>
	);
}
