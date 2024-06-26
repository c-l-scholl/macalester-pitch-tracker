"use client";

import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator 
} from "./ui/command";

import { User, Inbox, Bell, Settings, ReceiptText } from 'lucide-react';

import UserItem from "./user-item";

export default function Sidebar() {

  const menuList = [
    {
      group: "General",
      items: [
        {
          link: "/",
          icon: <User/>,
          text: "Profile"
        },
        {
          link: "/",
          icon: <Inbox />,
          text: "Inbox"
        },
        {
          link: "/",
          icon: <Bell />,
          text: "Notifications"
        },
        
        
      ]
    },
    {
      group: "Settings",
      items: [
        {
          link: "/",
          icon: <Settings/>,
          text: "General Settings"
        },
        {
          link: "/",
          icon: <ReceiptText />,
          text: "Logs"
        },
      ]
    }
    
  ]
  

	return (
		<div className="fixed flex flex-col gap-2 w-[300px] min-w-[300px] border-r min-h-screen p-4">
			<div>
				<UserItem />
			</div>
			<div className="grow">
				<Command style={{ overflow: "visible" }}>
					<CommandList style={{ overflow: "visible" }}>
            {menuList.map((menu: any, key: number) => (
              <CommandGroup key={key} heading={menu.group}>
                {menu.items.map((option: any, optionKey: number) => 
                  <CommandItem key={optionKey} className="flex gap-2 cursor-pointer">
                    {option.icon}
                    {option.text}
                  </CommandItem>
                )}
						  </CommandGroup>
            ))}
					</CommandList>
				</Command>
			</div>
		</div>
	);
}
