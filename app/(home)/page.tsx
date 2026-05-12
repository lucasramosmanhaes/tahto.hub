
import { AppList } from "@/components/home/app-list";
import { BannerList } from "@/components/home/banner-list";
import NewsList from "@/components/home/news-list";
import { SocialList } from "@/components/home/social-list";
import { dataApps, dataBanner, dataNews } from "@/data/dataHome";

export default function Home() {

    return (
        <div className="flex flex-1 flex-col gap-2 p-6 space-y-3">

            <div className="w-full h-full flex flex-col 2xl:flex-row gap-8">                    
                <BannerList listBanner={dataBanner} />
                <NewsList listNews={dataNews} />
            </div>

            <div className="flex w-full gap-6 flex-wrap">
                <AppList listApps={dataApps} />
            </div>

            <div>
                <SocialList />
            </div>
        </div>
    );
}
