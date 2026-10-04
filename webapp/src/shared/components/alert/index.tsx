import cn from 'classnames'
import styles from './index.module.scss'

export type AlertProps = {
  color: 'red' | 'green'
  hidden?: boolean | undefined
  children: React.ReactNode
}

export function CustomAlert({ color, children, hidden }: AlertProps) {
  if (hidden) {
    return null
  }

  return <div className={cn({ [styles.alert]: true, [styles[color]]: true })}>{children}</div>
}
