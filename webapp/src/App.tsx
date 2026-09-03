import { TrpcProvider } from "./lib/trpc-provider";
import { AllIdeasPage } from "./pages/all-ideas-page";

export function App() {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  );
}
