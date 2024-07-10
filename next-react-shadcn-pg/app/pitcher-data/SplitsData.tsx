"use client";

import { db } from "@/firebase/clientApp";
import {
	collection,
	getDocs,
	query,
	QueryDocumentSnapshot,
	where,
} from "firebase/firestore";
import { FullPitchData } from "./SummaryColumns";
import { useEffect, useState } from "react";
import { setDefaultAutoSelectFamily } from "net";

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

const SplitsData = () => {
	const [rfstats, setRfstats] = useState<FullPitchData[]>([]);
	const [lfstats, setLfstats] = useState<FullPitchData[]>([]);

	useEffect(() => {
		const getData = async () => {
			const rd = await getSpecificPitchData("FB", "Right");
			const ld = await getSpecificPitchData("FB", "Left");
			setRfstats(rd);
			setLfstats(ld);
		};
		if (rfstats?.length === 0 || lfstats?.length === 0) {
			getData();
		}
	}, [rfstats, lfstats]);

	// Calculate Strike percentage
	let rfStrikes: number = 0;
	let lfStrikes: number = 0;

	rfstats?.forEach((element) => {
		if (element.result !== "Ball") {
			rfStrikes++;
		}
	});
	lfstats?.forEach((element) => {
		if (element.result !== "Ball") {
			lfStrikes++;
		}
	});

	return (
		<>
			<div>
				<h2>Fastball</h2>
				<p>Strike Percentage</p>
				<div className="flex flex-col">
					<p>
						{`${Math.round((10000 * rfStrikes) / rfstats?.length) / 100}% / 
						${Math.round((10000 * lfStrikes) / lfstats?.length) / 100}%`}
					</p>
				</div>
			</div>
		</>
	);
};

export default SplitsData;
