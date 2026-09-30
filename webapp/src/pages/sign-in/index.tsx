import { zSignInTrpcInput } from '@fullstack/backend/src/router/sign-in/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import Cookie from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { trpc } from '@/lib/create-trpc'
import { CustomAlert } from '@/shared/components/alert'
import { CustomButton } from '@/shared/components/button'
import { FormItems } from '@/shared/components/form-items'
import { CustomInput } from '@/shared/components/input/input'
import { routes } from '@/shared/routes'
import { Segment } from '@/widgets/segment'

export function SignInPage() {
  const navigate = useNavigate()

  const trpcUtils = trpc.useUtils()

  const [submittingError, setSubmittingError] = useState<string | null>(null)

  const signIn = trpc.signIn.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)

        const { token } = await signIn.mutateAsync(values)
        Cookie.set('token', token, { expires: 99999 })
        await trpcUtils.invalidate()
        navigate(routes.getAllIdeas())
      } catch (error) {
        if (error instanceof Error) {
          setSubmittingError(error.message)
        }
      }
    },
  })

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <CustomInput label="Nick" name="nick" formik={formik} />
          <CustomInput label="Password" name="password" type="password" formik={formik} />

          {!formik.isValid && !!formik.submitCount && <CustomAlert color="red">Some fields are invalid</CustomAlert>}
          {submittingError && <CustomAlert color="red">{submittingError}</CustomAlert>}

          <CustomButton loading={formik.isSubmitting}>Sign In!</CustomButton>
        </FormItems>
      </form>
    </Segment>
  )
}
