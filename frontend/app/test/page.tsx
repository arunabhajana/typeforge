import { TypingInterface } from "@/components/typing/TypingInterface";

export default function TestPage() {
    return (
        <main className="flex flex-col min-h-screen bg-gradient-to-b from-[#020014] to-[#1e1b4b] pt-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
                        Test Your Speed
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Focus. Type. Improve.
                    </p>
                </div>

                <TypingInterface />
            </div>
        </main>
    );
}
