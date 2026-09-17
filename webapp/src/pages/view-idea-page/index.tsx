import { trpc } from "@/lib/create-trpc";
import { useRequireParams } from "@/shared/helpers";
import { ROUTE_NAME } from "@/shared/routes";
import styles from "./index.module.scss";
import { Segment } from "@/widgets/segment";

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
    <Segment title={data.idea.name} description={data.idea.description}>
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: data.idea.text }}
      />
    </Segment>
  );
}
