import { trpc } from "@/lib/create-trpc";
import { routes } from "@/shared/routes";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

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
      <h1 className={styles.title}>IdeaNick</h1>

      <div className={styles.ideas}>
        {data?.ideas.map((idea) => (
          <div className={styles.idea} key={idea.nick}>
            <h2 className={styles.ideaName}>
              <Link
                className={styles.ideaLink}
                to={routes.getViewIdea({ ideaNick: idea.nick })}
              >
                {idea.name}
              </Link>
            </h2>
            <p className={styles.ideaDescription}>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
