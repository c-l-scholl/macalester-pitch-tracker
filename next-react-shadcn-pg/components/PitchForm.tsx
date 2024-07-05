"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
	Timestamp,
	addDoc,
	collection,
	doc,
	getDoc,
	setDoc,
} from "firebase/firestore";
import { db } from "@/firebase/clientApp";
import { auth } from "@/firebase/clientApp";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Pitch } from "@/app/pitch-data/columns";

const formSchema = z.object({
	pitcher: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	batterHand: z.enum(["Left", "Right"], {
		required_error: "You need to select a batter handedness.",
	}),
	velocity: z.number({
		required_error: "You need to enter a velocity.",
	}),
	pitchType: z.enum(["FB", "2S", "CH", "SL", "CB", "Other"], {
		required_error: "You need to select a pitch type.",
	}),
	contact: z.enum(["Ball", "Strike", "Foul", "Out", "H", "2B", "3B", "HR"], {
		required_error: "You need to select a result.",
	}),
});

interface PitchFormProps {
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	onOpenChange: (value: boolean) => void;
	selectedPitch: Pitch | null;
	isChanging: boolean;
}

export const PitchForm = ({
	setIsLoading,
	selectedPitch,
	isChanging,
	onOpenChange,
}: PitchFormProps) => {
	//const { isLoading, setIsLoading } = TrackerState.useContainer();
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			pitcher: "Camden Scholl",
			batterHand: "Right",
			pitchType: "FB",
			contact: "Strike",
		},
	});

	useEffect(() => {
		if (selectedPitch) {
			form.reset({
				pitcher: selectedPitch.fullName,
				batterHand: selectedPitch.batterHand,
				pitchType: selectedPitch.pitchType,
				velocity: selectedPitch.velocity,
				contact: selectedPitch.result,
			});
		} else {
			form.reset();
		}
	}, [isChanging, selectedPitch, form]);

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.

		const pitchesCollRef = collection(db, "pitches");
		setIsLoading(true);
		if (!isChanging) {
			try {
				await addDoc(pitchesCollRef, {
					batterHand: values.batterHand,
					fullName: values.pitcher,
					pitchDate: Timestamp.fromDate(new Date()),
					pitchType: values.pitchType,
					velocity: values.velocity,
					result: values.contact,
					// now there is user connected with each pitch
					// userId: auth?.currentUser?.uid
				});
			} catch (err) {
				console.error(err);
				setIsLoading(false);
			}
		} else {
			try {
				if (selectedPitch !== null) {
					const pitchRef = doc(db, "pitches", selectedPitch?.id);
					await setDoc(
						pitchRef,
						{
							batterHand: values.batterHand,
							pitchType: values.pitchType,
							velocity: values.velocity,
							result: values.contact,
						},
						{ merge: true }
					);
				}
			} catch (err) {
				console.error(err);
				setIsLoading(false);
			}
		}
		onOpenChange(false);
	}

	return (
		<div className="flex flex-col gap-2 w-[200px] min-w-[200px] border-r min-h-screen p-4">
			<div className="flex">
				<h1 className="mb-2 text-xl font-bold">
					{selectedPitch ? "Change Pitch" : "New Pitch"}
				</h1>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="pitcher"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Pitcher</FormLabel>
								<FormControl>
									<Input placeholder="Pitcher Name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="batterHand"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Batter Handedness</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-col space-y-1"
									>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="Right" />
											</FormControl>
											<FormLabel className="font-normal">
												Right-Handed
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="Left" />
											</FormControl>
											<FormLabel className="font-normal">Left-Handed</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="velocity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Velocity</FormLabel>
								<FormControl>
									<Input
										type="number"
										min={50}
										max={110}
										placeholder="In mph"
										{...field}
										onChange={(event) => field.onChange(+event.target.value)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="pitchType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Pitch Type</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-col space-y-1"
									>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="FB" />
											</FormControl>
											<FormLabel className="font-normal">
												4-seam Fastball
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="2S" />
											</FormControl>
											<FormLabel className="font-normal">
												2-seam Fastball
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="CH" />
											</FormControl>
											<FormLabel className="font-normal">Change-up</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="SL" />
											</FormControl>
											<FormLabel className="font-normal">Slider</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="CB" />
											</FormControl>
											<FormLabel className="font-normal">Curveball</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="Other" />
											</FormControl>
											<FormLabel className="font-normal">Other</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="contact"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Result</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-col space-y-1"
									>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="Ball" />
											</FormControl>
											<FormLabel className="font-normal">Ball</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="Strike" />
											</FormControl>
											<FormLabel className="font-normal">Strike</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="Foul" />
											</FormControl>
											<FormLabel className="font-normal">Foul</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="Out" />
											</FormControl>
											<FormLabel className="font-normal">Out</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="H" />
											</FormControl>
											<FormLabel className="font-normal">Single</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="2B" />
											</FormControl>
											<FormLabel className="font-normal">Double</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="3B" />
											</FormControl>
											<FormLabel className="font-normal">Triple</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="HR" />
											</FormControl>
											<FormLabel className="font-normal">Homerun</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex flex-row gap-3">
						{isChanging && (
							<Button variant="outline" onClick={() => onOpenChange(false)}>
								Cancel
							</Button>
						)}
						<Button type="submit">Submit</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
