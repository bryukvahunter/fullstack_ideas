import { initTRPC } from "@trpc/server";

const ideas = [
  {
    nick: "cool-idea-1",
    title: "idea 1",
    description: "Описание идеи...",
  },
  {
    nick: "cool-idea-2",
    title: "idea 2",
    description: "Описание идеи...",
  },
  {
    nick: "cool-idea-3",
    title: "idea 3",
    description: "Описание идеи...",
  },
  {
    nick: "cool-idea-4",
    title: "idea 4",
    description: "Описание идеи...",
  },
  {
    nick: "cool-idea-5",
    title: "idea 5",
    description: "Описание идеи...",
  },
];

const trpc = initTRPC.create();

const x: number = "Y";

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas };
  }),
});

export type TrpcRouter = typeof trpcRouter;
