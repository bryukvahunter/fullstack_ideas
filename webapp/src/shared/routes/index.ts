import { getRouteParams } from "./utils";

export const routes = {
  getAllIdeas: () => "/",
  getViewIdea: ({ ideaNick }: { ideaNick: string }) => `/ideas/${ideaNick}`,
  getNewIdea: () => "/ideas/new",
};

export const ROUTE_NAME = {
  IDEA_NICK: "ideaNick",
} as const;

export const viewIdeaRouteParams = getRouteParams({
  ideaNick: `:${ROUTE_NAME.IDEA_NICK}`,
  xxx: "123",
});

export type ViewIdeaRouteParams = typeof viewIdeaRouteParams;
