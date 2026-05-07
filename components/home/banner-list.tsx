import { ChevronRight, LucideIcon } from "lucide-react";

import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface BannerListProps {
    listBanner: {
        id: number;
        icon: LucideIcon;
        colorIcon: string,
        percent: string;
        title: string;
        colorDescription: string;
        textDescription: string;
    }[]
}

export const BannerList = ({ listBanner }: BannerListProps) => {

    return (

        <div className="w-full 2xl:h-full sm:p-8 2xl:p-16 flex flex-col lg:flex-row lg:justify-between gap-4 py-2 lg:gap-2 items-center rounded-xl bg-[url('/banner.png')] bg-cover bg-center bg-no-repeat">
            <div className="flex flex-col p-6 lg:p-0 lg:w-96 space-y-6">
                <p className="text-xl text-gray-400">BEM-VINDO(A) À</p>
                <div className="flex gap-1">
                    <p className="text-5xl text-white">Tahto</p>
                    <p className="text-5xl text-[#6d61e1]">Hub</p>
                </div>
                <p className="text-lg text-gray-400">O hub de soluções e tecnologias que transformam a experiência das pessoas e impulsionam resultados extraordinários.</p>
                <Button className="w-44 py-5 hover:cursor-pointer">Explorar soluções <ChevronRight /> </Button>
            </div>

            <div className="w-full flex flex-col lg:flex-row justify-between gap-2">
                {
                    listBanner.map(banner => {
                        const IconComponent = banner.icon;
                        return(
                            <Card key={banner.id} className="flex-1 items-center justify-around p-6 mx-2 lg:mx-0 bg-[#ffffff11]">
                                <IconComponent color={banner.colorIcon} size={35} />  
                                <p className="text-4xl text-white">{banner.percent}</p>
                                <p className="text-lg text-white text-center">{banner.title}</p>
                                <div className="flex gap-1">
                                    <p className="text-green-300">{banner.colorDescription}</p>
                                    <p className="text-gray-400">{banner.textDescription}</p>
                                </div>
                            </Card>
                        )
                    })
                }
            </div>

        </div>

    );
}

export default BannerList;