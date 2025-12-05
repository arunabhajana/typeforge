import { TypingInterface } from "@/components/typing/TypingInterface";

export default function TestPage() {
    return (
        <main className="flex flex-col min-h-screen bg-gradient-to-b from-[#020014] to-[#1e1b4b] pt-24">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    {/* Header removed for cleaner UI */}
                </div>

                <TypingInterface />
            </div>
        </main>
    );
}
