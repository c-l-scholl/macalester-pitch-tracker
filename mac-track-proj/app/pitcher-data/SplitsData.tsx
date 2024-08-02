"use client";
import SplitsCard from "@/components/SplitsCard";
import { useEffect, useState } from "react";
import { FullPitchData } from "./SummaryColumns";

interface SplitsDataProps {
	pitchData: FullPitchData[];
}

const SplitsData = ({ pitchData }: SplitsDataProps) => {
	const [pitchMapState, setPitchMapState] = useState<Map<string, FullPitchData[]> | null>(null);
	let pitchMap = new Map<string, FullPitchData[]>();

	useEffect(() => {
		pitchMap.clear();		

		if (pitchData && pitchData.length > 0) {
			for (const pitch of pitchData) {
				const pitches = pitchMap.get(pitch.pitchType) ?? [];
				pitches.push(pitch);
				pitchMap.set(pitch.pitchType, pitches);
			}			
		}

		setPitchMapState(pitchMap ?? null);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pitchData]);



	return (
		<>
			<div className="flex flex-col gap-2 w-full">
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
