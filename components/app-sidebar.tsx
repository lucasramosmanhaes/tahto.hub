"use client";

import {
    IconApps,
    IconBrandGoogleHome,
    IconChartBar,
    IconChartPie,
    IconHelp,
    IconLanguage,
    IconMoon,
    IconSettings,
} from "@tabler/icons-react";
import Image from "next/image";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
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

import { NavTools } from "./nav-tools";

const data = {
    main: [
        {
            title: "Home",
            url: "/",
            icon: IconBrandGoogleHome,
        },
        {
            title: "Apps",
            url: "/apps",
            icon: IconApps,
        },
        {
            title: "Dashboard",
            url: "#",
            icon: IconChartPie,
        },
        {
            title: "Analytics",
            url: "#",
            icon: IconChartBar,
        },
    ],
    tools: [
        {
            name: "Color",
            url: "#",
            icon: IconMoon,
        },
        {
            name: "Language",
            url: "#",
            icon: IconLanguage,
        },
    ],
    secondary: [
        {
            title: "Get Help",
            url: "#",
            icon: IconHelp,
        },
        {
            title: "Settings",
            url: "#",
            icon: IconSettings,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                <NavTools items={data.tools} />
                <NavSecondary items={data.secondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                {session.data?.user && <NavUser user={session.data.user} />}
            </SidebarFooter>
        </Sidebar>
    );
}
