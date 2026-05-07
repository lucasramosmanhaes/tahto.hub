"use client";

import { type Icon } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon: Icon;
    }[];
}) {

    const thisUrl = usePathname();

    return (
        <SidebarGroup>
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
