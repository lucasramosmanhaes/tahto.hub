
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface NewsListProps {
    listNews: { id: number, image: string, text: string }[]
};

const NewsList = ( { listNews } : NewsListProps) => {

    const tNews = useTranslations("home.news");

    return (
        <Card className="w-full 2xl:w-[40%] bg-transparent p-4">
            <CardHeader className="flex items-center justify-between">
                <CardTitle>{tNews("title")}</CardTitle>
                <Button variant={"ghost"} className="text-primary">
                    {tNews("viewAll")}
                </Button>
            </CardHeader>

            <CardContent className="flex flex-col gap-5 2xl:mt-6">
                {listNews.map((i) => (
                    <div key={i.id} className="flex gap-3">
                        <Image width={80} height={100} alt="imagem"
                            src={i.image}
                            className="rounded-lg"
                        />
                        <div className="flex flex-col gap-2">
                            <h2>{i.text}</h2>
                            <span className="text-slate-500">{new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default NewsList