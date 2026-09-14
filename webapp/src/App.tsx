import { TrpcProvider } from "./lib/trpc-provider";
import { AllIdeasPage } from "./pages/all-ideas-page";
import { ViewIdeaPage } from "./pages/view-idea-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes, viewIdeaRouteParams } from "./shared/routes";
import { Layout } from "./widgets/layout";
import "./styles/global.scss";

export function App() {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllIdeas()} element={<AllIdeasPage />} />
            <Route
              path={routes.getViewIdea(viewIdeaRouteParams)}
              element={<ViewIdeaPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
}
