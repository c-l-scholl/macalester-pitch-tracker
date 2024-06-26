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
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/clientApp";


const formSchema = z.object({
	pitcher: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	batterHand: z.enum(["R", "L"], {
		required_error: "You need to select a batter handedness",
	}),
	velocity: z.number(),
	pitchType: z.enum(["FB", "2S", "CH", "SL", "CB", "Other"], {
		required_error: "You need to select a pitch type",
	}),
	contact: z.enum(["B", "S", "F", "O", "H", "2B", "3B", "HR"], {
		required_error: "You need to select a result",
	}),
});

export function PitchForm() {

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			pitcher: "Camden Scholl",
			batterHand: "R",
			velocity: 50,
			pitchType: "FB",
			contact: "S",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		interface Pitcher {
			email: string;
			gradYear: number;
			id: string;
			pitcherName: string;
		}

		let currentPitcher: Pitcher = {
			email: "",
			gradYear: 0,
			id: "",
			pitcherName: "",
		};

		if (currentPitcher.pitcherName !== values.pitcher) {

			const pitcherCollRef = collection(db, "pitcher");
			const data = await getDocs(pitcherCollRef);

			const filteredData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			})) as Pitcher[];
			filteredData.forEach((element) => {
				if (element.pitcherName === values.pitcher) {
					currentPitcher = element;
				}
			});
		}

    const pitchCollRef = collection(
      db,
      "pitcher/" + currentPitcher.id + "/pitches"
    );

		await addDoc(pitchCollRef, {
			batterHand: values.batterHand,
			contact: values.contact,
			pitchType: values.pitchType,
			velocity: values.velocity,
		});
	}

	return (
		<div className="flex gap-2 w-[200px] min-w-[200px] border-r min-h-screen p-4">
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
												<RadioGroupItem value="R" />
											</FormControl>
											<FormLabel className="font-normal">
												Right-Handed
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="L" />
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
												<RadioGroupItem value="B" />
											</FormControl>
											<FormLabel className="font-normal">Ball</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="S" />
											</FormControl>
											<FormLabel className="font-normal">Strike</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="F" />
											</FormControl>
											<FormLabel className="font-normal">Foul</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="O" />
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

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
