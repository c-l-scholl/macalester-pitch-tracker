"use client";

import { useEffect, useState } from "react";

interface PitchCountProps {
	pitchCount: number;
}

const PitchCount = ({ pitchCount }: PitchCountProps) => {
	const [numPitches, setNumPitches] = useState<number>(0);

	useEffect(() => {
		setNumPitches(pitchCount);
	}, [pitchCount]);


	return (
		<div className="px-4 py-2 border rounded-md">
			<p>Pitch Count: {numPitches}</p>
		</div>
	);
};

export default PitchCount;
