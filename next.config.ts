import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
    /* config options here */

    images: {
        remotePatterns: [
            {
                hostname: "d4lgxe9bm8juw.cloudfront.net",
            },
        ],
    },
};

export default withNextIntl(nextConfig);
