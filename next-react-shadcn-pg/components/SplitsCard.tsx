"use client";

import { db } from "@/firebase/clientApp";
import {
	collection,
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

const getSpecificPitchData = async (type: string, batter: string) => {
	const pitchesCollRef = collection(db, "pitches");

	const q = query(
		pitchesCollRef,
		where("pitchType", "==", type),
		where("batterHand", "==", batter)
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
}

const SplitsCard = ({ pitchType }: SplitsCardProps) => {
	const [rStats, setRstats] = useState<FullPitchData[]>([]);
	const [lStats, setLstats] = useState<FullPitchData[]>([]);
	const [show, setShow] = useState<boolean>(true);

	useEffect(() => {
		const getData = async () => {
			const rd = await getSpecificPitchData(pitchType, "Right");
			const ld = await getSpecificPitchData(pitchType, "Left");
			if (rd.length === 0 && ld.length === 0) {
				setShow(false);
			}
			setRstats(rd);
			setLstats(ld);
		};
		if (rStats?.length === 0 || lStats?.length === 0) {
			getData();
		}
	}, [rStats, lStats, pitchType]);

	// Calculate Strike percentage
	let rfStrikes: number = 0;
	let lfStrikes: number = 0;

	const rPitches = rStats.length > 0 ? rStats.length : 1;
	const lPitches = lStats.length > 0 ? lStats.length : 1;

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



	return (
		<div>
			{show && <div>
				<Card>
					<CardHeader>
						<CardTitle>{pitchType}</CardTitle>
						<CardDescription>Summary Stats</CardDescription>
					</CardHeader>
					<CardContent>
						<p>K% Splits: {`${Math.round((10000 * rfStrikes) / rPitches) / 100}% / 
							${Math.round((10000 * lfStrikes) / lPitches) / 100}%`}</p>
					</CardContent>
					<CardContent>
						<p>SLG Splits: </p>
					</CardContent>
				</Card>
			</div>}
		</div>
	);
};

export default SplitsCard;
