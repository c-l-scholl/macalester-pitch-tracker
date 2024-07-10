"use client";
import SplitsCard from "@/components/SplitsCard";
import { useEffect } from "react";

interface SplitsDataProps {
	selectedPitcher: string;
}

const SplitsData = ({ selectedPitcher }: SplitsDataProps) => {

	// later get selected Pitcher from PitcherSummary and PitcherSelect
	const pitchTypeArr = ["FB", "2S", "CH", "SL", "CB", "Other"];
	useEffect(() => {
		console.log(selectedPitcher);

	}, [selectedPitcher]);

	return (
		<>
			<div className="flex flex-col gap-2">
				{pitchTypeArr.map((element: string, i: number) => (
					<SplitsCard pitchType={element} key={i} selectedPitcherName={selectedPitcher}/>
				))}
			</div>
		</>
	);
};

export default SplitsData;
