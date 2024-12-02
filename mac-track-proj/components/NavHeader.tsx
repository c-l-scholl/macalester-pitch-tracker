"use client";
import Link from "next/link";
import UserItem from "./UserItem";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const NavHeader = () => {
	return (
		<div className="sticky top-0 flex flex-row justify-between gap-2 min-w-screen p-4 border-b items-center bg-slate-100 shadow-md z-50">
			<div>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<Link href="/" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Home
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							{/* Add something here to block nav if not signed in */}
							<Link href="/pitch-tracker" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Pitch Tracker
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							{/* Add something here to block nav if not signed in */}
							<Link href="/pitcher-data" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Pitcher Data
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							{/* Add something here to block nav if not signed in */}
							<Link href="/player-management" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Player Management
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			<div className="flex">
				<UserItem />
			</div>
		</div>
	);
};

export default NavHeader;
