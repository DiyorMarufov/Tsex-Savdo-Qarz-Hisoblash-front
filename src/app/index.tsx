import { memo } from "react";
import { AppProvider } from "./providers";
import Router from "./router";

const App = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default memo(App);
