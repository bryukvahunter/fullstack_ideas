import cn from 'classnames'
import styles from './index.module.scss'

type Props = {
  children: React.ReactNode
  loading?: boolean
}

export function CustomButton({ children, loading = false }: Props) {
  return (
    <button className={cn({ [styles.button]: true, [styles.disabled]: loading })} type="submit" disabled={loading}>
      {loading ? 'Submitting...' : children}
    </button>
  )
}
