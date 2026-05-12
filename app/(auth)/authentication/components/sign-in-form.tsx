"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/auth.store";

interface SignInProps {
    formError: (value: boolean) => void;
}

const SignInForm = ({ formError }: SignInProps) => {
    const router = useRouter();
    const t = useTranslations("auth");
    const setUser = useAuthStore((state) => state.setUser);

    const formSchema = z.object({
        matricula: z.string(),
        password: z.string().trim().min(1, t("passwordMinError")),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            matricula: "",
            password: "",
        },
    });

    const hasError = Object.keys(form.formState.errors).length > 0;

    useEffect(() => {
        formError(hasError);
    }, [hasError, formError]);

    const apiIdTahto = process.env.NEXT_PUBLIC_API_ID_TAHTO;

    // const onSubmit = async (values: z.infer<typeof formSchema>) => {

    //     if(!apiIdTahto){
    //         console.log("[error] - inicializar variável de ambiente: NEXT_PUBLIC_API_ID_TAHTO")
    //         return
    //     }

    //     try {
    //         const res = await fetch(apiIdTahto, {
    //             method: "POST",
    //             headers: { 
    //                 "Content-Type": "application/json",
    //                 "Accept": "application/json" 
    //             },
    //             // credentials: "include",
    //             body: JSON.stringify({
    //                 matricula: values.matricula,
    //                 senha: values.password,
    //             }),
    //         });
    
    //         if (!res.ok) {
    //             toast.error(t("signInError"));
    //             form.setError("matricula", {
    //                 message: t("signInError"),
    //             });
    //             return;
    //         }
    
    //         const data = await res.json();
    //         setUser(data, values.matricula, values.password);
            
    //         // eslint-disable-next-line react-hooks/immutability
    //         document.cookie = `idTahtoJwtToken=${data.Token}; path=/`;
            
    //         router.push("/");
    
    //     } catch (err) {
    //         console.error("ERRO:", err);
    //         toast.error(t("signInErrorVpn"));
    //     }
    // };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        router.push("/");
    
    };

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>{t("signIn")}</CardTitle>
                    <CardDescription>{t("signInDescription")}</CardDescription>
                </CardHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <CardContent className="grid gap-6">
                            <FormField
                                control={form.control}
                                name="matricula"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("signInLabel")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t("registrationPlaceholder")}
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
                                        <FormLabel>{t("passwordLabel")}</FormLabel>
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
                            <Button
                                type="submit"
                                className="w-full cursor-pointer"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting
                                    ? <Spinner width={4} />
                                    : t("signInButton")}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
};

export default SignInForm;