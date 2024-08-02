"use client";

import { FullPitchData } from "@/app/pitcher-data/SummaryColumns";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const calculateKSplits = (stats: FullPitchData[]): string => {
	let rfStrikes: number = 0;
	let lfStrikes: number = 0;

	let rPitches: number = 0;
	let lPitches: number = 0;

	stats?.forEach((element) => {
		if (element.batterHand === "Right") {
			rPitches++;
			if (element.result !== "Ball") {
				rfStrikes++;
			}
		} else if (element.batterHand === "Left") {
			lPitches++;
			if (element.result !== "Ball") {
				lfStrikes++;
			}
		}
	});

	lPitches = lPitches === 0 ? 1 : lPitches;
	rPitches = rPitches === 0 ? 1 : rPitches;

	return `${Math.round((100 * lfStrikes) / lPitches)}% / 
					${Math.round((100 * rfStrikes) / rPitches)}%`;
}

const calculateSLG = (stats: FullPitchData[]): string => {
	let rHits: number = 0;
	let lHits: number = 0;

	let rABs: number = 0;
	let lABs: number = 0;

	stats.forEach((element) => {
		if (element.batterHand === "Right") {
			switch (element.result) {
				case "Out": {
					rABs++;
					break;
				}
				case "H": {
					rABs++;
					rHits += 1;
					break;
				}
				case "2B": {
					rABs++;
					rHits += 2;
					break;
				}
				case "3B": {
					rABs++;
					rHits += 3;
					break;
				}
				case "HR": {
					rABs++;
					rHits += 4;
					break;
				}
			}
		} else {
			switch (element.result) {
				case "Out": {
					lABs++;
					break;
				}
				case "H": {
					lABs++;
					lHits += 1;
					break;
				}
				case "2B": {
					lABs++;
					lHits += 2;
					break;
				}
				case "3B": {
					lABs++;
					lHits += 3;
					break;
				}
				case "HR": {
					lABs++;
					lHits += 4;
					break;
				}
			}
		}
	})

	
	const rSLG: number = rABs > 0 ? 1000 * rHits / rABs : 0;
	const lSLG: number = lABs > 0 ? 1000 * lHits / lABs : 0;

	let rSLGStr: string = formatSLG(rSLG);
	let lSLGStr: string = formatSLG(lSLG);

	return `${lSLGStr} / ${rSLGStr}`;
}

const formatSLG = (slg: number): string => {
	if (slg === 0) {
		return ".000";
	}
	let slgStr: string = String(slg);
	return `${slgStr[0]}.${slgStr.substring(1)}`
}

interface SplitsCardProps {
	pitchType: string;
	pitchList: FullPitchData[] | null;
}

const SplitsCard = ({ pitchType, pitchList }: SplitsCardProps) => {
	const [show, setShow] = useState<boolean>(false);
	const [stats, setStats] = useState<FullPitchData[] | null>(null);
	const [kSplitsStr, setKSplitsStr] = useState<string>("");
	const [slgStr, setSlgStr] = useState<string>("");

	useEffect(() => {
		setStats(pitchList ?? null);
		if (stats && stats.length > 0) {
			setKSplitsStr(calculateKSplits(stats));
			setSlgStr(calculateSLG(stats));
			setShow(true);
		} else {
			setShow(false);
		}
	}, [pitchList, stats])

	return (
		<div>
			{show && <div>
				<Card>
					<CardHeader>
						<CardTitle>{pitchType}</CardTitle>
						<CardDescription>Stat: vs. Lefty / vs. Righty</CardDescription>
					</CardHeader>
					<CardContent>
						<p>K%: {kSplitsStr}</p>
					</CardContent>
					<CardContent>
						<p>SLG: {slgStr}</p>
					</CardContent>
				</Card>
			</div>}
		</div>
	);
};

export default SplitsCard;
