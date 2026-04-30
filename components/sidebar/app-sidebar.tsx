"use client";

import {
    IconApps,
    IconBrandGoogleHome,
    IconBulb,
    IconFileDescription,
    IconGift,
    IconHelp,
    IconKeyframes,
    IconSchool,
    IconSettings,
    IconSpeakerphone,
    IconUsers,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavUser } from "./nav-user";

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
                title: tMain("releases"),
                url: "#",
                icon: IconSpeakerphone,
            },
            {
                title: tMain("benefits"),
                url: "#",
                icon: IconGift,
            },
            {
                title: tMain("documents"),
                url: "#",
                icon: IconFileDescription,
            },
            {
                title: tMain("communities"),
                url: "#",
                icon: IconUsers,
            },
            {
                title: tMain("learn"),
                url: "#",
                icon: IconSchool,
            },
            {
                title: tMain("innovation"),
                url: "#",
                icon: IconBulb,
            },
            {
                title: tMain("processes"),
                url: "#",
                icon: IconKeyframes,
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

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                        >
                            <Link href="/">
                                <Image
                                    src={"/gif/feliz.gif"}
                                    alt="Tahtinho"
                                    loading="eager"
                                    unoptimized
                                    width={0}
                                    height={0}
                                    className="object-contain w-18 h-18"
                                />
                                <span className="text-base font-semibold">
                                    Tahtinho
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.main} />
                <NavSecondary items={data.secondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
