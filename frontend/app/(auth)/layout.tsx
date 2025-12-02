import { StarsBackground } from "@/components/ui/StarsBackground"
import { Meteors } from "@/components/ui/Meteors"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#020014] pt-24">
            <div className="absolute inset-0 w-full h-full">
                <StarsBackground />
                <Meteors number={20} />
            </div>

            <div className="relative z-10 w-full px-4">
                <div className="mb-8 text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
                        Type<span className="text-primary">Forge</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Master your speed. Forge your skills.
                    </p>
                </div>

                {children}
            </div>
        </div>
    )
}
