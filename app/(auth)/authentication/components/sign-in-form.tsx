"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

type formValues = z.infer<typeof formSchema>;

interface SignInProps {
    formError: (value: boolean) => void;
}

const formSchema = z.object({
    email: z.email("E-mail inválido"),
    password: z.string("Senha inválida").min(8, "Mínimo 8 caracteres"),
});

const SignInForm = ({ formError }: SignInProps) => {
    const router = useRouter();

    const t = useTranslations("auth");

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const hasError = Object.keys(form.formState.errors).length > 0;

    useEffect(() => {
        formError(hasError);
    }, [hasError, formError]);

    const onSubmit = async (values: formValues) => {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                },
                onError: (error) => {
                    if (
                        (error.error.code =
                            authClient.$ERROR_CODES.INVALID_EMAIL_OR_PASSWORD)
                    ) {
                        toast.error(t("signInError"));
                        form.setError("email", {
                            message: t("signInError"),
                        });
                    } else {
                        toast.error(error.error.message);
                    }
                },
            },
        });
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{t("signIn")}</CardTitle>
                    <CardDescription>
                        {t("signInDescription")}
                    </CardDescription>
                </CardHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <CardContent className="grid gap-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t("emailPlaceholder")}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t("passwordPlaceholder")}
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <Button type="submit" className="w-full">
                                {t("signInButton")}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </>
    );
};

export default SignInForm;
