"use client"

import { db } from "@/firebase/clientApp";
import { doc, deleteDoc } from "firebase/firestore";



const deletePitch = async (id?: string) => {
	if (id != undefined) {
		const pitchDocToDelete = doc(db, "pitches", id);
		await deleteDoc(pitchDocToDelete);
		// getPitchesList();
	}
};

export { deletePitch };