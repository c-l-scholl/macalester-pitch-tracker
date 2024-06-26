"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Pitch = {
	id: string;
	pitcherName: string;
	batterHand: "L" | "R";
	velocity: number;
	pitchType: "FB" | "2S" | "CH" | "CB" | "SL" | "Other";
	contact: "Ball" | "Strike" | "Foul" | "H" | "2B" | "3B" | "HR";
};

export const columns: ColumnDef<Pitch>[] = [
	{
		accessorKey: "pitcherName",
		header: "Pitcher",
	},
	{
		accessorKey: "batterHand",
		header: "Batter Handedness",
	},
	{
		accessorKey: "velocity",
		header: "Velocity",
	},
	{
		accessorKey: "pitchType",
		header: "Pitch Type",
	},
	{
		accessorKey: "contact",
		header: "Pitch result",
	},
];
