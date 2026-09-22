import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrpcProvider } from './lib/trpc-provider'
import { AllIdeasPage } from './pages/all-ideas-page'
import { NewIdeaPage } from './pages/new-idea-page'
import { ViewIdeaPage } from './pages/view-idea-page'
import { routes, viewIdeaRouteParams } from './shared/routes'
import { Layout } from './widgets/layout'
import './styles/global.scss'

export function App() {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllIdeas()} element={<AllIdeasPage />} />
            <Route path={routes.getViewIdea(viewIdeaRouteParams)} element={<ViewIdeaPage />} />
            <Route path={routes.getNewIdea()} element={<NewIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
