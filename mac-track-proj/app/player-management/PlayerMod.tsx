"use client";
import { db } from "@/firebase/clientApp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { doc, setDoc } from "firebase/firestore";

const FormSchema = z.object({
	fullName: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	playerNumber: z.number({
		required_error: "You must enter a number.",
	}),
	gradYear: z.number({
		required_error: "You must enter a graduation year.",
	}),
});

export const PlayerMod = () => {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			fullName: "",
			playerNumber: 1,
			gradYear: 2025,
		},
	});

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		// TODO: Add toasts for failures and successes
		//const pitcherCollRef = collection(db, "pitcher");
		const fullNameDash = data.fullName.replace(" ", "-");
		const playerDocId = doc(
			db,
			"pitcher",
			`${data.gradYear}${fullNameDash}${data.playerNumber}`
		);
		try {
			await setDoc(playerDocId, {
				fullName: data.fullName,
				playerNumber: data.playerNumber,
				gradYear: data.gradYear,
			});
			toast({
				description: "Player added successfully.",
			});
		} catch (err) {
			toast({
				title: "Uh oh! Something went wrong.",
				description:
					"There was a problem with your player submission attempt. Please try again.",
				variant: "destructive",
			});
			form.reset();
		}
	}

	return (
		<div className="flex items-center justify-center min-w-[400px] p-4">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-2/3 space-y-6"
				>
					<FormField
						control={form.control}
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter your name..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="playerNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number</FormLabel>
								<FormControl>
									<Input
										type="number"
										min={0}
										max={99}
										placeholder="Enter your number..."
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
						name="gradYear"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Grad Year</FormLabel>
								<FormControl>
									<Input
										type="number"
										min={2024}
										max={3000}
										placeholder="Enter your graduation year..."
										{...field}
										onChange={(event) => field.onChange(+event.target.value)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-end">
						<Button type="submit">Add Player</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default PlayerMod;
