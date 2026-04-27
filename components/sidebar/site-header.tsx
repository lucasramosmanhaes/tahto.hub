"use client";

import { IconLanguage, IconMoon, IconSun } from "@tabler/icons-react";
import { BR, MX, US } from "country-flag-icons/react/3x2";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { Button } from "../ui/button";

export function SiteHeader() {
    const t = useTranslations("header");
    const tAuth = useTranslations("auth");
    const { theme, setTheme } = useTheme();
    const [openLanguageDialog, setOpenLanguageDialog] = useState(false);
    const router = useRouter();
    
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const changeLocale = (locale: string) => {
        document.cookie = `locale=${locale}; path=/; max-age=31536000`;
        router.refresh();
    };

    return (
        <>
            <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
                <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mx-2 data-[orientation=vertical]:h-6"
                    />
                    <h1 className="text-base font-medium">{t("home")}</h1>
                    <div className="flex w-full items-center justify-end gap-2">
                        <Button
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                        >
                            {mounted ? (
                                theme === "dark" ? <IconSun /> : <IconMoon />
                            ) : (
                                <IconMoon className="opacity-0" />
                            )}
                        </Button>
                        <Button
                            variant={"outline"}
                            onClick={() => setOpenLanguageDialog(true)}
                        >
                            <IconLanguage />
                        </Button>
                    </div>
                </div>
            </header>

            <CommandDialog
                open={openLanguageDialog}
                onOpenChange={setOpenLanguageDialog}
            >
                <Command>
                    <CommandInput placeholder={t("searchLanguageDialog")} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading={tAuth("languageTitle")}>
                            <CommandItem
                                onSelect={() => {
                                    changeLocale("pt");
                                    setOpenLanguageDialog(!openLanguageDialog);
                                }}
                            >
                                <BR title="Brazil" />
                                {tAuth("pt")}
                            </CommandItem>
                            <CommandItem
                                onSelect={() => {
                                    changeLocale("en");
                                    setOpenLanguageDialog(!openLanguageDialog);
                                }}
                            >
                                <US title="United States" />
                                {tAuth("en")}
                            </CommandItem>
                            <CommandItem
                                onSelect={() => {
                                    changeLocale("es");
                                    setOpenLanguageDialog(!openLanguageDialog);
                                }}
                            >
                                <MX title="Mexico" />
                                {tAuth("es")}
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    );
}