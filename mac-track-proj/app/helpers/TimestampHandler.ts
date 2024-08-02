import { Timestamp } from "firebase/firestore";



const getStartTimestamp = (date: Date | null): Timestamp => {
	let dayStart = date ?? new Date();
	dayStart.setHours(0, 0, 0, 0);
	const dayStartTimestamp: Timestamp = Timestamp.fromDate(dayStart);
	return dayStartTimestamp;
}

const getEndTimestamp = (date: Date | null): Timestamp => {
	let dayEnd = date ?? new Date();
	dayEnd.setHours(23, 59, 59, 999);
	const dayEndTimestamp: Timestamp = Timestamp.fromDate(dayEnd);
	return dayEndTimestamp;
}

export { getStartTimestamp, getEndTimestamp };