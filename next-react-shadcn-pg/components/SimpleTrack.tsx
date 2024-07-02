"use client";

import { db } from "@/firebase/clientApp";
import { QueryDocumentSnapshot, getDocs, collection, Timestamp } from "firebase/firestore";
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

	const pitchesCollRef = collection(db, "pitches");

	useEffect(() => {
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
		getPitchesList();
	}, []);

	return (
		<div className="flex flex-col">
			{pitchesList?.map((pitch) => (
				<div className="flex flex-row g-2 p-4 border" key={pitch.id}>
					<p className="p-1">{pitch.fullName}</p>
					<p className="p-1">{pitch.pitchDate.toDate().toDateString()}</p>
					<p className="p-1">{pitch.pitchType}</p>
					<p className="p-1">{pitch.velocity}</p>
					<p className="p-1">{pitch.result}</p>
					<p className="p-1">{pitch.batterHand}</p>
				</div>
			))}
		</div>
	);
};
