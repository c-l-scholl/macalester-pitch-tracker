"use client";

import { db } from "@/firebase/clientApp";
import {
	QueryDocumentSnapshot,
	getDocs,
	collection,
	Timestamp,
	addDoc,
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

	const pitchesCollRef = collection(db, "pitches");

	useEffect(() => {
		//why no work when getPitches outside useEffect

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
				<button
					className="w-[100px] border bg-black text-white rounded-md p-2"
					type="submit"
					onClick={onSubmitPitch}
				>
					Submit
				</button>
			</div>
			<div className="p-4">
				<h1 className="mb-4">Pitch Data</h1>
				<div className="flex-col">
					{pitchesList?.map((pitch) => (
						<div className="flex flex-row g-2 p-2 border-2" key={pitch.id}>
							<p className="p-1">{pitch.fullName}</p>
							<p className="p-1">{pitch.pitchDate.toDate().toDateString()}</p>
							<p className="p-1">{pitch.batterHand}</p>
							<p className="p-1">{pitch.pitchType}</p>
							<p className="p-1">{pitch.velocity}</p>
							<p className="p-1">{pitch.result}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
