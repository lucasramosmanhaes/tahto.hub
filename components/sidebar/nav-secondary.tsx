"use client";

import { type Icon } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import * as React from "react";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";


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
                                    <item.icon style={{ width: "20px", height: "20px" }} />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    {/* <SidebarMenuItem className="mt-5">
                        <div className="flex items-center gap-3 p-3 mx-2 rounded-xl bg-indigo-500/30">
                            <img width={80} height={80} src={"/gif/informativo2.gif"} />
                            <div className="flex flex-col flex-1 min-w-0">
                                <p className="text-white text-[14px] font-semibold leading-tight">
                                    {t("needhelp")}
                                </p>
                                <p className="text-[#9ca3af] text-[12px] leading-snug mt-0.5">
                                    {t("asktoai")}
                                </p>

                                <Button
                                    size="sm"
                                    className="mt-2.5 h-7 w-fit px-3.5 bg-[#6366f1] hover:bg-[#5558e3] text-white text-[12px] font-medium rounded-lg shadow-none"
                                >
                                    {t("talktoai")}
                                </Button>
                            </div>
                        </div>
                    </SidebarMenuItem> */}

                    

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
