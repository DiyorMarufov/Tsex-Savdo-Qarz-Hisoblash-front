import { Tag } from "antd/lib";
import { memo, type FC } from "react";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

interface Props {
  props: CustomTagProps;
}

const customTagRender: FC<Props> = ({ props }) => {
  const { label, closable, onClose } = props;

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
      {label || "N+"}
    </Tag>
  );
};

export default memo(customTagRender);
