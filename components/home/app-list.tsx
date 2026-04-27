"use client"

import Cookies from "js-cookie";
import Image from "next/image";
import { useTranslations } from "next-intl";
import * as React from "react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useAuthStore } from "@/store/auth.store";
import { GuildaGameLoginUseCase } from "@/use-cases/login-guilda-game-use-case";
import { GuildaLoginUseCase } from "@/use-cases/login-guilda-use-case";

export function AppList() {

    const t = useTranslations("home");
    const { matricula, password } = useAuthStore();

    const jwtTokenGuilda = Cookies.get("jwtToken");

    const appsListData = [
        {
            id: 1,
            url: `${process.env.NEXT_PUBLIC_GUILDA_FRONT_URL}`,
            image: "/appsImage/guilda.png",
            name: "Guilda"
        },
        {
            id: 2,
            url: `${process.env.NEXT_PUBLIC_GUILDA_GAME_URL}${jwtTokenGuilda}`,
            image: "/appsImage/guilda-game.png",
            name: "Guilda Game"
        },
    ];

    const handleOpenApp = async (app: typeof appsListData[number]) => {
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
    
        }
        catch (error) {
            toast.error("Erro ao abrir app", {
                description: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    };

    return (
        <div className="relative w-full space-y-3 px-4 lg:px-6">
            <h3 className="font-semibold">{t("apps")}</h3>

            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {appsListData.map((app, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-1/2 md:basis-1/3 lg:basis-1/6"
                        >
                            <div className="p-1">
                                <div
                                    onClick={() => handleOpenApp(app)}
                                    className="cursor-pointer"
                                >
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <Image
                                                src={app.image}
                                                alt={app.name}
                                                loading="eager"
                                                unoptimized
                                                width={0}
                                                height={0}
                                                className="object-contain w-18 h-18"
                                            />
                                        </CardContent>
                                        <span className="text-center">
                                            {app.name}
                                        </span>
                                    </Card>
                                </div>
                            </div>
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