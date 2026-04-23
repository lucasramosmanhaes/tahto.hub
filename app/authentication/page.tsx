"use client";

import Image from "next/image";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = () => {
    const [hasError, setHasError] = useState(false);

    const gifUrl = hasError ? "/gif/triste.gif" : "/gif/feliz.gif";

    return (
        <div className="flex h-screen flex-col">

            <div className="flex flex-col justify-center h-screen space-y-4 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-130">
                <Card className="overflow-hidden p-0">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <div className="flex w-full flex-col gap-6 p-6 md:p-8">
                            <Tabs defaultValue="sign-in">
                                <TabsList>
                                    <TabsTrigger value="sign-in">
                                        Entrar
                                    </TabsTrigger>
                                    <TabsTrigger value="sign-up">
                                        Criar conta
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="sign-in" className="w-full">
                                    <SignInForm formError={setHasError} />
                                </TabsContent>
                                <TabsContent value="sign-up" className="w-full">
                                    <SignUpForm />
                                </TabsContent>
                            </Tabs>
                        </div>
                        <div className="bg-muted relative hidden md:block">
                            <Image
                                src={gifUrl}
                                alt="Image"
                                width={60}
                                height={80}
                                className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
                            />
                        </div>
                    </CardContent>
                </Card>
                <FieldDescription className="text-center">
                    Ao clicar em continuar, você concorda com nossos termos.{" "}
                    <a href="#">Termos de Serviço</a> e{" "}
                    <a href="#">política de Privacidade</a>.
                </FieldDescription>
            </div>
        </div>
    );
};

export default Authentication;
