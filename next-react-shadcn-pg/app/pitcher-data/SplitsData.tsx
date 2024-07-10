"use client";
import SplitsCard from "@/components/SplitsCard";

interface SplitsDataProps {
	selectedPitcherName: string;
}

const SplitsData = ({ selectedPitcherName }: SplitsDataProps) => {

	// later get selected Pitcher from PitcherSummary and PitcherSelect
	const pitchTypeArr = ["FB", "2S", "CH", "SL", "CB", "Other"];

	return (
		<>
			<div className="flex flex-col gap-2">
				{pitchTypeArr.map((element: string, i: number) => (
					<SplitsCard pitchType={element} key={i} selectedPitcherName={selectedPitcherName}/>
				))}
			</div>
		</>
	);
};

export default SplitsData;
