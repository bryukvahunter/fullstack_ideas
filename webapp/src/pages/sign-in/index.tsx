import { zSignInTrpcInput } from '@fullstack/backend/src/router/sign-in/input'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { trpc } from '@/lib/create-trpc'
import { useForm } from '@/lib/hooks/form'
import { CustomAlert } from '@/shared/components/alert'
import { CustomButton } from '@/shared/components/button'
import { FormItems } from '@/shared/components/form-items'
import { CustomInput } from '@/shared/components/input/input'
import { routes } from '@/shared/routes'
import { Segment } from '@/widgets/segment'

export function SignInPage() {
  const navigate = useNavigate()

  const trpcUtils = trpc.useUtils()

  const signIn = trpc.signIn.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values)
      Cookie.set('token', token, { expires: 99999 })
      await trpcUtils.invalidate()
      navigate(routes.getAllIdeas())
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  })

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <CustomInput label="Nick" name="nick" formik={formik} />
          <CustomInput label="Password" name="password" type="password" formik={formik} />

          <CustomAlert {...alertProps} />

          <CustomButton {...buttonProps}>Sign In!</CustomButton>
        </FormItems>
      </form>
    </Segment>
  )
}
