import { createRef } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './index.module.scss'
import { LayoutMenu } from './ui/menu'

export const layoutContentElRef = createRef<HTMLDivElement>()

export function Layout() {
  return (
    <div className={styles.layout}>
      <div className={styles.navigation}>
        <div className={styles.logo}>Idea Nick</div>
        <LayoutMenu />
      </div>

      <div className={styles.content} ref={layoutContentElRef}>
        <Outlet />
      </div>
    </div>
  )
}
