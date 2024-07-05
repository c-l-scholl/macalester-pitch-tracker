import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const TestDialog = () => {
	return (
    <>
			<DialogHeader>
				<DialogTitle>Are you absolutely sure?</DialogTitle>
				<DialogDescription>
					This action cannot be undone. Are you sure you want to permanently
					delete this file from our servers?
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<Button type="submit">Confirm</Button>
			</DialogFooter>
    </>
	);
};

export default TestDialog;
