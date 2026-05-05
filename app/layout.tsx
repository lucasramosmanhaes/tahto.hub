import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { FloatingButton } from "@/components/home/components/FloatingButton";
import { SuppressThemeWarning } from "@/components/theme/suppress-theme-warning";
import { ThemeProvider } from "@/components/theme/theme-provider";
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
    title: "Tahto Hub",
    description: "Intranet Tahto",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html
            lang={locale}
            suppressHydrationWarning
            className={cn(
                "h-full",
                "antialiased",
                sfPro.variable,
                sfMono.variable,
            )}
        >
            <body className="flex min-h-full flex-col">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                    scriptProps={{ "data-cfasync": "false" }}
                >
                    <NextIntlClientProvider messages={messages}>
                        <TooltipProvider>
                            <SuppressThemeWarning />
                            {children}
                            <Toaster position="top-right"/>
                            <FloatingButton />
                        </TooltipProvider>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
