import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppContextProvider } from './lib/context/me'
import { TrpcProvider } from './lib/trpc-provider'
import { EditProfilePage } from './pages/auth/edit-profile-page'
import { SignInPage } from './pages/auth/sign-in'
import { SignOutPage } from './pages/auth/sign-out'
import { SignUpPage } from './pages/auth/sign-up'
import { AllIdeasPage } from './pages/ideas/all-ideas-page'
import { EditIdeaPage } from './pages/ideas/edit-idea-page'
import { NewIdeaPage } from './pages/ideas/new-idea-page'
import { ViewIdeaPage } from './pages/ideas/view-idea-page'
import { NotFoundPage } from './pages/other/not-found-page'
import { routes, viewIdeaRouteParams } from './shared/routes'
import './styles/global.scss'
import { Layout } from './widgets/layout'

export function App() {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOut()} element={<SignOutPage />} />

            <Route element={<Layout />}>
              <Route path={routes.getAllIdeas()} element={<AllIdeasPage />} />
              <Route path={routes.getViewIdea(viewIdeaRouteParams)} element={<ViewIdeaPage />} />
              <Route path={routes.getNewIdea()} element={<NewIdeaPage />} />
              <Route path={routes.getEditProfile()} element={<EditProfilePage />} />
              <Route path={routes.getEditIdea(viewIdeaRouteParams)} element={<EditIdeaPage />} />
              <Route path={routes.getSignUp()} element={<SignUpPage />} />
              <Route path={routes.getSignIn()} element={<SignInPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
