"use client"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { motion } from "framer-motion"
import { Mail, Lock, Github } from "lucide-react"

export function LoginForm() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 bg-muted/30 p-6 rounded-2xl border border-white/5 backdrop-blur-sm"
        >
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your credentials to access your account
                </p>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input id="email" placeholder="name@example.com" type="email" className="pl-10 bg-black/20 border-white/10" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-sm text-primary hover:underline">
                            Forgot password?
                        </a>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input id="password" type="password" className="pl-10 bg-black/20 border-white/10" />
                    </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    Sign In
                </Button>
            </div>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground bg-[#020014]">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white">
                <Github className="mr-2 h-4 w-4" />
                Github
            </Button>
        </motion.div>
    )
}
