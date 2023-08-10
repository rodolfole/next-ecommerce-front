import { FC } from "react";

import { ISize } from "@/types";
import Button from "./Button";

type Props = {
  onSelectedSize: (size: ISize) => void;
  selectedSize?: ISize;
  sizes: ISize[];
};

export const SizeSelector: FC<Props> = ({
  onSelectedSize,
  selectedSize,
  sizes,
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-2">
      {sizes.map((size) => (
        <Button
          className="px-5 py-3 rounded-md"
          //   color={selectedSize === size ? "primary" : "info"}
          key={size.id}
          onClick={() => onSelectedSize(size)}
          variant="outlined"
        >
          {size.name}
        </Button>
      ))}
    </div>
  );
};
