import type { FormikProps, FormikValues } from 'formik'

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

  return (
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea
        value={value}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => {
          formik.setFieldTouched(name)
        }}
        name={name}
        id={name}
      />
      {!!touched && error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}
