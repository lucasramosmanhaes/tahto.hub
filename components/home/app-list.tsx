"use client"

import Cookies from "js-cookie";
import Image from "next/image";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useState,useSyncExternalStore } from "react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/auth.store";
import { GuildaGameLoginUseCase } from "@/use-cases/login-guilda-game-use-case";
import { GuildaLoginUseCase } from "@/use-cases/login-guilda-use-case";

import { Spinner } from "../ui/spinner";

function useIsMounted() {
    return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );
}

export function AppList() {

    const t = useTranslations("home");
    const { matricula, password } = useAuthStore();
    const jwtTokenGuilda = Cookies.get("jwtToken");
    const [loader, setLoader] = useState<number>(0);
    const mounted = useIsMounted();

    const appsListData = [
        {
            id: 1,
            url: `${process.env.NEXT_PUBLIC_GUILDA_FRONT_URL}`,
            image: "/appsImage/guilda.png",
            name: "Guilda"
        },
        {
            id: 2,
            url: `#`,
            image: "/appsImage/cac.png",
            name: "CAC"
        },
        {
            id: 3,
            url: `#`,
            image: "/appsImage/GIP.png",
            name: "GIP"
        },
        {
            id: 4,
            url: `#`,
            image: "/appsImage/GIF.png",
            name: "GIF"
        },
    ];

    const handleOpenApp = async (app: typeof appsListData[number]) => {
        setLoader(app.id);
        try {
            switch (app.id) {
                case 1:
                    const guildaLogin = new GuildaLoginUseCase();
                    await guildaLogin.handle(matricula!, password!);
                    break;
                case 2:
                    const guildaGameLogin = new GuildaGameLoginUseCase();
                    await guildaGameLogin.handle(matricula!, password!);
                    break;
                default:
                    break;
            }
            window.open(app.url, "_blank");
        } catch (error) {
            toast.error("Erro ao abrir app", {
                description: error instanceof Error ? error.message : "Erro desconhecido",
            });
        } finally {
            setLoader(0);
        }
    };

    if (!mounted) {
        return (
            <div className="w-full">
                <div className="flex gap-2 mx-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="basis-[22%] md:basis-[26%]">
                            <Skeleton className="w-full h-24 md:h-40 rounded-xl" />
                            <Skeleton className="w-16 h-4 mx-auto mt-3 rounded" />
                        </div>
                    ))}
                </div>
                <div className="mt-3 flex justify-center gap-2">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
                <CarouselContent className="mx-2">
                    {appsListData.map((app, index) => (
                        <CarouselItem
                            key={index}
                            className="cursor-pointer pl-2 basis-[22%] md:basis-[26%]"
                            // onClick={() => handleOpenApp(app)}
                        >
                            <Card className="w-full h-full ring-0">
                                <CardContent className="flex items-center justify-center p-4 h-24 md:h-40">
                                    <Image
                                        src={app.image}
                                        alt={app.name}
                                        loading="eager"
                                        unoptimized
                                        width={0}
                                        height={0}
                                        className="object-contain w-14 h-14"
                                    />
                                </CardContent>
                                <div className="relative flex justify-center items-center pb-3 px-1">
                                    <span className="text-center text-xl font-black leading-tight">
                                        {app.name}
                                    </span>
                                    <div className="absolute right-1">
                                        <Spinner width={4} className={loader === app.id ? "visible" : "invisible"} />
                                    </div>
                                </div>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="mt-3 flex justify-center gap-2">
                    <CarouselPrevious className="static translate-y-0" />
                    <CarouselNext className="static translate-y-0" />
                </div>
            </Carousel>
        </div>
    );
}