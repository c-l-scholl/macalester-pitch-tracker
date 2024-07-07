import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return(
    <>
      <div className="flex min-h-screen min-w-screen justify-center items-center">
        <Button variant="link" size="lg">
          <Link href="/pitch-data">Pitch Tracker</Link>
        </Button>
      </div>
    </>
  );
}
