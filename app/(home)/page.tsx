import { ChartAreaInteractive } from "@/components/home/chart-area-interactive";
import { AppList } from "@/components/home/app-list";
import { SectionCards } from "@/components/home/section-cards";

export default function Home() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <AppList />
                    <SectionCards />
                    <ChartAreaInteractive />
                    {/* <DataTable data={data} /> */}
                </div>
            </div>
        </div>
    );
}
