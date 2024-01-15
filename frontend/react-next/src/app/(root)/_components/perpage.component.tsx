import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent, FC, useCallback } from "react";
import { usePerpageContext } from "./perpage.context";

const items = [
  {
    label: "5",
    value: "5",
  },
  {
    label: "10",
    value: "10",
  },
  {
    label: "25",
    value: "25",
  },
  {
    label: "50",
    value: "50",
  },
  {
    label: "100",
    value: "100",
  },
];

export const PerpageComponent: FC = () => {
  const { perpage, setPerpage } = usePerpageContext();

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setPerpage(event.target.value);
    },
    [setPerpage]
  );

  return (
    <Select
      size="sm"
      label="Perpage"
      items={items}
      selectedKeys={[perpage]}
      onChange={handleOnChange}
    >
      {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
    </Select>
  );
};
