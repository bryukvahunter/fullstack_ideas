import cn from 'classnames'
import type { FormikProps, FormikValues } from 'formik'
import styles from './input.module.scss'

export function CustomInput<T extends FormikValues>({
  name,
  label,
  formik,
  maxWidth,
}: {
  name: keyof T & string
  label: string
  formik: FormikProps<T>
  maxWidth?: number
}) {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]

  const disabled = formik.isSubmitting
  const invalid = !!touched && !!error

  return (
    <div className={cn({ [styles.field]: true, [styles.disabled]: disabled })}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>

      <input
        className={cn({ [styles.input]: true, [styles.invalid]: invalid })}
        style={{ maxWidth }}
        type="text"
        value={value}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => {
          void formik.setFieldTouched(name)
        }}
        name={name}
        id={name}
        disabled={disabled}
      />
      {invalid && <div className={styles.errorMessage}>{error}</div>}
    </div>
  )
}
