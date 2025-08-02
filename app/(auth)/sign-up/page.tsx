"use client"

import RegisterForm from "@/app/(auth)/sign-up/components/RegisterForm";

export default function loginPage() {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <RegisterForm />
        </div>
    )
}