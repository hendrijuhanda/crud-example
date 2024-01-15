import { useLayoutContext } from "@/providers/layout.provider";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Divider,
} from "@nextui-org/react";
import { RiShoppingBagFill } from "@remixicon/react";
import Link from "next/link";
import { FC, useState } from "react";

interface Title {
  title: string;
  subtitle: string;
}

const TitleComponent: FC<Title> = ({ title, subtitle }) => {
  return (
    <h1 className="flex items-center">
      <div className="font-bold uppercase">{title}</div>

      <div className="h-3 mx-2">
        <Divider orientation="vertical" />
      </div>

      <div className="text-gray-400 text-sm">{subtitle}</div>
    </h1>
  );
};

export const ScreenHeaderComponent: FC = () => {
  const [title] = useState<Title>({
    title: "Merchandise",
    subtitle: "Admin Page",
  });

  const { pageTitle, breadcrumbs } = useLayoutContext();

  return (
    <div>
      <header className="flex items-center justify-between py-4">
        <TitleComponent title={title.title} subtitle={title.subtitle} />

        <Button
          as={Link}
          href="/shop"
          startContent={<RiShoppingBagFill size="1rem" />}
          color="primary"
          size="sm"
        >
          Go to Shop
        </Button>
      </header>

      <Divider />

      <div className="mt-8">
        <div className="font-bold mb-1">{pageTitle}</div>
        <Breadcrumbs>
          {breadcrumbs.map((breadcrumb) => {
            return (
              <BreadcrumbItem>
                {breadcrumb.link ? (
                  <Link href={breadcrumb.link}>{breadcrumb.label}</Link>
                ) : (
                  breadcrumb.label
                )}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumbs>
      </div>
    </div>
  );
};
