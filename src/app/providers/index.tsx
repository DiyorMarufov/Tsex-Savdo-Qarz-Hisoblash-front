import { memo, Suspense, type ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "../store";
import Loader from "../../shared/ui/Loader/Loader";
import { NotificationProvider } from "../../shared/providers/NotificatonProvider/NotificationProvider";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

export const AppProvider = memo(({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <NotificationProvider>
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </NotificationProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
});
