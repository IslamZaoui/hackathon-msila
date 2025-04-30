import Image from "next/image"


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen h-screen w-full flex items-center justify-center lg:grid lg:grid-cols-2">
            <section className="hidden lg:flex lg:h-full lg:w-full justify-center items-center bg-[#b6ffd0]">
                <Image src={"/auth-layout-vector.png"} alt="Doctor and Patient Vector Image" priority width={600} height={800}></Image>
            </section>
            <section className="w-full">
                {children}
            </section>
        </main>
    )
}