import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const sfPro = localFont({
    src: [
        {
            path: "../fonts/sf-pro/SFProRegular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../fonts/sf-pro/SFProMedium.otf",
            weight: "500",
        },
        {
            path: "../fonts/sf-pro/SFProBold.otf",
            weight: "700",
        },
        {
            path: "../fonts/sf-pro/SFProRegularItalic.otf",
            weight: "400",
            style: "italic",
        },
        {
            path: "../fonts/sf-pro/SFProMediumItalic.otf",
            weight: "500",
            style: "italic",
        },
        {
            path: "../fonts/sf-pro/SFProBoldItalic.otf",
            weight: "700",
            style: "italic",
        },
    ],
    variable: "--font-sans",
    display: "swap",
    fallback: ["system-ui", "Arial"],
});

const sfMono = localFont({
    src: [
        {
            path: "../fonts/sf-mono/SFMonoRegular.otf",
            weight: "400",
        },
        {
            path: "../fonts/sf-mono/SFMonoMedium.otf",
            weight: "500",
        },
        {
            path: "../fonts/sf-mono/SFMonoBold.otf",
            weight: "700",
        },
        {
            path: "../fonts/sf-mono/SFMonoRegularItalic.otf",
            weight: "400",
            style: "italic",
        },
        {
            path: "../fonts/sf-mono/SFMonoMediumItalic.otf",
            weight: "500",
            style: "italic",
        },
        {
            path: "../fonts/sf-mono/SFMonoBoldItalic.otf",
            weight: "700",
            style: "italic",
        },
    ],
    variable: "--font-mono",
    display: "swap",
    fallback: ["monospace"],
});

export const metadata: Metadata = {
    title: "Tahtinho",
    description: "Loja de vestuário online",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="pt-BR"
            className={cn(
                "h-full",
                "antialiased",
                sfPro.variable,
                sfMono.variable,
            )}
        >
            <body className="flex min-h-full flex-col">
                <TooltipProvider>
                    <SidebarProvider
                        style={
                            {
                                "--sidebar-width": "calc(var(--spacing) * 72)",
                                "--header-height": "calc(var(--spacing) * 12)",
                            } as React.CSSProperties
                        }
                    >
                        <AppSidebar variant="inset" />
                        <SidebarInset>
                            <SiteHeader />
                            <div className="flex flex-1 flex-col">
                                {children}
                            </div>
                        </SidebarInset>
                    </SidebarProvider>
                    <Toaster />
                </TooltipProvider>
            </body>
        </html>
    );
}
