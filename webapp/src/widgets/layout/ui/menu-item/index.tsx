import { Link } from 'react-router-dom'
import styles from './index.module.scss'

type Props = {
  name: string
  to: string
}

export function MenuItem({ name, to }: Props) {
  return (
    <li className={styles.item}>
      <Link className={styles.link} to={to}>
        {name}
      </Link>
    </li>
  )
}
