import { Button, Input } from "@nextui-org/react";
import { RiUpload2Line } from "@remixicon/react";
import { FC } from "react";

export const FormComponent: FC = () => {
  return (
    <form>
      <div className="flex items-center mb-4">
        <div className="w-1/5">Name</div>

        <div>
          <Input label="Input product name" isClearable />
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-1/5">Image</div>
        <div>
          <Input label="Upload product image" isReadOnly isClearable />
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-1/5">Price</div>

        <div>
          <Input label="Input product price" isClearable />
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-1/5">Quantity</div>

        <div>
          <Input label="Input product quantity" isClearable />
        </div>
      </div>

      <div className="mt-8">
        <Button type="submit" color="primary" size="sm">
          Submit
        </Button>
      </div>
    </form>
  );
};
