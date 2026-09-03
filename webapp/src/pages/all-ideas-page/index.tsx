import { trpc } from "@/lib/create-trpc";

export function AllIdeasPage() {
  const { data, error, isLoading, isFetching, isError, refetch } =
    trpc.getIdeas.useQuery();

  if (isLoading || isFetching) <div>Загрузка...</div>;

  if (isError) {
    return (
      <div>
        <div>{error.message}</div>;
        <button onClick={() => refetch()}>Повторить запрос</button>
      </div>
    );
  }

  return (
    <div>
      <h1>IdeaNick</h1>

      <div>
        {data?.ideas.map((idea) => (
          <div key={idea.nick}>
            <h2>{idea.title}</h2>
            <p>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
