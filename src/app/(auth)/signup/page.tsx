import { Button } from "@/components/ui/button";
import { HeartPulse, ScanHeart } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Sign Up to MediLink
            </h2>
            <Button className="w-full max-w-sm h-12" asChild><Link href="/signup/doctor"><HeartPulse></HeartPulse>Continue as a Doctor</Link></Button>
            <Button className="w-full max-w-sm h-12" variant="secondary" asChild><Link href="/signup/patient"><ScanHeart></ScanHeart>Continue as a Patient</Link></Button>
            <Button variant={"link"} asChild><Link href={"/signin"}>Already have an account? Sign In</Link></Button>
        </div>
    )
}