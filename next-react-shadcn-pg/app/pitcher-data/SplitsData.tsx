"use client";
import SplitsCard from "@/components/SplitsCard";

interface SplitsDataProps {
	selectedPitcher: string;
}

const SplitsData = ({ selectedPitcher }: SplitsDataProps) => {

	// later get selected Pitcher from PitcherSummary and PitcherSelect
	const pitchTypeArr = ["FB", "2S", "CH", "SL", "CB", "Other"];

	return (
		<>
			<div>
				{pitchTypeArr.map((element: string, i: number) => (
					<SplitsCard pitchType={element} key={i}/>
				))}
			</div>
		</>
	);
};

export default SplitsData;
