"use client";

import { Pitcher } from "@/app/pitch-tracker/PitchTracker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { db } from "@/firebase/clientApp";
import { collection, query, orderBy, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const getPitcherList = async (): Promise<Pitcher[]> => {
	const pitcherCollRef = collection(db, "pitcher");
	const q = query(pitcherCollRef, orderBy("playerNumber", "asc"));
	const pitcherData = await getDocs(q);
	const filteredPitcherData = pitcherData.docs.map(
		(doc: QueryDocumentSnapshot) => ({
			...doc.data(),
			id: doc.id,
		})
	) as Pitcher[];
	return filteredPitcherData;
};

interface PitcherSelecterProps {
	// pitcherData: Pitcher[];
	// setPitcherData: Dispatch<SetStateAction<Pitcher[]>>;
	setSelectedPitcherName: Dispatch<SetStateAction<string>>;
}

const PitcherSelecter = ({ setSelectedPitcherName }: PitcherSelecterProps) => {
	const [pitcherData, setPitcherData] = useState<Pitcher[] | null>(null);

	useEffect(() => {
		const getPitcherData = async () => {
			const pitcherList = await getPitcherList();
			setPitcherData(pitcherList);
		};
		getPitcherData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Select onValueChange={(value: string) => setSelectedPitcherName(value)}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a pitcher..." />
			</SelectTrigger>
			<SelectContent>
				{pitcherData &&
					pitcherData.map((pitcher: Pitcher) => (
						<SelectItem
							key={pitcher.id}
							value={pitcher.fullName}
						>{`${pitcher.playerNumber} ${pitcher.fullName}`}</SelectItem>
					))}
			</SelectContent>
		</Select>
	);
};

export default PitcherSelecter;
