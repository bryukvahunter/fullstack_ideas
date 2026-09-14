import { trpc } from "@/lib/create-trpc";
import { useRequireParams } from "@/shared/helpers";
import { ROUTE_NAME } from "@/shared/routes";
import styles from "./index.module.scss";

export function ViewIdeaPage() {
  const ideaNick = useRequireParams(ROUTE_NAME.IDEA_NICK);

  const { data, isLoading, isFetching, isError, refetch, error } =
    trpc.getIdea.useQuery({
      ideaNick: ideaNick,
    });

  if (isLoading || isFetching) return <div>Загрузка...</div>;

  if (isError) {
    return (
      <div>
        <div>{error.message}</div>;
        <button onClick={() => refetch()}>Повторить запрос</button>
      </div>
    );
  }

  if (!data.idea) return <div>idea not found...</div>;

  return (
    <div>
      <h2 className={styles.title}>{data.idea.name}</h2>
      <p className={styles.description}>{data.idea.description}</p>
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: data.idea.text }}
      />
    </div>
  );
}
