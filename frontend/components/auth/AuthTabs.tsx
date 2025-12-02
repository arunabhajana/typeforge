"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"

interface AuthTabsProps {
    defaultTab?: "login" | "register"
}

export function AuthTabs({ defaultTab = "login" }: AuthTabsProps) {
    const activeTab = defaultTab

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex space-x-1 bg-muted/50 p-1 rounded-xl mb-8 relative">
                <Link
                    href="/login"
                    className={`flex-1 relative px-4 py-2 text-sm font-medium transition-colors z-10 text-center ${activeTab === "login" ? "text-white" : "text-muted-foreground hover:text-white"
                        }`}
                >
                    Login
                    {activeTab === "login" && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-primary rounded-lg -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                </Link>
                <Link
                    href="/register"
                    className={`flex-1 relative px-4 py-2 text-sm font-medium transition-colors z-10 text-center ${activeTab === "register" ? "text-white" : "text-muted-foreground hover:text-white"
                        }`}
                >
                    Register
                    {activeTab === "register" && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-primary rounded-lg -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                </Link>
            </div>

            <div className="relative overflow-hidden min-h-[400px]">
                <motion.div
                    initial={false}
                    animate={{
                        x: activeTab === "login" ? "0%" : "-50%",
                    }}
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    className="flex w-[200%]"
                >
                    <div className="w-1/2 px-1">
                        <LoginForm />
                    </div>
                    <div className="w-1/2 px-1">
                        <RegisterForm />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
