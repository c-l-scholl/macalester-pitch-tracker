"use client";

import React, { useState, useEffect } from "react";
import { FullPitchData, getFullPitchDataColumns } from "./SummaryColumns";
import { FullDataTable } from "@/components/FullDataTable";
import { db } from "@/firebase/clientApp";
import { QueryDocumentSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";
import PitchCount from "@/components/PitchCount";
import SplitsData from "./SplitsData";
import DatePicker from "@/components/DatePicker";
import PitcherSelecter from "@/components/PitcherSelecter";
import { getAllPitches, streamDatePitchList } from "@/app/helpers/PitchQueries";
import { Button } from "@/components/ui/button";

export default function PitcherSummary() {
	const { toast } = useToast();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [pitchData, setPitchData] = useState<FullPitchData[]>([]);
	const [selectedPitcherName, setSelectedPitcherName] = useState<string>("");
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const [isChanging, setIsChanging] = useState<boolean>(false);
	const [selectedPitch, setSelectedPitch] = useState<FullPitchData | null>(
		null
	);

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
		setIsLoading(false);
	};
	// TODO: maybe change on edit to only take pitch type
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

	// const getAllPitchesForPitcher = (pitcherName: string) => {
	// 	const unsubscribe = getAllPitches(pitcherName, (querySnapshot) => {
	// 		const updatedPitches = querySnapshot.docs.map(
	// 			(doc: QueryDocumentSnapshot) => ({ ...doc.data(), id: doc.id })
	// 		) as FullPitchData[];
	// 		setPitchData(updatedPitches);
	// 	},
	// )
	// }

	const columns = getFullPitchDataColumns({ onEdit, onDelete });

	useEffect(() => {
		setIsLoading(true);
		if (!selectedDate) {
			const unsubscribe = getAllPitches(
				selectedPitcherName,
				(querySnapshot) => {
					const updatedPitches = querySnapshot.docs.map(
						(doc: QueryDocumentSnapshot) => ({ ...doc.data(), id: doc.id })
					) as FullPitchData[];
					setPitchData(updatedPitches);
				}
			);
			setIsLoading(false);
			return () => unsubscribe();
		} else {
			const unsubscribe = streamDatePitchList(
				selectedPitcherName,
				selectedDate,
				(querySnapshot) => {
					const updatedPitches = querySnapshot.docs.map(
						(doc: QueryDocumentSnapshot) => ({ ...doc.data(), id: doc.id })
					) as FullPitchData[];
					setPitchData(updatedPitches);
				}
			);
			setIsLoading(false);
			return () => unsubscribe();
		}
	}, [selectedPitcherName, selectedDate, setPitchData]);

	return (
		<div className="flex flex-row">
			<div className="sticky min-w-[300px] border-r min-h-screen items-start">
				<div className="flex flex-col gap-2 p-4 items-start">
					<PitcherSelecter setSelectedPitcherName={setSelectedPitcherName} />
					<DatePicker date={selectedDate} setDate={setSelectedDate} />
					<Button onClick={() => setSelectedDate(null)}>
						Get All Pitches
					</Button>
					<SplitsData pitchData={pitchData} />
				</div>
			</div>

			<div className="flex-grow p-4 mx-4">
				<div className="flex flex-row justify-between items-center mb-2">
					<h1 className="text-3xl font-bold ">Pitcher Data</h1>
					<PitchCount pitchCount={pitchData.length} />
				</div>
				{isLoading && <span>Loading</span>}
				{!isLoading && <FullDataTable columns={columns} data={pitchData} />}
			</div>
		</div>
	);
}
