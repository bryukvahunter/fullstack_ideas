import { zSignUpTrpcInput } from '@fullstack/backend/src/router/sign-up/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import z from 'zod'
import { trpc } from '@/lib/create-trpc'
import { CustomAlert } from '@/shared/components/alert'
import { CustomButton } from '@/shared/components/button'
import { FormItems } from '@/shared/components/form-items'
import { CustomInput } from '@/shared/components/input/input'
import { Segment } from '@/widgets/segment'

export function SignUpPage() {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)

  const signUp = trpc.signUp.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput
        .extend({
          passwordAgain: z.string().min(1),
        })
        .superRefine((val, ctx) => {
          if (val.password !== val.passwordAgain) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Password must be the same',
              path: ['passwordAgain'],
            })
          }
        })
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)

        await signUp.mutateAsync(values)

        formik.resetForm()

        setSuccessMessageVisible(true)

        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (error) {
        if (error instanceof Error) {
          setSubmittingError(error.message)
        }
      }
    },
  })

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <CustomInput label="Nick" name="nick" formik={formik} />
          <CustomInput label="Password" name="password" type="password" formik={formik} />
          <CustomInput label="Password" name="passwordAgain" type="password" formik={formik} />

          {!formik.isValid && !!formik.submitCount && <CustomAlert color="red">Some fields are invalid</CustomAlert>}
          {submittingError && <CustomAlert color="red">{submittingError}</CustomAlert>}
          {successMessageVisible && <CustomAlert color="green">Thanks for sign up!</CustomAlert>}

          <CustomButton loading={formik.isSubmitting}>Sign Up!</CustomButton>
        </FormItems>
      </form>
    </Segment>
  )
}
