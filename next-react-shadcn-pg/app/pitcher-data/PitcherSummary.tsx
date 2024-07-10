"use client";

import React, { useState, useEffect } from "react";
import { PitchForm } from "@/components/PitchForm";
import { FullPitchData, getFullPitchDataColumns } from "./SummaryColumns";
import { FullDataTable } from "@/components/FullDataTable";
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
import { useToast } from "@/components/ui/use-toast";
import PitchCount from "../pitch-tracker/PitchCount";
import PitcherSelect from "./PitcherSelect";
import SplitsData from "./SplitsData";

export type Pitcher = {
	id: string;
	fullName: string;
	playerNumber: number;
}

const getTodayTimestamp = (): Timestamp => {
	const todayStart = new Date();
	todayStart.setHours(0, 0, 0, 0);
	const todayTimestamp: Timestamp = Timestamp.fromDate(todayStart);
	return todayTimestamp;
};

async function getPitches(): Promise<FullPitchData[]> {
	// needs to be expanded to take specific pitcher
	// maybe a component above the form and this page that gets the pitcher
	const pitchesCollRef = collection(db, "pitches");

	const q = query(
		pitchesCollRef,
		// where("pitchDate", ">=", getTodayTimestamp()),
		orderBy("pitchDate", "desc")
	);
	const data = await getDocs(q);
	const filteredData = data.docs.map((doc: QueryDocumentSnapshot) => ({
		...doc.data(),
		id: doc.id,
	})) as FullPitchData[];
	return filteredData;
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
	const [pitchData, setPitchData] = useState<FullPitchData[]>([]);
	const [pitcherData, setPitcherData] = useState<Pitcher[]>([]);
	const [isChanging, setIsChanging] = useState<boolean>(false);
	const [selectedPitch, setSelectedPitch] = useState<FullPitchData | null>(null);

	const onDelete = async (pitch: FullPitchData) => {
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
	// maybe change on edit to only take pitch type
	const onEdit = (pitch: FullPitchData) => {
		setSelectedPitch(pitch);
		setIsChanging(true);
	};

	const onOpenChange = (value: boolean) => {
		setIsChanging(false);
		if (!value) {
			setSelectedPitch(null);
		}
	};

	const columns = getFullPitchDataColumns({ onEdit, onDelete });

	useEffect(() => {
		const getPitchData = async () => {
			const data = await getPitches();
			setPitchData(data);
			setIsLoading(false);
		};

		const getPitcherData = async () => {
			const pitcherList = await getPitcherList();
			setPitcherData(pitcherList);
		}

		getPitchData();
		if (pitcherData.length === 0) {
			getPitcherData();
		}
	}, [isLoading, pitcherData]);

	return (
		<div className="flex flex-row">
			<div className="sticky flex flex-col gap-2 w-[300px] min-w-[300px] border-r min-h-screen p-4">
				<PitcherSelect pitcherList={pitcherData}/>
				<SplitsData/>
				{/* select pitcher thing here */}
				{/* side bar here */}
			</div>

			<div className="flex-grow p-4 mx-4">
				<div className="flex flex-row justify-between items-center mb-2">
					<h1 className="text-3xl font-bold ">Pitcher Data</h1>
					<PitchCount pitchCount={pitchData.length}/>
				</div>

				{isLoading && <span>Loading</span>}
				{!isLoading && <FullDataTable columns={columns} data={pitchData} />}
			</div>
		</div>
	);
}
