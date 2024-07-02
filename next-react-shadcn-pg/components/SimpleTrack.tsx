"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { db } from "@/firebase/clientApp";
import {
	QueryDocumentSnapshot,
	getDocs,
	collection,
	Timestamp,
	addDoc,
	deleteDoc,
	updateDoc,
	doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const SimpleTrack = () => {
	interface Pitch {
		fullName: string;
		pitchDate: Timestamp;
		batterHand: string;
		pitchType: string;
		velocity: number;
		result: string;
		id?: string;
	}

	const [pitchesList, setPitchesList] = useState<Pitch[]>();

	// New Pitch States
	const [pitcherName, setPitcherName] = useState<string>("First Last");
	const [batterHand, setBatterHand] = useState<string>("Right");
	const [pitchVelocity, setPitchVelocity] = useState<number>(50);
	const [pitchType, setPitchType] = useState<string>("FB");
	const [pitchResult, setPitchResult] = useState<string>("Strike");

	// Update pitchType state
	const [updatedPitchType, setUpdatedPitchType] = useState<string>("FB");

	const getPitchesList = async () => {
		try {
			const data = await getDocs(pitchesCollRef);
			const filteredData = data.docs.map((doc: QueryDocumentSnapshot) => ({
				...doc.data(),
				id: doc.id,
			})) as Pitch[];
			setPitchesList(filteredData);
		} catch (err) {
			console.error(err);
		}
	};

	const onSubmitPitch = async () => {
		try {
			await addDoc(pitchesCollRef, {
				batterHand: batterHand,
				fullName: pitcherName,
				pitchDate: Timestamp.fromDate(new Date()),
				pitchType: pitchType,
				velocity: pitchVelocity,
				result: pitchResult,
			});

			getPitchesList();
		} catch (err) {
			console.error(err);
		}
	};

	const deletePitch = async (id?: string) => {
		if (id != undefined) {
			const pitchDocToDelete = doc(db, "pitches", id);
			await deleteDoc(pitchDocToDelete);
			getPitchesList();
		}
	};

	const updatePitchType = async (id?: string) => {
		if (id != undefined) {
			const pitchDocToChange = doc(db, "pitches", id);
			await updateDoc(pitchDocToChange, { pitchType: updatedPitchType });
      getPitchesList();
		}
	};

	const pitchesCollRef = collection(db, "pitches");

	useEffect(() => {
		getPitchesList();
	}, []);

	return (
		<div className="flex flex-row">
			<div className="flex flex-col p-4 g-2 w-[300px] border-r border-b space-y-2">
				<input
					className="border"
					placeholder="Pitcher Name"
					type="string"
					onChange={(e) => setPitcherName(e.target.value)}
				/>
				<input
					className="border"
					placeholder="Batter Hand"
					type="string"
					onChange={(e) => setBatterHand(e.target.value)}
				/>
				<input
					className="border"
					placeholder="Pitch Type"
					type="string"
					onChange={(e) => setPitchType(e.target.value)}
				/>
				<input
					className="border"
					placeholder="Velocity"
					type="number"
					onChange={(e) => setPitchVelocity(Number(e.target.value))}
				/>
				<input
					className="border"
					placeholder="Pitch Result"
					type="string"
					onChange={(e) => setPitchResult(e.target.value)}
				/>
				<Button type="submit" onClick={onSubmitPitch}>
					Submit
				</Button>
			</div>
			<div className="p-4">
				<h1 className="mb-4">Pitch Data</h1>
				<div className="flex-col">
					{pitchesList?.map((pitch) => (
						<div
							className="flex flex-row gap-2 p-2 border-2"
							key={pitch.id}
						>
							<p>{pitch.fullName}</p>
							<p>{`${pitch.pitchDate.toDate().getMonth()}/${pitch.pitchDate.toDate().getDate()}/${pitch.pitchDate.toDate().getFullYear()}`}</p>
							<p>{pitch.batterHand}</p>
							<p>{pitch.pitchType}</p>
							<p>{pitch.velocity}</p>
							<p>{pitch.result}</p>
							<Button
								variant="destructive"
								onClick={() => deletePitch(pitch.id)}
							>
								Delete
							</Button>
							<input
								placeholder="change pitch..."
								onChange={(e) => setUpdatedPitchType(e.target.value)}
							/>
							<Button variant="outline" onClick={() => updatePitchType(pitch.id)}>
								Update title
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
