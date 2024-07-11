"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
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
	// const snapShot = onSnapshot(q, (querySnapshot) => {
	// 	const data = [];
	// 	querySnapshot.forEach((doc) => {
	// 		data.push({ ...doc.data(), id: doc.id });
	// 	});
	// });
	// return [];
}

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

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [pitchData, setPitchData] = useState<Pitch[]>([]);
	const [pitcherData, setPitcherData] = useState<Pitcher[]>([]);
	const [isChanging, setIsChanging] = useState<boolean>(false);
	const [selectedPitch, setSelectedPitch] = useState<Pitch | null>(null);

	const onDelete = async (pitch: Pitch) => {
		setIsLoading(true);
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

	//const getPitchesSnapShot = () => {
	// const pitchesCollRef = collection(db, "pitches");
	// const today: Timestamp = getTodayTimestamp();

	// const q = query(
	// 	pitchesCollRef,
	// 	where("pitchDate", ">=", today),
	// 	orderBy("pitchDate", "desc")
	// );
	// // TODO: FIX THIS
	// const snapShot = onSnapshot(q, (querySnapshot) => {
	// 	const data: Pitch[] = [];
	// 	querySnapshot.forEach((doc) => {
	// 		const pitchData = doc.data() as Omit<Pitch, "id">;
	// 		data.push({ ...pitchData, id: doc.id });
	// 	});
	// 	setPitchData(data);
	// 	setIsLoading(false);
	// 	console.log(data[0].fullName);
	// });
	// snapShot();
	// };

	const getPitcherData = async () => {
		const pitcherList = await getPitcherList();
		setPitcherData(pitcherList);
	};
	if (pitcherData.length === 0) {
		getPitcherData();
	}

	const columns = getPitchColumns({ onEdit, onDelete });

	useEffect(() => {
		const getPitchData = async () => {
			const data = await getPitches();
			setPitchData(data);
			setIsLoading(false);
		};
		getPitchData();
		console.log("re-render");
		
	}, [isLoading]);


	return (
		<div className="flex min-w-screen">
			<div className="flex-none">
				<PitchForm
					setIsLoading={setIsLoading}
					isChanging={isChanging}
					selectedPitch={selectedPitch}
					onOpenChange={onOpenChange}
					pitcherList={pitcherData}
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
