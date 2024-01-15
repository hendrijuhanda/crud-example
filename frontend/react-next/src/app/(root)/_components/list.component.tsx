import { FC } from "react";
import { TableComponent } from "./table.component";
import { PerpageComponent } from "./perpage.component";
import { Button } from "@nextui-org/react";
import { PaginationComponent } from "./pagination.component";
import { RiAddBoxFill } from "@remixicon/react";
import Link from "next/link";

export const ListComponent: FC = () => {
  return (
    <div>
      <div className="flex justify-between items-end mb-4">
        <div className="w-24">
          <PerpageComponent />
        </div>

        <div>
          <Button
            as={Link}
            href="/create"
            color="primary"
            size="sm"
            startContent={<RiAddBoxFill size="1rem" />}
          >
            Add Product
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <TableComponent />
      </div>

      <div className="flex justify-end">
        <PaginationComponent />
      </div>
    </div>
  );
};
