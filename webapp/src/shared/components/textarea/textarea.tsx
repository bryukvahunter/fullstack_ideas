import cn from 'classnames'
import type { FormikProps, FormikValues } from 'formik'
import styles from './textarea.module.scss'

export function CustomTextarea<T extends FormikValues>({
  name,
  label,
  formik,
}: {
  name: keyof T & string
  label: string
  formik: FormikProps<T>
}) {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]

  const disabled = formik.isSubmitting
  const invalid = !!touched && !!error

  return (
    <div className={cn({ [styles.field]: true, [styles.disabled]: disabled })}>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea
        className={cn({ [styles.input]: true, [styles.invalid]: invalid })}
        value={value}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => {
          void formik.setFieldTouched(name)
        }}
        name={name}
        id={name}
        disabled={formik.isSubmitting}
      />

      {invalid && <div className={styles.errorMessage}>{error}</div>}
    </div>
  )
}
