import { IconBrandFacebookFilled, IconBrandInstagram, IconBrandLinkedinFilled, IconBrandYoutubeFilled, IconWorld } from "@tabler/icons-react";
import Link from "next/link";

import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";

export const SocialList = () => {
    return (
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
    );
}

export default SocialList;