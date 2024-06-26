import React, { useState } from "react";
import { PitchForm } from "@/components/PitchForm";
import { Pitch, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { db } from "@/firebase/clientApp";
import { getDocs, collection } from "firebase/firestore";

async function getPitches(): Promise<Pitch[]> {
	interface Pitcher {
		email: string;
		firstName: string;
		gradYear: number;
		id: string;
		lastName: string;
	}
	// Fetch data from your API here.
	const pitcherCollRef = collection(db, "pitcher");
	const data = await getDocs(pitcherCollRef);
	const filteredData = data.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	})) as Pitcher[];
	const pitchCollRef = collection(
		db,
		"pitcher/" + filteredData[0].id + "/pitches"
	);
	const pitchData = await getDocs(pitchCollRef);
  const pitcherName = filteredData[0].firstName + " " + filteredData[0].lastName;
	const filteredPitchData = pitchData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

	const fullPitchData = filteredPitchData.map((pitch) => ({...pitch, pitcherName: pitcherName})) as Pitch[];
  return fullPitchData;
	// return [
	// 	{
	// 		id: "728ed52f",
	// 		pitcherName: "Camden Scholl",
	// 		batterHand: "L",
	// 		contact: "Strike",
	// 		velocity: 82,
	// 		pitchType: "FB",
	// 	},
	// ];
}

export default async function Page() {
	const data = await getPitches();

	return (
		<div className="flex flex-row">
			<PitchForm />

			<div className="p-4">
				<h1 className="text-3xl font-bold mb-2">Pitch Data</h1>
				<DataTable columns={columns} data={data} />
			</div>
		</div>
	);
}
