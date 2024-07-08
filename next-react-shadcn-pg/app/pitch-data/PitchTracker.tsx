"use client";

import React, { useState, useEffect } from "react";
import { PitchForm } from "@/components/PitchForm";
import { Pitch, getPitchColumns } from "./columns";
import { DataTable } from "@/components/data-table";
import { db } from "@/firebase/clientApp";
import {
	getDocs,
	collection,
	query,
	QueryDocumentSnapshot,
	orderBy,
	deleteDoc,
	doc,
	Timestamp,
	where,
} from "firebase/firestore";
import PitchCount from "./PitchCount";

const getTodayTimestamp = (): Timestamp => {
  const todayStart = new Date();
	todayStart.setHours(0, 0, 0, 0);
  const todayTimestamp: Timestamp = Timestamp.fromDate(todayStart);
  return todayTimestamp;
};

async function getPitches(): Promise<Pitch[]> {
	// needs to be expanded to take specific pitcher
	// maybe a component above the form and this page that gets the pitcher
	const pitchesCollRef = collection(db, "pitches");

	const q = query(
		pitchesCollRef,
		where("pitchDate", ">=", getTodayTimestamp()),
		orderBy("pitchDate", "desc")
	);
	const data = await getDocs(q);
	const filteredData = data.docs.map((doc: QueryDocumentSnapshot) => ({
		...doc.data(),
		id: doc.id,
	})) as Pitch[];
	return filteredData;
}

export default function PitchTracker() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [pitchData, setPitchData] = useState<Pitch[]>([]);
	const [isChanging, setIsChanging] = useState<boolean>(false);
	const [selectedPitch, setSelectedPitch] = useState<Pitch | null>(null);

	const onDelete = async (pitch: Pitch) => {
		setIsLoading(true);
		onOpenChange(false);
		try {
			if (pitch.id != undefined) {
				const pitchDocToDelete = doc(db, "pitches", pitch.id);
				await deleteDoc(pitchDocToDelete);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const onEdit = (pitch: Pitch) => {
		setSelectedPitch(pitch);
		setIsChanging(true);
	};

	const onOpenChange = (value: boolean) => {
		setIsChanging(false);
		if (!value) {
			setSelectedPitch(null);
		}
	};

	const columns = getPitchColumns({ onEdit, onDelete });

	useEffect(() => {
		const getPitchData = async () => {
			const data = await getPitches();
			setPitchData(data);
			setIsLoading(false);
		};

		getPitchData();
	}, [isLoading]);

	return (
		<div className="flex min-w-screen">
			<div className="flex-none">
				<PitchForm
					setIsLoading={setIsLoading}
					isChanging={isChanging}
					selectedPitch={selectedPitch}
					onOpenChange={onOpenChange}
				/>
			</div>

			<div className="flex-grow p-4 mx-4">
				<div className="flex flex-row justify-between items-center mb-2">
					<h1 className="text-3xl font-bold ">Pitch Data</h1>
					<PitchCount pitchCount={pitchData.length} />
				</div>

				{isLoading && <span>Loading</span>}
				{!isLoading && <DataTable columns={columns} data={pitchData} />}
			</div>
		</div>
	);
}
