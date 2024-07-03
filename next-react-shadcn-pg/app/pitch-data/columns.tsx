"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { deletePitch } from "@/components/DataEdit";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Pitch = {
	id: string;
	fullName: string;
	batterHand: "Left" | "Right";
	velocity: number;
	pitchType: "FB" | "2S" | "CH" | "CB" | "SL" | "Other";
	result: "Ball" | "Strike" | "Foul" | "H" | "2B" | "3B" | "HR";
};



export const columns: ColumnDef<Pitch>[] = [
	{
		accessorKey: "fullName",
		header: "Pitcher",
	},
	{
		accessorKey: "batterHand",
		header: "Batter",
	},
	{
		accessorKey: "velocity",
		header: "Velocity",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("velocity"));
      const formatted = `${amount} mph`;
      return <div className="text-right font-medium">{formatted}</div>
    }
	},
	{
		accessorKey: "pitchType",
		header: "Pitch",
	},
	{
		accessorKey: "result",
		header: "Result",
	},
  {
    id: "actions",
    cell: ({ row }) => {
      const pitch = row.original;
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => deletePitch(pitch.id)}
            >
              Delete Pitch
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Pitch</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
