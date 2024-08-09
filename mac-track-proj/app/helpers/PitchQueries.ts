import { db } from "@/firebase/clientApp";
import {
	QuerySnapshot,
	collection,
	Timestamp,
	query,
	where,
	orderBy,
	onSnapshot,
} from "firebase/firestore";
import { getEndTimestamp, getStartTimestamp } from "./TimestampHandler";

const pitchesCollRef = collection(db, "pitches");

export const streamDatePitchList = (
	pitcherName: string,
	date: Date,
	callback: (snapshot: QuerySnapshot) => void
) => {
	//const pitchesCollRef = collection(db, "pitches");
	const startTime: Timestamp = getStartTimestamp(date);
	const endTime: Timestamp = getEndTimestamp(date);
	const q = query(
		pitchesCollRef,
		where("fullName", "==", pitcherName),
		where("pitchDate", ">=", startTime),
		where("pitchDate", "<=", endTime),
		orderBy("pitchDate", "desc")
	);
	return onSnapshot(q, callback);
};

export const getAllPitches = (
	pitcherName: string,
	callback: (snapshot: QuerySnapshot) => void
) => {
	//const pitchesCollRef = collection(db, "pitches");
	const q = query(
		pitchesCollRef,
		where("fullName", "==", pitcherName),
		orderBy("pitchDate", "desc")
	);
	return onSnapshot(q, callback);
};
