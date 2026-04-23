import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export function AppList() {
    return (
        <div className="relative w-full px-4 lg:px-6 space-y-3">
            <h3 className="font-semibold">Apps</h3>
            <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
                {Array.from({ length: 12 }).map((_, index) => (
                    <CarouselItem
                        key={index}
                        className="basis-1/2 md:basis-1/3 lg:basis-1/6"
                    >
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-3xl font-semibold">
                                        {index + 1}
                                    </span>
                                </CardContent>
                                <span className="text-center">App {index}</span>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
                <div className="flex justify-center gap-2 mt-3">
                    <CarouselPrevious className="static translate-y-0" />
                    <CarouselNext className="static translate-y-0" />
                </div>
            </Carousel>
        </div>
    );
}
