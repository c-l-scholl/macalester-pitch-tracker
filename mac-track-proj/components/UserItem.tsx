"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/firebase/auth";

const UserItem = () => {

	const { authUser, logout } = useAuth();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="flex items-center justify-between gap-2 border rounded-[8px] p-2 hover:bg-primary/10 transition duration-200 cursor-pointer">
					<Avatar>
						<AvatarImage src={authUser?.pfp} />
						<AvatarFallback>?</AvatarFallback>
					</Avatar>
					<div className="grow">
						<p className="text-[16px] font-bold text-left text-black">
							{authUser ? authUser.username : "Please log in"}
						</p>
						<p className="text-[12px] text-neutral-500 text-left">
							{authUser ? authUser.email : ""}
						</p>
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
 				{authUser && <DropdownMenuItem onClick={logout}>
					Logout
				</DropdownMenuItem>}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserItem;
