import cn from 'classnames'
import styles from './index.module.scss'

type Props = {
  color: 'red' | 'green'
  children: React.ReactNode
}

export function CustomAlert({ color, children }: Props) {
  return <div className={cn({ [styles.alert]: true, [styles[color]]: true })}>{children}</div>
}
