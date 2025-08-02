"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RegisterPayload } from "@/services/auth/auth.type";
import { registerSchema } from "@/services/auth/auth.validation";
import { useRegisterMutate } from "@/services/auth/auth.api";
import Link from "next/link";
import FormProvider from "@/providers/FormProvider";
import RHFTextField from "@/components/forms/rhf-input";
import axios from "axios";

const defaultValues = {
    username: "",
    email: "",
    password: "",
    firmPassword: "",
};


const RegisterForm = () => {
    const router = useRouter();
    const { mutateAsync: register, isPending } = useRegisterMutate();

    const methods = useForm<RegisterPayload>({
        resolver: zodResolver(registerSchema),
        defaultValues,
    });

    const onSubmit = async (values: RegisterPayload) => {
        console.log("Registering with values:", values);
        try {
            await register(values);
            toast.success("Registered successfully!");
            router.push("/sign-in");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Lỗi từ backend:", error.response?.data);
                toast.error(error.response?.data?.message || "Registration failed");
            } else {
                toast.error("Unexpected error");
            }
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Tạo tài khoản mới!</CardTitle>
            </CardHeader>

            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <CardContent className="space-y-2">
                    <RHFTextField
                        name="username"
                        label="Name"
                        title="Họ và tên"
                        isRequire
                        placeholder="Nhập tên đầy đủ của bạn..."
                        className="bg-white dark:bg-slate-500 border-[1px] text-black dark:text-white"
                    />
                    <RHFTextField
                        name="email"
                        label="Email"
                        title="Email"
                        isRequire
                        placeholder="Nhập email..."
                        className="bg-white dark:bg-slate-500 border-[1px] text-black dark:text-white"
                    />
                    <RHFTextField
                        name="password"
                        type="password"
                        label="Password"
                        title="Mật khẩu"
                        isRequire
                        placeholder="Nhập mật khẩu..."
                        className="bg-white dark:bg-slate-500 border-[1px] text-black dark:text-white"
                    />
                    <RHFTextField
                        name="firmPassword"
                        type="password"
                        label="Confirm Password"
                        title="Xác nhận mật khẩu"
                        isRequire
                        placeholder="Xác nhận mật khẩu..."
                        className="bg-white dark:bg-slate-500 border-[1px] text-black dark:text-white"
                    />
                    <CardAction className="flex justify-between items-center gap-2">
                        <p className="text-xs italic">Bạn đã có tài khoản?</p>
                        <Link href="/sign-in">
                            <Button variant="link" className="!p-0 w-fit h-fit cursor-pointer">Đăng nhập</Button>
                        </Link>
                    </CardAction>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Đang đăng ký..." : "Đăng ký"}
                    </Button>
                </CardFooter>
            </FormProvider>
        </Card>
    );
};

export default RegisterForm;
