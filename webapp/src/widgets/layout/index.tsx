import { routes } from "@/shared/routes";
import { Link, Outlet } from "react-router-dom";
import styles from "./index.module.scss";

export function Layout() {
  return (
    <div className={styles.layout}>
      <div className={styles.navigation}>
        <div className={styles.logo}>Idea Nick</div>
        <ul className={styles.menu}>
          <li className={styles.item}>
            <Link className={styles.link} to={routes.getAllIdeas()}>
              All ideas
            </Link>
          </li>

          <li className={styles.item}>
            <Link className={styles.link} to={routes.getNewIdea()}>
              Add idea
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
