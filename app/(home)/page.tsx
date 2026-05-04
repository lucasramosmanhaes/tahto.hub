import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBotId, IconChartArcs, IconChartBarPopular, IconChartPieFilled, IconCurrencyDollar, IconDots, IconMessagesFilled, IconPhone, IconRobot, IconSchool, IconStarFilled, IconTrendingUp, IconUser, IconUsers } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export default function Home() {

    const tHome = useTranslations("home");
    const tNews = useTranslations("home.news");
    const tSolutions = useTranslations("home.solutions");
    const tEmphase = useTranslations("home.emphase");
    const tQuickaccess = useTranslations("home.quickaccess");

    

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-[2%]">

                    <div className="w-full flex lg:flex-row flex-col gap-8">
                        <div className="w-full min-h-55 lg:w-[70%] bg-[url('/appsImage/banner.png')] bg-no-repeat bg-center bg-contain rounded-xl"> </div>

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

                    <Card className="w-full bg-transparent">
                        <CardHeader>
                            <CardTitle>{tSolutions("title")}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-5 flex-wrap w-full justify-center items-center">

                            <Card className="bg-transparent flex-1 min-w-50 max-w-full">
                                <CardHeader className="flex gap-2 items-center">
                                    <div className="bg-green-500/30 p-3 rounded-lg">
                                        <IconCurrencyDollar style={{ width: "25px", height: "25px" }} className="text-green-600" />
                                    </div>
                                    <CardTitle>{tSolutions("reduceCosts")}</CardTitle>
                                </CardHeader>
                            </Card>

                            <Card className="bg-transparent flex-1 min-w-50 max-w-full">
                                <CardHeader className="flex gap-2 items-center">
                                    <div className="bg-blue-500/30 p-3 rounded-lg">
                                        <IconStarFilled style={{ width: "25px", height: "25px" }} className="text-blue-600" />
                                    </div>
                                    <CardTitle>{tSolutions("improveCx")}</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card className="bg-transparent flex-1 min-w-50 max-w-full">
                                <CardHeader className="flex gap-2 items-center">
                                    <div className="bg-indigo-500/30 p-3 rounded-lg">
                                        <IconTrendingUp style={{ width: "25px", height: "25px" }} className="text-indigo-600" />
                                    </div>
                                    <CardTitle>{tSolutions("increaseSales")}</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card className="bg-transparent flex-1 min-w-50 max-w-full">
                                <CardHeader className="flex gap-2 items-center">
                                    <div className="bg-pink-500/30 p-3 rounded-lg">
                                        <IconUsers style={{ width: "25px", height: "25px" }} className="text-pink-600" />
                                    </div>
                                    <CardTitle>{tSolutions("engageEmployees")}</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card className="bg-transparent flex-1 min-w-50 max-w-full">
                                <CardHeader className="flex gap-2 items-center">
                                    <div className="bg-amber-500/30 p-3 rounded-lg">
                                        <IconChartPieFilled style={{ width: "25px", height: "25px" }} className="text-amber-600" />
                                    </div>
                                    <CardTitle>{tSolutions("dataDecisions")}</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card className="bg-transparent flex-1 min-w-50 max-w-full">
                                <CardHeader className="flex gap-2 items-center">
                                    <div className="bg-indigo-500/30 p-3 rounded-lg">
                                        <IconRobot style={{ width: "25px", height: "25px" }} className="text-indigo-600" />
                                    </div>
                                    <CardTitle>{tSolutions("automate")}</CardTitle>
                                </CardHeader>
                            </Card>

                        </CardContent>
                    </Card>

                    <div className="flex w-full gap-5 flex-wrap">
                        <Card className="bg-transparent basis-full xl:flex-2">
                            <CardHeader className="flex items-center justify-between">
                                <CardTitle>{tEmphase("title")}</CardTitle>
                                <span className="text-primary">{tEmphase("viewAll")}</span>
                            </CardHeader>
                            <CardContent className="flex gap-3 flex-wrap w-full">

                                <Card className="bg-transparent flex-1 basis-full md:basis-0 min-w-45">
                                    <CardHeader className="flex flex-col gap-2">
                                        <span className="bg-green-500/30 text-green-600 px-2 py-0.5 rounded-full text-xs font-bold">{tEmphase("highlight")}</span>
                                        <div className="flex gap-3 items-center">
                                            <div className="bg-green-600 rounded-lg p-2">
                                                <IconMessagesFilled style={{ width: "25px", height: "25px" }} className="text-white" />
                                            </div>
                                            <CardTitle>{tEmphase("conversa.title")}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-500">{tEmphase("conversa.description")}</p>
                                        <div className="pt-2">
                                            <p className="dark:text-slate-300 text-slate-800">{tEmphase("impact")}</p>
                                            <div className="flex gap-8">
                                                <div className="flex flex-col">
                                                    <h2 className="text-green-500 text-lg font-bold">-28%</h2>
                                                    <p className="text-slate-500">{tEmphase("conversa.metric1Label")}</p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <h2 className="text-green-500 text-lg font-bold">+35%</h2>
                                                    <p className="text-slate-500">{tEmphase("conversa.metric2Label")}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="mt-5 block w-fit bg-indigo-300/30 px-2 rounded-full">{tEmphase("conversa.tag")}</span>
                                    </CardContent>
                                </Card>

                                <Card className="bg-transparent flex-1 basis-full md:basis-0 min-w-45">
                                    <CardHeader className="flex flex-col gap-2">
                                        <span className="bg-indigo-500/30 text-indigo-600 px-2 py-0.5 rounded-full text-xs font-bold">{tEmphase("new")}</span>
                                        <div className="flex gap-3 items-center">
                                            <div className="bg-indigo-600 rounded-lg p-2">
                                                <IconChartBarPopular style={{ width: "25px", height: "25px" }} className="text-white" />
                                            </div>
                                            <CardTitle>{tEmphase("insights.title")}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-500">{tEmphase("insights.description")}</p>
                                        <div className="pt-2">
                                            <p className="dark:text-slate-300 text-slate-800">{tEmphase("impact")}</p>
                                            <div className="flex gap-8">
                                                <div className="flex flex-col">
                                                    <h2 className="text-green-500 text-lg font-bold">+22%</h2>
                                                    <p className="text-slate-500">{tEmphase("insights.metric1Label")}</p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <h2 className="text-green-500 text-lg font-bold">-18%</h2>
                                                    <p className="text-slate-500">{tEmphase("insights.metric2Label")}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="mt-5 block w-fit bg-indigo-300/30 px-2 rounded-full">{tEmphase("insights.tag")}</span>
                                    </CardContent>
                                </Card>

                                <Card className="bg-transparent flex-1 basis-full md:basis-0 min-w-45">
                                    <CardHeader className="flex flex-col gap-2">
                                        <span className="bg-blue-500/30 text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">{tEmphase("trending")}</span>
                                        <div className="flex gap-3 items-center">
                                            <div className="bg-violet-600 rounded-lg p-2">
                                                <IconBotId style={{ width: "25px", height: "25px" }} className="text-white" />
                                            </div>
                                            <CardTitle>{tEmphase("automate.title")}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-500">{tEmphase("automate.description")}</p>
                                        <div className="pt-2">
                                            <p className="dark:text-slate-300 text-slate-800">{tEmphase("impact")}</p>
                                            <div className="flex gap-8">
                                                <div className="flex flex-col">
                                                    <h2 className="text-green-500 text-lg font-bold">-40%</h2>
                                                    <p className="text-slate-500">{tEmphase("automate.metric1Label")}</p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <h2 className="text-green-500 text-lg font-bold">+30%</h2>
                                                    <p className="text-slate-500">{tEmphase("automate.metric2Label")}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="mt-5 block w-fit bg-indigo-300/30 px-2 rounded-full">{tEmphase("automate.tag")}</span>
                                    </CardContent>
                                </Card>

                                <Card className="bg-transparent flex-1 basis-full md:basis-0 min-w-45">
                                    <CardHeader className="flex flex-col gap-2">
                                        <span className="bg-green-500/30 text-green-600 px-2 py-0.5 rounded-full text-xs font-bold">{tEmphase("highlight")}</span>
                                        <div className="flex gap-3 items-center">
                                            <div className="bg-blue-600 rounded-lg p-2">
                                                <IconUser style={{ width: "25px", height: "25px" }} className="text-white" />
                                            </div>
                                            <CardTitle>{tEmphase("jornada.title")}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-500">{tEmphase("jornada.description")}</p>
                                        <div className="pt-2">
                                            <p className="dark:text-slate-300 text-slate-800">{tEmphase("impact")}</p>
                                            <div className="flex gap-8">
                                                <div className="flex flex-col">
                                                    <h2 className="text-green-500 text-lg font-bold">+25%</h2>
                                                    <p className="text-slate-500">{tEmphase("jornada.metric1Label")}</p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <h2 className="text-green-500 text-lg font-bold">+38%</h2>
                                                    <p className="text-slate-500">{tEmphase("jornada.metric2Label")}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="mt-5 block w-fit bg-indigo-300/30 px-2 rounded-full">{tEmphase("jornada.tag")}</span>
                                    </CardContent>
                                </Card>

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
