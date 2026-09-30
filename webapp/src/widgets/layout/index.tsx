import { Outlet } from 'react-router-dom'
import styles from './index.module.scss'
import { LayoutMenu } from './ui/menu'

export function Layout() {
  return (
    <div className={styles.layout}>
      <div className={styles.navigation}>
        <div className={styles.logo}>Idea Nick</div>
        <LayoutMenu />
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
