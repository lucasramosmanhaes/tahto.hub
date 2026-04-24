"use client";

import { IconLanguage, IconMoon, IconSun } from "@tabler/icons-react";
import { BR, MX, US } from "country-flag-icons/react/3x2";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState } from "react";

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavTools() {
    const { theme, setTheme } = useTheme();
    const [openLanguageDialog, setOpenLanguageDialog] = useState(false);
    const tAuth = useTranslations("auth");
    const t = useTranslations("navTools");
    const router = useRouter();

    const changeLocale = (locale: string) => {
        document.cookie = `locale=${locale}; path=/; max-age=31536000`;
        router.refresh();
    };

    return (
        <>
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                <SidebarGroupLabel>Tools</SidebarGroupLabel>
                <SidebarMenu>
                    <SidebarMenuItem className="hover:cursor-pointer">
                        <SidebarMenuButton asChild>
                            <span onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                            {theme === "dark" ? <IconSun /> : <IconMoon />}
                                <span>{t("color")}</span>
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="hover:cursor-pointer">
                        <SidebarMenuButton asChild>
                            <span onClick={() => setOpenLanguageDialog(true)}>
                                <IconLanguage />
                                {t("language")}
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>

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
