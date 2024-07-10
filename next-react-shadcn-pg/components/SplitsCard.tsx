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

const getSpecificPitchData = async (pitcherName: string, type: string, batter: string, collRef: CollectionReference) => {
	

	const q = query(
		collRef,
		where("pitchType", "==", type),
		where("batterHand", "==", batter),
		where("fullName", "==", pitcherName),
	);

	const data = await getDocs(q);
	const filteredData = data.docs.map((doc: QueryDocumentSnapshot) => ({
		...doc.data(),
		id: doc.id,
	})) as FullPitchData[];
	return filteredData;
};

interface SplitsCardProps {
	pitchType: string;
	selectedPitcherName: string;
}

const SplitsCard = ({ pitchType, selectedPitcherName }: SplitsCardProps) => {
	const [rStats, setRstats] = useState<FullPitchData[]>([]);
	const [lStats, setLstats] = useState<FullPitchData[]>([]);
	const [show, setShow] = useState<boolean>(false);

	const pitchesCollRef = collection(db, "pitches");

	useEffect(() => {
		const getData = async () => {
			const rd = await getSpecificPitchData(selectedPitcherName, pitchType, "Right", pitchesCollRef);
			const ld = await getSpecificPitchData(selectedPitcherName, pitchType, "Left", pitchesCollRef);
			if (rd.length === 0 && ld.length === 0) {
				setShow(false);
			} else {
				setShow(true);
			}
			setRstats(rd);
			setLstats(ld);
		};
		getData();
	}, [pitchType, selectedPitcherName, pitchesCollRef]);

	// Calculate Strike percentage
	let rfStrikes: number = 0;
	let lfStrikes: number = 0;

	const rPitches: number = rStats.length > 0 ? rStats.length : 1;
	const lPitches: number = lStats.length > 0 ? lStats.length : 1;

	rStats?.forEach((element) => {
		if (element.result !== "Ball") {
			rfStrikes++;
		}
	});
	lStats?.forEach((element) => {
		if (element.result !== "Ball") {
			lfStrikes++;
		}
	});

	// Calculate SLG (look up how to calculate properly)
	let rHits: number = 0;
	let lHits: number = 0;

	let rABs: number = 0;
	let lABs: number = 0;

	rStats.forEach((element) => {
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
	})

	lStats.forEach((element) => {
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
	})

	const rSLG: number = rABs > 0 ? 1000 * rHits / rABs : 0;
	const lSLG: number = lABs > 0 ? 1000 * lHits / lABs : 0;

	const formatSLG = (slg: number): string => {
		if (slg === 0) {
			return ".000";
		}
		let slgStr: string = String(slg);
		return `${slgStr[0]}.${slgStr.substring(1)}`

	}

	let rSLGStr: string = formatSLG(rSLG);
	let lSLGStr: string = formatSLG(lSLG);




	return (
		<div>
			{show && <div>
				<Card>
					<CardHeader>
						<CardTitle>{pitchType}</CardTitle>
						<CardDescription>Stat: vs. Lefty / vs. Righty</CardDescription>
					</CardHeader>
					<CardContent>
						<p>K%: {`${Math.round((10000 * lfStrikes) / lPitches) / 100}% / 
														${Math.round((10000 * rfStrikes) / rPitches) / 100}%`}</p>
					</CardContent>
					<CardContent>
						<p>SLG: {`${lSLGStr} / ${rSLGStr}`}</p>
					</CardContent>
				</Card>
			</div>}
		</div>
	);
};

export default SplitsCard;
