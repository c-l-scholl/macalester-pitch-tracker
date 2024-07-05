"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/components/DataTableRowActions";

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

interface PitchColumnsProps {
	onEdit: (pitch: Pitch) => void;
	onDelete: (pitch: Pitch) => void;
}

export const getPitchColumns = ({
	onEdit,
	onDelete,
}: PitchColumnsProps): ColumnDef<Pitch>[] => [
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
			return <div className="text-right font-medium">{formatted}</div>;
		},
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
		cell: ({ row }) => (
			<DataTableRowActions
				row={row}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		),
	},
];
