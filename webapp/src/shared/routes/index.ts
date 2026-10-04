import { getRouteParams } from './utils'

export const ROUTE_NAME = {
  IDEA_NICK: 'ideaNick',
} as const

export const routes = {
  getAllIdeas: () => '/',
  getViewIdea: ({ ideaNick }: ViewIdeaRouteParams) => `/ideas/${ideaNick}`,
  getNewIdea: () => '/ideas/new',
  getSignUp: () => '/sign-up',
  getSignIn: () => '/sign-in',
  getSignOut: () => '/sign-out',
  getEditIdea: ({ ideaNick }: ViewIdeaRouteParams) => `/ideas/${ideaNick}/edit`,
}

export const viewIdeaRouteParams = getRouteParams({
  ideaNick: `:${ROUTE_NAME.IDEA_NICK}`,
})

export type ViewIdeaRouteParams = typeof viewIdeaRouteParams
