import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, trpcClient } from "./create-trpc";
import { trpc } from "./create-trpc";

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
