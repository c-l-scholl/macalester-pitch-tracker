"use client";

interface PitchCountProps {
	pitchCount: number;
}

const PitchCount = ({ pitchCount }: PitchCountProps) => {
	return (
		<div className="px-4 py-2 border rounded-md">
			<p>Pitch Count: {pitchCount}</p>
		</div>
	);
};

export default PitchCount;
