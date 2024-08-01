"use client";
import SplitsCard from "@/components/SplitsCard";
import { Timestamp } from "firebase/firestore";
import { Pitch } from "../pitch-tracker/columns";
import { useEffect, useState } from "react";
import { FullPitchData } from "./SummaryColumns";

interface SplitsDataProps {
	pitchData: FullPitchData[];
}

const SplitsData = ({ pitchData }: SplitsDataProps) => {

	// later get selected Pitcher from PitcherSummary and PitcherSelect
	const [pitchKeysList, setPitchKeyslist] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [pitchMapState, setPitchMapState] = useState<Map<string, FullPitchData[]> | null>(null);
	let pitchMap = new Map<string, FullPitchData[]>();

	useEffect(() => {
		//setIsLoading(true);
		pitchMap.clear();		
		
		if (pitchData && pitchData.length > 0) {
			for (const pitch of pitchData) {
				const pitches = pitchMap.get(pitch.pitchType) ?? [];
				pitches.push(pitch);
				pitchMap.set(pitch.pitchType, pitches);
			}			
		}

		setPitchMapState(pitchMap ?? null);
		//setIsLoading(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pitchData]);



	return (
		<>
			<div className="flex flex-col gap-2">
				{pitchMapState && Array.from(pitchMapState.entries()).map(([key, list]) => (
					<div key={key}>
						<SplitsCard pitchType={list[0].pitchType} pitchList={list}/>
					</div>
				))}
			</div>
		</>
	);
};

export default SplitsData;
