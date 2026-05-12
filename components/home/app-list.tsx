"use client"

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState,useSyncExternalStore } from "react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface BannerListProps {
    listApps: {
        id: number,
        url: string,
        image: string,
        name: string
    }[]
};

export function AppList( { listApps }: BannerListProps ) {

    const tEmphase = useTranslations("home.emphase");
    const { matricula, password } = useAuthStore();
    const [loader, setLoader] = useState<number>(0);
    const mounted = useIsMounted();

    const handleOpenApp = async (app: typeof listApps[number]) => {
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
            <Card className="bg-transparent basis-full xl:flex-2">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>{tEmphase("title")}</CardTitle>
                    <span className="text-primary">{tEmphase("viewAll")}</span>
                </CardHeader>
                <CardContent className="overflow-hidden p-0! pb-4">
                    <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
                        <CarouselContent className="mx-2">
                            {listApps.map((app, index) => (
                                <CarouselItem
                                    key={index}
                                    className="cursor-pointer pl-2 basis-[22%] md:basis-[26%] xl:basis-[20%]"
                                    // onClick={() => handleOpenApp(app)}
                                >
                                    <Link href={app.url} target="_blank">
                                        <Card className="w-full h-full ring-0">
                                            <CardContent className="flex items-center justify-center p-4 h-24 md:h-40">
                                                <Image
                                                    src={app.image}
                                                    alt={app.name}
                                                    loading="eager"
                                                    unoptimized
                                                    width={0}
                                                    height={0}
                                                    className="object-contain w-24 h-24"
                                                />
                                            </CardContent>
                                            <div className="relative flex justify-center items-center pb-3 px-1">
                                                <span className="text-center text-xl font-medium leading-tight">
                                                    {app.name}
                                                </span>
                                                <div className="absolute right-1">
                                                    <Spinner width={4} className={loader === app.id ? "visible" : "invisible"} />
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="mt-3 flex justify-center gap-2">
                            <CarouselPrevious className="static translate-y-0" />
                            <CarouselNext className="static translate-y-0" />
                        </div>
                    </Carousel>
                </CardContent>
            </Card>
        </div>
    );
}