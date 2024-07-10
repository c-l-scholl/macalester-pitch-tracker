"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Pitcher } from "./PitcherSummary";

interface PitcherSelectProps {
	pitcherList: Pitcher[];
}

const PitcherSelect = ({ pitcherList }: PitcherSelectProps) => {
	return (
		<div>
			<Select>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select a pitcher..." />
				</SelectTrigger>
				<SelectContent>
					{pitcherList &&
						pitcherList.map((pitcher: Pitcher) => (
							<SelectItem
								key={pitcher.id}
								value={pitcher.fullName}
							>{`${pitcher.playerNumber} ${pitcher.fullName}`}</SelectItem>
						))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default PitcherSelect;
