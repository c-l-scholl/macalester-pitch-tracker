import { Row } from "@tanstack/react-table";
import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
	onEdit: (value: TData) => void;
	onDelete: (value: TData) => void;
}

const DataTableRowActions = <TData,>({
	row,
	onEdit,
	onDelete,
}: DataTableRowActionsProps<TData>) => {
	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem onClick={() => onDelete(row.original)}>
						Delete Pitch
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DialogTrigger asChild>
						<DropdownMenuItem onClick={() => onEdit(row.original)}>
							Edit Pitch
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Warning</DialogTitle>
					<DialogDescription>
						You are now modifying a pitch. Please use the normal Pitch Form on
						the left hand side to enter the new data.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DataTableRowActions;
