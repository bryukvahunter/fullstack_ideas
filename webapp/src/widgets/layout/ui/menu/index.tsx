import { AuthItems } from '../auth-items'
import { MenuItem } from '../menu-item'
import styles from './index.module.scss'
import { routes } from '@/shared/routes'

export function LayoutMenu() {
  return (
    <ul className={styles.menu}>
      <MenuItem name="All ideas" to={routes.getAllIdeas()} />
      <AuthItems />
    </ul>
  )
}
