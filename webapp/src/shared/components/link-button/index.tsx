import cn from 'classnames'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

type Props = {
  children: React.ReactNode
  to: string
}

export function LinkButton({ children, to }: Props) {
  return (
    <Link className={cn({ [styles.button]: true })} type="submit" to={to}>
      {children}
    </Link>
  )
}
