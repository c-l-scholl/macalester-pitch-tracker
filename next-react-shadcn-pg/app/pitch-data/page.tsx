import React, { useState, useContext, createContext } from "react";
import { PitchForm } from "@/components/PitchForm";
import { Pitch, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { db } from "@/firebase/clientApp";
import { getDocs, collection } from "firebase/firestore";
import PitchTracker from "./PitchTracker";

// async function getPitches(): Promise<Pitch[]> {
//   // needs to be expanded to take specific pitcher 
//   // maybe a component above the form and this page that gets the pitcher
// 	interface Pitcher {
// 		email: string;
// 		gradYear: number;
// 		id: string;
// 		pitcherName: string;
// 	}
// 	// Fetch data from your API here.
// 	const pitcherCollRef = collection(db, "pitcher");
// 	const data = await getDocs(pitcherCollRef);

// 	const filteredData = data.docs.map((doc) => ({
// 		...doc.data(),
// 		id: doc.id,
// 	})) as Pitcher[];

// 	const pitchCollRef = collection(
// 		db,
// 		"pitcher/" + filteredData[0].id + "/pitches"
// 	);
// 	const pitchData = await getDocs(pitchCollRef);

// 	const filteredPitchData = pitchData.docs.map((doc) => ({
// 		...doc.data(),
// 		id: doc.id,
// 	}));

// 	const fullPitchData = filteredPitchData.map((pitch) => ({
// 		...pitch,
// 		pitcherName: filteredData[0].pitcherName,
// 	})) as Pitch[];

// 	return fullPitchData;
// }

export default async function Page() {


	//const data = await getPitches();
  return (
    <div>
      <PitchTracker/>
    </div>
  )

	// return (
	// 	<div className="flex flex-row">
	// 		<PitchForm />

	// 		<div className="p-4">
	// 			<h1 className="text-3xl font-bold mb-2">Pitch Data</h1>
	// 			<DataTable columns={columns} data={data} />
	// 		</div>
	// 	</div>
	// );
}
