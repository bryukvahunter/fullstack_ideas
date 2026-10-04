import { type FormikHelpers, useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useMemo, useState } from 'react'
import type z from 'zod'
import type { AlertProps } from '@/shared/components/alert'
import type { ButtonProps } from '@/shared/components/button'

type Props<TZodSchema extends z.ZodTypeAny> = {
  successMessage?: string | false
  resetOnSuccess?: boolean
  showValidationAlert?: boolean
  initialValues?: z.infer<TZodSchema>
  validationSchema?: TZodSchema
  onSubmit: (values: z.infer<TZodSchema>, actions: FormikHelpers<z.infer<TZodSchema>>) => void | Promise<void>
}

export function useForm<TZodSchema extends z.ZodTypeAny>({
  successMessage,
  resetOnSuccess = true,
  showValidationAlert,
  initialValues = {},
  validationSchema,
  onSubmit,
}: Props<TZodSchema>) {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<Error | null>(null)

  const formik = useFormik<z.infer<TZodSchema>>({
    initialValues,
    ...(validationSchema && { validate: withZodSchema(validationSchema) }),
    onSubmit: async (values, actions) => {
      try {
        setSubmittingError(null)
        await onSubmit(values, actions)
        if (resetOnSuccess) {
          formik.resetForm()
        }
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (error) {
        if (error instanceof Error) {
          setSubmittingError(error)
        } else {
          setSubmittingError(new Error('Unknown error'))
        }
      }
    },
  })

  const alertProps = useMemo<AlertProps>(() => {
    if (submittingError) {
      return {
        hidden: false,
        children: submittingError.message,
        color: 'red',
      }
    }

    if (showValidationAlert && !formik.isValid && !!formik.submitCount) {
      return {
        hidden: false,
        children: 'Some field are invalids',
        color: 'red',
      }
    }

    if (successMessageVisible && successMessage) {
      return {
        hidden: false,
        children: successMessage,
        color: 'green',
      }
    }
    return {
      color: 'red',
      hidden: true,
      children: null,
    }
  }, [submittingError, formik.isValid, formik.submitCount, successMessageVisible, successMessage, showValidationAlert])

  const buttonProps = useMemo<Omit<ButtonProps, 'children'>>(() => {
    return {
      loading: formik.isSubmitting,
    }
  }, [formik.isSubmitting])

  return { formik, alertProps, buttonProps }
}
