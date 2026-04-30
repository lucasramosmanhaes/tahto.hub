"use client";

import {
    IconBrandGoogleHome,
    IconBrandLine,
    IconBulb,
    IconCalendarEvent,
    IconChartAreaLine,
    IconDeviceAnalytics,
    IconEyeSearch,
    IconLibrary,
    IconListDetailsFilled,
    IconNews,
    IconRobot,
    IconStackFront,
    IconTools,
    IconUsers,
    IconUsersGroup
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";

import { Separator } from "../ui/separator";

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
                title: tMain("solutions"),
                url: "#",
                icon: IconBulb,
            },
            {
                title: tMain("case"),
                url: "#",
                icon: IconChartAreaLine,
            },
            {
                title: tMain("IA"),
                url: "#",
                icon: IconRobot,
            },
            {
                title: tMain("tools"),
                url: "#",
                icon: IconTools,
            },
            {
                title: tMain("squad"),
                url: "#",
                icon: IconUsers,
            },
            {
                title: tMain("library"),
                url: "#",
                icon: IconLibrary,
            },
            {
                title: tMain("news"),
                url: "#",
                icon: IconNews,
            },
            {
                title: tMain("event"),
                url: "#",
                icon: IconCalendarEvent,
            },
            {
                title: tMain("comunitys"),
                url: "#",
                icon: IconUsersGroup,
            },
        ],
        secondary: [
            {
                title: tSecondary("insights"),
                url: "#",
                icon: IconEyeSearch,
            },
            {
                title: tSecondary("performance"),
                url: "#",
                icon: IconDeviceAnalytics,
            },
            {
                title: tSecondary("central"),
                url: "#",
                icon: IconBrandLine,
            },
            {
                title: tSecondary("knowledge"),
                url: "#",
                icon: IconStackFront,
            },
            {
                title: tSecondary("demands"),
                url: "#",
                icon: IconListDetailsFilled,
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
                <Separator className="dark:bg-muted bg-muted/20" />
                <NavSecondary items={data.secondary} />
            </SidebarContent>
        </Sidebar>
    );
}
