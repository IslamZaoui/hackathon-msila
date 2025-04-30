import { Button } from "@/components/ui/button"
import { SignInForm } from "./signin-form"
import Link from "next/link"


export default function SignInPage() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Sign In to MediLink
            </h2>
            <SignInForm></SignInForm>
            <Button variant={"link"} asChild><Link href={"/signup"}>Don't have an account? Sign Up</Link></Button>
        </div>
    )
}