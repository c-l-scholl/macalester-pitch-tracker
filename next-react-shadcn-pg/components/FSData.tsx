"use client"

import { db } from "@/firebase/clientApp";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from 'react';

export const FSData = () => {

  interface Pitcher {
    email: string;
    firstName: string;
    gradYear: number;
    id: string;
    lastName: string;
  }

  const [pitcherList, setPitcherList] = useState<Object>([]);
  const pitcherCollRef = collection(db, "pitcher");

  useEffect(() => {
    const getPitcherList = async () => {
      try {
        const data = await getDocs(pitcherCollRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Pitcher[];
        const pitchCollRef = collection(db, "pitcher/" + filteredData[0].id + "/pitches");
        const pitchData = await getDocs(pitchCollRef);
        const filteredPitchData = pitchData.docs.map((doc) => ({...doc.data()}));
      } catch (err) {
        console.log(err);
      }
    }

    getPitcherList();
  }, [])
  

	return(
		<div>
      
		</div>
	)
}