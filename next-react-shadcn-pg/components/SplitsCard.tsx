"use client";

import { db } from "@/firebase/clientApp";
import {
	collection,
	CollectionReference,
	getDocs,
	query,
	QueryDocumentSnapshot,
	where,
} from "firebase/firestore";
import { FullPitchData } from "@/app/pitcher-data/SummaryColumns";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const getSpecificPitchData = async (pitcherName: string, type: string, collRef: CollectionReference) => {
	
	const q = query(
		collRef,
		where("fullName", "==", pitcherName),
		where("pitchType", "==", type),
	);

	const data = await getDocs(q);
	const filteredData = data.docs.map((doc: QueryDocumentSnapshot) => ({
		...doc.data(),
		id: doc.id,
	})) as FullPitchData[];
	return filteredData;
};

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
		} else {
			lPitches++;
			if (element.result !== "Ball") {
				lfStrikes;
			}
		}
	});

	lPitches = lPitches === 0 ? 1 : lPitches;
	rPitches = rPitches === 0 ? 1 : rPitches;

	return `${Math.round((10000 * lfStrikes) / lPitches) / 100}% / 
					${Math.round((10000 * rfStrikes) / rPitches) / 100}%`;
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
	selectedPitcherName: string;
}

const SplitsCard = ({ pitchType, selectedPitcherName }: SplitsCardProps) => {
	const [stats, setStats] = useState<FullPitchData[]>([]);
	const [show, setShow] = useState<boolean>(false);

	const pitchesCollRef = collection(db, "pitches");

	useEffect(() => {
		const getData = async () => {
			const d = await getSpecificPitchData(selectedPitcherName, pitchType, pitchesCollRef);
			if (d.length === 0) {
				setShow(false);
			} else {
				setShow(true);
			}
			setStats(d);
		};
		getData();
	}, [pitchType, selectedPitcherName, pitchesCollRef]);

	// Calculate Strike percentage
	const kSplitsStr: string = calculateKSplits(stats);
	
	// Calculate SLG 
	const slgStr = calculateSLG(stats);

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
