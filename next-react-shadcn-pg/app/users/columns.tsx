"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Pitch = {
  id: string
  pitcherName: string
  contact: "Ball" | "Strike" | "Foul" | "H" | "2B" | "3B" | "HR"
  velocity: number
  pitchType: "FB" | "2S" | "CH" | "CB" | "SL" | "Other"
}

export const columns: ColumnDef<Pitch>[] = [
  {
    accessorKey: "pitcherName",
    header: "Pitcher",
  },
  {
    accessorKey: "contact",
    header: "Pitch result",
  },
  {
    accessorKey: "velocity",
    header: "Velocity",
  },
  {
	accessorKey: "pitchType",
	header: "Pitch Type",
  }
]
