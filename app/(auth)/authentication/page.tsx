"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { BR, MX, US } from "country-flag-icons/react/3x2";
import { Languages } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FieldDescription } from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = () => {
    const { theme, setTheme } = useTheme();
    const locale = useLocale();
    const t = useTranslations("auth");
    const router = useRouter();
    const [hasError, setHasError] = useState(false);
    const gifUrl = hasError ? "/gif/triste.gif" : "/gif/feliz.gif";

    const [language, setLanguage] = useState(locale);
    const changeLocale = (locale: string) => {
        document.cookie = `locale=${locale}; path=/; max-age=31536000`;
        router.refresh();
    };

    return (
        <div className="flex h-screen flex-col">
            <div className="flex w-full justify-end gap-2 p-2">
                <Button
                    onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                    }
                >
                    {theme === "dark" ? <IconSun /> : <IconMoon />}
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"}>
                            <Languages />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-56">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>
                                {t("languageTitle")}
                            </DropdownMenuLabel>
                            <DropdownMenuRadioGroup
                                value={language}
                                onValueChange={setLanguage}
                            >
                                <DropdownMenuRadioItem
                                    value="pt"
                                    onClick={() => changeLocale("pt")}
                                >
                                    <BR title="Brazil" />
                                    {t("pt")}
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value="en"
                                    onClick={() => changeLocale("en")}
                                >
                                    <US title="United States" />
                                    {t("en")}
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value="es"
                                    onClick={() => changeLocale("es")}
                                >
                                    <MX title="Mexico" />
                                    {t("es")}
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex h-screen flex-col justify-center space-y-4 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-130">
                <Card className="overflow-hidden p-0">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <div className="flex w-full flex-col gap-6 p-6 md:p-8">
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    {t("welcome")}
                                </h1>
                                <p className="text-muted-foreground text-balance">
                                    {t("welcomeSubtitle")}
                                </p>
                            </div>
                            <Tabs defaultValue="sign-in">
                                <TabsList>
                                    <TabsTrigger value="sign-in">
                                        {t("signIn")}
                                    </TabsTrigger>
                                    <TabsTrigger value="sign-up">
                                        {t("signUp")}
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
                                loading="eager"
                                unoptimized
                                alt="Image"
                                width={0}
                                height={0}
                                className="absolute inset-0 h-full w-auto object-contain"
                            />
                        </div>
                    </CardContent>
                </Card>
                <FieldDescription className="text-center">
                    {t("terms")} <a href="#">{t("termsLink")}</a>
                    <span>{` ${t("and")} `}</span>
                    <a href="#">{t("privacyLink")}</a>.
                </FieldDescription>
            </div>
        </div>
    );
};

export default Authentication;
