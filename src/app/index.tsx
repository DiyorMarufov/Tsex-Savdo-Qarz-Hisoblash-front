import { memo } from "react";
import { AppProvider } from "./providers";
import Router from "./router";

const AppRouter = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default memo(AppRouter);
