import React from "react";
import { PitchForm } from "@/components/PitchForm";
import { Pitch, columns } from "./columns";
import { DataTable } from "@/components/data-table";

async function getUsers(): Promise<Pitch[]> {
	// Fetch data from your API here.
	return [
		{
			id: "728ed52f",
			pitcherName: "Camden Scholl",
			batterHand: "L",
			contact: "Strike",
			velocity: 82,
			pitchType: "FB",
		},
		// ...
	];
}

export default async function Page() {
	const data = await getUsers();

	return (
		<div>
      <div className="flex flex-row">
        <PitchForm />
      </div>
      
      <div className="pl-[200px] m-4">
        <h1 className="text-3xl font-bold mb-2">Pitch Data</h1>
        <DataTable columns={columns} data={data} />
      </div>
		</div>
	);
}
