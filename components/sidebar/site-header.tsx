"use client";

import { IconCommand, IconDotsVertical, IconLanguage, IconLogout, IconMoon, IconNotification, IconSearch, IconSun, IconUserCircle } from "@tabler/icons-react";
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
import { SidebarMenuButton, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

import { useAuthStore } from "@/store/auth.store";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";

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

    const tUser = useTranslations("headerUser");

    const { user, logoutUser } = useAuthStore();

    const signOut = () => {
        document.cookie = "idTahtoJwtToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        logoutUser();
        router.replace("/authentication");
    };

    const { isMobile } = useSidebar();

    return (
        <>
            <header className="flex py-2 items-center gap-2 transition-[width,height] border-b ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
                <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 ">
                    <SidebarTrigger className="-ml-1" />

                    <Separator
                        orientation="vertical"
                        className="mx-2 h-8 my-auto"
                    />

                    <div className="flex flex-1 items-center justify-center">
                        <div className="flex flex-1 w-full justify-center">
                            <InputGroup className="max-w-125">
                                <InputGroupAddon><IconSearch /></InputGroupAddon>
                                <InputGroupInput placeholder={t("input")}  />
                                <InputGroupAddon align={"inline-end"} >
                                    <div className="flex items-center justify-center gap-1 px-1 rounded bg-secondary">
                                        <IconCommand size={20} stroke={1.5} /> K
                                    </div>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>

                        


                        <div className="flex items-center justify-end gap-2">
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

                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accen data-[state=open]:text-sidebar-accent-foreground w-auto"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg grayscale">
                                            {/* <AvatarImage
                                                src={user.image ?? undefined}
                                                alt={user.name}
                                            /> */}
                                            <AvatarFallback className="rounded-lg">
                                                {user?.Claims.uid?.split(" ")?.[0]?.[0]}
                                                {user?.Claims.uid?.split(" ")?.[1]?.[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid text-left text-sm leading-tight">
                                            <span className="truncate font-medium">
                                                {user?.Claims.uid}
                                            </span>
                                            <span className="text-muted-foreground truncate text-xs">
                                                {user?.Claims.roles.cargo}
                                            </span>
                                        </div>
                                        <IconDotsVertical className="size-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                    side={isMobile ? "bottom" : "right"}
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                {/* <AvatarImage
                                                    src={user.image ?? undefined}
                                                    alt={user.name}
                                                /> */}
                                                <AvatarFallback className="rounded-lg">
                                                    {user?.Claims.uid?.split(" ")?.[0]?.[0]}
                                                    {user?.Claims.uid?.split(" ")?.[1]?.[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-medium">
                                                    {user?.Claims.uid}
                                                </span>
                                                <span className="text-muted-foreground truncate text-xs">
                                                    {user?.Claims.roles.cargo}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <IconUserCircle />
                                            {tUser("account")}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <IconNotification />
                                            {tUser("notifications")}
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={signOut}>
                                        <IconLogout />
                                        {tUser("logOut")}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

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