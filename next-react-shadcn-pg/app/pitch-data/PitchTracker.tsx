"use client";

import React, { useState, useContext, createContext, useEffect } from "react";
import { PitchForm } from "@/components/PitchForm";
import { Pitch, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { db } from "@/firebase/clientApp";
import {
	getDocs,
	collection,
	query,
	QueryDocumentSnapshot,
	orderBy,
} from "firebase/firestore";
import TrackerState from "@/components/Tracker.state";

async function getPitches(): Promise<Pitch[]> {
	// needs to be expanded to take specific pitcher
	// maybe a component above the form and this page that gets the pitcher
	const pitchesCollRef = collection(db, "pitches");
	const q = query(pitchesCollRef, orderBy("pitchDate", "desc"));
	const data = await getDocs(q);
	const filteredData = data.docs.map((doc: QueryDocumentSnapshot) => ({
		...doc.data(),
		id: doc.id,
	})) as Pitch[];
	return filteredData;
}

export default function PitchTracker() {
	const { isLoading, setIsLoading } = TrackerState.useContainer();
	const [pitchData, setPitchData] = useState<Pitch[]>([]);

	useEffect(() => {
		const getPitchData = async () => {
			const data = await getPitches();
			setPitchData(data);
			setIsLoading(false);
		};

		getPitchData();
	}, [isLoading]);

	return (
		<div className="flex flex-row">
			<PitchForm />

			<div className="p-4">
				<h1 className="text-3xl font-bold mb-2">Pitch Data</h1>
				<DataTable columns={columns} data={pitchData} />
			</div>
		</div>
	);
}
