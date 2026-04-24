import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
    const t = useTranslations("home");

    return (
        <div className="space-y-3 px-4 lg:px-6">
            <h3 className="font-semibold">{t("results")}</h3>
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>SLA (Hoje)</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            99,1%
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline">
                                <IconTrendingUp />
                                +12.5%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Em alta hoje <IconTrendingUp className="size-4" />
                        </div>
                        <div className="text-muted-foreground">
                            Atualizado há 1 min
                        </div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>NPS (Mês)</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            78
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline">
                                <IconTrendingUp />
                                +3%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Alta de 3% neste período{" "}
                            <IconTrendingUp className="size-4" />
                        </div>
                        <div className="text-muted-foreground">
                            Atualizado há 1 min
                        </div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>TMA (Hoje)</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            142s
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline">
                                <IconTrendingDown />
                                +9s
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Forte retenção de usuários{" "}
                            <IconTrendingDown className="size-4" />
                        </div>
                        <div className="text-muted-foreground">
                            Atualizado há 1 min
                        </div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Volumetria (Dia)</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            152K
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline">
                                <IconTrendingUp />
                                +6%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Aumento constante do desempenho{" "}
                            <IconTrendingUp className="size-4" />
                        </div>
                        <div className="text-muted-foreground">
                            Atualizado há 1 min
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
