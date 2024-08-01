"use client";

import React, { useState, useEffect } from "react";
import { PitchForm } from "@/components/PitchForm";
import { Pitch, getPitchColumns } from "./columns";
import { DataTable } from "@/components/TrackerDataTable";
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
	onSnapshot,
	QuerySnapshot,
} from "firebase/firestore";
import PitchCount from "./PitchCount";
import { useToast } from "@/components/ui/use-toast";
import PitcherSelecter from "@/components/PitcherSelecter";

export type Pitcher = {
	id: string;
	fullName: string;
	playerNumber: number;
};

const getTodayTimestamp = (): Timestamp => {
	const todayStart = new Date();
	todayStart.setHours(0, 0, 0, 0);
	const todayTimestamp: Timestamp = Timestamp.fromDate(todayStart);
	return todayTimestamp;
};

export const streamPitchList = (
	pitcherName: string,
	callback: (snapshot: QuerySnapshot) => void
) => {
	const pitchesCollRef = collection(db, "pitches");
	const today: Timestamp = getTodayTimestamp();
	const q = query(
		pitchesCollRef,
		where("fullName", "==", pitcherName),
		where("pitchDate", ">=", today),
		orderBy("pitchDate", "desc")
	);
	return onSnapshot(q, callback);
};

async function getPitches(): Promise<Pitch[]> {
	// needs to be expanded to take specific pitcher
	// maybe a component above the form and this page that gets the pitcher
	const pitchesCollRef = collection(db, "pitches");
	const today: Timestamp = getTodayTimestamp();

	const q = query(
		pitchesCollRef,
		where("pitchDate", ">=", today),
		orderBy("pitchDate", "desc")
	);
	const data = await getDocs(q);
	const filteredData = data.docs.map((doc: QueryDocumentSnapshot) => ({
		...doc.data(),
		id: doc.id,
	})) as Pitch[];
	return filteredData;
}

// this is identical method, maybe pass this out to somewhere else
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

export default function PitchTracker() {
	const { toast } = useToast();

	const [isTrackerLoading, setIsTrackerLoading] = useState<boolean>(false);
	const [pitchData, setPitchData] = useState<Pitch[]>([]);
	const [isChanging, setIsChanging] = useState<boolean>(false);
	const [selectedPitch, setSelectedPitch] = useState<Pitch | null>(null);
	const [selectedPitcherName, setSelectedPitcherName] = useState<string>("");

	const onDelete = async (pitch: Pitch) => {
		setIsTrackerLoading(true);
		onOpenChange(false);
		try {
			if (pitch.id != undefined) {
				const pitchDocToDelete = doc(db, "pitches", pitch.id);
				await deleteDoc(pitchDocToDelete);
				toast({
					description: "Pitch deleted successfully",
				});
			}
		} catch (err) {
			toast({
				title: "Uh oh! Something went wrong.",
				description:
					"There was a problem with your pitch deletion attempt. Please try again.",
				variant: "destructive",
			});
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

	// const getPitcherData = async () => {
	// 	const pitcherList = await getPitcherList();
	// 	setPitcherData(pitcherList);
	// };

	// if (pitcherData.length === 0) {
	// 	getPitcherData();
	// }

	const columns = getPitchColumns({ onEdit, onDelete });

	useEffect(() => {
		const unsubscribe = streamPitchList(
			selectedPitcherName,
			(querySnapshot) => {
				const filteredPitchList = querySnapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				})) as Pitch[];
				setPitchData(filteredPitchList);
			}
		);
		return () => unsubscribe();
	}, [isTrackerLoading, selectedPitcherName]);

	return (
		<div className="flex min-w-screen">
			<div className="flex-none">
				<div className="flex flex-col gap-4 w-[400px] min-w-[250px] border-r min-h-screen max-h-screen px-16 py-4">
					<PitcherSelecter setSelectedPitcherName={setSelectedPitcherName} />
					<PitchForm
						setIsLoading={setIsTrackerLoading}
						isChanging={isChanging}
						selectedPitch={selectedPitch}
						onOpenChange={onOpenChange}
						//pitcherList={pitcherData}
						selectedPitcherName={selectedPitcherName}
					/>
				</div>
			</div>

			<div className="flex-grow p-4 mx-4">
				<div className="flex flex-row justify-between items-center mb-2">
					<h1 className="text-3xl font-bold ">Pitch Data</h1>
					<PitchCount pitchCount={pitchData.length} />
				</div>

				{isTrackerLoading && <span>Loading</span>}
				{!isTrackerLoading && <DataTable columns={columns} data={pitchData} />}
			</div>
		</div>
	);
}
