"use client";

import React, { useState, useEffect } from "react";
import { PitchForm } from "@/components/PitchForm";
import { Pitch, getPitchColumns } from "./columns";
import TrackerDataTable from "@/components/TrackerDataTable";
import { db } from "@/firebase/clientApp";
import { deleteDoc, doc } from "firebase/firestore";
import PitchCount from "../../components/PitchCount";
import { useToast } from "@/components/ui/use-toast";
import PitcherSelecter from "@/components/PitcherSelecter";
import { streamDatePitchList } from "../helpers/PitchQueries";

const PitchTracker = () => {
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
		setIsTrackerLoading(false);
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
		const unsubscribe = streamDatePitchList(
			selectedPitcherName,
			new Date(),
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
				<div className="flex flex-col gap-3 w-[400px] min-w-[250px] border-r min-h-screen max-h-screen px-16 py-4">
					<div className="flex">
						<h1 className="mb-2 text-xl font-bold">
							{selectedPitch ? "Change Pitch" : "New Pitch"}
						</h1>
					</div>
					<PitcherSelecter setSelectedPitcherName={setSelectedPitcherName} />
					<PitchForm
						setIsLoading={setIsTrackerLoading}
						isChanging={isChanging}
						selectedPitch={selectedPitch}
						onOpenChange={onOpenChange}
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
				{!isTrackerLoading && <TrackerDataTable columns={columns} data={pitchData} />}
			</div>
		</div>
	);
}

export default PitchTracker;
