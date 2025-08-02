"use client"

import LoginForm from "@/app/(auth)/sign-in/components/LoginForm"

export default function loginPage() {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <LoginForm />
        </div>
    )
}