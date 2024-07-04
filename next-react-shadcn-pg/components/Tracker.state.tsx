"use client"

import { useState } from "react";
import { createContainer } from "unstated-next";

const useTrackerState = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return { 
		isLoading,
		setIsLoading,
	};
} 

const TrackerState = createContainer(useTrackerState);
export default TrackerState;