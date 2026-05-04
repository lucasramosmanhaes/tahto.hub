"use client";

import { IconBell, IconChevronDown, IconCommand, IconGridDots, IconLanguage, IconLogout, IconMessage, IconMoon, IconNotification, IconPlus, IconSearch, IconSun, IconUserCircle } from "@tabler/icons-react";
import { BR, MX, US } from "country-flag-icons/react/3x2";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
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
import { SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";

import { useAuthStore } from "@/store/auth.store";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";

export function SiteHeader() {
    const t = useTranslations("header");
    const tUser = useTranslations("user");
    const tAuth = useTranslations("auth");
    
    const { theme, setTheme } = useTheme();
    const [openLanguageDialog, setOpenLanguageDialog] = useState(false);
    const router = useRouter();
    
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const changeLocale = (locale: string) => {
        document.cookie = `locale=${locale}; path=/; max-age=31536000`;
        router.refresh();
    };

    const { user, logoutUser } = useAuthStore();

    const signOut = () => {
        document.cookie = "idTahtoJwtToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        logoutUser();
        router.replace("/authentication");
    };

    return (
        <>
            <header className="flex py-2 items-center gap-2 border-b">
                <div className="flex w-full items-center gap-2 px-3 sm:px-4 lg:px-6">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mx-1 sm:mx-2 h-6 sm:h-8 hidden sm:block" />

                    <div className="flex-1 min-w-0 flex justify-center">
                        <InputGroup className="w-full max-w-55 xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-125">
                            <InputGroupAddon><IconSearch size={18} /></InputGroupAddon>
                            <InputGroupInput placeholder={t("input")} className="truncate" />
                            <InputGroupAddon align="inline-end" className="hidden sm:flex">
                                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary text-xs">
                                    <IconCommand size={14} /> K
                                </div>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                        <Button className="hidden md:inline-flex from-blue-500 to-purple-500 bg-linear-to-r px-5">
                            {t("publish")}
                        </Button>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <IconPlus size={20} />
                        </Button>

                        <Button variant="ghost" size="icon" className="relative hidden sm:inline-flex">
                            <span className="absolute -top-1 -right-1 rounded-full bg-primary text-white text-[10px] px-1">12</span>
                            <IconBell size={22} stroke={1.5} />
                        </Button>

                        <Button variant="ghost" size="icon" className="relative hidden sm:inline-flex">
                            <span className="absolute -top-1 -right-1 rounded-full bg-primary text-white text-[10px] px-1">5</span>
                            <IconMessage size={22} stroke={1.5} />
                        </Button>

                        <Button variant="ghost" size="icon" className="hidden lg:inline-flex">
                            <IconGridDots size={22} stroke={1.5} />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="w-auto px-1 sm:px-2">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src="/appsImage/retrato.png" />
                                    </Avatar>
                                    <div className="hidden lg:flex flex-col text-xs leading-tight text-left">
                                        {t("greeting", { name: "Camila" })}
                                        <span className="text-slate-500">CX Strategy</span>
                                    </div>
                                    <IconChevronDown className="size-4 hidden sm:block" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-56 rounded-lg" align="end" sideOffset={4}>
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-2 py-1.5">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src="/appsImage/retrato.png" />
                                        </Avatar>
                                        <div className="flex flex-col text-xs">
                                            Camila
                                            <span className="text-slate-500">CX Strategy</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem><IconUserCircle className="mr-2" />{tUser("account")}</DropdownMenuItem>
                                    <DropdownMenuItem><IconNotification className="mr-2" />{tUser("notifications")}</DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                                        {mounted ? (theme === "dark" ? <IconSun className="mr-2" /> : <IconMoon className="mr-2" />) : <IconMoon className="mr-2 opacity-0" />}
                                        {theme === "dark" ? t("white") : t("dark")}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setOpenLanguageDialog(true)}>
                                        <IconLanguage className="mr-2" />{t("language")}
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={signOut}>
                                    <IconLogout className="mr-2" />{tUser("logOut")}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <CommandDialog open={openLanguageDialog} onOpenChange={setOpenLanguageDialog}>
                <Command>
                    <CommandInput placeholder={t("searchLanguageDialog")} />
                    <CommandList>
                        <CommandEmpty>{t("noResults")}</CommandEmpty>
                        <CommandGroup heading={tAuth("languageTitle")}>
                            <CommandItem onSelect={() => { changeLocale("pt"); setOpenLanguageDialog(false); }}>
                                <BR title="Brazil" className="w-5 mr-2" />{tAuth("pt")}
                            </CommandItem>
                            <CommandItem onSelect={() => { changeLocale("en"); setOpenLanguageDialog(false); }}>
                                <US title="United States" className="w-5 mr-2" />{tAuth("en")}
                            </CommandItem>
                            <CommandItem onSelect={() => { changeLocale("es"); setOpenLanguageDialog(false); }}>
                                <MX title="Mexico" className="w-5 mr-2" />{tAuth("es")}
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    );
}