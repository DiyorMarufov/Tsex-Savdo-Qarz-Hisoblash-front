import { memo } from "react";
import { Spinner } from "../../../components/ui/spinner";

const Loader = () => {
  return <Spinner className="size-10 text-blue-500" />;
};

export default memo(Loader);
