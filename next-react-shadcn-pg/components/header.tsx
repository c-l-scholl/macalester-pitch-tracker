"use client";
import UserItem from "./user-item";

export default function Header() {
	return (
		<div className="flex justify-end gap-2 min-w-screen p-2 border-b">
			<UserItem/>
		</div>
	);
}
