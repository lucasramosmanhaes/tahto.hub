"use client";

import {
    IconDotsVertical,
    IconLogout,
    IconNotification,
    IconUserCircle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

type SessionData = ReturnType<typeof authClient.useSession>["data"];

interface NavUserProps {
    user: NonNullable<SessionData>["user"];
}

export function NavUser({ user }: NavUserProps) {

    const t = useTranslations("navUser");

    const router = useRouter();
    const signOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/authentication");
                },
            },
        });
    };

    const { isMobile } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg grayscale">
                                <AvatarImage
                                    src={user.image ?? undefined}
                                    alt={user.name}
                                />
                                <AvatarFallback className="rounded-lg">
                                    {user?.name?.split(" ")?.[0]?.[0]}
                                    {user?.name?.split(" ")?.[1]?.[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    {user.name}
                                </span>
                                <span className="text-muted-foreground truncate text-xs">
                                    {user.email}
                                </span>
                            </div>
                            <IconDotsVertical className="ml-auto size-4" />
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
                                    <AvatarImage
                                        src={user.image ?? undefined}
                                        alt={user.name}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {user?.name?.split(" ")?.[0]?.[0]}
                                        {user?.name?.split(" ")?.[1]?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        {user.name}
                                    </span>
                                    <span className="text-muted-foreground truncate text-xs">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <IconUserCircle />
                                {t("account")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IconNotification />
                                {t("notifications")}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={signOut}>
                            <IconLogout />
                            {t("logOut")}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
