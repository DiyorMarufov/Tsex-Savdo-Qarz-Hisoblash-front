import { memo } from "react";
import { Spinner } from "../../../components/ui/spinner";

const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner className="size-17 text-blue-500" />
    </div>
  );
};

export default memo(Loader);
