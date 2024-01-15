import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { FC } from "react";
import { RiDeleteBinLine, RiEditLine, RiSearchLine } from "@remixicon/react";

const rows = [
  {
    key: 1,
    image: "/product.webp",
    name: "Product 1",
    quantity: 10,
    price: 29.99,
  },
  {
    key: 2,
    image: "https://example.com/product2.jpg",
    name: "Product 2",
    quantity: 5,
    price: 19.99,
  },
  {
    key: 3,
    image: "https://example.com/product3.jpg",
    name: "Product 3",
    quantity: 15,
    price: 39.99,
  },
];

const columns = [
  {
    key: "image",
    label: "IMAGE",
  },
  {
    key: "name",
    label: "PRODUCT NAME",
  },
  {
    key: "price",
    label: "PRICE",
  },
  {
    key: "quantity",
    label: "QUANTITY",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

const CellImageComponent: FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <img
      className="w-16 h-16 rounded object-cover"
      src={imageUrl}
      alt="Product image"
    />
  );
};

const CellActionComponent: FC = () => {
  return (
    <div className="flex items-center">
      <div className="mx-1">
        <Button isIconOnly size="sm" variant="ghost">
          <RiSearchLine size=".875rem" />
        </Button>
      </div>

      <div className="mx-1">
        <Button isIconOnly size="sm" variant="ghost">
          <RiEditLine size=".875rem" />
        </Button>
      </div>

      <div className="mx-1">
        <Button isIconOnly size="sm" variant="ghost" color="danger">
          <RiDeleteBinLine size=".875rem" />
        </Button>
      </div>
    </div>
  );
};

export const TableComponent: FC = () => {
  const renderCell = (item: any, columnKey: any) => {
    switch (columnKey) {
      case "image":
        return <CellImageComponent imageUrl={getKeyValue(item, columnKey)} />;
      case "action":
        return <CellActionComponent />;
      default:
        return getKeyValue(item, columnKey);
    }
  };

  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            width={column.key === "action" ? 80 : undefined}
          >
            <div
              className={column.key === "action" ? "text-center" : undefined}
            >
              {column.label}
            </div>
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>
                <div>{renderCell(item, columnKey)}</div>
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
