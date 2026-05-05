import { IconBotId, IconChartArcs, IconChartBarPopular, IconDots, IconMessagesFilled, IconPhone, IconSchool, IconUser } from "@tabler/icons-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { AppList } from "@/components/home/app-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {

    const tNews = useTranslations("home.news");
    const tSolutions = useTranslations("home.solutions");
    const tEmphase = useTranslations("home.emphase");
    const tQuickaccess = useTranslations("home.quickaccess");


    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-[2%]">

                    <div className="w-full flex lg:flex-row flex-col gap-8">
                        
                        <div className="w-full lg:w-[70%]">
                            <Image
                                src="/appsImage/banner.png"
                                alt="Banner"
                                width={1200}
                                height={500}
                                className="w-full h-auto rounded-xl"
                                quality={100}
                                priority
                            />
                        </div>

                        <Card className="w-full lg:w-[30%] bg-transparent">
                            <CardHeader className="flex items-center justify-between">
                                <CardTitle>{tNews("title")}</CardTitle>
                                <Button variant={"ghost"} className="text-primary">
                                    {tNews("viewAll")}
                                </Button>
                            </CardHeader>

                            <CardContent className="flex flex-col gap-5">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3">
                                        <img width={80} height={100} alt="imagem"
                                            src={"https://media.istockphoto.com/id/2228488761/pt/foto/ai-helps-generate-business-with-intelligent-automation-and-a-bpa-system-while-a-businessman-at.jpg?b=1&s=612x612&w=0&k=20&c=yZCsjyqSMzvGDaDWDbj1C1hvR3psb3wRteIErmfECHY="}
                                            className="rounded-lg"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <h2>{tNews("one")}</h2>
                                            <span className="text-slate-500">{new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</span>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex w-full gap-5 flex-wrap pt-6">
                        <Card className="bg-transparent basis-full xl:flex-2">
                            <CardHeader className="flex items-center justify-between">
                                <CardTitle>{tEmphase("title")}</CardTitle>
                                <span className="text-primary">{tEmphase("viewAll")}</span>
                            </CardHeader>
                            <CardContent className="overflow-hidden p-0! pb-4">
                                <AppList />
                            </CardContent>
                        </Card>

                        <Card className="bg-transparent basis-full xl:flex-1">
                            <CardHeader className="flex items-center justify-between">
                                <CardTitle>{tQuickaccess("title")}</CardTitle>
                                <span className="text-primary">{tQuickaccess("customize")}</span>
                            </CardHeader>
                            <CardContent className="flex flex-row pt-2 flex-wrap gap-y-5">
                                <Card className="bg-transparent ring-0 flex flex-col basis-1/2 lg:basis-1/4 items-center">
                                    <CardContent className="text-center flex items-center justify-center flex-col">
                                        <div className="bg-indigo-500/30 rounded-lg p-2 flex items-center justify-center w-fit">
                                            <IconMessagesFilled style={{ width: "25px", height: "25px" }} className="text-indigo-500" />
                                        </div>
                                        {tQuickaccess("conversa")}
                                    </CardContent>
                                </Card>
                                <Card className="bg-transparent ring-0 flex flex-col basis-1/2 lg:basis-1/4">
                                    <CardContent className="text-center flex items-center justify-center flex-col">
                                        <div className="bg-blue-500/30 rounded-lg p-2 flex items-center justify-center w-fit">
                                            <IconChartBarPopular style={{ width: "25px", height: "25px" }} className="text-blue-500" />
                                        </div>
                                        {tQuickaccess("insights")}
                                    </CardContent>
                                </Card>
                                <Card className="bg-transparent ring-0 flex flex-col basis-1/2 lg:basis-1/4">
                                    <CardContent className="text-center flex items-center justify-center flex-col">
                                        <div className="bg-green-500/30 rounded-lg p-2 flex items-center justify-center w-fit">
                                            <IconBotId style={{ width: "25px", height: "25px" }} className="text-green-500" />
                                        </div>
                                        {tQuickaccess("automate")}
                                    </CardContent>
                                </Card>
                                <Card className="bg-transparent ring-0 flex flex-col basis-1/2 lg:basis-1/4">
                                    <CardContent className="text-center flex items-center justify-center flex-col">
                                        <div className="bg-pink-500/30 rounded-lg p-2 flex items-center justify-center w-fit">
                                            <IconUser style={{ width: "25px", height: "25px" }} className="text-pink-500" />
                                        </div>
                                        {tQuickaccess("jornada")}
                                    </CardContent>
                                </Card>
                                <Card className="bg-transparent ring-0 flex flex-col basis-1/2 lg:basis-1/4">
                                    <CardContent className="text-center flex items-center justify-center flex-col">
                                        <div className="bg-amber-500/30 rounded-lg p-2 flex items-center justify-center w-fit">
                                            <IconChartArcs style={{ width: "25px", height: "25px" }} className="text-amber-500" />
                                        </div>
                                        {tQuickaccess("qa")}
                                    </CardContent>
                                </Card>
                                <Card className="bg-transparent ring-0 flex flex-col basis-1/2 lg:basis-1/4">
                                    <CardContent className="text-center flex items-center justify-center flex-col">
                                        <div className="bg-blue-500/30 rounded-lg p-2 flex items-center justify-center w-fit">
                                            <IconPhone style={{ width: "25px", height: "25px" }} className="text-blue-500" />
                                        </div>
                                        {tQuickaccess("voice")}
                                    </CardContent>
                                </Card>
                                <Card className="bg-transparent ring-0 flex flex-col basis-1/2 lg:basis-1/4">
                                    <CardContent className="text-center flex items-center justify-center flex-col">
                                        <div className="bg-pink-500/30 rounded-lg p-2 flex items-center justify-center w-fit">
                                            <IconSchool style={{ width: "25px", height: "25px" }} className="text-pink-500" />
                                        </div>
                                        {tQuickaccess("academy")}
                                    </CardContent>
                                </Card>
                                <Card className="bg-transparent ring-0 flex flex-col basis-1/2 lg:basis-1/4">
                                    <CardContent className="text-center flex items-center justify-center flex-col">
                                        <div className="bg-indigo-500/30 rounded-lg p-2 flex items-center justify-center w-fit">
                                            <IconDots style={{ width: "25px", height: "25px" }} className="text-indigo-500" />
                                        </div>
                                        {tQuickaccess("viewAll")}
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
