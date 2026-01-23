import { Tag } from "antd/lib";
import { memo, type FC } from "react";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

interface Props {
  props: CustomTagProps;
  productModelOptions: any[];
}

const customTagRender: FC<Props> = ({ props, productModelOptions }) => {
  const { value, closable, onClose } = props;

  const selectedOption: any = productModelOptions?.find(
    (opt: any) => opt.value === value,
  );
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color="blue"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      className="ml-px! mt-1! py-[3px]!"
    >
      {selectedOption?.displayLabel || "N+"}
    </Tag>
  );
};

export default memo(customTagRender);
