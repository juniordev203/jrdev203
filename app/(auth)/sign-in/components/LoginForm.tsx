"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useLoginMutate } from "@/services/auth/auth.api";
import { LoginPayload } from "@/services/auth/auth.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/services/auth/auth.validation";
import { toast } from "sonner";
import RHFTextField from "@/components/forms/rhf-input";
import FormProvider from "@/providers/FormProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

const defaultValues = {
    email: "",
    password: "",
};
const handleLogin = () => {

}
const LoginForm = () => {
    const router = useRouter();
    const { mutateAsync: login, isPending } = useLoginMutate();

    const methods = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
        defaultValues,
    });

    const onSubmit = methods.handleSubmit(async (data) => {
        try {
            await login(data);
            toast.success("Login successful!");
            router.push('/');
            router.refresh();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    });

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Đăng nhập bằng tài khoản</CardTitle>
                <CardDescription>
                    Nhập email vào bên dưới để đăng nhập
                </CardDescription>
                <CardAction>
                    <Link href="/sign-up">
                        <Button variant="link" className="cursor-pointer">Đăng ký</Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <FormProvider methods={methods} onSubmit={onSubmit} className="flex flex-col gap-4">
                <CardContent className="space-y-2">
                    <RHFTextField
                        name="email"
                        label="Email"
                        title="Email"
                        isRequire
                        placeholder="Nhập email..."
                        className="bg-white dark:bg-slate-500 border-[1px] focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                    />

                    <RHFTextField
                        name="password"
                        type="password"
                        label="Password"
                        title="Mật khẩu"
                        isRequire
                        placeholder="Nhập mật khẩu..."
                        className="bg-white dark:bg-slate-500 border-[1px] focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                    />
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    {/* <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button> */}
                    <Link href="/" className="w-full">
                        <Button className="w-full">
                            {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
                        </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                        Đăng nhập bằng Google
                    </Button>
                </CardFooter>
            </FormProvider>

        </Card >
    )
};

export default LoginForm;
