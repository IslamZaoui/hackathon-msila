import { Button } from "@/components/ui/button"
import Link from "next/link"
import RegistrationForm from "./signupP-form"


export default function SignInPage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Sign Up to MediLink as a Patient
            </h2>
            <RegistrationForm></RegistrationForm>
            <Button variant={"link"} asChild><Link href={"/signin"}>Already have an account? Sign In</Link></Button>
            <Button variant={"link"} asChild><Link href={"/signup/doctor"}>Doctor? Sign Up as a Doctor</Link></Button>
        </div>
    )
}