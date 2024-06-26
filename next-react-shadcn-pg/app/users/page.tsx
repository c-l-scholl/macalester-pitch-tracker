import React from 'react';

import { Pitch, columns } from "./columns"
import { DataTable } from "@/components/data-table"

async function getUsers(): Promise<Pitch[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      pitcherName: "Camden Scholl",
	  batterHand: "L",
      contact: "Strike",
      velocity: 82,
	  pitchType: "FB"
    },
    // ...
  ]
}


export default async function Page() {

	const data = await getUsers();

	return (
		<section className="py-24">
			<div className="container">
				<h1 className="text-3xl font-bold">All Users</h1>
				<DataTable columns={columns} data={data} />
			</div>
		</section>
	)
}