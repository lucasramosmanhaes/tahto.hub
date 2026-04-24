"use client";

import {
    IconApps,
    IconBrandGoogleHome,
    IconChartBar,
    IconChartPie,
    IconHelp,
    IconSettings,
} from "@tabler/icons-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const tMain = useTranslations("navMain");
    const tSecondary = useTranslations("navSecondary");

    const data = {
        main: [
            {
                title: tMain("home"),
                url: "/",
                icon: IconBrandGoogleHome,
            },
            {
                title: tMain("apps"),
                url: "#",
                icon: IconApps,
            },
            {
                title: tMain("dashboard"),
                url: "#",
                icon: IconChartPie,
            },
            {
                title: tMain("analitycs"),
                url: "#",
                icon: IconChartBar,
            },
        ],
        secondary: [
            {
                title: tSecondary("help"),
                url: "#",
                icon: IconHelp,
            },
            {
                title: tSecondary("settings"),
                url: "#",
                icon: IconSettings,
            },
        ],
    };

    const session = authClient.useSession();

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                        >
                            <a href="#">
                                <Image
                                    src={"/gif/feliz.gif"}
                                    alt="Tahtinho"
                                    loading="eager"
                                    unoptimized
                                    width={70}
                                    height={0}
                                    className="object-contain"
                                />
                                <span className="text-base font-semibold">
                                    Tahtinho
                                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.main} />
                <NavSecondary items={data.secondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                {session.data?.user && <NavUser user={session.data.user} />}
            </SidebarFooter>
        </Sidebar>
    );
}
