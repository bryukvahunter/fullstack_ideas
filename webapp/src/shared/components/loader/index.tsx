import cn from 'classnames'
import style from './index.module.scss'

export function Loader({ type }: { type: 'page' | 'section' }) {
  return (
    <span
      className={cn({
        [style.loader]: true,
        [style[`type-${type}`]]: true,
      })}
    />
  )
}
