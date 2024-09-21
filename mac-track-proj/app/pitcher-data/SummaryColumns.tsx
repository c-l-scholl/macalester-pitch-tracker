"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DataTableRowActions from "@/components/DataTableRowActions";
import { Timestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

export type FullPitchData = {
	id: string;
	fullName: string;
	batterHand: "Left" | "Right";
	velocity: number;
	pitchType: "FB" | "2S" | "CH" | "SL" | "CB" | "Other";
	result: "Ball" | "Strike" | "Foul" | "Out" | "H" | "2B" | "3B" | "HR";
	pitchDate: Timestamp;
}

interface FullPitchDataColumnsProps {
	onEdit: (pitch: FullPitchData) => void;
	onDelete: (pitch: FullPitchData) => void;
	isDateSortedAsc: boolean;
	setIsDateSortedAsc: Dispatch<SetStateAction<boolean>>;
}

export const getFullPitchDataColumns = ({
	onEdit,
	onDelete,
	isDateSortedAsc,
	setIsDateSortedAsc,
}: FullPitchDataColumnsProps): ColumnDef<FullPitchData>[] => [
	{
		accessorKey: "fullName",
		header: "Pitcher",
	},
	{
		accessorKey: "pitchDate",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => {
							setIsDateSortedAsc(column.getIsSorted() === "asc");
							column.toggleSorting(isDateSortedAsc);
							console.log(isDateSortedAsc);
						}}>
						Date
						<ArrowUpDown className="ml-2 h-4 w-4"/>
				</Button>
			)
		},
		cell: ({ row }) => {
			const rowTimestamp: Timestamp = row.getValue("pitchDate");
			const rowDate = rowTimestamp.toDate();
			const formatted = `${rowDate.getMonth() + 1}/${rowDate.getDate()}/${rowDate.getFullYear()}`;
			return <div className="text-left font-medium">{formatted}</div>;
		},
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
			return <div className="text-left font-medium">{formatted}</div>;
		},
	},
	{
		accessorKey: "pitchType",
		header: "Pitch Type",
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