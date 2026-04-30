"use client";

import { type Icon } from "@tabler/icons-react";
import * as React from "react";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavSecondary({
    items,
    ...props
}: {
    items: {
        title: string;
        url: string;
        icon: Icon;
    }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {

    const thisUrl = usePathname();
    const t = useTranslations("navSecondary");

    return (
        <SidebarGroup {...props}>
            <SidebarGroupLabel>{t("label")}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu className="gap-2">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url} 
                                className={`${item.url === thisUrl ? "bg-primary" : ""} h-auto flex gap-3`}>
                                    <item.icon style={{width: "20px", height: "20px"}} />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
