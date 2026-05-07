import { IconBrandFacebookFilled, IconBrandInstagram, IconBrandLinkedinFilled, IconBrandYoutubeFilled, IconWorld } from "@tabler/icons-react";
import Link from "next/link";

import { AppList } from "@/components/home/app-list";
import { BannerList } from "@/components/home/banner-list";
import NewsList from "@/components/home/news-list";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { dataApps, dataBanner, dataNews } from "@/model/dataHome";

export default function Home() {

    return (
        <div className="flex flex-1 flex-col gap-2 p-6 space-y-6">

            <div className="w-full h-full flex flex-col 2xl:flex-row gap-8">                    
                <BannerList listBanner={dataBanner} />
                <NewsList listNews={dataNews} />
            </div>

            <div className="flex w-full gap-6 flex-wrap">
                <AppList listBanner={dataApps} />
            </div>

            <div>
            <ButtonGroup>
                <Button variant="outline" size="lg" asChild>
                    <Link href="https://www.facebook.com/oficialtahto" target="_blank">
                        <IconBrandFacebookFilled color="#0064e0" />
                    </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                    <Link href="https://www.instagram.com/oficialtahto/" target="_blank">
                        <IconBrandInstagram stroke={2} color="#ed4941" />
                    </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                    <Link href="https://www.youtube.com/c/Tahtooficial" target="_blank">
                        <IconBrandYoutubeFilled color="#ff0033" />
                    </Link>
                </Button>
                <Button variant="outline" size="icon-lg" asChild>
                    <Link href="https://br.linkedin.com/company/oficialtahto" target="_blank">
                        <IconBrandLinkedinFilled color="#0a66c2" />
                    </Link>
                </Button>
                <Button variant="outline" size="icon-lg" asChild>
                    <Link href="https://tahto.com.br/" target="_blank">
                        <IconWorld stroke={2} />
                    </Link>
                </Button>
            </ButtonGroup>
            </div>
        </div>
    );
}
