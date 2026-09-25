import styles from './index.module.scss'

export function FormItems({ children }: { children: React.ReactNode }) {
  return <div className={styles.formItems}>{children}</div>
}
