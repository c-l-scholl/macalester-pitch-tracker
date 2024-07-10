"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Pitcher } from "./PitcherSummary";
import { Dispatch, SetStateAction } from "react";

interface PitcherSelectProps {
	pitcherList: Pitcher[];
	setSelectedPitcher: Dispatch<SetStateAction<Pitcher | null>>;
}

const PitcherSelect = ({ pitcherList, setSelectedPitcher }: PitcherSelectProps) => {
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
								onSelect={() => {
									setSelectedPitcher(pitcher);
									console.log(pitcher.fullName);
								}}
							>{`${pitcher.playerNumber} ${pitcher.fullName}`}</SelectItem>
						))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default PitcherSelect;
