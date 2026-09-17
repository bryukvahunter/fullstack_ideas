import { trpc } from "@/lib/create-trpc";
import { routes } from "@/shared/routes";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { Segment } from "@/widgets/segment";

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
    <Segment title={"All ideas"}>
      <div className={styles.ideas}>
        {data?.ideas.map((idea) => (
          <div className={styles.idea} key={idea.nick}>
            <Segment
              size={2}
              description={idea.description}
              title={
                <Link
                  className={styles.ideaLink}
                  to={routes.getViewIdea({ ideaNick: idea.nick })}
                >
                  {idea.name}
                </Link>
              }
            />
          </div>
        ))}
      </div>
    </Segment>
  );
}
