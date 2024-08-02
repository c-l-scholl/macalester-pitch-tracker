import { db } from "@/firebase/clientApp";
import { QuerySnapshot, collection, Timestamp, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { getEndTimestamp, getStartTimestamp } from "./TimestampHandler";

export const streamDatePitchList = (
	pitcherName: string,
	date: Date,
	callback: (snapshot: QuerySnapshot) => void
) => {
	const pitchesCollRef = collection(db, "pitches");
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