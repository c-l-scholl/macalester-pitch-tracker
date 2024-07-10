"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/components/DataTableRowActions";
import { Timestamp } from "firebase/firestore";

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
}

export const getFullPitchDataColumns = ({
	onEdit,
	onDelete,
}: FullPitchDataColumnsProps): ColumnDef<FullPitchData>[] => [
	{
		accessorKey: "fullName",
		header: "Pitcher",
	},
	{
		accessorKey: "pitchDate",
		header: "Date",
		cell: ({ row }) => {
			const rowTimestamp: Timestamp = row.getValue("pitchDate");
			const rowDate = rowTimestamp.toDate();
			const formatted = `${rowDate.getDate()}/${rowDate.getMonth() + 1}/${rowDate.getFullYear()}`;
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