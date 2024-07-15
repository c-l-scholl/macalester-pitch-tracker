"use client";
import SplitsCard from "@/components/SplitsCard";
import { Timestamp } from "firebase/firestore";

interface SplitsDataProps {
	selectedPitcherName: string;
	selectedTimestamp: Timestamp;
}

const SplitsData = ({ selectedPitcherName, selectedTimestamp }: SplitsDataProps) => {

	// later get selected Pitcher from PitcherSummary and PitcherSelect
	const pitchTypeArr = ["FB", "2S", "CH", "SL", "CB", "Other"];

	return (
		<>
			<div className="flex flex-col gap-2">
				{pitchTypeArr.map((element: string, i: number) => (
					<SplitsCard pitchType={element} key={i} selectedPitcherName={selectedPitcherName} selectedTimestamp={selectedTimestamp}/>
				))}
			</div>
		</>
	);
};

export default SplitsData;
