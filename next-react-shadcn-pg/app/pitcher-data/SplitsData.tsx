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
import SplitsCard from "@/components/SplitsCard";
import { Pitcher } from "./PitcherSummary";

// const getSpecificPitchData = async (type: string, batter: string) => {
// 	const pitchesCollRef = collection(db, "pitches");

// 	const q = query(
// 		pitchesCollRef,
// 		where("pitchType", "==", type),
// 		where("batterHand", "==", batter)
// 	);

// 	const data = await getDocs(q);
// 	const filteredData = data.docs.map((doc: QueryDocumentSnapshot) => ({
// 		...doc.data(),
// 		id: doc.id,
// 	})) as FullPitchData[];
// 	return filteredData;
// };

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
