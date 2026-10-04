import cn from 'classnames'
import styles from './index.module.scss'

export type ButtonProps = {
  children: React.ReactNode
  loading?: boolean
}

export function CustomButton({ children, loading = false }: ButtonProps) {
  return (
    <button className={cn({ [styles.button]: true, [styles.disabled]: loading })} type="submit" disabled={loading}>
      {loading ? 'Submitting...' : children}
    </button>
  )
}
